const ApiError = require('../utils/ApiError');
const { ROLES } = require('../config/constants');

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'You do not have permission to perform this action');
    }
    next();
  };
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    throw new ApiError(403, 'Access denied. Admin privileges required');
  }
  next();
};