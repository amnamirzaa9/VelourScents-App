const mongoose=require(`mongoose`);
exports.connectdb=async ()=>{
  try{
    await mongoose.connect("mongodb+srv://amnamirzaa9_db_user:PgudAMKbzvMacovn@cluster0.059j3hg.mongodb.net/?appName=Cluster0");
    console.log("mongoDB connected");
  }
  catch(err){
    console.error("error.message");
    process.exit(1);
  }
}
