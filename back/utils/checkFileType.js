/**
 * This code for checking file type
 * @param {*} file
 * @param {*} callBack
 * @returns
 */
 
 // Path
 import path from "path";
 
 function checkFileType(req, file, callBack) {
   // Allowed file types
   const allowedFileTypes = req.fileTypes;
 
   // File Extension
   const fileExtension = path.extname(file.originalname).split(".")[1];
 
   // File mime type
   const fileMimeType = file.mimetype.split("/")[1];
 
   // Check both extension and mime type
   if (
     !allowedFileTypes.includes(fileExtension) ||
     !allowedFileTypes.includes(fileMimeType)
   ) {
     return callBack( res.status(400).json({
        message: "invalid file type",
    }));
   }
   callBack(null, true);
 }
 
 export default checkFileType;