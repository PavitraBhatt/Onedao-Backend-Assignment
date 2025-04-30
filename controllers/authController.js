const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const otpGenerator = require('../utils/otpGenerator');

const blockedCountries = ['Syria', 'Afghanistan', 'Iran'];

exports.register = async (req, res) => {
  try {
    const { email, password, country } = req.body;
    if (blockedCountries.includes(country)) {
      return res.status(403).json({ error: 'Registration from your country is not allowed.' });
    }
    const otp = otpGenerator();
    const user = await userModel.createUser(email, password, country, otp);
    // Send OTP via email (placeholder)
    res.status(201).json({ message: 'User registered, OTP sent.', user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.verifyOTP(email, otp);
    if (user) {
      res.status(200).json({ message: 'OTP verified.' });
    } else {
      res.status(400).json({ error: 'Invalid OTP.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during OTP verification.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (!user || user.password !== password || !user.otp_verified) {
      return res.status(401).json({ error: 'Invalid credentials or OTP not verified.' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};
