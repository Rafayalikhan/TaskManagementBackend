const winston = require('winston');
const path = require('path');

const logDir = 'logs';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'task-management-api' },
  transports: [
    // Console transport for all environments
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Only add file transport if not in Vercel/Railway
if (process.env.NODE_ENV === 'development') {
  const fs = require('fs');
  
  // Create logs directory if it doesn't exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  
  logger.add(new winston.transports.File({ 
    filename: path.join(logDir, 'error.log'), 
    level: 'error' 
  }));
  
  logger.add(new winston.transports.File({ 
    filename: path.join(logDir, 'combined.log') 
  }));
}

module.exports = logger;

// const winston = require('winston');
// const path = require('path');

// const logFormat = winston.format.combine(
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   winston.format.errors({ stack: true }),
//   winston.format.splat(),
//   winston.format.json()
// );

// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'info',
//   format: logFormat,
//   defaultMeta: { service: 'task-management-api' },
//   transports: [
//     new winston.transports.Console({
//       format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.printf(({ timestamp, level, message, ...meta }) => {
//           let msg = `${timestamp} [${level}]: ${message}`;
//           if (Object.keys(meta).length > 0 && meta.service !== 'task-management-api') {
//             msg += ` ${JSON.stringify(meta)}`;
//           }
//           return msg;
//         })
//       ),
//     }),
//     new winston.transports.File({
//       filename: path.join('logs', 'error.log'),
//       level: 'error',
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//     }),
//     new winston.transports.File({
//       filename: path.join('logs', 'combined.log'),
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//     }),
//   ],
// });

// module.exports = logger;