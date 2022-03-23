const Validation = require('@heroassociation/validation')
const ErrorHandler = require('@developerx167/errorhandler')
const UserModel = require('@heroassociation/usermodel')
const bcryptjs = require('bcryptjs')
module.exports = {
    // routes 
    registrationRouteController : async (req,res,next) => {
        try {
            // validate user inputs
            const validate = new Validation(req.body.firstName,req.body.lastName,req.body.email,req.body.username,req.body.password)
            const notValid = Object.entries(validate).filter(([key,value])=>!value)
            // if not valid
            if(notValid.length){
                const error = new ErrorHandler('Invalid input',400,Object.keys(Object.fromEntries(notValid)))
                return next(error)
            }
            // create hash 
            const hash = await bcryptjs.hash(req.body.password,10)
            // insert user
            await UserModel.create({...validate, password : hash, expiresAt : new Date(new Date().setHours(new Date().getHours() + 1))})
            res.status(201).json({success : 1, message : "registration successful"})
        }
        catch (error) {
            // if duplicate entry 
            if(error.code == 11000){
                const err = new ErrorHandler(error.keyPattern.email ? "email" : "username"+" already exist",400,[error.keyPattern.email ? "email" : "username"])
                return next(err)
            }
            // other validation error mongoose
            if(error._message == "user validation failed"){
                const err = new ErrorHandler("Invalid input",400)
                return next(err)
            }
            // unknown errors
            next(error)
        }
    }

}