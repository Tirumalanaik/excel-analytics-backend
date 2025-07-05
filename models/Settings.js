const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    appName: String,
    logoUrl: String,
    passwordPolicy: String,
    sessionTimeout: Number,
    fileUploadLimitMB: Number,
    features: {
        aiSummary: Boolean,
        chartDownload: Boolean
    },
    apiKeys: {
        openAI: String
    },
    roles: [String]
});

module.exports = mongoose.model('Settings', settingsSchema);
