// middleware/Upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ✅ Absolute path to 'uploads/profile-pics' folder
const uploadDir = path.join(__dirname, '../uploads/profile-pics');

// ✅ Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the absolute path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
