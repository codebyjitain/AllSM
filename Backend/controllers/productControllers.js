const Product = require('../models/product.models');
const jwt = require('jsonwebtoken');
const Owner = require('../models/owner.models');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, ownertoken } = req.body;
        const productImage = req.file ? req.file.filename : null;

        if (!name || !description || !price || !productImage) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // ✅ Fix JWT decoding field
        const decoded = jwt.verify(ownertoken, process.env.JWT_SECRET);
        const ownerId = decoded.ownerId;  // Correct key

        // ✅ Create new product
        const newProduct = new Product({
            name,
            description,
            price,
            productImage,
            owner: ownerId,
            quantity: 1
        });

        await newProduct.save();

        // ✅ Find and update owner safely
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        owner.products.push({ product: newProduct._id, quantity: 1 });
        await owner.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


// Update product by ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const productImage = req.file ? req.file.filename : null;

        const updatedData = {
            name,
            description,
            price
        };

        if (productImage) {
            updatedData.productImage = productImage;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct
};