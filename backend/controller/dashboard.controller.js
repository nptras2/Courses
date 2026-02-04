import { Course } from "../model/course.model.js";
import { Order } from "../model/order.model.js";
import User from "../model/user.model.js";

/* ============================
   ADMIN DASHBOARD SUMMARY
============================= */
export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalCourses,
      paidOrders,
      pendingOrders,
      recentOrders
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Order.find({ paymentStatus: "paid" }),
      Order.countDocuments({ paymentStatus: "pending" }),
      Order.find()
        .populate("user", "name")
        .populate("course", "title")
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + (Number(order.amount) || 0),
      0
    );

    const activities = recentOrders.map((order) => ({
      id: order._id,
      user: order.user?.name || "Unknown",
      action: `purchased ${order.course?.title || "a course"}`,
      time: order.createdAt
    }));

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalCourses,
        totalRevenue,
        pendingOrders
      },
      activities
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
