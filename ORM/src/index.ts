
import {prisma} from '../lib/prisma'
import express from 'express'

const app = express()

app.get('/users', async (req,res)=>{
    const users = await prisma.user.findMany()
    res.json(users)
})

async function createUser(){
    await prisma.user.create({
        data : {
            name : "asdg",
            age : 22,
            password : "6454asdfa"
        }
    })
}
const findUser = async () =>{
    const user =  await prisma.user.findFirst({
        where : {
            id : 1
        }
    })
    console.log(user?.age);
    
}
const findTodo = async ()=>{
    const todo = await prisma.user.findFirst({
        where : {
            id : 1
        },
        include : {
            todos : true
        }
    })
    console.log(todo);
    
}
// createUser()
// findUser()
// findTodo()
app.listen(5000,()=>{
    console.log("running at 5000");
    
})

console.log("hiii");
