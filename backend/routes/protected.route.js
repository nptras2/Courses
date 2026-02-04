import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';
import { getAdminDashboard } from "../controller/dashboard.controller.js";

const protectedRoute = express.Router();

// ==================== GET CURRENT USER ====================
// Protected route - requires authentication
protectedRoute.get("/me", verifyToken, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user profile",
      error: error.message
    });
  }
});

// ==================== ADMIN ONLY ROUTE ====================
// Only admins can access this route
protectedRoute.get(
  "/admin-dashboard",
  verifyToken,
  authorizeRoles("admin"),
  getAdminDashboard
);

protectedRoute.get("/client-dashboard", verifyToken, authorizeRoles('client'), async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to Client Dashboard",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accessing client dashboard",
      error: error.message
    });
  }
});

 
  
export default protectedRoute;
