const User = require('../models/User');
const Upload = require('../models/Upload');

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password'); // to hide the pwd
    res.json(users);
};

exports.getAllUploads = async (req, res) => {
    const uploads = await Upload.find().populate('userId', 'email');
    res.json(uploads);
};

exports.getAllCharts = async (req, res) => {
    try {
        const charts = await Upload.find()
            .populate('userId', 'email') 
            .sort({ createdAt: -1 });
        res.json(charts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch charts' });
    }
};
exports.getStats = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalFiles = await Upload.countDocuments();
    const totalCharts = await Upload.countDocuments({ chartData: { $exists: true } });

    res.json({ totalUsers, totalFiles, totalCharts });
};
exports.getUploads = async (req, res) => {
    const uploads = await Upload.find({ userId: req.user.id });
    res.json(uploads);
};
