const { client } = require("../config/db.js");
const { ObjectId } = require('mongodb');
const { COLLECTIONS } = require('../utils/constants');
const { logError } = require('../utils/logger');

class OrderRepository {
    constructor() {
        this.db = client.db('Dashdeals');
    }

    // Gets collection reference with error handling
    getCollection(collectionName) {
        try {
            return this.db.collection(collectionName);
        } catch (error) {
            logError('Failed to get collection reference', { collectionName, error: error.message });
            throw new Error('Database connection error');
        }
    }

    // Order operations
    async getOrderById(orderId) {
        try {
            const collection = this.getCollection(COLLECTIONS.USER_ORDERED_PRODUCTS);
            const query = { _id: new ObjectId(orderId) };
            
            const order = await collection.findOne(query);
            return order;
        } catch (error) {
            logError('Failed to retrieve order', { orderId, error: error.message });
            throw error;
        }
    }

    async softDeleteOrder(orderId, reason) {
        try {
            const collection = this.getCollection(COLLECTIONS.USER_ORDERED_PRODUCTS);
            const query = { _id: new ObjectId(orderId) };
            
            const result = await collection.updateOne(
                query,
                { 
                    $set: { 
                        status: 'cancelled',
                        deletedAt: new Date(),
                        deletionReason: reason,
                        isDeleted: true
                    }
                }
            );

            return {
                success: result.modifiedCount > 0,
                operation: 'soft_delete',
                modifiedCount: result.modifiedCount
            };
        } catch (error) {
            logError('Failed to soft delete order', { orderId, error: error.message });
            throw error;
        }
    }

    async hardDeleteOrder(orderId) {
        try {
            const collection = this.getCollection(COLLECTIONS.USER_ORDERED_PRODUCTS);
            const query = { _id: new ObjectId(orderId) };
            
            const result = await collection.deleteOne(query);

            return {
                success: result.deletedCount > 0,
                operation: 'hard_delete',
                deletedCount: result.deletedCount
            };
        } catch (error) {
            logError('Failed to hard delete order', { orderId, error: error.message });
            throw error;
        }
    }

    // Product operations
    async restoreProductInventory(products) {
        try {
            const productCollection = this.getCollection('products');
            
            for (const product of products) {
                if (product.productId && product.quantity) {
                    await productCollection.updateOne(
                        { _id: new ObjectId(product.productId) },
                        { $inc: { stock: product.quantity } }
                    );
                }
            }
        } catch (error) {
            logError('Failed to restore product inventory', { error: error.message });
            throw error;
        }
    }

    // Payment operations
    async handlePaymentRefund(paymentId, orderId) {
        try {
            const paymentCollection = this.getCollection(COLLECTIONS.USER_PAYMENTS_INFO);
            
            await paymentCollection.updateOne(
                { paymentId },
                { 
                    $set: { 
                        status: 'refunded',
                        refundedAt: new Date(),
                        refundedOrderId: orderId
                    }
                }
            );
        } catch (error) {
            logError('Failed to handle payment refund', { paymentId, orderId, error: error.message });
            throw error;
        }
    }

    // Audit operations
    async createAuditTrail(orderId, userEmail, reason, orderData, metadata = {}) {
        try {
            const auditCollection = this.getCollection('orderAuditTrail');
            const auditEntry = {
                orderId,
                userEmail,
                action: 'DELETE',
                reason,
                timestamp: new Date(),
                originalOrderData: orderData,
                ...metadata
            };

            await auditCollection.insertOne(auditEntry);
        } catch (error) {
            logError('Failed to create audit trail', { orderId, userEmail, error: error.message });
            throw error;
        }
    }
}

module.exports = new OrderRepository();