import express from "express";
import { getReportsSummary } from "../controller/reports.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const reportsRoute = express.Router();

reportsRoute.get("/summary", verifyToken, isAdmin, getReportsSummary);

export default reportsRoute;
