const asyncHandler = require('../utils/asyncHandler');
const taskService = require('../services/task.service');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Get all tasks (admin only)
// @route   GET /api/admin/tasks
// @access  Private/Admin
exports.getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getAllTasks();

  res.status(200).json(
    new ApiResponse(200, { tasks, count: tasks.length }, 'All tasks retrieved successfully')
  );
});

// const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');
// const ApiError = require('../utils/ApiError');
// const asyncHandler = require('../utils/asyncHandler');
// const config = require('../config');

// exports.protect = asyncHandler(async (req, res, next) => {
//   let token;

//   // Check for token in headers
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     throw new ApiError(401, 'Not authorized, no token provided');
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, config.jwt.secret);

//     // Get user from token
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       throw new ApiError(401, 'User not found');
//     }

//     if (!user.isActive) {
//       throw new ApiError(403, 'User account is deactivated');
//     }

//     // Attach user to request object
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       throw new ApiError(401, 'Invalid token');
//     }
//     if (error.name === 'TokenExpiredError') {
//       throw new ApiError(401, 'Token expired');
//     }
//     throw error;
//   }
// });