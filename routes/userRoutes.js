const express = require('express');
const router = express.Router();
const { 
    addUserProductWishlist, 
    getUserProductCarts, 
    addUserProductCarts, 
    deleteUserProductCarts, 
    getUserOrderedProducts, 
    deleteOrderedProduct, 
    deleteUserProductWishlist,
    getUserProductWishlist, 
    saveUser,
    updateUserProfile, 
    getUserProfile,
    updatePass
 } = require('../controllers/userController.js');
const { verifyToken } = require('../middlewares/authMiddleware.js');

router.post('/userProductWishlist', addUserProductWishlist);
router.get('/getUserProductWishlist/:email', verifyToken, getUserProductWishlist);
router.delete('/deleteUserProductWishlist/:email/:productId', deleteUserProductWishlist);
router.get('/userProductCarts/:email', getUserProductCarts);
router.get('/getUserOrderedProducts/:email', getUserOrderedProducts);
router.post('/userProductCarts/:id/:email', addUserProductCarts);
router.delete('/userProductCarts/:email/:id', deleteUserProductCarts);
router.delete('/deleteOrderedProduct/:orderId/:productId', deleteOrderedProduct);
router.post('/saveuser', verifyToken, saveUser);
router.patch('/update-user-profile/:email', verifyToken, updateUserProfile);
router.get('/userprofile/:email', verifyToken, getUserProfile);
router.patch('/updatepass/:email', verifyToken, updatePass);

module.exports = router;