import { Course } from "../model/course.model.js";
import { Order } from "../model/order.model.js"; 
import User from "../model/user.model.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

const RAZORPAY_ENABLED = Boolean(
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
);

function toPaise(amountInRupees) {
  // Razorpay expects the amount in the smallest currency unit (paise for INR).
  // We round to avoid floating point precision issues.
  return Math.round(Number(amountInRupees) * 100);
}

/* ============================
   BUY / ENROLL COURSE
============================= */
export const buyCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already purchased
    const alreadyBought = await Order.findOne({
      user: userId,
      course: courseId,
      paymentStatus: "paid"
    });

    if (alreadyBought) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    // If free course, directly enroll
    if (course.isFree || course.price === 0) {
      const order = await Order.create({
        user: userId,
        course: courseId,
        amount: 0,
        paymentStatus: "paid",
        paymentId: "FREE_COURSE",
        currency: "INR"
      });

      await User.findByIdAndUpdate(userId, {
        $addToSet: { enrolledCourses: courseId }
      });

      course.totalStudents += 1;
      await course.save();

      return res.status(201).json({
        success: true,
        message: "Enrolled in free course successfully",
        order
      });
    }

    // Paid course (Razorpay integration)
    if (!RAZORPAY_ENABLED) {
      return res.status(500).json({
        success: false,
        message:
          "Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
      });
    }

    const amountInRupees = course.discountPrice || course.price;
    const amountInPaise = toPaise(amountInRupees);
    const shortUser = String(userId).slice(-6);
    const shortCourse = String(courseId).slice(-6);
    const receipt = `rcpt_${shortUser}_${shortCourse}_${Date.now()}`;

    // 1) Create a Razorpay order
    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt,
        notes: {
          userId: String(userId),
          courseId: String(courseId)
        }
      });
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      const detail =
        err?.error?.description ||
        err?.response?.data?.message ||
        err?.message ||
        "Razorpay order creation failed";
      return res.status(502).json({
        success: false,
        message: detail
      });
    }

    // 2) Create our local order tied to Razorpay order id
    const order = await Order.create({
      user: userId,
      course: courseId,
      amount: amountInRupees,
      paymentStatus: "pending",
      currency: "INR",
      receipt,
      razorpayOrderId: razorpayOrder.id
    });

    res.status(201).json({
      success: true,
      message: "Order created. Complete payment to access course.",
      order,
      razorpay: {
        keyId: process.env.RAZORPAY_KEY_ID,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   CONFIRM PAYMENT (Mock)
============================= */
export const confirmPayment = async (req, res) => {
  try {
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = req.body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields. Provide orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature."
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!RAZORPAY_ENABLED) {
      return res.status(500).json({
        success: false,
        message:
          "Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
      });
    }

    // Ensure the incoming Razorpay order id matches what we created.
    if (order.razorpayOrderId && order.razorpayOrderId !== razorpayOrderId) {
      return res.status(400).json({
        success: false,
        message: "Razorpay order id does not match the existing order."
      });
    }

    // Verify signature: HMAC_SHA256(order_id|payment_id, key_secret)
    const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(payload)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      order.paymentStatus = "failed";
      order.razorpayOrderId = razorpayOrderId;
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = razorpaySignature;
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Invalid Razorpay signature. Payment verification failed."
      });
    }

    order.paymentStatus = "paid";
    order.paymentId = razorpayPaymentId;
    order.razorpayOrderId = razorpayOrderId;
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save();

    // Enroll user
    await User.findByIdAndUpdate(order.user, {
      $addToSet: { enrolledCourses: order.course }
    });

    // Increase course students
    const course = await Course.findById(order.course);
    course.totalStudents += 1;
    await course.save();

    res.json({
      success: true,
      message: "Payment successful and course enrolled",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   GET MY ORDERS
============================= */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("course", "title price thumbnail")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   GET ALL ORDERS (ADMIN)
============================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .populate("course", "title price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders, total: orders.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   GET REVENUE (ADMIN)
============================= */
export const getRevenue = async (req, res) => {
  try {
    const paidOrders = await Order.find({ paymentStatus: "paid" })
      .populate("course", "title")
      .sort({ createdAt: -1 });

    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + (Number(order.amount) || 0),
      0
    );

    res.json({
      success: true,
      totalRevenue,
      totalPayments: paidOrders.length,
      history: paidOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
