const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // ✅ Add this line
dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Static files (profile pics)

// ✅ MongoDB Connection + Server Start
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");

        // ✅ Import & Mount Routes AFTER DB connects
        const authRoutes = require('./routes/authRoutes');
        const uploadRoutes = require('./routes/upload');
        const adminRoutes = require('./routes/adminRoutes');
        const emailRoutes = require('./routes/email');
        const profileRoutes = require('./routes/profile');

        app.use('/api', authRoutes);
        app.use('/api/upload', uploadRoutes);
        app.use('/api/admin', adminRoutes);
        app.use('/api/email', emailRoutes);
        app.use('/api/profile', profileRoutes);
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

        // ✅ Optional: Log unmatched routes for debugging
        app.use((req, res, next) => {
            console.log('❓ Unmatched route:', req.method, req.originalUrl);
            next();
        });

        // ✅ Start server only after everything is ready
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));
