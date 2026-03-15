
const express = require('express')
const PORT = 3018;
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.sendFile("C:/Users/gauta/OneDrive/Desktop/webDev/httpPart-2/index.html")
})

app.get('/sum',(req,res)=>{
    const a = parseInt(req.query.a); // for extracting query params
    const b = parseInt(req.query.b);
    const sum = a + b;
    res.send( "<b><u>" +  sum + "</u></b>" )
})
app.get('/sum/:a/:b',(req,res)=>{
    const a = parseInt(req.params.a); // for extracting params
    const b = parseInt(req.params.b);
    res.json(a+b)
})
app.post('/add',(req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        sum : a+b
    })
})

app.listen(PORT,()=>{
    console.log(`server running ${PORT}`)
})