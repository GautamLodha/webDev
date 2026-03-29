const express = require('express')
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware');

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
app.post("/organization", authMiddleware , (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;
    ORGANIZATIONS.push({
        id : ORGANISATIONS_ID++,
        title : title,
        description : description,
        admin : userId,
        members : []
    })
    return res.status(200).json({
        message : "org created",
        id : ORGANISATIONS_ID - 1
    })
})

app.post("/add-member-to-organization", authMiddleware,(req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserName = req.body.memberUserName;
    
    const organization = ORGANIZATIONS.find(o=>o.id === organizationId);
    console.log(organizationId,memberUserName,ORGANIZATIONS,userId,organization);
    
    if(!organization || organization.admin != userId){
        return res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })   
    }
    const memberUser = USERS.find(u => u.username === memberUserName);
    if(!memberUser){
        return res.status(411).json({
            message: "No user with this userId exists in our db"
        })
    }
    organization.members.push(memberUser.id)
    res.json({
        message: "New member added!"
    })
})

app.post("/board", (req, res) => {
    
})

app.post("/issue", (req, res) => {
    
})

//GET endpoints
app.get("/organization", authMiddleware ,(req, res) => {
    const userId = req.userId
    const orgId = parseInt(req.query.orgId);
    const org = ORGANIZATIONS.find(o => o.id === orgId );
    if(!org || org.admin != userId){
        return res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        }) 
    }
    const ans = ORGANIZATIONS.find(o=> o.id === orgId)
    return res.json(ans);

})

app.get("/boards", (req, res) => {

    
})

app.get("/issues", (req, res) => {
    
})

app.get("/members", authMiddleware , (req, res) => {

})


// UPDATE
app.put("/issues", (req, res) => {

})

//DELETE -- FIND THE GBUG and fix it
app.delete("/members", authMiddleware , (req, res) => {
    const userId = req.userId
    const orgId = parseInt(req.query.orgId);
    const wantTodelete = req.body.wantTodelete; 
    const org = ORGANIZATIONS.find(o => o.id === orgId );
    if(!org || org.admin != userId){
        return res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        }) 
    }
    const user = org.members.find(m => m === wantTodelete);
    if(!user){
        return res.status(411).json({
            message: "that user doesnt exist"
        }) 
    }
    org.members = org.members.filter(m => m != wantTodelete)
    return res.json({
        message : "user deleted succesfully"
    });
})

app.listen(3000);

