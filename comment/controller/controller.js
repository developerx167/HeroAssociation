const CommentModel = require('@heroassociation/commentmodel')
const ErrorHandler = require('@developerx167/errorhandler')
const mongoose = require('mongoose')
const PostModel = require('@heroassociation/postmodel')
module.exports = {
    commentPostHandler : async (req,res,next)=>{
        try {
            if(req.session.ud){

                // check length of comment 
                if(req.body.comment.length < 1 || req.body.comment.length > 50){
                    const error = new ErrorHandler('Invalid entry comment',500)
                    return next(error)
                }

                // get total comment on post 
                const size = await PostModel.aggregate([{$match : {_id : mongoose.Types.ObjectId(req.body.postid)}},{$project : { commentid : { $size : { $ifNull : [ "$commentid", [] ]}}}}])

                // if no post found 
                if (size.length == 0){
                    const error = new ErrorHandler("post not found",404)
                    return next(error)
                }

                // if total comment exceeds 50 on a post 
                if (size[0].commentid>50){
                    const error = new ErrorHandler("comment limit exceeded",500,["comment"])
                    return next(error)
                }

                const result = await CommentModel.create({user : mongoose.Types.ObjectId(req.session.ud._id), comment : req.body.comment})
                const postid = await PostModel.findByIdAndUpdate({_id : req.body.postid},{$push : {commentid : result._id}})
                return res.json({success : 1, message : "comment successful"})
            }
            else{
                return res.redirect('/login')
            }
        } catch (error) {
            next(error)
        }
    }
}