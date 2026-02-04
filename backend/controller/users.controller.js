import User from "../model/user.model.js";
import { Course } from "../model/course.model.js";
import { uploadToCloudinary } from "../services/upload.service.js";

/* ============================
   GET ALL USERS (ADMIN)
============================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("enrolledCourses", "title category price discountPrice isFree")
      .sort({ createdAt: -1 });
    res.json({ success: true, users, total: users.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   DELETE USER (ADMIN)
============================= */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   CANCEL USER ENROLLMENT (ADMIN)
============================= */
export const cancelEnrollment = async (req, res) => {
  try {
    const { id, courseId } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const beforeCount = user.enrolledCourses?.length || 0;
    await User.findByIdAndUpdate(id, { $pull: { enrolledCourses: courseId } });
    const afterUser = await User.findById(id);

    if ((afterUser?.enrolledCourses?.length || 0) < beforeCount) {
      course.totalStudents = Math.max(0, (course.totalStudents || 0) - 1);
      await course.save();
    }

    res.json({ success: true, message: "Enrollment cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   UPDATE MY PROFILE
============================= */
export const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      email,
      phone,
      bio,
      location,
      profilePicture
    } = req.body;

    if (email && email !== req.user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use"
        });
      }
    }

    const update = {
      ...(name !== undefined ? { name } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(phone !== undefined ? { phone } : {}),
      ...(bio !== undefined ? { bio } : {}),
      ...(location !== undefined ? { location } : {}),
      ...(profilePicture !== undefined ? { profilePicture } : {})
    };

    const user = await User.findByIdAndUpdate(userId, update, {
      new: true
    }).select("-password");

    res.json({ success: true, message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   DELETE MY ACCOUNT
============================= */
export const deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0
    });

    res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   GET MY ENROLLED COURSES
============================= */
export const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "enrolledCourses",
      "title category shortDescription thumbnail price discountPrice isFree"
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      courses: user.enrolledCourses || []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   GET SINGLE ENROLLED COURSE
============================= */
export const getMyCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await User.findById(req.user._id).select("enrolledCourses");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isEnrolled = user.enrolledCourses?.some(
      (id) => String(id) === String(courseId)
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Course not enrolled."
      });
    }

    const course = await Course.findById(courseId).populate("createdBy", "name");
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   UPLOAD PROFILE PICTURE
============================= */
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({
        success: false,
        message: "No image provided."
      });
    }

    const url = await uploadToCloudinary(
      req.file.path,
      "users/profile-pictures",
      "image"
    );

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: url },
      { new: true }
    ).select("-password");

    res.json({ success: true, url, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
