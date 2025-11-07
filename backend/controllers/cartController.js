const userService = require('../services/userService');
const { logError } = require('../utils/logger');

class CartController {
    // Get user cart
    async getUserCart(req, res) {
        try {
            const { email } = req.params;
            const result = await userService.getUserCart(email);
            
            if (result.cart.length === 0) {
                return res.status(200).json([]);
            }
            
            res.status(200).json(result.cart);
            
        } catch (error) {
            logError('Error in getUserCart controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'An error occurred fetching user carts',
                message: error.message
            });
        }
    }

    // Add item to cart
    async addToCart(req, res) {
        try {
            const { id: productId, email } = req.params;
            const cartItem = req.body;
            
            const result = await userService.addToCart(email, productId, cartItem);
            
            if (result.exists) {
                return res.status(200).json({
                    message: result.message,
                    insertedId: null
                });
            }
            
            res.status(201).json(result.result);
            
        } catch (error) {
            logError('Error in addToCart controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'An error occurred while adding item to cart',
                message: error.message
            });
        }
    }

    // Delete item from cart
    async deleteFromCart(req, res) {
        try {
            const { email, id: cartItemId } = req.params;
            
            const result = await userService.deleteFromCart(email, cartItemId);
            
            if (!result.success) {
                return res.status(404).json({
                    success: false,
                    message: result.message
                });
            }
            
            res.status(200).json({
                success: true,
                message: result.message,
                deletedCount: result.result.deletedCount
            });
            
        } catch (error) {
            logError('Error in deleteFromCart controller', { error: error.message });
            res.status(500).json({
                success: false,
                error: 'An error occurred while deleting item from cart',
                message: error.message
            });
        }
    }
}

module.exports = new CartController();