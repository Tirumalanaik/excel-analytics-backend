const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
    const settings = await Settings.findOne({});
    res.json(settings);
};

exports.updateSettings = async (req, res) => {
    const updated = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updated);
};
