const { ObjectId } = require('mongodb');
const { ERROR_MESSAGES } = require('./constants');

// Validates MongoDB ObjectId format
const isValidObjectId = (id) => {
  try {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  } catch (error) {
    return false;
  }
};

// Validates delete order request parameters
const validateDeleteOrderRequest = (orderId) => {
  if (!orderId) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.VALIDATION_ERROR,
      details: 'Order ID is required'
    };
  }

  if (!isValidObjectId(orderId)) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.INVALID_ORDER_ID,
      details: 'Order ID must be a valid MongoDB ObjectId'
    };
  }

  return { isValid: true };
};

// validates email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitizes and validates deletion reason
const validateDeletionReason = (reason) => {
  if (!reason || typeof reason !== 'string') {
    return {
      isValid: false,
      error: 'Deletion reason is required and must be a string'
    };
  }

  if (reason.length < 10) {
    return {
      isValid: false,
      error: 'Deletion reason must be at least 10 characters long'
    };
  }

  if (reason.length > 500) {
    return {
      isValid: false,
      error: 'Deletion reason must not exceed 500 characters'
    };
  }

  return { isValid: true };
};

module.exports = {
  isValidObjectId,
  validateDeleteOrderRequest,
  isValidEmail,
  validateDeletionReason
};