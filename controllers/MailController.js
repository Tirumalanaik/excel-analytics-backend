const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your Gmail address
        pass: process.env.EMAIL_PASS      // your Gmail app password
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);

    res.json({ message: '? Email sent', info });
  } catch (err) {
    console.error('? Email send failed:', err);
    res.status(500).json({ message: 'Failed to send email', error: err.message });
  }
};
