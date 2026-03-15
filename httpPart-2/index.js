const express = require('express');

const app = express()
const port = 3000;
app.use(express.json())
let counter = 0;

function middleware(req,res,next){
    counter++;
}

app.use(function(req,res,next){
    console.log(`${req.method}  ${req.url} ${Date.now()}`);
    next()
})
app.get('/',middleware,function(req,res){
    res.send('home page')
})
app.get('/random',middleware,function(req,res){
    res.send("random page")
})

app.get('/counter',function(req,res){
    res.json({
        count : counter
    })
})

app.listen(port,()=>{
    console.log(`server running ${port}`)
})