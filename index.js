const express =require("express")
const connectDB=require("./config/db")
const useRoute=require("./routes/userRoutes")
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors")

const app=express()
connectDB();
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ your frontend URL
    credentials: true,              // ✅ allow cookies / Authorization header
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api",useRoute);

PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server connected to http://localhost:${PORT}`);  
})