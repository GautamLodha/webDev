const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required :true
    }
},{timestamps : true})
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return ;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log(error);
    }
});
const userModel = mongoose.model('user',userSchema)

module.exports = {userModel}