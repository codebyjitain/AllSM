const express = require('express');
const router = express.Router();
const User = require('../models/user.models');
const userController = require('../controllers/userControllers');

// User login route
router.post('/login',userController.userLoginController);

// User registration route
router.post('/register', userController.userRegisterController );

// Add to cart route
router.post('/addtocart', userController.addToCartController );

// Get cart items route
router.get('/cart', userController.getCartItemsController );
module.exports = router;