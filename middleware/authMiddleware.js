const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const token = req.cookie.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized/No token"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        
    }
}