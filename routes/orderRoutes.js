const express = require('express');
const router = express.Router();
const order = require("../model/order");
router.get("/checkout", (req, res) => {
  const user= req.session.user || null;
  const cart = req.session.cart || [];
   const cartcount=(req.session.cart || []).length;
  if (cart.length === 0) {
    return res.redirect("/cart");
  }
  let subtotal=0;
cart.forEach(item=>{
  subtotal+=item.price*item.quantity;
 })

  res.render("checkout",{cartcount:cartcount, activepage:'',title:'checkout',subtotal:subtotal,user:user});
});
router.post(`/checkout`, async (req,res)=>{
  try{
    const user= req.session.user || null;
 const cart= req.session.cart || [];
 if(cart.length===0){
  return res.redirect(`/cart`);
 }
 let subtotal=0;
 const {firstname,lastname,address,phonenumber,city,code,paymentMethod,sameAddress,saveInfo}=req.body;
 if(!firstname || !lastname || !address  || !phonenumber || !city || !paymentMethod ){
 return res.status(400).send(`Fill all the required fields`);
 }
 cart.forEach(item=>{
  subtotal+=item.price*item.quantity;
 })
 const namepattern=/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
 const phonepattern=/^03[0-9]{9}$/;
 if(!namepattern.test(firstname)){
  return res.status(400).send("Invalid first name")
 }
 if(!namepattern.test(lastname)){
  return res.status(400).send("Invalid first name")
 }
if (!phonepattern.test(phonenumber)) {
        return res.status(400).send("Invalid Pakistani phone number.");
 }
  const validCities = [
        "Islamabad",
        "Rawalpindi",
        "Lahore",
        "Karachi",
        "Multan",
        "Faisalabad",
        "Quetta"
    ];
    if(!validCities.includes(city)){
     return res.status(400).send(`invalid city selected.`)
    }
    if (code && !/^[0-9]{5}$/.test(code)) {
        return res.status(400).send("Invalid postal code.");
    }

    // Payment validation
    const validPaymentMethods = [
        "cod",
        "jazzcash",
        "easypaisa",
        "bank"
    ];
    if(!validPaymentMethods.includes(paymentMethod)){
     return res.status(400).send(`invalid payment selected`);
    }
     console.log("Checkout data is valid.");
    
     if(paymentMethod==='cod'){
  
    const orderdata = {
      
  items: cart,
  subtotal,
  shipping: {
    firstname,
    lastname,
    address,
    phonenumber,
    city,
    code,paymentMethod
  }
};
if(req.session.user){
  orderdata.userid=req.session.user.id;
}
else{
  orderdata.userid=null;
}
const newOrder = await order.create(orderdata);
req.session.cart=[];
  return res.render('orderconfirmation', {
                newOrder,
                cartcount: 0,
                activePage: '',
                title: 'Order Confirmed',
                user:user
            });
     }

     req.session.pendingorder = {
            items: cart,
            subtotal,
            shipping: { firstname, lastname, address, phonenumber, city, code, paymentMethod }
        };

    if(paymentMethod==='easypaisa'){
      return res.redirect(`/payment-easypaisa`);
    }
    if(paymentMethod==='jazzcash'){
      return res.redirect(`/payment-jazzcash`);
    }
    if(paymentMethod==='bank'){
      return res.redirect(`/payment-bank`);
    }
      

     
  }
  catch(err){
    console.error(err);
    res.status(500).send(`Something went wrong while placing your order.`)
  }
  

})
//payment easypaisa
router.get(`/payment-easypaisa`,(req,res)=>{
  const user= req.session.user || null;
  const pendingorder=req.session.pendingorder;
  if(!pendingorder){
    return res.redirect(`/cart`);
  }
  res.render('payment-easypaisa',{subtotal: pendingorder.subtotal,
        cartcount: 0,
        activepage: '',
        title: 'Easypaisa payment',
      user:user})
})
//payment bank
router.get(`/payment-bank`,(req,res)=>{
  try{
    const user= req.session.user || null;
    const pendingorder=req.session.pendingorder;
  if(!pendingorder){
    return res.redirect(`/cart`);
  }
  res.render('payment-bank',{subtotal: pendingorder.subtotal,
        cartcount: 0,
        activepage: '',
        title: 'Bank transfer',user:user})
  }
  catch(err){
    console.err(error);
    res.status(500).send(`something went wrong`)
  }
  
})
//payment jazzcash
router.get(`/payment-jazzcash`,(req,res)=>{
  try{
    const user= req.session.user || null;
    const pendingorder=req.session.pendingorder;
  if(!pendingorder){
    return res.redirect(`/cart`);
  }
  res.render('payment-jazzcash',{subtotal: pendingorder.subtotal,
        cartcount: 0,
        activepage: '',
        title: 'jazz cash transfer',
      user:user})
  }
  catch(err){
    console.error(err);
    res.status(500).send(`something went wrong`)
  }
  
       
        
})
//order confirmation
router.post(`/confirm-order`, async (req,res)=>{
  try{
     const user= req.session.user || null;
    const pendingorder=req.session.pendingorder;
    if(!pendingorder){
      return res.redirect(`/cart`);
    }
    const newOrder= await  order.create(pendingorder);
      res.render(`orderconfirmation`,{newOrder,cartcount:0,activepage:'',title:'OrderConfirmation',user:user});
      req.session.cart=[];
      req.session.pendingorder=null;

  }
  catch(err){
    console.error(err);
    res.status(500).send(`Something went wrong`);
  }
  


})
router.get('/orders',async (req, res) => {
    const user = req.session.user || null;
    const cartcount = (req.session.cart || []).length;
    
    if (!user) {
        return res.redirect('/');
    }
    const userorders=await order.find({userid:user.id});
    res.render('orders', {
        activepage: '',
        title: 'My Orders',
        cartcount,
        user,
        userorders
    });
});
module.exports = router; 