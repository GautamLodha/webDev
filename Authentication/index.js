const express = require('express')
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware');
let notes = [];
let users = [{
    username : "gautam",
    password : "123456"
}]

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/gauta/OneDrive/Desktop/webDev/Authentication/index.html');
})
app.get('/signin',(req,res)=>{
    res.sendFile('C:/Users/gauta/OneDrive/Desktop/webDev/Authentication/sign.html')
})
app.get('/signup',(req,res)=>{
    res.sendFile('C:/Users/gauta/OneDrive/Desktop/webDev/Authentication/signup.html')
})

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password
    const user = users.find(u => u.username === username && u.password === password)
    if(!user){
        return res.status(403).json({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({
        username : username
    },"gautam123")
    res.json({
        token : token
    })
})

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password
    const user = users.find(u => u.username === username)
    if(user){
        return res.status(403).json({
            message : "user already exist"
        })
    }
    
    users.push({username,password})

    return res.status(200).json({
        message : "sign up succesfully"
    })
})

app.get('/notes',authMiddleware,(req,res)=>{
    const username = req.username;
    const note = notes.filter(u=>u.username === username)
    res.json({
        note : note
    })
})
app.post('/notes',authMiddleware,(req,res)=>{
    const username = req.username;
    const note = req.body.note
    notes.push({note,username})
    res.json({
        message : "done"
    })
})
app.listen(3000,()=>{
    console.log("server is running at the 3000");
})