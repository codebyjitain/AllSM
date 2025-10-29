# 🛍️ E-commerce Backend API

A robust Node.js/Express backend API for e-commerce platform with comprehensive user management, product handling, and secure file uploads.

## 📚 Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **File Handling:** Multer
- **Security:** bcrypt, helmet, cors
- **Validation:** express-validator

## 📁 Project Structure

```
Backend/
├── config/              # Configuration files
│   ├── db-config.js     # Database configuration
│   └── multer-config.js # File upload settings
│
├── controllers/        # Request handlers
│   ├── ownerController.js
│   ├── productControllers.js
│   └── userControllers.js
│
├── middleware/        # Custom middleware
│
├── models/           # MongoDB schemas
│   ├── owner.models.js
│   ├── product.models.js
│   └── user.models.js
│
├── routes/           # API routes
│   ├── owner.routes.js
│   ├── product.routes.js
│   └── user.routes.js
│
├── uploads/         # Product images storage
└── utils/          # Utility functions
```

## 🚀 API Endpoints

### User Routes
```
POST   /api/users/register     # Create new user account
POST   /api/users/login        # User authentication
GET    /api/users/profile      # Fetch user profile
PUT    /api/users/profile      # Update user details
GET    /api/users/cart         # Get shopping cart
POST   /api/users/cart         # Add to cart
DELETE /api/users/cart/:id     # Remove from cart
```

### Owner Routes
```
POST   /api/owners/register    # Create owner account
POST   /api/owners/login       # Owner authentication
GET    /api/owners/profile     # Get owner profile
PUT    /api/owners/profile     # Update owner profile
GET    /api/owners/products    # List owner products
POST   /api/owners/products    # Add new product
```

### Product Routes
```
GET    /api/products          # List all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product
PUT    /api/products/:id      # Update product
DELETE /api/products/:id      # Remove product
```

## ⚙️ Setup Instructions

1. **Clone Repository:**
```bash
git clone <repository-url>
cd Backend
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Environment Setup:**
Create `.env` file with:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=24h
```

4. **Start Server:**
```bash
# Development
npm run dev

# Production
npm start
```

## 📝 Available Scripts

- `npm start`: Launch production server
- `npm run dev`: Start development server
- `npm test`: Run test suite
- `npm run lint`: Check code style

## 🔒 Security Features

- JWT Authentication
- Password Hashing
- Input Validation
- File Upload Restrictions
- CORS Protection
- Rate Limiting
- XSS Prevention

## 💾 Database Models

### User Schema
```javascript
{
  username: String,
  email: String,
  password: String,
  cart: [{
    productId: ObjectId,
    quantity: Number
  }],
  orders: [ObjectId]
}
```

### Owner Schema
```javascript
{
  name: String,
  email: String,
  password: String,
  storeName: String,
  products: [ObjectId]
}
```

### Product Schema
```javascript
{
  name: String,
  description: String,
  price: Number,
  stock: Number,
  images: [String],
  ownerId: ObjectId,
  category: String
}
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Submit pull request

## 📄 License

MIT License - See [LICENSE.md](LICENSE.md)

## 👥 Support

For support, email backend-support@example.com