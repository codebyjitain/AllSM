# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# E-commerce Frontend Application

A comprehensive e-commerce platform built with React and Vite, featuring dual interfaces for customers and store owners.

## 📚 Tech Stack

- **Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Styling:** TailwindCSS 4.1.15
- **Routing:** React Router DOM 7.9.4
- **HTTP Client:** Axios 1.12.2
- **State Management:** Redux Toolkit
- **Code Quality:** ESLint, Prettier

## 🗂️ Project Structure

```
Frontend/
├── public/
│   └── vite.svg                # Vite logo
├── src/
│   ├── assets/                 # Static assets
│   │   ├── ownerImage.png     # Owner profile image
│   │   ├── react.svg          # React logo
│   │   ├── soon.jpeg          # Coming soon image
│   │   └── user.png           # Default user avatar
│   │
│   ├── components/
│   │   ├── OwnerComponents/   # Owner dashboard components
│   │   │   ├── OAddProduct.jsx      # Add new products
│   │   │   ├── ODeleteProduct.jsx   # Delete products
│   │   │   ├── OEditProduct.jsx     # Edit existing products
│   │   │   ├── ONavbar.jsx          # Owner navigation
│   │   │   ├── OOrders.jsx          # Order management
│   │   │   ├── OPayments.jsx        # Payment tracking
│   │   │   ├── OProfile.jsx         # Owner profile
│   │   │   ├── OSetStock.jsx        # Inventory management
│   │   │   ├── OViewProducts.jsx    # Product listing
│   │   │   └── OwnerSidebar.jsx     # Dashboard sidebar
│   │   │
│   │   ├── Navbar.jsx         # Main navigation
│   │   ├── ProductPreview.jsx # Product card component
│   │   └── Sidebar.jsx        # User sidebar
│   │
│   ├── middleware/            # Authentication & Authorization
│   │   ├── OwnerMiddleware.jsx
│   │   └── UserMiddleware.jsx
│   │
│   ├── pages/                # Route components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Owner.jsx         # Owner dashboard
│   │   ├── OwnerLoginRegister.jsx
│   │   ├── ProductPage.jsx   # Product details
│   │   ├── UserCart.jsx      # Shopping cart
│   │   └── UserLoginRegister.jsx
│   │
│   ├── App.jsx              # Root component
│   ├── main.jsx            # Entry point
│   ├── index.css          # Global styles
│   └── App.css            # App-specific styles
```

## 🚀 Features

### 👥 User Features
- User authentication (login/register)
- Product browsing with search and filters
- Shopping cart management
- Order placement and tracking
- User profile management
- Wishlist functionality
- Order history

### 👨‍💼 Owner Features
- Secure owner dashboard
- Product management (CRUD operations)
- Inventory tracking
- Order processing
- Payment management
- Analytics and reports
- Profile customization

## 🛠️ Setup & Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Start development server:**
```bash
npm run dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server at `http://localhost:5173`
- `npm run build` - Create production build in `dist/`
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_KEY=your_stripe_public_key
VITE_IMAGE_HOST=your_image_host_url
```

### API Configuration
The frontend expects a RESTful API with the following endpoints:
- `/api/auth/*` - Authentication endpoints
- `/api/products/*` - Product management
- `/api/orders/*` - Order processing
- `/api/users/*` - User management

## 🔐 Security

- JWT-based authentication
- Protected routes using middleware
- Role-based access control
- XSS protection
- CSRF protection

## 🧪 Testing

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
```

## 📦 Build & Deployment

1. **Create production build:**
```bash
npm run build
```

2. **Preview build:**
```bash
npm run preview
```

3. **Deploy:**
The `dist/` directory is ready to be deployed to your hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Contact

- Project Manager - [name@example.com](mailto:name@example.com)
- Lead Developer
