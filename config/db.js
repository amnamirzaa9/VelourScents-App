const mongoose = require('mongoose');

exports.connectdb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("CRITICAL ERROR: MONGO_URI is missing in Railway Environment Variables!");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI); 
    console.log("MongoDB connected successfully");
  } catch (err) {
    
    console.error("MongoDB Connection Error:", err.message);
  }
};
