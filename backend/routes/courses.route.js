import express from 'express';
import { 
  getAllCourses, 
  getAllCoursesAdmin,
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  uploadCourseMedia
} from '../controller/courses.controller.js';

import { verifyToken } from '../middleware/auth.middleware.js'; 
import { isAdmin } from '../middleware/admin.middleware.js';
import { upload } from "../middleware/upload.middleware.js";

const coursesRoute = express.Router();

// Public Routes
coursesRoute.get("/get/courses", getAllCourses);
coursesRoute.get("/admin/all", verifyToken, isAdmin, getAllCoursesAdmin);
coursesRoute.get("/:id", getCourseById);

// Protected Admin Routes
coursesRoute.post("/create-course", verifyToken, isAdmin, createCourse);
coursesRoute.put("/:id/edit", verifyToken, isAdmin, updateCourse);
coursesRoute.delete("/:id/delete", verifyToken, isAdmin, deleteCourse);
coursesRoute.post(
  "/upload-media",
  verifyToken,
  isAdmin,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "promoVideo", maxCount: 1 }
  ]),
  uploadCourseMedia
);

export default coursesRoute;
