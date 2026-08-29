const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const {scoreProduct}=require('../utils/quizHelper');
router.get(`/quiz`,(req,res)=>{
  try{
    const user= req.session.user || null;
    const cartcount=(req.session.cart || []).length;
  res.render('quiz',{activepage:'quiz',title:'ScentIQ',cartcount:cartcount,user:user})
  }
  catch(err){
    console.error(err.message);
    res.status(400).send(`Something went wrong`);
  }
 
})
router.post(`/quiz`,async (req,res,next)=>{
  try{
    const user= req.session.user || null;
    const cartcount=(req.session.cart || []).length;
 
  const answers=req.body;
 
  
  const quizproducts=await Product.find({});
  if((quizproducts.length === 0)){
    console.log('no products found');
  }
 const calculatedproducts=  quizproducts.map(quizitem=>{
  const matchdata= scoreProduct(quizitem,answers);
  return{
    product:quizitem,      // Keeps full product details (name, price, image, etc.)
    score: matchdata.score, 
    results: matchdata.results
  }
 }
  );
 //sorting 1st three highest score products
 calculatedproducts.sort((a,b)=>b.score - a.score);
 const topthree=calculatedproducts.slice(0,3);
 res.render('result',{top:topthree,cartcount:cartcount,title:'ScentIQ-Result',activepage:'',user:user})

  }
  catch(err){
    console.error(err.message);
    res.status(400).send(`something went wrong!`)
  }
})
module.exports=router;