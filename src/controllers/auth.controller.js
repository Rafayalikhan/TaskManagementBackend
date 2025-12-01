const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const { user, token } = await authService.registerUser({ email, password, role });

  res.status(201).json(
    new ApiResponse(201, { user, token }, 'User registered successfully')
  );
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.loginUser({ email, password });

  res.status(200).json(
    new ApiResponse(200, { user, token }, 'Login successful')
  );
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.id);

  res.status(200).json(
    new ApiResponse(200, { user }, 'User retrieved successfully')
  );
});