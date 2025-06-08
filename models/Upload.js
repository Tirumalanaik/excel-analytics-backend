const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data: Array,
    originalname: String,
    size: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Upload', uploadSchema);
