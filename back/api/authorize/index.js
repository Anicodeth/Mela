// Authorization
// Author - Nebyu Samuel
// Date & Time - Dec 13, 2022 11:06 am

// App Error
import AppError from "../../utils/appError.js";

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError(
            `User role ${req.user.role} is not authorized to access this route`,
            403
          )
        );
      }
      next();
    };
  };

export default authorize;