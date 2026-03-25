const express = require('express')
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('./middleware')

let notes = []
let users = []

const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/gauta/OneDrive/Desktop/webDev/Authentication/index.html')
})
app.get('/signIn',(req,res)=>{
    res.sendFile('C:/Users/gauta/OneDrive/Desktop/webDev/Authentication/signIn.html')
})
app.get('/signUp',(req,res)=>{
    res.sendFile('C:/Users/gauta/OneDrive/Desktop/webDev/Authentication/signUp.html')
})
app.post('/signIn',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(u=>u.username === username && u.password === password)
    if(!user){
        return res.status(400).json({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({username : username},"secret")
    return res.status(200).json({
        token : token
    })
})
app.post('/signUp',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(u=>u.username === username)
    if(user){
        return res.status(200).json({
            message : "user already exist"
        })
    }
    users.push({username,password})
    return res.status(200).json({
        message : "sign up successful"
    })

})
app.get('/notes',authMiddleware,(req,res)=>{
    const username = req.username
    const note = notes.filter(n=>n.username === username);
    res.json({
        note : note
    })
})
app.post('/notes',authMiddleware,(req,res)=>{
    const username = req.username
    const note = req.body.note
    notes.push({username,note}) 
    res.json({
        message : "done"
    })   
})

app.listen(3000)
