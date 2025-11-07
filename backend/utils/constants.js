// Order status constants
const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

// Order deletion policies
const ORDER_DELETION_POLICY = {
  ALLOWED_STATUSES: [ORDER_STATUS.PENDING, ORDER_STATUS.CONFIRMED],
  RESTRICTED_STATUSES: [ORDER_STATUS.PROCESSING, ORDER_STATUS.SHIPPED, ORDER_STATUS.DELIVERED],
  DELETION_REASON_REQUIRED: true
};

// Collection names
const COLLECTIONS = {
  USER_ORDERED_PRODUCTS: 'userOrderedProducts',
  USER_PAYMENTS_INFO: 'userPaymentsInfo',
  SAVED_USER: 'saved-user'
};

// Error messages
const ERROR_MESSAGES = {
  INVALID_ORDER_ID: 'Invalid order ID format',
  ORDER_NOT_FOUND: 'Order not found',
  ORDER_CANNOT_BE_DELETED: 'Order cannot be deleted in current status',
  UNAUTHORIZED_ACCESS: 'Unauthorized access to order',
  DATABASE_ERROR: 'Database operation failed',
  VALIDATION_ERROR: 'Input validation failed'
};

// Success messages
const SUCCESS_MESSAGES = {
  ORDER_DELETED: 'Order deleted successfully',
  ORDER_SOFT_DELETED: 'Order marked as deleted'
};

module.exports = {
  ORDER_STATUS,
  ORDER_DELETION_POLICY,
  COLLECTIONS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
};