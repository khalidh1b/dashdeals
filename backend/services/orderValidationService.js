const { ORDER_DELETION_POLICY, ERROR_MESSAGES } = require('../utils/constants');
const { logError } = require('../utils/logger');

class OrderValidationService {
    
    // Validates if order can be deleted based on business rules
    validateOrderForDeletion(order) {
        if (!order) {
            return {
                canDelete: false,
                reason: ERROR_MESSAGES.ORDER_NOT_FOUND
            };
        }

        const currentStatus = order.status;
        
        if (ORDER_DELETION_POLICY.RESTRICTED_STATUSES.includes(currentStatus)) {
            return {
                canDelete: false,
                reason: ERROR_MESSAGES.ORDER_CANNOT_BE_DELETED,
                currentStatus
            };
        }

        return {
            canDelete: true,
            currentStatus
        };
    }

    // Validates user authorization for order operations
    validateUserAuthorization(order, userEmail, isAdmin = false) {
        if (!order) {
            return {
                authorized: false,
                reason: ERROR_MESSAGES.ORDER_NOT_FOUND
            };
        }

        // Admins can access any order
        if (isAdmin) {
            return {
                authorized: true,
                reason: 'Admin access granted'
            };
        }

        // Regular users can only access their own orders
        if (order.cus_email !== userEmail) {
            return {
                authorized: false,
                reason: ERROR_MESSAGES.UNAUTHORIZED_ACCESS
            };
        }

        return {
            authorized: true,
            reason: 'User authorized'
        };
    }

    // Validates batch deletion request
    validateBatchDeletionRequest(orderIds) {
        if (!Array.isArray(orderIds)) {
            return {
                valid: false,
                reason: 'Order IDs must be an array'
            };
        }

        if (orderIds.length === 0) {
            return {
                valid: false,
                reason: 'Order IDs array cannot be empty'
            };
        }

        if (orderIds.length > 100) {
            return {
                valid: false,
                reason: 'Cannot delete more than 100 orders at once'
            };
        }

        // Validate each order ID format
        for (const orderId of orderIds) {
            if (!orderId || typeof orderId !== 'string') {
                return {
                    valid: false,
                    reason: `Invalid order ID format: ${orderId}`
                };
            }
        }

        return {
            valid: true,
            reason: 'Batch deletion request is valid'
        };
    }

    // Validates deletion reason
    validateDeletionReason(reason) {
        if (!reason || typeof reason !== 'string') {
            return {
                valid: false,
                reason: 'Deletion reason is required and must be a string'
            };
        }

        if (reason.trim().length < 3) {
            return {
                valid: false,
                reason: 'Deletion reason must be at least 3 characters long'
            };
        }

        if (reason.length > 500) {
            return {
                valid: false,
                reason: 'Deletion reason cannot exceed 500 characters'
            };
        }

        return {
            valid: true,
            reason: 'Deletion reason is valid'
        };
    }

    // Validates order ID format
    validateOrderId(orderId) {
        if (!orderId || typeof orderId !== 'string') {
            return {
                valid: false,
                reason: 'Order ID is required and must be a string'
            };
        }

        // Basic ObjectId format validation (24 character hex string)
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(orderId)) {
            return {
                valid: false,
                reason: 'Invalid order ID format'
            };
        }

        return {
            valid: true,
            reason: 'Order ID format is valid'
        };
    }

    // validation for order deletion
    validateOrderDeletion(orderId, userEmail, reason, order = null, isAdmin = false) {
        
        // Validate order ID format
        const orderIdValidation = this.validateOrderId(orderId);
        if (!orderIdValidation.valid) {
            return {
                valid: false,
                error: orderIdValidation.reason,
                step: 'order_id_validation'
            };
        }

        // Validate deletion reason
        const reasonValidation = this.validateDeletionReason(reason);
        if (!reasonValidation.valid) {
            return {
                valid: false,
                error: reasonValidation.reason,
                step: 'reason_validation'
            };
        }

        // If order is provided, validate business rules
        if (order) {
            const businessValidation = this.validateOrderForDeletion(order);
            if (!businessValidation.canDelete) {
                return {
                    valid: false,
                    error: businessValidation.reason,
                    currentStatus: businessValidation.currentStatus,
                    step: 'business_validation'
                };
            }

            // Validate user authorization
            const authValidation = this.validateUserAuthorization(order, userEmail, isAdmin);
            if (!authValidation.authorized) {
                return {
                    valid: false,
                    error: authValidation.reason,
                    step: 'authorization_validation'
                };
            }
        }

        return {
            valid: true,
            error: null,
            step: 'completed'
        };
    }
};

module.exports = new OrderValidationService();