const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/admin');
const adminController = require('../controllers/adminController');



router.get('/users', verifyToken, verifyAdmin, adminController.getAllUsers);
router.get('/uploads', verifyToken, verifyAdmin, adminController.getAllUploads);
router.get('/charts', verifyToken, verifyAdmin, adminController.getAllCharts); // optional
router.get('/stats', verifyToken, verifyAdmin, adminController.getStats);

module.exports = router;
