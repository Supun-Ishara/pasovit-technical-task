const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
dbConnect();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/user', require('./routes/authRoute'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/cart', require('./routes/cartRoute'));
app.use('/api/order', require('./routes/orderRoute'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Clothing E-commerce API is running!' });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});