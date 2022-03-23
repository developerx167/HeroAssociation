const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('@developerx167/redisconn')

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
                const ck = jsonwebtoken.sign(String(result._id),process.env.SECRET)
                res.cookie('dl',ck,{httpOnly : true, secure : true, expires : new Date( new Date().setMonth( new Date().getMonth() + 1))})
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

    // express session handler
    expressSessionHandler : {
        secret : process.env.SECRET,
        saveUninitialized : false,
        resave : false,
        proxy : true,
        cookie : {
            httpOnly : true,
            secure : process.env.NODE_ENV == 'development'? false : true
        },
        store : new RedisStore({client : redisClient})
    }

}