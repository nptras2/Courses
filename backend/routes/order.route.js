import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { buyCourse, confirmPayment, getMyOrders, getAllOrders, getRevenue } from "../controller/order.controller.js";
// import { buyCourse, confirmPayment, getMyOrders } from "../controllers/order.controller.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

const orderrouter = express.Router();

orderrouter.post("/buy/:courseId", verifyToken, buyCourse);
orderrouter.post("/confirm-payment", verifyToken, confirmPayment);
orderrouter.get("/my-orders", verifyToken, getMyOrders);
orderrouter.get("/", verifyToken, isAdmin, getAllOrders);
orderrouter.get("/revenue", verifyToken, isAdmin, getRevenue);

export default orderrouter;
