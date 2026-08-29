const mongoose=require(`mongoose`);
const productschema=mongoose.Schema({

name:{type:String,required:true},
price:{type:Number,required:true},
description:{type:String},
category:{type:[String],required:true},
image:{type:String},
//new features
gender:{type:[String]},
occasion:{type:[String]},
weather: { type: [String] },          
    scentProfile: { type: String },      
    projection: { type: String },         
    longevity: { type: String },          
    adventurousness: { type: String },
    

})
module.exports=mongoose.model('Product',productschema);