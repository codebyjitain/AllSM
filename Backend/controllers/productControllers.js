const Product = require('../models/product.models');
const jwt = require('jsonwebtoken');
const Owner = require('../models/owner.models');
const fs = require('fs');
const path = require('path');


// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, ownertoken , category , quantity , otherNames , stock , brand ,specifications,discounted_price} = req.body;
        const productImage = req.file ? req.file.filename : null;

        if (!name || !description || !price || !productImage || !ownertoken || !quantity) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // ✅ Fix JWT decoding field
        const decoded = jwt.verify(ownertoken, process.env.JWT_SECRET);
        const ownerId = decoded.ownerId;  // Correct key

        // fix otherNames to be an array
        let otherNamesArray = [];
        if (otherNames) {
            if (Array.isArray(otherNames)) {
                otherNamesArray = otherNames;
            } else if (typeof otherNames === 'string') {
                otherNamesArray = otherNames.split(',').map(name => name.trim());
            }
        }
        
        // ✅ Create new product
        const newProduct = new Product({
            name,
            description,
            price,
            productImage : process.env.BASE_URL + '/image/' + productImage,
            owner: ownerId,
            quantity: quantity,
            otherNames: otherNamesArray,
            category,
            brand,
            specifications,
            stock,
            discount_price: discounted_price || null
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
    // page = which page, default 1
    // limit = how many products per page, default 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await Product.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // optional: latest first

    const total = await Product.countDocuments();

    res.status(200).json({
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });

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
        const { name, description, price, ownertoken , category , quantity , otherNames , brand ,specifications,discounted_price , stock} = req.body;
    
        const productImage = req.file ? req.file.filename : null;

        // Simplify OtherNames
        let otherNamesArray = [];
        if (otherNames) {
            if (Array.isArray(otherNames)) {
                otherNamesArray = otherNames;
            } else if (typeof otherNames === 'string') {
                otherNamesArray = otherNames.split(',').map(name => name.trim());
            }
        }

        const updatedData = {
            name,
            description,
            price,
            
            otherNames: otherNamesArray,
            category,
            quantity,
            category,
            brand,
            specifications,
            stock,
            discount_price: discounted_price || null
        };

        if (productImage) {
            updatedData.productImage = process.env.BASE_URL + '/image/' + productImage
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

// delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const imageName = await Product.findById(id).select('productImage');

        const owner = await Product.findById(id).select('owner');

        // ✅ Find and update owner safely
        const ownerToUpdate = await Owner.findByIdAndUpdate(owner , { $pull: { products: { product: id } } }, { new: true });
        

        const imagePath = path.join(__dirname , '..' , 'uploads' , imageName.productImage.split('/').pop());

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image:', err);
            }
            console.log("File Deleted Successfully")
        })

        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            product: deletedProduct
        });

    } catch (error) {
        console.error('Error Deleting product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};