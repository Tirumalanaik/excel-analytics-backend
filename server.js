const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/upload'); // ✅ THIS MUST BE PRESENT

// Use routes
app.use('/api', authRoutes);
app.use('/api/upload', uploadRoutes); // ✅ USE ONLY ONCE

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
app.use('/api/admin', require('./routes/adminRoutes'));
