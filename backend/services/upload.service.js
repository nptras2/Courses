import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (filePath, folder, resourceType = "auto") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType
    });

    fs.unlinkSync(filePath); // delete temp file
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    throw error;
  }
};
