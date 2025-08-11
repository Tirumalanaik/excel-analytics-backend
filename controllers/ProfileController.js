const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET /profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT /profile
exports.updateProfile = async (req, res) => {
    try {
        const updates = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        };
        if (req.file) {
            updates.profilePic = `/uploads/profile-pics/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating profile' });
    }
};

// PUT /password
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;


    try {
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();
        res.json({ message: 'Password updated' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update password' });
    }
};

// 2FA functions not working properly had to some adjustments.................
exports.enable2FA = (req, res) => res.json({ message: '2FA Enabled (mock)' });
exports.disable2FA = (req, res) => res.json({ message: '2FA Disabled (mock)' });
