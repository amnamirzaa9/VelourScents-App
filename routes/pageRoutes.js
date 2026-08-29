const express = require('express');
const router = express.Router();
 
router.get('/contact', (req, res) => {
    res.render('contact', {
        activepage: 'contact',
        title: 'Contact Us',
        cartcount: (req.session.cart || []).length,
        user: req.session.user || null,
        success: false
    });
});
 router.get(`/faq`,(req,res)=>{
  const user= req.session.user || null;
   const cartcount=(req.session.cart || []).length;
  res.render(`faq`,{activepage:'',
    title:'FAQs',
    cartcount:cartcount,
    user:user
  });
 })
 router.get(`/shipping-returns`,(req,res)=>{
  const user= req.session.user || null;
   const cartcount=(req.session.cart || []).length;
  res.render(`shipping-returns`,{activepage:'',
    title:'shipping-returns',
    cartcount:cartcount,
    user:user
  });
 })
 router.get(`/aboutus`,(req,res)=>{
  const user= req.session.user || null;
   const cartcount=(req.session.cart || []).length;
  res.render(`aboutus`,{activepage:'aboutus',
    title:'aboutus',
    cartcount:cartcount,
    user:user
  });
 })
 router.post(`/contact`,(req,res)=>{
   const { name, email, message } = req.body;
     
     if (!name || !email || !message) {
         return res.status(400).send('Please fill all required fields.');
     }
     
     console.log('Contact form submission:');
     
     
     res.render('contact', {
         activepage: 'contact',
         title: 'Contact Us',
         cartcount: (req.session.cart || []).length,
         user: req.session.user || null,
         success: true
     });
 })
 module.exports=router;