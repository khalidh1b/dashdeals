const express = require('express');
const router = express.Router();

// Import controllers
const userProfileController = require('../controllers/userProfileController');
const cartController = require('../controllers/cartController');
const wishlistController = require('../controllers/wishlistController');
const orderController = require('../controllers/orderController');

// Import middleware
const { verifyToken } = require('../middlewares/authMiddleware');
const {
    validateEmail,
    validateUserData,
    validatePasswordUpdate,
    validateCartItem,
    validateWishlistItem,
    validateOrderDeletion,
    validateBatchOrderDeletion,
    validateAdminAccess,
    validateObjectId
} = require('../middlewares/validationMiddleware');

// User Profile Routes
router.post('/saveuser', verifyToken, validateUserData, userProfileController.saveUser);
router.get('/userprofile/:email', verifyToken, validateEmail, userProfileController.getUserProfile);
router.patch('/update-user-profile/:email', verifyToken, validateEmail, userProfileController.updateUserProfile);
router.patch('/updatepass/:email', verifyToken, validateEmail, validatePasswordUpdate, userProfileController.updatePassword);

// Cart Routes
router.get('/userProductCarts/:email', validateEmail, cartController.getUserCart);
router.post('/userProductCarts/:id/:email', validateEmail, validateCartItem, cartController.addToCart);
router.delete('/userProductCarts/:email/:id', validateEmail, validateObjectId('id'), cartController.deleteFromCart);

// Wishlist Routes
router.post('/userProductWishlist', validateWishlistItem, wishlistController.addToWishlist);
router.get('/getUserProductWishlist/:email', verifyToken, validateEmail, wishlistController.getUserWishlist);
router.delete('/deleteUserProductWishlist/:email/:productId', validateEmail, validateObjectId('productId'), wishlistController.deleteFromWishlist);

// Order Routes
router.get('/getUserOrderedProducts/:email', validateEmail, orderController.getUserOrders);
router.delete('/deleteOrder/:orderId', verifyToken, validateOrderDeletion, orderController.deleteOrder);

// Admin Order Routes
router.post('/batch-delete-orders', verifyToken, validateAdminAccess, validateBatchOrderDeletion, orderController.batchDeleteOrders);

module.exports = router;