// Protect route
// Author - Nebyu Samuel
// Date & Time - Dec 13, 2022 10:19 am

// App Error
import AppError from "../../utils/appError.js";

// Jwt
import jwt from "jsonwebtoken";

// Configs
import configs from "../../config.js";

import User from "../user/model.js";


// Protect routes
export default protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    req.user_id = req.user._id
    if (!req.user){
      return next(new AppError('Not authorized to accccess this route', 401));

    }
    next();
  } catch (err) {
    return next(new AppError('Not authorized to access this route', 401));
  }
};