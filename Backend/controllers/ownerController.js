const Owner = require('../models/owner.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const ownerLoginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const owner = await Owner.findOne({ email });

        if (!owner) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, owner.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ ownerId: owner._id, email: owner.email }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful', token, owner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const ownerRegisterController = async (req, res) => {
    const { name, email, password, store_name, store_address, bussiness_category } = req.body;

    try {
        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: 'Owner already exists' });
        }


        const hashPassword = await bcrypt.hash(password, 10);

        const newOwner = new Owner({ name, email, password: hashPassword, store_name, store_address, bussiness_category });
        await newOwner.save();

        res.status(201).json({ message: 'Owner registered successfully', owner: newOwner });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        console.log(error);
    }
}

// get Owner By Token
const verifyOwner = async (req, res) => {
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

// change Password
const changePassword = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const owner = await Owner.findById(decoded.ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const { oldPassword, newPassword } = req.body;
        if (oldPassword === newPassword) {
            return res.status(400).json({
                message: "New Password Cannot be same as old Password"
            })
        }

        // Check old password
        const isMatch = await bcrypt.compare(oldPassword, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password incorrect" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        owner.password = hashedPassword;
        await owner.save();

        return res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};


// update owner 
const updateOwner = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const owner = await Owner.findById(decoded.ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const {name,email,store_name,store_address,bussiness_category} = req.body

        const newOwner = {
            name,
            email,
            store_name,
            store_address,
            bussiness_category
        }

        const updatedOwner = await Owner.findByIdAndUpdate(decoded.ownerId , newOwner , {new:true})

        return res.status(200).json({
            message: "Owner updated successfully"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};


module.exports = { ownerLoginController, ownerRegisterController, verifyOwner, changePassword , updateOwner};