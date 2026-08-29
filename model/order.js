const mongoose=require(`mongoose`);
const orderschema=mongoose.Schema({
userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
},
items:{type:[Object],required:true},
subtotal:{type:Number,required:true},
shipping:{type:Object},
status:{type:String,default:'pending'},

},{timestamps:true})
module.exports=mongoose.model('order',orderschema);