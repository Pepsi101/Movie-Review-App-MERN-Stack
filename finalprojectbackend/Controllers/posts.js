const express = require('express');
const router = express.Router();

const User = require('../Models/User');
const Post = require('../Models/Post');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator'); 




router.get('/',auth, async(req, res) => {
  try {
    const posts = await Post.find().sort({data: -1});
     res.json(posts)
    
  } catch (error) {

    console.error(error.message);
    
  }
     
});

router.post('/mypost',auth, async(req, res) => {
  
  try {
    const post = await Post.find({user:req.body.id});
     res.json(post)
    
  } catch (error) {

    console.error(error.message);
    
  }
     
});

router.post('/findpost',auth, async(req, res) => {
  
  try {
    const post = await Post.find({shows:req.body.shows});
     res.json(post)
    
  } catch (error) {

    console.error(error.message);
    
  }
     
});

router.post('/',[auth,
  [
    check('text','Text is required')
    .not()
    .isEmpty(),
    check('image','image is required')
    .not()
    .isEmpty()
  ]
  ],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    try {

      const user = await User.findById(req.user.id).select('-password');
      const post = new Post({
          text : req.body.text,
          image : req.body.image,
          shows : req.body.shows,
          name : user.name,
          avatar: user.avatar,
          user: req.user.id
      })
      await post.save();
      res.json(post);
      
    } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
    }
      
})

//get post ByID

router.get('/:id',auth, async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
     if(!post){
         return res.status(404).json({msg: 'post is not found'})
     }
     res.json(post)
    
  } catch (error) {

    if(err.kind=='Object'){
       return res.status(404).json({msg:'post is not found'});
    }

    console.error(error.message);
    
  }
     
});

router.delete('/:id',auth, async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);

     await post.remove();
     res.json({msg:'Post Removed'})
    
  } catch (error) {

    if(err.kind === 'Object'){
       return res.status(404).json({msg:'post is not found'});
    }
    console.error(error.message); 
  }
});


router.put('/like/:id',auth, async(req,res)=>{
  
      try {
          const post = await Post.findById(req.params.id);
          if(post.likes.filter(like=> like.user.toString() === req.user.id).length>0){
                  const removeLike = post.likes.map(result => result.user.toString()).indexOf(req.user.id);
                  post.likes.splice(removeLike, 1)
                  await post.save();

                  
             return res.status(200).json({msg:'You have already liked'});
          }
          console.log('done');
          post.likes.unshift({user: req.user.id});
          console.log(post.likes);
          await post.save();
          console.log('done 3');
          await post.save();
          res.json(post.likes);

      } catch (error) {
         console.error(error.message);
      }

})

router.delete('/unlike/:id',auth, async(req,res)=>{
  
  try {
      const post = await Post.findById(req.params.id);
      if(post.likes.filter(like=> like.user.toString() === req.user.id).length==0){
         return res.status(400).json({msg:'You have not liked that'});
      }
       
      const removeLike = post.likes.map(result => result.user.toString()).indexOf(req.user.id);
      post.likes.splice(removeLike, 1)
      await post.save();

      res.json({msg:'You have removed the like react'});

  } catch (error) {
     console.error(error.message);
  }

})

router.put('/comment/:id',[auth,
  [
    check('text','Text is required')
    .not()
    .isEmpty()
  ]
  ],async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    try {

      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      
      const newComment = {
          text : req.body.text,
          name : user.name,
          avatar: user.avatar,
          user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
      
    } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
    }
      
})

router.delete('/comment/:postId/:commentId',auth,
  async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    try {

      
      const post = await Post.findById(req.params.postId);
      if(!post){
         return res.json({msg:'there is not post'})
      }

      const comment = post.comments.find(result => result._id.toString() === req.params.commentId);
      if(!comment){ 
        return res.json({msg:'there is not comments available '})
      }

      if(comment.user.toString() !== req.user.id){
          return res.json({msg:'you are not authurized'});
      };
      const removedComment=post.comments.map(result=> result._id.toString()).indexOf(req.params.commentId);     
      post.comments.splice(removedComment,1);
      await post.save();
      res.json(post.comments);
      
    } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
    }
      
})

module.exports = router;
