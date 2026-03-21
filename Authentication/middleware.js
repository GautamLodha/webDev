const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){
    // console.log(req.headers);
    const token = req.headers.token;
    if(!token){
        return res.status(400).json({
            message : "you are not authenticated for this"
        })
    }
    const decoded = jwt.verify(token,"gautam123")
    try {
            const decoded = jwt.verify(token,"gautam123");
            req.username = decoded.username;
            next();
    } catch (err) {
        return res.status(403).json({
            message : "Invalid token"
        })
    }
}

module.exports = {authMiddleware}