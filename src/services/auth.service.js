const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const config = require('../config');
const logger = require('../utils/logger');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });
};

exports.registerUser = async ({ email, password, role }) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, 'User already exists with this email');
    }

    // Create user using new User() and save() instead of create()
    const user = new User({ email, password, role });
    await user.save(); // This will properly trigger the pre-save hook
    
    logger.info(`New user registered: ${user.userId}`);

    // Generate token
    const token = generateToken(user._id);

    return { user, token };
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    throw error;
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new ApiError(403, 'Your account has been deactivated');
    }

    logger.info(`User logged in: ${user.userId}`);

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    return { user, token };
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    throw error;
  }
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};