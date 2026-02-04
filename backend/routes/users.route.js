import express from "express";
import { getAllUsers, deleteUser, cancelEnrollment, updateMyProfile, deleteMyAccount, getMyCourses, getMyCourseById, uploadProfilePicture } from "../controller/users.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const usersRoute = express.Router();

usersRoute.get("/", verifyToken, isAdmin, getAllUsers);
usersRoute.delete("/:id", verifyToken, isAdmin, deleteUser);
usersRoute.delete("/:id/enrollments/:courseId", verifyToken, isAdmin, cancelEnrollment);
usersRoute.put("/me", verifyToken, updateMyProfile);
usersRoute.delete("/me", verifyToken, deleteMyAccount);
usersRoute.get("/my-courses", verifyToken, getMyCourses);
usersRoute.get("/my-courses/:courseId", verifyToken, getMyCourseById);
usersRoute.post("/me/profile-picture", verifyToken, upload.single("image"), uploadProfilePicture);

export default usersRoute;
