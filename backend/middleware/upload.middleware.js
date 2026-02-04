import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5000 * 1024 * 1024 } // 500MB
});
