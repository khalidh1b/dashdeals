const userService = require('../services/userService');
const { logError } = require('../utils/logger');

class WishlistController {
    // Get user wishlist
    async getUserWishlist(req, res) {
        try {
            const { email } = req.params;
            const result = await userService.getUserWishlist(email);
            
            res.status(200).json(result.wishlist);
            
        } catch (error) {
            logError('Error in getUserWishlist controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'Failed to fetch user wishlist',
                message: error.message
            });
        }
    }

    // Add item to wishlist
    async addToWishlist(req, res) {
        try {
            const wishlistItem = req.body;
            const { productId, email } = wishlistItem;
            
            const result = await userService.addToWishlist(email, productId, wishlistItem);
            
            if (result.exists) {
                return res.status(200).json({
                    message: result.message,
                    insertedId: null,
                    product_title: wishlistItem.product_title
                });
            }
            
            res.status(201).json(result.result);
            
        } catch (error) {
            logError('Error in addToWishlist controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'Failed to add item to wishlist',
                message: error.message
            });
        }
    }

    // Delete item from wishlist
    async deleteFromWishlist(req, res) {
        try {
            const { email, productId } = req.params;
            
            const result = await userService.deleteFromWishlist(email, productId);
            
            res.status(200).json(result.result);
            
        } catch (error) {
            logError('Error in deleteFromWishlist controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'Failed to delete item from wishlist',
                message: error.message
            });
        }
    }
}

module.exports = new WishlistController();