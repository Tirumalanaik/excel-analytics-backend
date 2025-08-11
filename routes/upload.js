const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const { verifyToken } = require('../middleware/auth');
const Upload = require('../models/Upload');
const uploadController = require('../controllers/uploadController'); 

// Memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST api Upload a file
router.post('/', verifyToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const newUpload = new Upload({
            userId: req.user.id,
            data: jsonData,
            originalname: req.file.originalname,
            size: req.file.size,
            createdAt: new Date()
        });

        await newUpload.save();
        res.status(201).json({ message: '✅ File uploaded and data saved.', count: jsonData.length });
    } catch (err) {
        console.error("❌ Upload error:", err);
        res.status(500).json({ error: 'Server error while uploading' });
    }
});

// Get all uploads for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const uploads = await Upload.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(uploads);
    } catch (err) {
        console.error('❌ Fetch history error:', err);
        res.status(500).json({ error: 'Server error while fetching uploads' });
    }
});

// Get one file by ID 
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const file = await Upload.findById(req.params.id).populate('userId', 'email'); 
        if (!file) return res.status(404).json({ message: "File not found" });
        res.json(file);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
// Delete a file by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedFile = await Upload.findByIdAndDelete(req.params.id);
        if (!deletedFile) return res.status(404).json({ message: "File not found" });
        res.json({ message: "File deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Save chart customization options
router.put('/chart/:id', verifyToken, uploadController.saveChartOptions); 

module.exports = router;
