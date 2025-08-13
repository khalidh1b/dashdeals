const express = require('express');
const app = express();
const cors = require('cors');
const {connectDB} = require('./config/db.js');
const { port } = require('./config/config.js');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Dash Deals server running here....');
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`DashDeal server running on port ${port}`);
    });
});