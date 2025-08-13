# 🛍️ E-Commerce Backend API
This is the backend API for a simple e-commerce web application. It supports product management, user authentication, cart operations, and order processing. Built with Node.js, Express, and MongoDB, it serves as the core engine powering the frontend interface of the store.

## 📑 Table of Contents

🚀 Features

🛠 Tech Stack

📁 Folder Structure

⚙️ Setup & Installation

🔐 Environment Variables

🗃️ Database Models

📦 Deployment

🤝 Contributing

📄 License


📁 Folder Structure

```js
ecommerce-backend/
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

## 🚀 Features

🔐 User Registration & Login (JWT-based)

📦 Product CRUD (Create, Read, Update, Delete)

🛒 Cart Management (Add/Remove/Update items)

💳 Checkout & Order Placement

🔎 Admin Features (Product management)

🌐 RESTful API structure


## 🛠 Tech Stack
Tech	    Description
Node.js	    JavaScript runtime
Express	    Minimal web framework for Node
MongoDB	    NoSQL database
Mongoose	MongoDB object modeling
JWT	User    authentication
dotenv	    Manage environment variables

## 🔐 Environment Variables

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

## ⚙️ Setup & Installation

```bash
git clone https://github.com/iamkhalidhussein/E-Commerce-Server.git
```

```bash
cd ecommerce-backend
```

```bash
npm install
```

Add a .env file

```bash
npm run dev
```