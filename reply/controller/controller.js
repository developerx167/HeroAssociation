const CommentModel = require('@heroassociation/commentmodel')
const ReplyModel = require('@heroassociation/replymodel')
const { default: mongoose } = require('mongoose')
const ErrorHanlder = require('@developerx167/errorhandler')

module.exports = {
    // routes 
    replyRouterController : async (req,res,next) => {
        try {
            if(req.session.ud){
                // if empty body 
                if(!req.body.reply || !mongoose.Types.ObjectId.isValid(req.body.commentid)){
                    const error = new ErrorHanlder('Invalid input', 400, ['reply'])
                    return next(error)
                }

                if(req.body.reply.length < 1 || req.body.reply.length > 50){
                    const error = new ErrorHanlder('Invalid input', 400, ['reply'])
                    return next(error)
                }
                const size = await CommentModel.aggregate([{$match : { _id : mongoose.Types.ObjectId(req.body.commentid)}}, { $project : { replies : { $size : { $ifNull : ['$replies', [] ]}}}}])
                if(size.length == 0){
                    const error = new ErrorHanlder('comment not found', 404)
                    return next(error)
                }
                if(size[0].replies > 50){
                    const error = new ErrorHanlder('Maximum reply limit exceeded',400,['reply'])
                    return next(error)
                }
                const result = await ReplyModel.create({user : mongoose.Types.ObjectId(req.session.ud._id), reply : req.body.reply})
                await CommentModel.findByIdAndUpdate({_id : req.body.commentid},{$push : { replies : result._id}})
                return res.status(201).json({ success : 1, message : "reply successful"})

            }else{
                return res.redirect('/login')
            }
        } catch (error) {
            next(error)
        }
    }
}