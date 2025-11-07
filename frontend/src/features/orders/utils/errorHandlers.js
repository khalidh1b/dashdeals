import { ERROR_TYPES } from "../constants/deleteOrderConstants";

// Determines the type of error based on the error response
export const getErrorType = (error) => {
  if (!error.response) return ERROR_TYPES.NETWORK;
  
  const status = error.response.status;
  if (status === 401 || status === 403) return ERROR_TYPES.AUTHORIZATION;
  if (status === 404) return ERROR_TYPES.NOT_FOUND;
  if (status >= 500) return ERROR_TYPES.SERVER;
  
  return ERROR_TYPES.UNKNOWN;
};

// Returns a user-friendly error message based on the error type
export const getErrorMessage = (error) => {
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ERROR_TYPES.NETWORK:
      return "Network error. Please check your connection and try again.";
    case ERROR_TYPES.AUTHORIZATION:
      return "You're not authorized to delete this order. Please login again.";
    case ERROR_TYPES.NOT_FOUND:
      return "Order not found or already deleted.";
    case ERROR_TYPES.SERVER:
      return "Server error. Please try again later.";
    default:
      return error.response?.data?.message || error.message || "An unexpected error occurred";
  }
};

// Logs error details for debugging purposes
export const logError = (orderId, error) => {
  console.error("Error deleting order:", {
    orderId,
    error: error.message,
    errorType: getErrorType(error),
    timestamp: new Date().toISOString(),
    stack: error.stack
  });
};