const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

// Correct imports for routes
const authRoutes = require('./routes/authController');  // ✅ Corrected
const recipeRoutes = require('./routes/recipeRoutes');  // ✅ Corrected

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON data
app.use(express.json());  
app.use(express.json()); // ✅ Parses JSON request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS with specific configuration
app.use(cors({
    origin: 'http://localhost:3000',  
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,  
}));

// Use the routes
app.use('/api/auth', authRoutes);  
app.use('/api/recipes', recipeRoutes);  // ✅ No need to add `protect` here, it's in route definitions

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
