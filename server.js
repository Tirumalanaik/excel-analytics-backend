const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Import and use routes
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/upload');

app.use('/api', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const emailRoutes = require('./routes/email');
app.use('/api/email', emailRoutes);
