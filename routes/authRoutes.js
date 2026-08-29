const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/user');

router.post(`/register`,async(req,res)=>{
  try{
    
    const {name,email,password}=req.body;
    const alreadyregistered= await User.findOne({email:email});
    if(alreadyregistered){
     return res.status(400).json({error:'Email already registered'})
    }
    const hashedpassword = await bcrypt.hash(password, 10); 
    const newUser= await User.create({name,email,password:hashedpassword});
     req.session.user = { name: newUser.name, email: newUser.email, id: newUser._id }
     return res.json({success:true,message:'Account created successfully'})
  }
  catch(err){
       if (err.code === 11000) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' })
  }
})

router.post(`/login`,async(req,res)=>{
  try{
    const {email,password}=req.body;
    //adding validation
    if(!email || !password){
     return res.status(400).json({error:'Email and password are required'});

    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
       return res.status(400).json({ error: 'Invalid email format' });
    }
    const matcheduser=await User.findOne({email:email});
    if(!matcheduser){
      return res.status(400).json({error:'Invalid email or password'});
    }
    const matchedpassword = await bcrypt.compare(password, matcheduser.password);
    if(!matchedpassword){
      return res.status(400).json({error:'Invalid email or password'});
    }
   req.session.user = { 
    name: matcheduser.name, 
    email: matcheduser.email, 
    id: matcheduser._id 
}
   return res.json({ success: true, message: 'Logged in successfully'})
  }
  catch(err){
    console.error(err.message);
   return res.status(500).json({error: 'Something went wrong'})
  }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

module.exports = router;