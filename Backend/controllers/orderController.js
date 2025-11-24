const Order = require("../models/order.models");
const User = require("../models/user.models");
const Product = require("../models/product.models");
const jwt = require('jsonwebtoken');

// for dummy creation of order
const createOrder = async (req, res) => {

    const { productId , totalAmount } = req.body
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const owner = await Product.findById(productId)

        const order = new Order({
            user: user._id,
            products: [{ product: productId, quantity: 1 }],
            totalAmount,
            owner: owner.owner,
            // temporary 
            paymentMethod : 'Debit Card',
            order_address : 'xyz',
            delivery_status : 'Pending'
        })

        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
        console.log(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        console.log(error)
    }

}

module.exports = {
    createOrder
}