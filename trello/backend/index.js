const express = require('express')
const jwt = require('jsonwebtoken')

let USERS_ID = 1;
let ORGANISATIONS_ID = 1;
let BOARD_ID = 1;
let ISSUES_ID = 1;

const USERS = [];
const ORGANIZATIONS = [];
const BOARDS = [];
const ISSUES = [];

const app = express()

app.use(express.json());

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = USERS.find(u=>u.username === username);
    if(user){
        return res.status(411).json({
            message : "user with this name already exist"
        })
    }
    USERS.push({
        username : username,
        password : password,
        id : USERS_ID++
    })
    res.json({
        message : "you have signed in successfully"
    })

})

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = USERS.find(u=>u.username === username && u.password === password);
    if(!user){
        return res.status(403).json({
            message : "Invalid credentials"
        })
    }
    const token = jwt.sign({
        userId : user.id
    },"8q7&^g0r980h!@#")
    res.json({
        token : token
    })
})

// AUTHENTICATED ROUTE - MIDDLEWARE
app.post("/organization", (req, res) => {
    
})

app.post("/add-member-to-organization", (req, res) => {
    
})

app.post("/board", (req, res) => {
    
})

app.post("/issue", (req, res) => {
    
})

//GET endpoints
app.get("/organization", (req, res) => {
    
})

app.get("/boards", (req, res) => {

    
})

app.get("/issues", (req, res) => {
    
})

app.get("/members", (req, res) => {

})


// UPDATE
app.put("/issues", (req, res) => {

})

//DELETE -- FIND THE GBUG and fix it
app.delete("/members", (req, res) => {
    
})

app.listen(3000);

