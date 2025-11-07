const orderOperationsService = require('./orderOperationsService');
const orderValidationService = require('./orderValidationService');
const { logError } = require('../utils/logger');

class EnhancedOrderService {
  
    // order deletion with business logic validation
    async deleteOrder(orderId, userEmail, reason, options = {}) {
        try {
            // Delegate to operations service with enhanced options
            const enhancedOptions = {
                ...options,
                ipAddress: options.ipAddress || null,
                userAgent: options.userAgent || null,
                isAdmin: options.isAdmin || false
            };

            return await orderOperationsService.executeOrderDeletion(
                orderId, 
                userEmail, 
                reason, 
                enhancedOptions
            );

        } catch (error) {
            logError('Order deletion service error', { 
                orderId, 
                userEmail, 
                error: error.message 
            });
            
            return {
                success: false,
                error: 'Internal service error',
                details: error.message
            };
        }
    }

    // Batch delete orders (for admin operations)
    async batchDeleteOrders(orderIds, adminEmail, reason) {
        try {
            // Validate batch request first
            const batchValidation = orderValidationService.validateBatchDeletionRequest(orderIds);
            if (!batchValidation.valid) {
                return {
                    success: false,
                    error: batchValidation.reason,
                    totalOrders: orderIds.length,
                    successCount: 0,
                    failureCount: orderIds.length
                };
            }

            // Validate deletion reason
            const reasonValidation = orderValidationService.validateDeletionReason(reason);
            if (!reasonValidation.valid) {
                return {
                    success: false,
                    error: reasonValidation.reason,
                    totalOrders: orderIds.length,
                    successCount: 0,
                    failureCount: orderIds.length
                };
            }

            // Delegate to operations service
            return await orderOperationsService.executeBatchDeletion(
                orderIds, 
                adminEmail, 
                reason
            );

        } catch (error) {
            logError('Batch order deletion service error', { 
                adminEmail, 
                orderCount: orderIds.length,
                error: error.message 
            });
            
            return {
                success: false,
                error: 'Internal service error',
                details: error.message,
                totalOrders: orderIds.length,
                successCount: 0,
                failureCount: orderIds.length
            };
        }
    }

    // Validates order deletion request without executing it
    async validateOrderDeletion(orderId, userEmail, reason, isAdmin = false) {
        try {
            const orderRepository = require('../repositories/orderRepository');
            const order = await orderRepository.getOrderById(orderId);
            
            return orderValidationService.validateOrderDeletion(
                orderId, 
                userEmail, 
                reason, 
                order, 
                isAdmin
            );

        } catch (error) {
            logError('Order validation service error', { 
                orderId, 
                userEmail, 
                error: error.message 
            });
            
            return {
                valid: false,
                error: 'Validation service error',
                details: error.message
            };
        }
    }

    // Gets order details with validation
    async getOrderDetails(orderId) {
        try {
            const orderRepository = require('../repositories/orderRepository');
            const order = await orderRepository.getOrderById(orderId);
            
            if (!order) {
                return {
                    success: false,
                    error: 'Order not found'
                };
            }

            return {
                success: true,
                order
            };

        } catch (error) {
            logError('Get order details service error', { 
                orderId, 
                error: error.message 
            });
            
            return {
                success: false,
                error: 'Failed to retrieve order details',
                details: error.message
            };
        }
    }
}

module.exports = new EnhancedOrderService();