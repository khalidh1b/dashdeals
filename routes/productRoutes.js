const express = require('express');
const router = express.Router();
const { getFlashSalesProducts, getBestSellingProducts, getExploreOurProducts, getFlashSalesProductById } = require('../controllers/productController');

router.get('/flashSalesProducts', getFlashSalesProducts);
router.get('/bestSellingProducts', getBestSellingProducts);
router.get('/exploreOurProducts', getExploreOurProducts);
router.get('/flashSalesProducts/:id', getFlashSalesProductById);

// Add other product-related routes here

module.exports = router;
