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
                const result = await PostModel.create({title : req.body.title, post : req.body.post, user : req.session.ud._id})
                const update = await usersCol.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.session.ud._id)},{$push : { posts : result._id}})
                // if not update 
                if(update.value == null){
                    const error = new ErrorHanlder('Unknown error occurred',500)
                    return next(error) 
                }
                return res.json({success : 1, message : "post successful"})
            }
            else{
                return res.redirect('/login')
            }
        } catch (error) {
            next(error)
        }
    }
}