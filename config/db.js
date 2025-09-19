const mongoose=require("mongoose")
require("dotenv").config();
const connectDB =async ()=>{
    try {
      await mongoose.connect(process.env.MONGOURI) 
      console.log("Database Connected");
      
    } catch (error) {
        console.error("MongoDB Connection Error",error);   
    }
}
module.exports =connectDB;