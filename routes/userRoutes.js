const express =require("express")
const { registerUser, loginUser } = require("../controller/userController")
const authMiddleware = require("../middleware/authMiddleware")
const router=express.Router()

router.post("/register",registerUser)
router.post("/login", loginUser)

router.get("/test", authMiddleware, (req, res)=>{
    res.json("user route is work");
})
module.exports=router;