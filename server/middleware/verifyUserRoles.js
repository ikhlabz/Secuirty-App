import ErrorResponse from "../utils/errorResponse.js";

// Middleware for verifying user roles
const verifyUserRoles = (...roles) => {
  return (req, res, next) => {
    // Check if the user has the required role
    if (!req?.roles) {
      // if roles are missing, return an error
      return next(new ErrorResponse("User role not found", 403));
    }

    const allowedRoles = [
      "Admin",
      "Security Guard",
      "Supervisor",
      "Front Desk",
      "Other User",
    ];
    const isAllowed = roles.some((role) => allowedRoles.includes(role));

    // If the user does not have the required role, return an error

    if (!isAllowed) {
      return next(new ErrorResponse("Permission Denied", 403));
    }

    // If the user has the required role, call next() to pass control to the next middleware function
    next();
  };
};

export default verifyUserRoles;
