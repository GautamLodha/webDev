const jwt = require('jsonwebtoken')
function authMiddleware(req,res,next){
    const token  = req.headers.token
    if(!token){
        return res.status(400).json({
            message : "You are not authenticated"
        })
    }
    try {
        const decoded = jwt.verify(token,"secret")
        req.username = decoded.username
        next()
    } catch (error) {
        return res.status(400).json({
            message : "Something went wrong"
        })
    }
}
module.exports = {authMiddleware}