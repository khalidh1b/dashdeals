const { validateDeleteOrderRequest, validateDeletionReason } = require('../../../utils/validators');

const validateOrderDeletion = (req, res, next) => {
    const { orderId } = req.params;
    const { reason } = req.body;
    
    // validate order id using utility validator
    const orderValidation = validateDeleteOrderRequest(orderId);
    if (!orderValidation.isValid) {
        return res.status(400).json({
            success: false,
            error: orderValidation.error,
            details: orderValidation.details
        });
    }
    
    // validate deletion reason using utility validator
    const reasonValidation = validateDeletionReason(reason);
    if (!reasonValidation.isValid) {
        return res.status(400).json({
            success: false,
            error: reasonValidation.error
        });
    }
    
    next();
};

// validates batch order deletion request
const validateBatchOrderDeletion = (req, res, next) => {
    const { orderIds, reason } = req.body;
    
    // validate order ids array
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'order ids array is required and cannot be empty'
        });
    }
    
    if (orderIds.length > 100) {
        return res.status(400).json({
            success: false,
            error: 'cannot delete more than 100 orders at once for performance reasons'
        });
    }
    
    // validate each order id in the array
    for (const orderId of orderIds) {
        const validation = validateDeleteOrderRequest(orderId);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: `invalid order id: ${orderId}`,
                details: validation.details
            });
        }
    }
    
    // validate deletion reason using utility validator
    const reasonValidation = validateDeletionReason(reason);
    if (!reasonValidation.isValid) {
        return res.status(400).json({
            success: false,
            error: reasonValidation.error
        });
    }
    
    next();
};

module.exports = {
    validateOrderDeletion,
    validateBatchOrderDeletion
};