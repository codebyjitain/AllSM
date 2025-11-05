const Owner = require('../models/owner.models');
const jwt = require('jsonwebtoken');

const ownerLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const owner = await Owner.findOne({ email });

        if (!owner || owner.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ ownerId: owner._id, email: owner.email }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful', token , owner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const ownerRegisterController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: 'Owner already exists' });
        }

        const newOwner = new Owner({ name, email, password });
        await newOwner.save();

        const token = jwt.sign({ ownerId: newOwner._id, email: newOwner.email }, process.env.JWT_SECRET);

        res.status(201).json({ message: 'Owner registered successfully', token , owner: newOwner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// get Owner By Token
const getOwnerByToken = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const owner = await Owner.findById(decoded.ownerId).select('-password');

        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        res.status(200).json({ owner });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

module.exports = { ownerLoginController, ownerRegisterController , getOwnerByToken };