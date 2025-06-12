const User = require('../models/User');
const Upload = require('../models/Upload');

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password'); // hide password
    res.json(users);
};

exports.getAllUploads = async (req, res) => {
    const uploads = await Upload.find().populate('userId', 'email');
    res.json(uploads);
};

exports.getAllCharts = async (req, res) => {
    const uploads = await Upload.find({ chartData: { $exists: true } });
    const charts = uploads.map(u => ({
        fileName: u.fileName,
        chartType: u.chartType,
        uploadedBy: u.user,
    }));
    res.json(charts);
};

exports.getStats = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalFiles = await Upload.countDocuments();
    const totalCharts = await Upload.countDocuments({ chartData: { $exists: true } });

    res.json({ totalUsers, totalFiles, totalCharts });
};
