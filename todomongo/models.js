const mongoose = require('mongoose')

function connection(){
    // console.log(process.env.MONGODB_URL);
    
    return mongoose.connect(process.env.MONGODB_URL)
}
connection()
.then(()=>console.log("connected succesfully"))
.catch(()=>console.log("error while connecting in db"))

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},{timestamps : true})
const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
},{timestamps : true})

const userModel = mongoose.model('users',userSchema)
const todoModel = mongoose.model('todos',todoSchema)

module.exports = {userModel,todoModel};