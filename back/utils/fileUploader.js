// Path
import path from "path";

// Multer
import multer from "multer";

// File Checker
import checkFileType from "./checkFileType";
// Upload
const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1024 * 1024 }, // File size limit: 5MB
  fileFilter: function (req, file, callBack) {
    checkFileType(req, file, callBack);
  },
});

// Export
export default upload;