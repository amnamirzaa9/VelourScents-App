  require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const { connectdb } = require('./config/db');

// Initialize database connection
connectdb();

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'yahyamirza',
  resave: false,
  saveUninitialized: true
}));

// View engine setup & static files
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const pageRoutes = require('./routes/pageRoutes');
const productRoutes = require('./routes/productRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Mount Routes
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(pageRoutes);
app.use(productRoutes);
app.use(quizRoutes);

// Dynamic Port Assignment for Railway / Production
const PORT_NUMBER = process.env.PORT || 3000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server started on port ${PORT_NUMBER}`);
});












