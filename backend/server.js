// ! server.js is the heart of the app. It initializes the Express server,
// ! connects to MongoDB using Mongoose, sets up middlewares for JSON parsing
// ! and CORS, and mounts routes for auth and blogs.
// commonModule js file type

const express = require('express');
// const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

// dotenv loads variables from .env
const dotenv = require('dotenv');
// cors allows API to be called from another domain
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file
const app = express(); // Initialize an Express app

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware - Enables CORS for frontend to access backend

app.use('/api/posts', postRoutes); // Mount post routes at /api/posts
// Routes
app.use('/api/auth', authRoutes); // Mount auth routes at /api/path

app.get('/', (re, res) => {
    res.send('API is running...');
})


// ✅ Connect to DB and Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});