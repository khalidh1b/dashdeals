const validateCartItem = (req, res, next) => {
    const { id, email } = req.params;
    const cartItem = req.body;
    
    // validate required parameters
    if (!id || !email) {
        return res.status(400).json({
            success: false,
            error: 'product id and email are required in request parameters'
        });
    }
    
    // validate required cart item fields
    if (!cartItem.productId || !cartItem.email) {
        return res.status(400).json({
            success: false,
            error: 'cart item must contain productId and email fields'
        });
    }
    
    const urlId = String(id);
    const bodyProductId = String(cartItem.productId);
    
    // validate that productid matches the id parameter
    if (bodyProductId !== urlId) {
        return res.status(400).json({
            success: false,
            error: `product id mismatch: url parameter (${urlId}) does not match body (${bodyProductId})`,
            message: 'ensure the product id in the url matches the productid in the request body'
        });
    }
    
    // validate email consistency between params and body
    if (email !== cartItem.email) {
        return res.status(400).json({
            success: false,
            error: `email mismatch: url parameter (${email}) does not match body (${cartItem.email})`,
            message: 'ensure the email in the url matches the email in the request body'
        });
    }
    
    next();
};

module.exports = {
    validateCartItem
};