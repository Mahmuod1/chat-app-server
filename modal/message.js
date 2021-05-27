const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema= new Schema({
    message:String,
    from:String,
    senderId:String,
    received: Boolean,
    to:String
},{timestamps:true})

module.exports = mongoose.model('message',messageSchema)