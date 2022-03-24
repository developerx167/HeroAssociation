const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    image : {type: String},
    title : {type : String, minlength : 5, maxlength : 50},
    post : {type : String, minlength : 10, maxlength : 1000},
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
    likes : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
    commentid : {type : mongoose.Schema.Types.ObjectId, ref : 'comments'},
}, {timestamps : true})

const PostModel = mongoose.model('post',schema)

module.exports = PostModel