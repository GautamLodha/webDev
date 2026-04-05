const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const { authMiddleware } = require('./middleware');
const { userModel } = require('./models/users.model');
const { orgModel } = require('./models/organization.model');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db connection successful "))
.catch(()=>console.log("error while connectin db"))

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


app.post("/signup",async (req, res) => {


    try {
        const username = req.body.username;
        const password = req.body.password;

        console.log(username,password);
        

        const user = await userModel.findOne({username})
        console.log(user);
        
        if(user){
            return res.status(411).json({
                message : "user with this name already exist"
            })
        }
        const response = await userModel.create({
            username : username,
            password : password
        })
        console.log("response",response);
        
        res.json({
            id : response._id,
            message : "you have signup  successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }

    

})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({username})
    if(!user){
        return res.status(403).json({
            message : "Invalid credentials"
        })
    }
    const isMatch = await bcrypt.compare(password.toString(),user.password)
    if(!isMatch){
        return res.status(400).json({message : "Invalid credentials"})
    }
    const token = jwt.sign({
        userId : user._id
    },process.env.JWT_SECRET)
    res.json({
        token : token
    })
})


app.post("/organization", authMiddleware , async (req, res) => {
    const userId = req.userId;
    console.log(userId);
    
    const title = req.body.title;
    const description = req.body.description;
    

    const org = await orgModel.create({
        title,description,
        admin : userId,
        members : []
    })

    console.log(org.admin);
    

    return res.status(200).json({
        message : "org created",
        id : org._id
    })
})

app.post("/add-member-to-organization", authMiddleware,async (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserName = req.body.memberUserName;
    
    const org = await orgModel.findById(organizationId)

    console.log("asdfa ",org);
    
    
    if(!org || org.admin.toString() != userId){
        return res.status(411).json({
            message: "Either this org doesnt exist or you are not an admin of this org"
        })   
    }
    const member = await userModel.findOne({username : memberUserName})
    if(!member){
        return res.status(411).json({
            message: "No user with this userId exists in our db"
        })
    }
    console.log("before",org);
    
    org.members.push(member._id)
    await org.save()
    console.log("after",org);
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

app.listen(3000,()=>console.log("server is running"));

