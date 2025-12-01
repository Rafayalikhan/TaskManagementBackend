const app = require('./src/app');
const connectDB = require('./src/config/database');
const config = require('./src/config');
const logger = require('./src/utils/logger');
const taskReminderCron = require('./src/jobs/taskReminder.cron');

// Database connection
connectDB();

// Start cron jobs
taskReminderCron.start();
logger.info('Task reminder cron job started');

const PORT = config.port || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = server;