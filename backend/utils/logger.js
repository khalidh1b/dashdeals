const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Formats log message with timestamp and context
const formatLogMessage = (level, message, context = {}) => {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    service: 'order-service'
  };
};

// Logs error messages
const logError = (message, context = {}) => {
  const logEntry = formatLogMessage(LOG_LEVELS.ERROR, message, context);
  console.error(JSON.stringify(logEntry));
  
  if (process.env.NODE_ENV === 'production') {
    console.log('logging');
  }
};

// Logs warning messages
const logWarn = (message, context = {}) => {
  const logEntry = formatLogMessage(LOG_LEVELS.WARN, message, context);
  console.warn(JSON.stringify(logEntry));
};

// Logs info messages
const logInfo = (message, context = {}) => {
  const logEntry = formatLogMessage(LOG_LEVELS.INFO, message, context);
  console.log(JSON.stringify(logEntry));
};

// Logs debug messages (only in development)
const logDebug = (message, context = {}) => {
  if (process.env.NODE_ENV === 'development') {
    const logEntry = formatLogMessage(LOG_LEVELS.DEBUG, message, context);
    console.log(JSON.stringify(logEntry));
  }
};

// Logs order-related operations
const logOrderOperation = (operation, orderId, userEmail, additionalData = {}) => {
  logInfo(`Order operation: ${operation}`, {
    operation,
    orderId,
    userEmail,
    ...additionalData
  });
};

module.exports = {
  logError,
  logWarn,
  logInfo,
  logDebug,
  logOrderOperation,
  LOG_LEVELS
};