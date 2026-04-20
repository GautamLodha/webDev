const express = require('express');
const bcrypt = require('bcrypt');
const z = require('zod')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { authMiddleware } = require('./middleware');
const { userModel, todoModel } = require('./models');
const app = express()
app.use(express.json());

const signupSchema = z.object({
    username : z.string().min(5),
    password : z.string().min(6)
})

app.post('/signin',async (req,res,next)=>{

    try {
        const username = req.body.username;
        const password = req.body.password;
        // console.log(username,password);
        
        let user = await userModel.findOne({username})
        if(!user){
            return res.status(401).json({
                message : "wrong credentials"
            })
        }
        console.log(user.password);
        const compare = await bcrypt.compare(password,user.password);
        if(!compare){
            return res.status(401).json({
                message : "wrong credentials"
            })
        }
        const token = jwt.sign({userId : user._id},"secret")
        return res.status(200).json({
            token : token
        });
    } catch (error) {
         return res.status(500).json({
            message: "Internal server error"
        });
    }

    
})
app.post('/signup',async (req,res,next)=>{

    try {
        const username = req.body.username;
        const password = req.body.password;

        const {success,error,data} = signupSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({
                error : error.flatten().fieldErrors
            })
        }

        let user = await userModel.findOne({username})
        if(user){
            return res.status(409).json({
                message : "you already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user =  await userModel.create({
            username,
            password : hashedPassword
        })
        return res.status(200).json({
            message : "user created successfully",
            userId : user._id
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }

    
})
app.post('/todos',authMiddleware,async (req,res,next)=>{
    try {
        const userId = req.userId;
        const {title,description} = req.body;
        const todo = await todoModel.create({
            title,
            description,
            userId : userId
        })
        return res.json({
            todoId : todo._id
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
})
app.get('/todos/:todoId',authMiddleware,async (req,res,next)=>{


    console.log(req.params.todoId,req.userId);

    try {
        const userId = req.userId;
        const todoId = req.params.todoId;

        const todo = await todoModel.findOne({
            _id : todoId,
            userId : userId
        })
        if(!todo){
            return res.status(404).json({
                message : "Todo not found"
            })
        }
        return res.status(200).json({
            todo
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }

})


app.listen(3000);