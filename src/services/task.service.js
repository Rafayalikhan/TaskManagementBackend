const Task = require('../models/task.model');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');
const pusherService = require('./pusher.service');

exports.createTask = async (userId, { title, description }) => {
  try {
    const task = await Task.create({
      userId,
      title,
      description,
    });

    // Populate user details
    await task.populate('user', 'userId email role');

    logger.info(`Task created: ${task.taskId} by user: ${userId}`);

    // Emit real-time event for admins
    await pusherService.emitTaskCreated(task);

    return task;
  } catch (error) {
    logger.error(`Create task error: ${error.message}`);
    throw error;
  }
};

exports.getUserTasks = async (userId) => {
  try {
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    return tasks;
  } catch (error) {
    logger.error(`Get user tasks error: ${error.message}`);
    throw error;
  }
};

exports.updateTask = async (id, userId, updateData) => { // Changed parameter name from taskId to id
  try {
    const task = await Task.findById(id); // Changed from findOne to findById

    if (!task) {
      throw new ApiError(404, 'Task not found');
    }

    // Check if user owns the task
    if (task.userId.toString() !== userId.toString()) {
      throw new ApiError(403, 'You are not authorized to update this task');
    }

    // Store old completed status
    const wasCompleted = task.completed;

    // Update task
    Object.assign(task, updateData);
    await task.save();

    // Populate user details
    await task.populate('user', 'userId email role');

    logger.info(`Task updated: ${task.taskId}`);

    // Emit appropriate real-time event
    if (updateData.completed && !wasCompleted) {
      await pusherService.emitTaskCompleted(task);
    } else {
      await pusherService.emitTaskUpdated(task);
    }

    return task;
  } catch (error) {
    logger.error(`Update task error: ${error.message}`);
    throw error;
  }
};

exports.getAllTasks = async () => {
  try {
    const tasks = await Task.find()
      .populate('user', 'userId email role')
      .sort({ createdAt: -1 });
    return tasks;
  } catch (error) {
    logger.error(`Get all tasks error: ${error.message}`);
    throw error;
  }
};

exports.getIncompleteTasks = async (olderThanHours = 24) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - olderThanHours);

    const tasks = await Task.find({
      completed: false,
      createdAt: { $lt: cutoffDate },
    }).populate('user', 'userId email');

    return tasks;
  } catch (error) {
    logger.error(`Get incomplete tasks error: ${error.message}`);
    throw error;
  }
};

// const Task = require('../models/task.model');
// const ApiError = require('../utils/ApiError');
// const logger = require('../utils/logger');
// const pusherService = require('./pusher.service');

// exports.createTask = async (userId, { title, description }) => {
//   try {
//     const task = await Task.create({
//       userId,
//       title,
//       description,
//     });

//     // Populate user details
//     await task.populate('user', 'userId email role');

//     logger.info(`Task created: ${task.taskId} by user: ${userId}`);

//     // Emit real-time event for admins
//     await pusherService.emitTaskCreated(task);

//     return task;
//   } catch (error) {
//     logger.error(`Create task error: ${error.message}`);
//     throw error;
//   }
// };

// exports.getUserTasks = async (userId) => {
//   try {
//     const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
//     return tasks;
//   } catch (error) {
//     logger.error(`Get user tasks error: ${error.message}`);
//     throw error;
//   }
// };

// exports.updateTask = async (taskId, userId, updateData) => {
//   try {
//     const task = await Task.findOne({ taskId });

//     if (!task) {
//       throw new ApiError(404, 'Task not found');
//     }

//     // Check if user owns the task
//     if (task.userId.toString() !== userId.toString()) {
//       throw new ApiError(403, 'You are not authorized to update this task');
//     }

//     // Store old completed status
//     const wasCompleted = task.completed;

//     // Update task
//     Object.assign(task, updateData);
//     await task.save();

//     // Populate user details
//     await task.populate('user', 'userId email role');

//     logger.info(`Task updated: ${task.taskId}`);

//     // Emit appropriate real-time event
//     if (updateData.completed && !wasCompleted) {
//       await pusherService.emitTaskCompleted(task);
//     } else {
//       await pusherService.emitTaskUpdated(task);
//     }

//     return task;
//   } catch (error) {
//     logger.error(`Update task error: ${error.message}`);
//     throw error;
//   }
// };

// exports.getAllTasks = async () => {
//   try {
//     const tasks = await Task.find()
//       .populate('user', 'userId email role')
//       .sort({ createdAt: -1 });
//     return tasks;
//   } catch (error) {
//     logger.error(`Get all tasks error: ${error.message}`);
//     throw error;
//   }
// };

// exports.getIncompleteTasks = async (olderThanHours = 24) => {
//   try {
//     const cutoffDate = new Date();
//     cutoffDate.setHours(cutoffDate.getHours() - olderThanHours);

//     const tasks = await Task.find({
//       completed: false,
//       createdAt: { $lt: cutoffDate },
//     }).populate('user', 'userId email');

//     return tasks;
//   } catch (error) {
//     logger.error(`Get incomplete tasks error: ${error.message}`);
//     throw error;
//   }
// };