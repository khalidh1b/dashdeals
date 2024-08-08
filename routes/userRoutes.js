const express = require('express');
const router = express.Router();
const { addUserProductWishlist, getUserProductCarts, addUserProductCarts, deleteUserProductCarts} = require('../controllers/userController');

router.post('/userProductWishlist', addUserProductWishlist);
router.get('/userProductCarts/:email', getUserProductCarts);
router.post('/userProductCarts/:id/:email', addUserProductCarts);
router.delete('/userProductCarts/:email/:id', deleteUserProductCarts);
// Add other user-related routes here

module.exports = router;
