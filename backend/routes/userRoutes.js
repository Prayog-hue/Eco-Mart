const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    if (role && !['customer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    user = new User({ name, email, password, role });
    await user.save();

    const payload = { user: { _id: user._id, role: user.role } };

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20h' }, (err, token) => {
      if (err) {
        console.error('JWT signing error:', err.message);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = { user: { _id: user._id, role: user.role } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20h' }, (err, token) => {
      if (err) {
        console.error('JWT signing error:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json({
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token,
      });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/profile
// @desc    Get authenticated user's profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    console.error('Profile fetch error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;