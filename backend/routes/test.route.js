import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import { uploadToCloudinary } from "../services/upload.service.js";

const router = express.Router();

router.post("/upload-test", upload.single("file"), async (req, res) => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({
        success: false,
        message: "No file provided. Use form-data with key 'file'."
      });
    }

    const url = await uploadToCloudinary(req.file.path, "test-uploads");
    res.json({ success: true, url });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
