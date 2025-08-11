const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

dotenv.config();


require('./config/passport');

const app = express();

//Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Session middleware-required for OAuth
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection + Server Start
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");

        // Import Routes
        const authRoutes = require('./routes/authRoutes');
        const uploadRoutes = require('./routes/upload');
        const adminRoutes = require('./routes/adminRoutes');
        const emailRoutes = require('./routes/email');
        const profileRoutes = require('./routes/profile');

        //Mount Routes
        app.use('/api', authRoutes);      // REST login/register
        app.use('/auth', authRoutes);     
        app.use('/api/upload', uploadRoutes);
        app.use('/api/admin', adminRoutes);
        app.use('/api/email', emailRoutes);
        app.use('/api/profile', profileRoutes);

       
        app.use((req, res, next) => {
            console.log('❓ Unmatched route:', req.method, req.originalUrl);
            next();
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));
