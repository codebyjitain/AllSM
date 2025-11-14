const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    productImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount_price: {
        type: Number,
        default: null
    },
    stock: {
        type: String,
        required: true,
        enum: ['in stock', 'out of stock'],
    },
    category: {
        type: String,
        required: true
    },
    // later use this for multiple images
    // otherImages: {
    //     type: [String],
    //     default: []
    // },
    otherNames: {
        type: [String],
        default: []
    },
    brand: {
        type: String,
        required: true
    },
    isactive: {
        type: Boolean,
        default: true
    },
    specifications: {
        type: Object,
        default: {}
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;