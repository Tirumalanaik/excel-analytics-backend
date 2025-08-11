const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();


// Replace with actual Gmail app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/send', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const info = await transporter.sendMail({
            from: `"Admin" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });

        res.status(200).json({ message: '✅ Email sent', info });
    } catch (err) {
        console.error('❌ Error sending email:', err);
        res.status(500).json({ message: '❌ Email failed' });
    }
});

module.exports = router;
