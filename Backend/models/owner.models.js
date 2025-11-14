const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                min: 1,
                default: 1
            }
        }
    ],
    store_name: {
        type: String,
    },
    store_address: {
        type: String,
    },
    bussiness_category: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;