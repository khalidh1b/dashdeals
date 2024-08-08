const express = require('express');
const router = express.Router();
const { getJwtToken } = require('../controllers/authController');

router.post('/jwt', getJwtToken);

module.exports = router;
