const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
// const { validate } = require('../models/User')

const router = express.Router();

const User = require('../models/User');
const { JsonWebTokenError } = require('jsonwebtoken');
// @route   POST/api/users
// @desc    Created a User
// @acc     Public

router.post(
  '/',
  [
    check('name', 'Please Add a Name').not().isEmpty(),
    check('email', 'Please Enter an Email first').isEmail(),
    check('password', 'Your password should be 6 characters long').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    let { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User Already Exist' });
      }

      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
