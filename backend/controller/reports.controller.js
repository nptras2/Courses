import { Course } from "../model/course.model.js";
import { Order } from "../model/order.model.js";
import User from "../model/user.model.js";

/* ============================
   REPORTS SUMMARY (ADMIN)
============================= */
export const getReportsSummary = async (req, res) => {
  try {
    const [
      totalUsers,
      totalAdmins,
      totalClients,
      totalCourses,
      publishedCourses,
      draftCourses,
      paidOrders,
      recentOrders
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "client" }),
      Course.countDocuments(),
      Course.countDocuments({ status: "published" }),
      Course.countDocuments({ status: "draft" }),
      Order.find({ paymentStatus: "paid" }),
      Order.find()
        .populate("user", "name email")
        .populate("course", "title")
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + (Number(order.amount) || 0),
      0
    );

    res.json({
      success: true,
      totals: {
        totalUsers,
        totalAdmins,
        totalClients,
        totalCourses,
        publishedCourses,
        draftCourses,
        totalPayments: paidOrders.length,
        totalRevenue
      },
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
