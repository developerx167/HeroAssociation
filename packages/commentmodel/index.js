const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
    stickerid : {type : String}
})


const schema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId, ref : 'users'},
    comment : {type : String, minlength : 1, maxlength : 50},
    likes : {type : likesSchema},
    replies : {type : mongoose.Schema.Types.ObjectId, ref : 'replies'}
})
const CommentModel = mongoose.model('comment',schema)
module.exports = CommentModel