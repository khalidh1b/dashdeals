# DashDeals

A FullStack e-commerce website built with MongoDB, Express.js, React.js, Node.js

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 📖 Introduction

This project is the frontend of an e-commerce website designed to provide users with a seamless shopping experience. It includes features for browsing products, adding them to cart, and completing orders.

## ✨ Features

- Product browsing and search functionality
- User authentication and account management
- Cart management and checkout process
- Responsive design for mobile and desktop

## 🛠️ Technologies Used

- React.js
- Tailwind CSS
- Tanstack (for managing API queries)
- Axios (for making HTTP requests)
- React Router (for navigation)
- Context API (for state management)

## 📁 Frontend Project Structure

```bash
src/
├── app/                          # App-level configurations
│   ├── providers/                # Context providers
│   ├── hooks/                    # Global app hooks
│   └── config/                   # App configuration
├── features/                     # Feature-based modules
│   ├── auth/                     # Authentication feature
│   │   ├── hooks/                # Auth hooks
│   │   ├── services/             # Auth API calls
│   │   └── index.ts              # Feature exports
│   ├── products/                 # Products feature
│   ├── cart/                     # Cart feature
│   ├── checkout/                 # Checkout feature
│   ├── orders/                   # Orders feature
│   ├── user/                     # User profile feature
│   └── payment/                  # Payment feature
├── shared/                       # Shared utilities
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Shared hooks
│   ├── utils/                    # Utility functions
├── pages/                        # Route pages (container components)
├── router/                       # Routing configuration
├── lib/                          # External library configurations
└── index.css                     # Global styles
```

## 📁 Backend Project Structure

```bash
Backend/
├── controllers/         # API route logic (products, users, orders)
├── models/              # MongoDB schemas (User, Product, Order)
├── routes/              # API routes
├── middleware/          # Auth middleware, error handling
├── config/              # DB connection and app config
├── .env                 # Environment variables
├── .gitignore
├── index.js             # App entry point
├── package.json
└── README.md
```


## 🚀 Getting Started Frontend

To get a local copy up and running follow these simple steps:

1. Clone the repository: ```git clone https://github.com/iamkhalidhussein/dashdeals.git```
2. Navigate into the root directory: ```cd dashdeals```
3. Navigate into the frontend directory: ```cd frontend```
4. Install dependencies: `npm install`
5. Start the development server: ```npm start```
6. Open your browser and go to: ```http://localhost:5173```


## 🚀 Getting Started Backend

To get a local copy up and running follow these simple steps:

1. Navigate into the backend directory: ```cd backend```
2. Install dependencies: `npm install`
3. Start the development server: ```nodemon index.js```
4. Open your browser and go to: ```http://localhost:4000```

## 🛠 Tech Stack Backend
1. Tech	        Description
2. Node.js	    JavaScript runtime
3. Express	    Minimal web framework for Node
4. MongoDB	    NoSQL database
5. Mongoose	    MongoDB object modeling
6. JWT User    authentication
7. dotenv	    Manage environment variables

## 🧩 Usage

- Browse products by categories or search by keywords.
- Add products to the cart and proceed to checkout.
- Register or login to manage your account and view order history.

## 🔐 Environment Variables Frontend
```
VITE_apiKey = your_api_key
```
```
VITE_authDomain = your_firebase_auth_domain
```
```
VITE_projectId = your_firebase_proeject_id
```
```
VITE_storageBucket = your_firebase_storage-bucket
```
```
VITE_messagingSenderId = your_firebase_senderid
```
```
VITE_appId = your_firebase_app-id
```
```
VITE_measurementId = your_firebase_measurementid
```
```
VITE_backendUrl = http://localhost:4000
```
```
VITE_Stripe_PK = your_stripe_public_key
```
```
VITE_Stripe_SK = your_stripe_secret_key
```

## 🔐 Environment Variables Backend

```
DB_USER = your_db_user
```
```
DB_PASS = your_db_user-password
```
```
ACCESS_TOKEN_SECRET = 'your access token'
```
```
PORT = 4000
```
```
Stripe_Secret_Key = your_stripe_secret_key
```
```
CLIENT_URL = http://localhost:5173
```
```
BACKEND_URL = http://localhost:4000
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.