import { Course } from "../model/course.model.js";
import { uploadToCloudinary } from "../services/upload.service.js";

 

/* ============================
   CREATE COURSE (STEP 1)
============================= */
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      category,
      level,
      language,
      tags,
      thumbnail,
      promoVideo,
      mainVideos,
      curriculum,
      price,
      discountPrice,
      isFree,
      accessType,
      certificateAvailable,
      status
    } = req.body;

    if (!Array.isArray(mainVideos) || mainVideos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one main course video is required"
      });
    }

    const course = await Course.create({
      title,
      shortDescription,
      fullDescription,
      category,
      level,
      language,
      tags,
      thumbnail,
      promoVideo,
      mainVideos,
      curriculum,
      price,
      discountPrice,
      isFree,
      accessType,
      certificateAvailable,
      status,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ============================
   UPDATE COURSE (COMMON)
============================= */
export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (req.body.mainVideos && req.body.mainVideos.length === 0) {
      return res.status(400).json({
        message: "At least one main course video is required"
      });
    }

    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      success: true,
      message: "Course updated successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   GET ALL COURSES
============================= */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "published" }).populate("createdBy", "name");

    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   GET ALL COURSES (ADMIN)
============================= */
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name").sort({ createdAt: -1 });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   GET SINGLE COURSE
============================= */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("createdBy", "name");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   DELETE COURSE
============================= */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   PUBLISH COURSE
============================= */
export const publishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.status = "published";
    await course.save();

    res.json({ success: true, message: "Course published successfully", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   ADD SECTION TO COURSE
============================= */
export const addSection = async (req, res) => {
  try {
    const { sectionTitle } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.curriculum.push({ sectionTitle, lectures: [] });
    await course.save();

    res.json({ success: true, message: "Section added", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   ADD LECTURE (WITHOUT VIDEO)
============================= */
export const addLecture = async (req, res) => {
  try {
    const { sectionIndex, title, isFreePreview } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.curriculum[sectionIndex].lectures.push({
      title,
      videoUrl: "", // will update after upload
      isFreePreview
    });

    await course.save();

    res.json({ success: true, message: "Lecture added", course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================
   UPLOAD COURSE MEDIA
============================= */
export const uploadCourseMedia = async (req, res) => {
  try {
    const files = req.files || {};
    const fileList = Object.keys(files);

    if (!fileList.length) {
      return res.status(400).json({
        success: false,
        message: "No media files provided."
      });
    }

    const uploads = {};

    if (files.thumbnail?.[0]?.path) {
      uploads.thumbnail = await uploadToCloudinary(
        files.thumbnail[0].path,
        "courses/thumbnails",
        "image"
      );
    }

    if (files.promoVideo?.[0]?.path) {
      uploads.promoVideo = await uploadToCloudinary(
        files.promoVideo[0].path,
        "courses/promo-videos",
        "video"
      );
    }

    if (!Object.keys(uploads).length) {
      return res.status(400).json({
        success: false,
        message: "Media upload failed. Please try again."
      });
    }

    res.json({ success: true, uploads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
