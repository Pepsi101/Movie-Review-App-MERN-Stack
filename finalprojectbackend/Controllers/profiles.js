const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator'); 
// get profile api 
const Profile = require('../Models/profile');
const User = require('../Models/User');

router.get('/me', auth, async(req, res) => {

  try {
        
      const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name' ,'avatar']);
      if(!profile){
          return res.status(400).json({msg: 'there is nor profile available right now'});

      }
      
      res.status(200).json(profile);

    
  } catch (error) {

    console.error(error.message);
    res.status(500).send('Server Error')
  }
});

router.get('/all/:id', auth, async(req, res) => {

  try {
        
      const profile = await Profile.findOne({user: req.params.id}).populate('user', ['name' ,'avatar']);
      if(!profile){
          return res.status(400).json({msg: 'there is nor profile available right now'});

      }
      
      res.status(200).json(profile);

    
  } catch (error) {

    console.error(error.message);
    res.status(500).send('Server Error')
  }
});

router.get('/:id', auth, async(req, res) => {

  try {
        
      const profile = await Profile.findOne({user: req.params.id}).populate('user', ['name' ,'avatar']);
      console.log(profile);
      if(!profile){
          return res.status(400).json({msg: 'there is no profile available right now'});

      }     
      res.status(200).json(profile); 

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
});
router.post('/', [auth
], async(req,res)=>{
   
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});     
   }

  const {
     profileimage,
     coverimage,
     bio,
     address,
     phone,
     status,
     youtube,
     facebook,
     twitter,
     instagram,
     linkedin
  } = req.body;
  
   const profileFields ={};

    profileFields.user = req.user.id;
    if(profileimage) profileFields.profileimage = profileimage;
    if(coverimage) profileFields.coverimage= coverimage;
    if(bio) profileFields.bio = bio;
    if(address) profileFields.address = address;
    if(phone) profileFields.phone = phone;
    if(status) profileFields.status= status;

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    

    try {
       
       let profile = await Profile.findOne({user: req.user.id});
       if(profile){ 
           profile = await Profile.findOneAndUpdate(
             {user: req.user.id},
             {$set: profileFields},
             {new: true}
             );
             return res.json(profile);
       }

       profile = new Profile(profileFields);
       await profile.save();

       res.json(profile);

    } catch (error) {

       console.error(error.message);
      
    }
}
);

router.get('/', auth, async(req,res)=>{
      try {
        
          const profiles = await Profile.find().populate('user',['name','avatar']);

          res.json(profiles);

      } catch (error) {
         console.log(error.message);
      }
})

router.delete('/', auth, async(req,res)=>{

   try {

      await Profile.findOneAndRemove({user: req.user.id});

      await User.findByIdAndRemove(req.user.id);

      res.json({msg:'User Deleted'});
      
   } catch (error) {

       console.error(error.message);
       res.status(400).json({msg: "something went wrong!!"});
      
   }
})

router.put('/watchlist', [auth], async(req,res)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});     
   }

      const {
         title,
         image,
         ratting,
         tmdb
      } = req.body


      const exp = {
         title,
         image,
         ratting,
         tmdb
      }

       try {
            
            const profile = await Profile.findOne({user: req.user.id});
            profile.watchlist.unshift(exp);

            await profile.save();
            res.json(profile);

          
       } catch(error) {

         console.error(error.message);
         res.status(400).json({msg: 'found nothing'});
          
       }

})

router.delete('/watchlist/:idx', auth, async(req,res)=>{
   
     try {
        
        const profile = await Profile.findOne({user: req.user.id});
        
        await profile.watchlist.pull({ _id: req.params.idx });

        await profile.save();
        res.json(profile);
     } catch (error) {
        console.error(error.message);
        res.status(400).json({msg:'check the console'});
     }
      

})

router.put('/education', [auth,[
    check('school','School is required').not().isEmpty(),
    check('fieldofstudy',"Field of Study is required").not().isEmpty(),
    check('from',"From is required").not().isEmpty()
]],async(req,res)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});     
   }

     const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
     } = req.body;

     const details = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
     }

     try {

        const profile = await Profile.findOne({user: req.user.id});

        console.log(profile)
         
        profile.education.unshift(details);

        await profile.save();

        res.json(profile);
        
     } catch (error) {
         
        console.error(error.message);
        
     }
        
})


router.delete('/education/:exp_id', auth, async(req,res)=>{
   
   try {
      
      const profile = await Profile.findOne({user: req.user.id});
      const removeIndex = profile.education.map(result => result._id).indexOf(req.params.exp_id);
      profile.education.splice(removeIndex, 1);

      await profile.save;
      res.json(profile);
   } catch (error) {
      console.error(error.message);
      res.status(400).json({msg:'check the console'});
   }
    

})

module.exports = router;
