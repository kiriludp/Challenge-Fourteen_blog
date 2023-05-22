const router = require('express').Router();
const { Post, User, Comment, } = require('../models');

router.get("/",(req,res)=>{
  Post.findAll({
      include:[User]
  }).then(postData=>{
      const hbsData = postData.map(post=>post.get({plain:true}));
      console.log(hbsData);
      res.render("homepage",{
          allPosts:hbsData,
          logged_in: req.session.logged_in
      })
  })
})

router.get("/post/:id",(req,res)=>{
  Post.findByPk(req.params.id,{
      include:[User]
  }).then(postData=>{
      const hbsData = postData.get({plain:true});
      hbsData.logged_id=req.session.logged_id
      console.log(hbsData);
      res.render("Post",hbsData)
  })
})

router.get("/login",(req,res)=>{
  if(req.session.logged_in){
      return res.redirect("/profile")
  }
  res.render("login",{
      logged_in:req.session.logged_in
  })
})

router.get("/profile",(req,res)=>{
  if(!req.session.logged_in){
      return res.redirect("/login")
  } else {
      User.findByPk(req.session.user_id,{
          include:[Post]
      }).then(userData=>{
          const hbsData = userData.get({plain:true})
          console.log(hbsData)
          hbsData.logged_in=req.session.logged_in;
          res.render("profile",hbsData)
      })
  }
})
router.get("/comment/:id",(req,res)=>{
  Comment.findByPk(req.params.id,{
      include:[User]
  }).then(comtData=>{
      const hbsData = comtData.get({plain:true});
      hbsData.logged_id=req.session.logged_id
      console.log(hbsData);
      res.render("singlecomment",hbsData)
  })
})

module.exports = router;