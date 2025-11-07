const orderRepository = require('../repositories/orderRepository');
const orderValidationService = require('./orderValidationService');
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = require('../utils/constants');
const { logOrderOperation, logError } = require('../utils/logger');

class OrderOperationsService {
    
    // Handles inventory restoration for deleted orders
    async handleInventoryRestoration(products, skipErrors = true) {
        try {
            if (!products || !Array.isArray(products) || products.length === 0) {
                return {
                    success: true,
                    message: 'No products to restore inventory for',
                    restoredProducts: 0
                };
            }

            await orderRepository.restoreProductInventory(products);
            
            return {
                success: true,
                message: 'Inventory restored successfully',
                restoredProducts: products.length
            };
        } catch (error) {
            logError('Inventory restoration failed', { error: error.message });
            
            if (skipErrors) {
                return {
                    success: false,
                    message: 'Inventory restoration failed but operation continued',
                    error: error.message
                };
            }
            
            throw error;
        }
    }

    // Handles payment refund for deleted orders
    async handlePaymentRefund(paymentId, orderId, skipErrors = true) {
        try {
            if (!paymentId) {
                return {
                    success: true,
                    message: 'No payment to refund',
                    refunded: false
                };
            }

            await orderRepository.handlePaymentRefund(paymentId, orderId);
            
            return {
                success: true,
                message: 'Payment refunded successfully',
                refunded: true
            };
        } catch (error) {
            logError('Payment refund failed', { paymentId, orderId, error: error.message });
            
            if (skipErrors) {
                return {
                    success: false,
                    message: 'Payment refund failed but operation continued',
                    error: error.message
                };
            }
            
            throw error;
        }
    }

    // Creates audit trail for order operations
    async createAuditTrail(orderId, userEmail, action, reason, orderData, metadata = {}, skipErrors = true) {
        try {
            const auditData = {
                orderId,
                userEmail,
                action,
                reason,
                timestamp: new Date(),
                originalOrderData: orderData,
                ...metadata
            };

            await orderRepository.createAuditTrail(orderId, userEmail, reason, orderData, auditData);
            
            return {
                success: true,
                message: 'Audit trail created successfully',
                auditId: `${orderId}_${Date.now()}`
            };
        } catch (error) {
            logError('Audit trail creation failed', { orderId, userEmail, error: error.message });
            
            if (skipErrors) {
                return {
                    success: false,
                    message: 'Audit trail creation failed but operation continued',
                    error: error.message
                };
            }
            
            throw error;
        }
    }

    // Performs the actual order deletion
    async performOrderDeletion(orderId, reason, softDelete = true) {
        try {
            let deletionResult;
            
            if (softDelete) {
                deletionResult = await orderRepository.softDeleteOrder(orderId, reason);
            } else {
                deletionResult = await orderRepository.hardDeleteOrder(orderId);
            }

            return {
                success: deletionResult.success,
                operation: deletionResult.operation,
                modifiedCount: deletionResult.modifiedCount || deletionResult.deletedCount,
                message: `Order ${deletionResult.operation} completed successfully`
            };
        } catch (error) {
            logError('Order deletion failed', { orderId, error: error.message });
            throw error;
        }
    }

    // Executes complete order deletion workflow
    async executeOrderDeletion(orderId, userEmail, reason, options = {}) {
        const {
            softDelete = true,
            restoreInventory = true,
            handlePayment = true,
            createAudit = true,
            skipNonCriticalErrors = true
        } = options;

        try {
            
            // Get order details
            const order = await orderRepository.getOrderById(orderId);
            
            // Validate business rules and authorization
            const validation = orderValidationService.validateOrderDeletion(
                orderId, userEmail, reason, order, options.isAdmin || false
            );
            
            if (!validation.valid) {
                return {
                    success: false,
                    error: validation.error,
                    currentStatus: validation.currentStatus,
                    step: validation.step
                };
            }

            // Create audit trail before deletion
            let auditResult = null;
            if (createAudit) {
                auditResult = await this.createAuditTrail(
                    orderId, 
                    userEmail, 
                    'DELETE', 
                    reason, 
                    order,
                    { 
                        softDelete,
                        restoreInventory,
                        handlePayment,
                        ipAddress: options.ipAddress,
                        userAgent: options.userAgent
                    },
                    skipNonCriticalErrors
                );
            }

            // Restore inventory if requested
            let inventoryResult = null;
            if (restoreInventory && order.products) {
                inventoryResult = await this.handleInventoryRestoration(
                    order.products, 
                    skipNonCriticalErrors
                );
            }

            // Handle payment refund if requested
            let paymentResult = null;
            if (handlePayment && order.paymentId) {
                paymentResult = await this.handlePaymentRefund(
                    order.paymentId, 
                    orderId, 
                    skipNonCriticalErrors
                );
            }

            // Perform the actual deletion
            const deletionResult = await this.performOrderDeletion(orderId, reason, softDelete);

            // Log the operation
            logOrderOperation('DELETE', orderId, userEmail, {
                operation: deletionResult.operation,
                reason,
                softDelete,
                restoreInventory,
                handlePayment,
                auditCreated: auditResult?.success,
                inventoryRestored: inventoryResult?.success,
                paymentRefunded: paymentResult?.success
            });

            return {
                success: deletionResult.success,
                message: SUCCESS_MESSAGES.ORDER_DELETED,
                operation: deletionResult.operation,
                orderId,
                deletedAt: new Date(),
                metadata: {
                    audit: auditResult,
                    inventory: inventoryResult,
                    payment: paymentResult
                }
            };

        } catch (error) {
            logError('Order deletion workflow failed', { orderId, userEmail, error: error.message });
            return {
                success: false,
                error: ERROR_MESSAGES.DATABASE_ERROR,
                details: error.message
            };
        }
    }

    // Executes batch order deletion
    async executeBatchDeletion(orderIds, adminEmail, reason, options = {}) {
        const batchOptions = {
            ...options,
            isAdmin: true,
            softDelete: false
        };

        const results = [];
        let successCount = 0;
        let failureCount = 0;

        for (const orderId of orderIds) {
            try {
                const result = await this.executeOrderDeletion(orderId, adminEmail, reason, batchOptions);
                
                if (result.success) {
                    successCount++;
                } else {
                    failureCount++;
                }

                results.push({ orderId, ...result });
            } catch (error) {
                failureCount++;
                results.push({ 
                    orderId, 
                    success: false, 
                    error: error.message 
                });
            }
        }

        logOrderOperation('BATCH_DELETE', 'multiple', adminEmail, {
            totalOrders: orderIds.length,
            successCount,
            failureCount,
            reason
        });

        return {
            totalOrders: orderIds.length,
            successCount,
            failureCount,
            results,
            summary: {
                successRate: (successCount / orderIds.length * 100).toFixed(2) + '%',
                completedAt: new Date()
            }
        };
    }
};

module.exports = new OrderOperationsService();