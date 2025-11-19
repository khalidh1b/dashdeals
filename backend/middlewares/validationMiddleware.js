const { validateDeleteOrderRequest, validateDeletionReason } = require('../utils/validators');

// Generic validation middleware factory
const validate = (validatorFn, source = 'body') => {
    return (req, res, next) => {
        try {
            const data = source === 'params' ? req.params : 
                        source === 'query' ? req.query : 
                        req.body;
            
            const validation = validatorFn(data);
            
            if (!validation.isValid) {
                return res.status(400).json({
                    success: false,
                    error: validation.error,
                    details: validation.details
                });
            }
            
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Validation error',
                message: error.message
            });
        }
    };
};

// Email validation middleware
const validateEmail = (req, res, next) => {
    const { email } = req.params;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Valid email is required'
        });
    }
    
    next();
};

// User data validation middleware
const validateUserData = (req, res, next) => {
    const { name, email } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            error: 'Valid name is required (minimum 2 characters)'
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Valid email is required'
        });
    }
    
    next();
};

// Password validation middleware
const validatePasswordUpdate = (req, res, next) => {
    const { currentPass, newPass } = req.body;
    
    if (!currentPass || !newPass) {
        return res.status(400).json({
            success: false,
            error: 'Both current password and new password are required'
        });
    }
    
    if (newPass.length < 6) {
        return res.status(400).json({
            success: false,
            error: 'New password must be at least 6 characters long'
        });
    }
    
    next();
};

// Cart item validation middleware
const validateCartItem = (req, res, next) => {
    const { id, email } = req.params;
    const cartItem = req.body;
    
    if (!id || !email) {
        return res.status(400).json({
            success: false,
            error: 'Product ID and email are required'
        });
    }
    
    if (!cartItem.productId || !cartItem.email) {
        return res.status(400).json({
            success: false,
            error: 'Cart item must contain productId and email'
        });
    }
    
    next();
};

// Wishlist item validation middleware
const validateWishlistItem = (req, res, next) => {
    const wishlistItem = req.body;
    
    if (!wishlistItem.productId || !wishlistItem.email) {
        return res.status(400).json({
            success: false,
            error: 'Wishlist item must contain productId and email'
        });
    }
    
    if (!wishlistItem.product_title) {
        return res.status(400).json({
            success: false,
            error: 'Wishlist item must contain product_title'
        });
    }
    
    next();
};

// Order deletion validation middleware
const validateOrderDeletion = (req, res, next) => {
    const { orderId } = req.params;
    const { reason } = req.body;
    
    // Validate order ID
    const orderValidation = validateDeleteOrderRequest(orderId);
    if (!orderValidation.isValid) {
        return res.status(400).json({
            success: false,
            error: orderValidation.error,
            details: orderValidation.details
        });
    }
    
    // Validate deletion reason
    const reasonValidation = validateDeletionReason(reason);
    if (!reasonValidation.isValid) {
        return res.status(400).json({
            success: false,
            error: reasonValidation.error
        });
    }
    
    next();
};

// Batch order deletion validation middleware
const validateBatchOrderDeletion = (req, res, next) => {
    const { orderIds, reason } = req.body;
    
    // Validate order IDs array
    if (!Array.isArray(orderIds) || orderIds.length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Order IDs array is required and cannot be empty'
        });
    }
    
    if (orderIds.length > 100) {
        return res.status(400).json({
            success: false,
            error: 'Cannot delete more than 100 orders at once'
        });
    }
    
    // Validate each order ID
    for (const orderId of orderIds) {
        const validation = validateDeleteOrderRequest(orderId);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: `Invalid order ID: ${orderId}`,
                details: validation.details
            });
        }
    }
    
    // Validate deletion reason
    const reasonValidation = validateDeletionReason(reason);
    if (!reasonValidation.isValid) {
        return res.status(400).json({
            success: false,
            error: reasonValidation.error
        });
    }
    
    next();
};

// Admin validation middleware
const validateAdminAccess = (req, res, next) => {
    const user = req.user || req.decoded;
    
    if (!user || !user.isAdmin) {
        return res.status(403).json({
            success: false,
            error: 'Admin privileges required'
        });
    }
    
    next();
};

// MongoDB ObjectId validation middleware
const validateObjectId = (paramName = 'id') => {
    return (req, res, next) => {
        const { [paramName]: id } = req.params;
        
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                error: `Valid ${paramName} is required`
            });
        }
        
        // Basic ObjectId format validation (24 character hex string)
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(id)) {
            return res.status(400).json({
                success: false,
                error: `Invalid ${paramName} format`
            });
        }
        
        next();
    };
};

module.exports = {
    validate,
    validateEmail,
    validateUserData,
    validatePasswordUpdate,
    validateCartItem,
    validateWishlistItem,
    validateOrderDeletion,
    validateBatchOrderDeletion,
    validateAdminAccess,
    validateObjectId
};