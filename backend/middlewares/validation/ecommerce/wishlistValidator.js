const validateWishlistItem = (req, res, next) => {
    const wishlistItem = req.body;
    
    // validate required fields
    if (!wishlistItem.productId || !wishlistItem.email) {
        return res.status(400).json({
            success: false,
            error: 'wishlist item must contain productId and email fields'
        });
    }
    
    // validate product title
    if (!wishlistItem.product_title) {
        return res.status(400).json({
            success: false,
            error: 'wishlist item must contain product_title field'
        });
    }
    
    // validate product title length
    if (typeof wishlistItem.product_title !== 'string' || wishlistItem.product_title.trim().length < 1) {
        return res.status(400).json({
            success: false,
            error: 'product_title must be a non-empty string'
        });
    }
    
    // validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(wishlistItem.email)) {
        return res.status(400).json({
            success: false,
            error: 'valid email address is required in the correct format (example@domain.com)'
        });
    }
    
    next();
};

module.exports = {
    validateWishlistItem
};