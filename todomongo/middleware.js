const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    const token = req.headers.token;
    if(!token){
        return res.status(400).json({
            message : "token is not available"
        })
    }
    try {
        const decoded = jwt.verify(token,"secret")
        req.userId = decoded.userId;
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message : "not a valid token"
        })
    }
}
module.exports = {authMiddleware}