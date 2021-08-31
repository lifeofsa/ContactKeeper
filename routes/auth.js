const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

// @route   GET/api/auth
// @desc    Get logged in user
// @acc     Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server Problem' });
  }
});

// @route   POST/api/auth
// @desc    Auth User & get Token
// @acc     Public
router.post(
  '/',
  [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ msg: 'please enter right credentials' });
      }

      const isCheck = await bcrypt.compare(password, user.password);
      if (!isCheck) {
        res.status(400).json({ msg: 'please enter right credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        },
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server ERROR');
    }
  },
);

module.exports = router;
