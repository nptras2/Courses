import mongoose from "mongoose";

/* ===== Lecture (Video) Schema ===== */
const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: String // e.g. "10:45"
  },
  isFreePreview: {
    type: Boolean,
    default: false
  }
}, { _id: false });

/* ===== Section Schema ===== */
const sectionSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
    required: true,
    trim: true
  },
  lectures: [lectureSchema]
}, { _id: false });

/* ===== Main Course Schema ===== */
const courseSchema = new mongoose.Schema({

  /* STEP 1: Basic Info */
  title: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner"
  },
  language: {
    type: String,
    default: "Hindi"
  },
  tags: [String],

  /* STEP 2: Media */
  thumbnail: {
    type: String,
    required: true // Cloudinary image URL
  },
  promoVideo: {
    type: String // Cloudinary video URL
  },
  mainVideos: {
    type: [String],
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length >= 1;
      },
      message: "At least one main course video is required"
    }
  },

  /* STEP 3: Curriculum */
  curriculum: [sectionSchema],

  /* STEP 4: Pricing & Access */
  price: {
    type: Number,
    default: 0
  },
  discountPrice: {
    type: Number
  },
  isFree: {
    type: Boolean,
    default: false
  },
  accessType: {
    type: String,
    enum: ["lifetime", "limited"],
    default: "lifetime"
  },
  certificateAvailable: {
    type: Boolean,
    default: false
  },

  /* STEP 5: Status & Meta */
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },
  totalStudents: {
    type: Number,
    default: 0
  },
  ratings: {
    type: Number,
    default: 0
  },

  /* Relations */
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
