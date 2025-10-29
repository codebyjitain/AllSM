const jwt = require('jsonwebtoken');
const User = require('../models/user.models');


const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const userRegisterController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET);

        res.status(201).json({ message: 'User registered successfully', token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const addToCartController = async (req, res) => {
    const { productId, token} = req.body;
    
    try {

        const userId = jwt.verify(token, process.env.JWT_SECRET).userId
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = await User.findById(userId)
        user.cart.push(productId);
        await user.save();

        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getCartItemsController = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = await User.findById(userId).populate('cart');
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { userLoginController, userRegisterController, addToCartController , getCartItemsController};