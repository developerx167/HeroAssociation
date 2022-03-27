const ErrorHandler = require('@developerx167/errorhandler')
const PostModel = require('@heroassociation/postmodel')
const CommentModel = require('@heroassociation/commentmodel')
const ReplyModel = require('@heroassociation/replymodel')
const { default: mongoose } = require('mongoose')


module.exports = {
    // routes 
    likeRouteController : async (req,res,next) =>{
        try {

            // check if user in session 
            if(req.session.ud){
                if(!req.body.type || !req.body.stickerid || ! mongoose.Types.ObjectId.isValid(req.body.id) || req.body.like == null){
                    const error = new ErrorHandler('Invalid input',400)
                    return next(error)
                }
                
                // if like true 
                if(req.body.like){

                    // if like on post 
                    if(req.body.type == 'post'){
                        const isLiked = await PostModel.aggregate([{$match : {_id : mongoose.Types.ObjectId(req.body.id)}},{$unwind : "$likes"},{$project : {user : "$likes.user"}},{$match : {user : mongoose.Types.ObjectId(req.session.ud._id)}}])
                        if(isLiked.length == 0){
                            const result = await PostModel.findByIdAndUpdate({_id : req.body.id}, {$push : { likes : { user : mongoose.Types.ObjectId(req.session.ud._id), stickerid : req.body.stickerid }}})
                            if(!result){
                                const error = new ErrorHandler('post doesn\'t exist',404,['post'])
                                return next(error)
                            }
                            return res.status(201).json({success : 1, message : "like successful"})
                        }else{
                            const error = new ErrorHandler('already liked',404,['post'])
                            return next(error)
                        }
                    }
                    
                    // if like on comment 
                    if(req.body.type == 'comment'){
                        const isLiked = await CommentModel.aggregate([{$match : {_id : mongoose.Types.ObjectId(req.body.id)}},{$unwind : "$likes"},{$project : {user : "$likes.user"}},{$match : {user : mongoose.Types.ObjectId(req.session.ud._id)}}])
                        if(isLiked.length == 0){
                            const result = await CommentModel.findByIdAndUpdate({_id : req.body.id}, {$push : { likes : { user : mongoose.Types.ObjectId(req.session.ud._id), stickerid : req.body.stickerid }}})
                            if(!result){
                                const error = new ErrorHandler('comment doesn\'t exist',404,['post'])
                                return next(error)
                            }
                            return res.status(201).json({success : 1, message : "like successful"})
                        }else{
                            const error = new ErrorHandler('already liked',404,['post'])
                            return next(error)
                        }
                    }
                    
                    // if like on reply 
                    if(req.body.type == 'reply'){
                        const isLiked = await ReplyModel.aggregate([{$match : {_id : mongoose.Types.ObjectId(req.body.id)}},{$unwind : "$likes"},{$project : {user : "$likes.user"}},{$match : {user : mongoose.Types.ObjectId(req.session.ud._id)}}])
                        if(isLiked.length == 0){
                            const result = await ReplyModel.findByIdAndUpdate({_id : req.body.id}, {$push : { likes : { user : mongoose.Types.ObjectId(req.session.ud._id), stickerid : req.body.stickerid }}})
                            if(!result){
                                const error = new ErrorHandler('comment doesn\'t exist',404,['post'])
                                return next(error)
                            }
                            return res.status(201).json({success : 1, message : "like successful"})
                        }else{
                            const error = new ErrorHandler('already liked',404,['post'])
                            return next(error)
                        }
                    }

                    // if type not match 
                    else{
                        const error = new ErrorHandler('Invalid input',400)
                        return next(error)
                    }

                }
                
                // if like is false 
                else{
                    // if like on post
                    if(req.body.type == 'post'){
                        await PostModel.findByIdAndUpdate({_id : req.body.id}, {$pull : { likes : { user : mongoose.Types.ObjectId(req.session.ud._id), stickerid : req.body.stickerid }}})
                        return res.status(200).json({success : 1, message : "unlike successful"})
                    }
                    
                    // if like on comment
                    if(req.body.type == 'comment'){
                        await CommentModel.findByIdAndUpdate({_id : req.body.id}, {$pull : { likes : { user : mongoose.Types.ObjectId(req.session.ud._id), stickerid : req.body.stickerid }}})
                        return res.status(200).json({success : 1, message : "unlike successful"})
                    }
                    // if like on reply
                    if(req.body.type == 'reply'){
                        await ReplyModel.findByIdAndUpdate({_id : req.body.id}, {$pull : { likes : { user : mongoose.Types.ObjectId(req.session.ud._id), stickerid : req.body.stickerid }}})
                        return res.status(200).json({success : 1, message : "unlike successful"})
                    }
                    // if type not match 
                    else{
                        const error = new ErrorHandler('Invalid input',400)
                        return next(error)
                    }
                }
            }
            // if user not in session 
            else{
                res.redirect('/login')
            }
        } catch (error) {
            next(error)
        }
    }
}