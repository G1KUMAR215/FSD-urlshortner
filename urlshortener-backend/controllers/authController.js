const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = new User({ firstName, lastName, email, password });
        await user.save();

        // Send activation email
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const url = `${process.env.FRONTEND_URL}/activate/${token}`;
        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
        });
        
        await transporter.sendMail({
            to: user.email,
            subject: 'Activate your account',
            html: `Click <a href="${url}">here</a> to activate your account.`
        });

        res.status(201).json({ message: 'User registered, please check your email to activate your account' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (!user.isActive) return res.status(400).json({ message: 'Account not activated' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
