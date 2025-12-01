
const asyncHandler = require('../utils/asyncHandler');
const taskService = require('../services/task.service');
const ApiResponse = require('../utils/ApiResponse');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  const task = await taskService.createTask(userId, { title, description });

  res.status(201).json(
    new ApiResponse(201, { task }, 'Task created successfully')
  );
});

// @desc    Get user's tasks
// @route   GET /api/tasks
// @access  Private
exports.getUserTasks = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const tasks = await taskService.getUserTasks(userId);

  res.status(200).json(
    new ApiResponse(200, { tasks, count: tasks.length }, 'Tasks retrieved successfully')
  );
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params; // Changed from taskId to id
  const userId = req.user.id;
  const updateData = req.body;

  const task = await taskService.updateTask(id, userId, updateData);

  res.status(200).json(
    new ApiResponse(200, { task }, 'Task updated successfully')
  );
});

// const asyncHandler = require('../utils/asyncHandler');
// const taskService = require('../services/task.service');
// const ApiResponse = require('../utils/ApiResponse');

// // @desc    Create new task
// // @route   POST /api/tasks
// // @access  Private
// exports.createTask = asyncHandler(async (req, res) => {
//   const { title, description } = req.body;
//   const userId = req.user.id;

//   const task = await taskService.createTask(userId, { title, description });

//   res.status(201).json(
//     new ApiResponse(201, { task }, 'Task created successfully')
//   );
// });

// // @desc    Get user's tasks
// // @route   GET /api/tasks
// // @access  Private
// exports.getUserTasks = asyncHandler(async (req, res) => {
//   const userId = req.user.id;

//   const tasks = await taskService.getUserTasks(userId);

//   res.status(200).json(
//     new ApiResponse(200, { tasks, count: tasks.length }, 'Tasks retrieved successfully')
//   );
// });

// // @desc    Update task
// // @route   PUT /api/tasks/:taskId
// // @access  Private
// exports.updateTask = asyncHandler(async (req, res) => {
//   const { taskId } = req.params;
//   const userId = req.user.id;
//   const updateData = req.body;

//   const task = await taskService.updateTask(taskId, userId, updateData);

//   res.status(200).json(
//     new ApiResponse(200, { task }, 'Task updated successfully')
//   );
// });