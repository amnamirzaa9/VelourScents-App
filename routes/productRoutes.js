const express = require('express');
const router = express.Router();
const Product = require("../model/product");
//shop
router.get(`/shop`,async(req,res)=>{

  try{
    const user= req.session.user || null;
     const cartcount=(req.session.cart || []).length;
    const women= await  Product.find({category:'women'});
 const men=await Product.find({category:'men'});
 const newarrivals=await Product.find({category:'new-arrivals'});
  res.render(`shop`,{
    activepage:'shop',
    title:'shop',
    women:women,
    men:men,
    newarrivals:newarrivals,
    added:req.query.added,
    cartcount:cartcount,
    user:user
  });
  }
  catch(err){
    console.error(err.message);
  }
 })
  //product-detail
  router.get(`/product-detail/:id`,async(req,res)=>{
      try{
        const user= req.session.user || null;
         const cartcount=(req.session.cart || []).length;
        const id=req.params.id;
        const viewproduct= await Product.findOne({_id:id});
        const someotherproducts=await Product.find({ _id: { $ne: id } }).limit(3);
        res.render(`product-detail`,{activepage:'',
          title:'Product-Detail',
          product:viewproduct,
          someotherproducts:someotherproducts,
          cartcount:cartcount,
          user:user
        });
      }
      catch(err){
        console.error(err.message);
      }
    
   })
   //home-products
   router.get('/', async (req, res) => {
       const cartcount = (req.session.cart || []).length;
       const user = req.session.user || null;
       const bestsellers = await Product.find({}).limit(3);
       
       res.render('index', {
           activepage: 'home',
           title: 'VelourScents',
           cartcount,
           user,
           bestsellers
       });
   });
   //search
   router.post('/search', async (req,res)=>{
     try{
        const cartcount=(req.session.cart || []).length;
       const user= req.session.user || null
           console.log("SEARCH ROUTE REACHED!");
       const searchedproduct=req.body.search;
         if (!searchedproduct) {
               return res.redirect('/');
           }
       console.log("Searched:", searchedproduct);
     const products = await product.find({
               name: { $regex: searchedproduct, $options: 'i' }
           });
   
     res.render('search',{products,activepage:'',title:'Search',cartcount:cartcount,user:user})
     }
     catch(err){
       console.error(err);
       res.status(500).send('something went wrong!')
     }
     
   
   })
  module.exports=router;