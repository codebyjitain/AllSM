const express = require('express');
const router = express.Router();
const Owner = require('../models/owner.models');
const ownerController = require('../controllers/ownerController');

// Owner login route
router.post('/login', ownerController.ownerLoginController);

// Owner registration route
router.post('/register', ownerController.ownerRegisterController);

module.exports = router;