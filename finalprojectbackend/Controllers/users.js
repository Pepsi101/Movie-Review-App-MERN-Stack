const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

const bcrypt = require('bcrypt');

const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  try{
  res.send('User users');
  res.status(200);
  }catch(error){
     console.log(error);
  }
});


router.get('/all' ,async(req, res) => {
  try {
    const user = await User.find();
     res.json(user)
    
  } catch (error) {

    console.error(error.message);
    
  }
     
});

router.post('/all' ,async(req, res) => {
  try {
    const user = await User.find({name:req.body.name});
    console.log(user)
     res.json(user)
    
  } catch (error) {

    console.error(error.message);
    
  }
     
});

router.delete('/:id', async(req, res) => {
  try {
    const user = await User.findById(req.params.id);

     await user.remove();
     res.json({msg:'User Removed'})
    
  } catch (error) {

    console.error(error.message); 
  }
});




router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', '6 degit password is required').isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: 'User is alreays exist' });
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        password,
        avatar
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
