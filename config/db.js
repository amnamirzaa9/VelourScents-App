const mongoose=require(`mongoose`);
exports.connectdb=async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("mongoDB connected");
  }
  catch(err){
    console.error(err.message);
    process.exit(1);
  }
}