const ErrorHandler = require('@developerx167/errorhandler')
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const validator = require('validator')
const db = mongoose.connection
const userCol = db.collection('users')
module.exports ={
    // routes 
    loginRouterController : async (req,res,next) =>{
        try {
            var result
            // check if email 
            if(validator.isEmail(req.body.username)){
                result = await userCol.findOne({email : req.body.username})
            }else{
                result = await userCol.findOne({username : req.body.username})
            }
            // if no data found in db 
            if(!result){
                const error = new ErrorHandler('Invalid username or password',400)
                return next(error)
            }
            // compare hash 
            const match = await bcryptjs.compare(req.body.password,result.password)

            // if match true 
            if(match){
                req.session.ud = {...result, password : undefined}
                // if remember me is true 
                if(req.body.rememberMe){
                    const ck = jsonwebtoken.sign(String(result._id),process.env.SECRET)
                    res.cookie('dl',ck,{httpOnly : true, secure : true, expires : new Date( new Date().setMonth( new Date().getMonth() + 1))})
                }
                return res.redirect('/')
            }
            // if not match 
            const error = new ErrorHandler('Invalid username or password',400)
            return next(error)
        } catch (error) {
            //  other server errors
            next(error)
        }
    },

}