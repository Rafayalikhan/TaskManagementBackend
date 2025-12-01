const Pusher = require('pusher');
const config = require('./index');
const logger = require('../utils/logger');

let pusherInstance = null;

const initPusher = () => {
  try {
    pusherInstance = new Pusher({
      appId: config.pusher.appId,
      key: config.pusher.key,
      secret: config.pusher.secret,
      cluster: config.pusher.cluster,
      useTLS: true,
    });
    logger.info('Pusher initialized successfully');
    return pusherInstance;
  } catch (error) {
    logger.error(`Pusher initialization error: ${error.message}`);
    throw error;
  }
};

const getPusherInstance = () => {
  if (!pusherInstance) {
    return initPusher();
  }
  return pusherInstance;
};

module.exports = getPusherInstance;