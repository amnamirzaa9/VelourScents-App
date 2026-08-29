const express = require('express');
const router = express.Router();
const Product = require("../model/product");

router.post(`/add-to-cart/:id`,async(req,res)=>{
  try{
      
     const id=req.params.id;
     const quantity=parseInt(req.body.quantity) || 1;
  const addedproduct=await Product.findOne({_id:id});
  if(!req.session.cart){
     req.session.cart=[];
  }
    req.session.cart.push({
      _id:addedproduct._id,
      name:addedproduct.name,
      price:addedproduct.price,
      image: addedproduct.image,
    quantity:quantity,

    });
    res.redirect(`/shop?added=true`);
  }
 catch(err){
  console.error(err.message);
 }
})
router.get(`/cart`,(req,res,)=>{
  try{
     const user = req.session.user || null;
    const cartcount = (req.session.cart || []).length;
   
    const cart=req.session.cart || [];
  let subtotal=0;
  cart.forEach(item => {
     subtotal+=item.price*item.quantity;
  });
  res.render(`cart`,{
    subtotal:subtotal,
    activepage:'',
    cart:cart,
    title:'Cart',
    cartcount:cartcount,
    user:user
   
    
  })
  }
  catch(err){
    console.error(err.message);
  }

    
})
router.post(`/remove-from-cart/:index`,(req,res)=>{
  try{
    
    const index = parseInt(req.params.index);
        const cart = req.session.cart || [];
        cart.splice(index, 1);
  req.session.cart=cart;
  res.redirect(`/cart`);
  }
  catch(err){
    console.error(err.message);
  }

})
module.exports=router;