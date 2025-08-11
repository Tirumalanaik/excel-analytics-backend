const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/admin');
const adminController = require('../controllers/adminController');
const User = require('../models/User');

router.get('/users', verifyToken, verifyAdmin, adminController.getAllUsers);
router.get('/uploads', verifyToken, verifyAdmin, adminController.getAllUploads);
router.get('/charts', verifyToken, verifyAdmin, adminController.getAllCharts); 
router.get('/stats', verifyToken, verifyAdmin, adminController.getStats);


router.get('/profile', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch admin profile' });
    }
});

module.exports = router;
