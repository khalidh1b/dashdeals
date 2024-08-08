const express = require('express');
const router = express.Router();
const { createPayment, handleSuccessPayment, handlePaymentFailed, handlePaymentCancel } = require('../controllers/paymentController');

router.post('/create-payment', createPayment);
router.post('/success-payment', handleSuccessPayment);
router.post('/payment-failed', handlePaymentFailed);
router.post('/payment-cancel', handlePaymentCancel);

// Add other payment-related routes here

module.exports = router;
