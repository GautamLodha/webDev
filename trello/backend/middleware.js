const jwt = require('jsonwebtoken')
function authMiddleware(req,res,next){
    const token = req.headers.token;
    if(!token){
        return res.status(400).json({
            message : "token is missing"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("decoded", decoded);
        
        const userId = decoded.userId;
        console.log("middleware.js", userId);
        req.userId = userId
        next();
    } catch (error) {
        return res.status(400).json({
            message : "token is not right"
        })
    }
}
module.exports = {
    authMiddleware
}