const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); 
const { register, login } = require('../controllers/authController');

// login in local
router.post('/register', register);
router.post('/login', login);

//Google auth
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
}));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
        session: false
    }),
    async (req, res) => {
        if (!req.user) return res.redirect(`${process.env.FRONTEND_URL}/login`);

        const { emails, displayName } = req.user;
        const email = emails?.[0]?.value?.toLowerCase() || '';
        const name = displayName || '';

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email, role: 'user', password: '' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const redirectUrl = `${process.env.FRONTEND_URL}/oauth?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&role=${user.role}`;
        res.redirect(redirectUrl);
    }
);


// github auth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
        session: false
    }),
    async (req, res) => {
        if (!req.user) return res.redirect(`${process.env.FRONTEND_URL}/login`);

        const { emails, displayName, username } = req.user;
        const email = emails?.[0]?.value?.toLowerCase() || 'unknown@example.com';
        const name = displayName || username || 'GitHub User';

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email, role: 'user', password: '' });
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );


        const redirectUrl = `${process.env.FRONTEND_URL}/oauth?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&role=${user.role}`;
        res.redirect(redirectUrl);
    }
);

module.exports = router;
