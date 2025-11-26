const Order = require("../models/order.models");
const User = require("../models/user.models");
const Product = require("../models/product.models");
const jwt = require('jsonwebtoken');
const Owner = require("../models/owner.models");

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


// get orders according to owner
const getOrdersATO = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];  

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const owner = await Owner.findById(decoded.ownerId);
        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }
        const orders = await Order.find({ owner: owner._id }).populate('products.product');
        res.status(200).json({ orders });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// update Order
const updateOrder = async (req, res) => {
    const { orderId , delivery_status , paymentStatus , paymentMethod } = req.body
    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if(delivery_status !== ''){
            order.delivery_status = delivery_status
        }
        if(paymentStatus !== ''){
            order.paymentStatus = paymentStatus
        }
        if(paymentMethod !== ''){
            order.paymentMethod = paymentMethod
        }
        await order.save()
        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        console.log(error)
    }
}

module.exports = {
    createOrder ,
    getOrdersATO,
    updateOrder
}