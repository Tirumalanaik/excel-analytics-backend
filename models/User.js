const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    phone: String,
    profilePic: String,
    loginHistory: [{ ip: String, timestamp: Date }],
    twoFA: {
        enabled: { type: Boolean, default: false },
        secret: String
    }
}, {
    timestamps: true // ✅ Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('User', userSchema);
