// Path
import path from "path";

// Multer
import multer from "multer";

// File Checker
// import checkFileType from "./checkFileType";
// Upload
const upload = multer({
  storage: multer.memoryStorage()
});

// Export
export default upload;