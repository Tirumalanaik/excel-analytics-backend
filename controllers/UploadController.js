const Upload = require('../models/Upload');

exports.saveChartOptions = async (req, res) => {
    const { id } = req.params;
    const { chartData, chartType, chartTitle, axisLabels, trendLine } = req.body;

    try {
        const updatedUpload = await Upload.findByIdAndUpdate(
            id,
            { chartData, chartType, chartTitle, axisLabels, trendLine },
            { new: true, runValidators: true }
        );

        if (!updatedUpload) {
            return res.status(404).json({ message: 'Upload not found' });
        }

        res.json({ message: '✅ Chart configuration saved successfully.', upload: updatedUpload });
    } catch (err) {
        console.error('❌ Error saving chart options:', err);
        res.status(500).json({ message: 'Server error while saving chart configuration.' });
    }
};
