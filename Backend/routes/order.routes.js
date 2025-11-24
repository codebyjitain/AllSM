const express = require('express');
const router = express.Router();
const Order = require('../models/order.models');
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/create', orderController.createOrder);

module.exports = router;