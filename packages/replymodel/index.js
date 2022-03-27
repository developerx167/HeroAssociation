const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
    stickerid : {type : String}
})

const schema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : "users"},
    reply : {type : String, minlength : 1, maxlength : 50},
    likes : { type : likesSchema }
})
const ReplyModel = mongoose.model('reply',schema)

module.exports = ReplyModel