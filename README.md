# DashDeals 🛍️

A modern, full-stack e-commerce platform built with the MERN stack, featuring seamless shopping experience, secure payments, and comprehensive admin functionality.

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Configuration](#-configuration)
- [📱 Available Scripts](#-available-scripts)
- [🧪 Testing](#-testing)
- [📚 API Documentation](#-api-documentation)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Overview

DashDeals is a comprehensive e-commerce solution that provides users with a seamless shopping experience while offering robust admin capabilities. The platform features real-time product management, secure payment processing, order tracking, and personalized user experiences.

## ✨ Features

### 🛒 Customer Features
- **Product Discovery**: Browse products by categories, search functionality, and filtering options
- **User Authentication**: Secure login/signup with Firebase integration
- **Shopping Cart**: Add/remove items, update quantities, and apply discount codes
- **Wishlist Management**: Save favorite products for later purchase
- **Order Management**: Track orders, view order history, and manage cancellations
- **Secure Checkout**: Multiple payment options including Stripe integration
- **User Profile**: Manage account settings and personal information
- **Reviews & Ratings**: Leave product reviews and view customer feedback

### 🛠️ Admin Features
- **Product Management**: Add, edit, and remove products with image uploads
- **Order Processing**: Manage orders, update status, and handle returns
- **User Management**: View and manage customer accounts
- **Analytics Dashboard**: Track sales, revenue, and customer metrics
- **Inventory Management**: Monitor stock levels and product availability

### 🔧 Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live cart updates and order status tracking
- **Error Handling**: Comprehensive error boundaries and validation
- **Security**: JWT authentication, input validation, and XSS protection
- **Performance**: Optimized bundle size and lazy loading
- **SEO Friendly**: Meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **TanStack Query** - Server state management and caching
- **Zustand** - Client state management
- **Firebase** - Authentication and real-time database
- **Stripe** - Payment processing
- **React Hook Form** - Form management and validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM)
- **JWT** - Authentication tokens
- **Stripe** - Payment processing
- **Firebase Admin** - Server-side Firebase operations
- **Winston** - Logging
- **Joi** - Data validation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Git** - Version control

## 📁 Project Structure

```
dashdeals/
├── README.md                    # This file
├── backend/                     # Backend application
│   ├── config/                  # Configuration files
│   │   ├── config.js           # App configuration
│   │   ├── db.js               # Database connection
│   │   └── firebaseAdmin.js    # Firebase admin setup
│   ├── controllers/             # Route controllers
│   │   ├── authController.js   # Authentication logic
│   │   ├── cartController.js   # Cart management
│   │   ├── orderController.js  # Order processing
│   │   ├── paymentController.js # Payment handling
│   │   ├── productController.js # Product management
│   │   ├── userProfileController.js # User profile
│   │   └── wishlistController.js # Wishlist management
│   ├── middlewares/             # Custom middlewares
│   │   ├── authMiddleware.js   # Authentication checks
│   │   ├── validationMiddleware.js # Request validation
│   │   └── validation/         # Validation schemas
│   ├── models/                  # Database models
│   │   ├── paymentModel.js     # Payment schema
│   │   ├── productModel.js     # Product schema
│   │   └── userModel.js        # User schema
│   ├── repositories/            # Data access layer
│   ├── routes/                  # API routes
│   ├── services/                # Business logic
│   ├── utils/                   # Utility functions
│   ├── docs/                    # API documentation
│   ├── package.json            # Backend dependencies
│   └── index.js                # Backend entry point
└── frontend/                    # Frontend application
    ├── public/                  # Static assets
    ├── src/
    │   ├── app/                # App-level configuration
    │   │   ├── config/         # App constants
    │   │   ├── hooks/          # Global hooks
    │   │   └── providers/      # Context providers
    │   ├── components/         # Reusable components
    │   │   ├── auth/           # Authentication components
    │   │   ├── carts/          # Cart components
    │   │   ├── common/         # Shared UI components
    │   │   ├── home/           # Homepage components
    │   │   ├── my-orders/      # Order management
    │   │   ├── payment/        # Payment components
    │   │   ├── products/       # Product components
    │   │   ├── ui/             # Base UI components
    │   │   └── user/           # User profile components
    │   ├── features/           # Feature modules
    │   │   ├── auth/           # Authentication feature
    │   │   ├── cart/           # Cart feature
    │   │   ├── orders/         # Orders feature
    │   │   ├── payment/        # Payment feature
    │   │   ├── products/       # Products feature
    │   │   └── user/           # User feature
    │   ├── lib/                # External libraries
    │   ├── pages/              # Route pages
    │   ├── router/             # Routing configuration
    │   ├── shared/             # Shared utilities
    │   ├── index.css           # Global styles
    │   └── main.jsx            # Frontend entry point
    ├── package.json           # Frontend dependencies
    └── vite.config.js         # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- MongoDB (local or cloud instance)
- Firebase project setup
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamkhalidhussein/dashdeals.git
   cd dashdeals
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   - Copy environment variables (see Configuration section)
   - Set up Firebase project
   - Configure Stripe keys

5. **Start Development Servers**
   
   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 🔧 Configuration

### Frontend Environment Variables (.env)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_MEASUREMENT_ID=your_measurement_id

# API Configuration
VITE_BACKEND_URL=http://localhost:4000

# Stripe Configuration
VITE_STRIPE_PK=pk_test_your_stripe_public_key
```

### Backend Environment Variables (.env)

```env
# Database Configuration
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
DB_URL=mongodb+srv://your_db_url/dashdeals

# Server Configuration
PORT=4000
NODE_ENV=development

# Authentication
ACCESS_TOKEN_SECRET=your_jwt_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Application URLs
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:4000

# Firebase Admin
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
```

## 📱 Available Scripts

### Frontend Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

### Backend Scripts
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```

## 🧪 Testing

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test -- auth.test.js

# Run tests with coverage
npm run test:coverage
```

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart

### Order Endpoints
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (admin)

### Payment Endpoints
- `POST /api/payment/create-intent` - Create payment intent
- `POST /api/payment/confirm` - Confirm payment
- `POST /api/payment/webhook` - Stripe webhook handler

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the application:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. Configure environment variables in the deployment platform

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy using platform-specific commands
3. Configure database connection
4. Set up webhook endpoints for Stripe

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting
- Use meaningful commit messages

### Code Review Process
- All pull requests require review
- Maintain clean, readable code
- Address feedback promptly
- Keep changes focused and minimal

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The UI library
- [Express.js](https://expressjs.com/) - The backend framework
- [MongoDB](https://www.mongodb.com/) - The database
- [Stripe](https://stripe.com/) - Payment processing
- [Firebase](https://firebase.google.com/) - Authentication services
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework

## 📞 Support

For support, please contact:
- Email: support@dashdeals.com
- GitHub Issues: [Create an issue](https://github.com/iamkhalidhussein/dashdeals/issues)
- Documentation: [Visit our docs](https://docs.dashdeals.com)

**Happy Shopping! 🛍️**