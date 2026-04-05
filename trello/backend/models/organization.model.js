const mongoose = require('mongoose')

const orgSchema = new mongoose.Schema({
    title : {
        type : String,
        unique : true,
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    members : {
        type : [mongoose.Schema.Types.ObjectId]
    },
    description : {
        type : String
    }
},{timestamps : true})

const orgModel = mongoose.model('organization',orgSchema)
module.exports = {orgModel}