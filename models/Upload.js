const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data: Array,
    originalname: String,
    size: Number,
    createdAt: { type: Date, default: Date.now },
    chartData: {
        type: Object,
        default: null
    },
    chartType: { type: String, default: 'N/A' },
    chartTitle: { type: String, default: 'Untitled' },
    axisLabels: {
        x: { type: String, default: '' },
        y: { type: String, default: '' }
    },
    trendLine: {
        enabled: { type: Boolean, default: false },
        type: { type: String, default: 'linear' }
    }
});

module.exports = mongoose.model('Upload', uploadSchema);


