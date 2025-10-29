const express = require('express');
const app = express();
const connectDB = require('./config/db-config');
const userRoutes = require('./routes/user.routes');
const ownerRoutes = require('./routes/owner.routes');
const productRoutes = require('./routes/product.routes');
const cors = require('cors');
const path = require('path');

// Static route to serve uploaded images
app.use("/image", express.static(path.join(__dirname , 'uploads')));


// Enable CORS for all routes
app.use(cors());

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// User routes
app.use('/users', userRoutes);

// Owner routes
app.use('/owners', ownerRoutes);

// Product routes
app.use('/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

