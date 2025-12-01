const cron = require('node-cron');
const taskService = require('../services/task.service');
const logger = require('../utils/logger');
const config = require('../config');

const taskReminderJob = cron.schedule(
  config.cron.reminderSchedule,
  async () => {
    try {
      logger.info('Starting task reminder cron job');

      // Get incomplete tasks older than 24 hours
      const incompleteTasks = await taskService.getIncompleteTasks(24);

      if (incompleteTasks.length === 0) {
        logger.info('No incomplete tasks found for reminders');
        return;
      }

      logger.info(`Found ${incompleteTasks.length} incomplete tasks for reminders`);

      // Log reminders for each incomplete task
      incompleteTasks.forEach((task) => {
        logger.warn(`REMINDER - Incomplete Task:`, {
          taskId: task.taskId,
          title: task.title,
          description: task.description,
          userId: task.userId,
          userEmail: task.user?.email,
          createdAt: task.createdAt,
          ageInHours: Math.floor((Date.now() - task.createdAt) / (1000 * 60 * 60)),
        });

        // Here you can add email/notification logic
        // For example: sendReminderEmail(task);
      });

      logger.info('Task reminder cron job completed successfully');
    } catch (error) {
      logger.error(`Task reminder cron job error: ${error.message}`);
    }
  },
  {
    scheduled: false,
    timezone: 'Asia/Karachi',
  }
);

module.exports = taskReminderJob;