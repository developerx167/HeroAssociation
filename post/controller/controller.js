const PostModel = require('@heroassociation/postmodel')
const { default: mongoose } = require('mongoose')
const ErrorHanlder = require('@developerx167/errorhandler')
const db = mongoose.connection
const usersCol = db.collection('users')

module.exports = {
    // routes 
    postRoutehandler : async (req,res,next)=>{
        try {
            // if session available  else redirect to login page
            if(req.session.ud){
                if(!req.body.post){
                    const error = new ErrorHanlder('Invalid entry', 500, ['post'])
                    return next(error)
                }
                if(req.body.post.length < 10 || req.body.post.length > 1000 || req.body.title.length < 5 || req.body.title.length > 50){
                    const error = new ErrorHanlder('Invalid entry', 500, ['post'])
                    return next(error)
                }
                const result = await PostModel.create({title : req.body.title, post : req.body.post, user : req.session.ud._id})
                const update = await usersCol.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.session.ud._id)},{$push : { posts : result._id}})
                // if not update 
                if(update.value == null){
                    const error = new ErrorHanlder('Unknown error occurred',500)
                    return next(error) 
                }
                return res.status(201).json({success : 1, message : "post successful"})
            }
            else{
                return res.redirect('/login')
            }
        } catch (error) {
            next(error)
        }
    }
}