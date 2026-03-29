const jwt = require('jsonwebtoken')
function authMiddleware(req,res,next){
    const token = req.headers.token;
    if(!token){
        return res.status(400).json({
            message : "token is missing"
        })
    }
    try {
        const decoded = jwt.verify(token,"8q7&^g0r980h!@#");
        const userId = decoded.userId;
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