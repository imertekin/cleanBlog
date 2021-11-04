const mongoose = require('mongoose')


// We created Post schema 
const PostSchema=new mongoose.Schema({
    title:String,
    detail:String,
    author:String,
    dateCreated:{
        type:Date,
        default:Date.now
    }
})
// Post model exported
module.exports=mongoose.model('Post',PostSchema)