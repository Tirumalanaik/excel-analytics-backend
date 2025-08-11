
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
router.use((req, res, next) => {
    console.log('➡️ Profile Route Hit:', req.method, req.originalUrl);
    next();
});


const upload = require('../middleware/Upload');

const {
    getProfile,
    updateProfile,
    changePassword,
    enable2FA,
    disable2FA
} = require('../controllers/ProfileController');

// GET /api/profile — get logged-in user profile
router.get('/', verifyToken, getProfile);

// PUT /api/profile — update name, email, phone, and upload profile picture
router.put('/', verifyToken, upload.single('profilePic'), updateProfile);

// PUT /api/profile/password — change password
router.put('/password', verifyToken, changePassword);

// POST /api/profile/2fa/enable — enable 2FA
router.post('/2fa/enable', verifyToken, enable2FA);

// POST /api/profile/2fa/disable — disable 2FA
router.post('/2fa/disable', verifyToken, disable2FA);

module.exports = router;

