// AppError

export default (...fileTypes) => {
  return (req, res, next) => {
    if (fileTypes.length === 0) {
      return  res.status(400).json({
        message: "allowed type error",        
      });
    }
    // Add allowed file types to the req object
    req.fileTypes = fileTypes;
    next();
  };
};

