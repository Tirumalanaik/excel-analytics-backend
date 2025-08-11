const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    //Only log in development mode
    if (process.env.NODE_ENV === 'development') {
        console.log('🔐 Admin Middleware - Token:', token);
    }

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        if (process.env.NODE_ENV === 'development') {
            console.log('✅ Admin Middleware - Decoded Token:', decoded);
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Admins Only' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error('❌ JWT Error:', err.message);
        return res.status(401).json({ message: 'Invalid or Expired Token' });
    }
};

module.exports = { verifyAdmin };
