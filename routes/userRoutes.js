const express = require('express');
const router = express.Router();
const { addUserProductWishlist, getUserProductCarts, addUserProductCarts, deleteUserProductCarts, getUserOrderedProducts, deleteOrderedProduct, deleteUserProductWishlist, getUserProductWishlist} = require('../controllers/userController');

router.post('/userProductWishlist', addUserProductWishlist);
router.get('/getUserProductWishlist/:email', getUserProductWishlist);
router.delete('/deleteUserProductWishlist/:email/:productId', deleteUserProductWishlist);
router.get('/userProductCarts/:email', getUserProductCarts);
router.get('/getUserOrderedProducts/:email', getUserOrderedProducts);
router.post('/userProductCarts/:id/:email', addUserProductCarts);
router.delete('/userProductCarts/:email/:id', deleteUserProductCarts);
router.delete('/deleteOrderedProduct/:orderId/:productId', deleteOrderedProduct);
// Add other user-related routes here

module.exports = router;
