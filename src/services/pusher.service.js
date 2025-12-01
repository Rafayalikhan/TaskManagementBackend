const getPusherInstance = require('../config/pusher');
const { PUSHER_CHANNELS, PUSHER_EVENTS } = require('../config/constants');
const logger = require('../utils/logger');

class PusherService {
  constructor() {
    this.pusher = getPusherInstance();
  }

  async emitTaskCreated(task) {
    try {
      await this.pusher.trigger(PUSHER_CHANNELS.ADMIN_TASKS, PUSHER_EVENTS.TASK_CREATED, {
        taskId: task.taskId,
        title: task.title,
        description: task.description,
        completed: task.completed,
        userId: task.userId,
        user: task.user,
        createdAt: task.createdAt,
        message: 'New task created',
      });
      logger.info(`Pusher event emitted: ${PUSHER_EVENTS.TASK_CREATED} for task ${task.taskId}`);
    } catch (error) {
      logger.error(`Pusher emit error (task created): ${error.message}`);
    }
  }

  async emitTaskUpdated(task) {
    try {
      await this.pusher.trigger(PUSHER_CHANNELS.ADMIN_TASKS, PUSHER_EVENTS.TASK_UPDATED, {
        taskId: task.taskId,
        title: task.title,
        description: task.description,
        completed: task.completed,
        userId: task.userId,
        user: task.user,
        updatedAt: task.updatedAt,
        message: 'Task updated',
      });
      logger.info(`Pusher event emitted: ${PUSHER_EVENTS.TASK_UPDATED} for task ${task.taskId}`);
    } catch (error) {
      logger.error(`Pusher emit error (task updated): ${error.message}`);
    }
  }

  async emitTaskCompleted(task) {
    try {
      await this.pusher.trigger(PUSHER_CHANNELS.ADMIN_TASKS, PUSHER_EVENTS.TASK_COMPLETED, {
        taskId: task.taskId,
        title: task.title,
        userId: task.userId,
        user: task.user,
        completedAt: task.updatedAt,
        message: 'Task marked as completed',
      });
      logger.info(`Pusher event emitted: ${PUSHER_EVENTS.TASK_COMPLETED} for task ${task.taskId}`);
    } catch (error) {
      logger.error(`Pusher emit error (task completed): ${error.message}`);
    }
  }
}

module.exports = new PusherService();