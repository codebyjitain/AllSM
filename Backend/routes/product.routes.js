const express = require('express');
const router = express.Router();
const Product = require('../models/product.models');
const upload = require('../config/multer-config');
const ProductControllers = require('../controllers/productControllers');

// POST /products/create
router.post('/create', upload.single('productImage'), ProductControllers.createProduct);

// GET /products
router.get('/', ProductControllers.getAllProducts);

// GET /products/:id
router.get('/:id', ProductControllers.getProductById);

// PUT /products/update/:id
router.put('/update/:id', upload.single('productImage'), ProductControllers.updateProduct);

// delete Product
// router.delete('/delete/:id' , ProductControllers.deleteProduct)


module.exports = router;
