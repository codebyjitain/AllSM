const express = require('express');
const router = express.Router();
const Order = require('../models/order.models');
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/create', orderController.createOrder);

// get orders according to owner
router.get('/getOrdersATO', orderController.getOrdersATO);

// update order status
router.put('/updateOrder', orderController.updateOrder);
module.exports = router;