const userService = require('../services/userService');
const enhancedOrderService = require('../services/enhancedOrderService');
const { logError } = require('../utils/logger');
const { randomUUID } = require('crypto');

class OrderController {
    // Get user orders
    async getUserOrders(req, res) {
        try {
            const { email } = req.params;
            const result = await userService.getUserOrders(email);
            
            res.status(200).json(result.orders || []);
            
        } catch (error) {
            logError('Error in getUserOrders controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'An error occurred fetching user ordered products',
                message: error.message
            });
        }
    }

    // Delete single order
    async deleteOrder(req, res) {
        const startTime = Date.now();
        
        try {
            const { orderId } = req.params;
            // const { reason } = req.body;
            
            const userEmail = req.user?.email || req.decoded?.email || req.body.email;
            
            // Perform comprehensive order deletion
            const result = await enhancedOrderService.deleteOrder(
                orderId, 
                userEmail, 
                // reason,
                {
                    softDelete: true,          
                    restoreInventory: true,     
                    handlePayment: true,        
                    createAudit: true           
                }
            );

            const responseTime = Date.now() - startTime;

            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message,
                    data: {
                        orderId: result.orderId,
                        operation: result.operation,
                        deletedAt: result.deletedAt,
                        responseTime: `${responseTime}ms`
                    },
                    timestamp: new Date().toISOString()
                });
            } else {
                const statusCode = result.error === 'Order not found' ? 404 : 
                                 result.error === 'Unauthorized access to order' ? 403 :
                                 result.error === 'Order cannot be deleted in current status' ? 400 : 500;

                return res.status(statusCode).json({
                    success: false,
                    error: result.error,
                    details: result.details || result.currentStatus || null,
                    orderId: orderId,
                    timestamp: new Date().toISOString()
                });
            }

        } catch (error) {
            const responseTime = Date.now() - startTime;
            
            // Enhanced error logging
            logError('Order deletion controller error', {
                orderId: req.params.orderId,
                error: error.message,
                stack: error.stack,
                responseTime: `${responseTime}ms`,
                userAgent: req.get('User-Agent'),
                ip: req.ip
            });

            // Return appropriate error response
            res.status(500).json({
                success: false,
                error: 'Internal server error',
                message: 'An unexpected error occurred while processing your request',
                requestId: randomUUID(), // For tracking
                timestamp: new Date().toISOString()
            });
        }
    }

    // Admin endpoint for batch order deletion
    async batchDeleteOrders(req, res) {
        const startTime = Date.now();
        
        try {
            const { orderIds, reason } = req.body;
            
            const adminEmail = req.user?.email || req.decoded?.email;
            
            const result = await enhancedOrderService.batchDeleteOrders(orderIds, adminEmail, reason);
            
            const responseTime = Date.now() - startTime;

            res.status(200).json({
                success: true,
                message: 'Batch deletion completed',
                data: {
                    ...result,
                    responseTime: `${responseTime}ms`
                },
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            const responseTime = Date.now() - startTime;
            
            logError('Batch order deletion controller error', {
                error: error.message,
                stack: error.stack,
                responseTime: `${responseTime}ms`
            });

            res.status(500).json({
                success: false,
                error: 'Internal server error',
                timestamp: new Date().toISOString()
            });
        }
    }
}

module.exports = new OrderController();