const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const gravatar = require('gravatar');

const bcrypt = require('bcrypt');

const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

router.get('/', auth ,async(req, res) => {

  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json(user);

  } catch (error) {
     console.error(error.message);
  }
});

router.post(
  '/',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'make it correct').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: 'Invalid credintials' });
      }

       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
         return res.status(400).json({msg:'invalid credintials'});
       }
      
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('secretkey'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
