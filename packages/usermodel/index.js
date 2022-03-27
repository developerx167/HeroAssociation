const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    country : {type : String, lowercase : true},
    state_province_region : {type : String, lowercase : true},
    city : {type : String, lowercase : true},
    street : {type : String, lowercase : true},
    house_no : {type : String, lowercase : true},
    zip_postal_code : {type : String, lowercase : true}
})


const schema = new mongoose.Schema({
    firstName : { type:String, minlength : 2 , maxlength : 20, lowercase : true},
    lastName : { type:String, minlength : 2 , maxlength : 20, lowercase : true},
    password : { type:String, required : true},
    email : { type:String, minlength : 5, maxlength : 100, unique : true, lowercase : true},
    expiresAt : {type : Date},
    username : {type : String, minlength : 5, maxlength : 20, unique : true, lowercase : true},
    gender : {type : String, enum : ['male','female','others'], lowercase : true},
    dob : {type : Date},
    address : { type : addressSchema },
    // use await UserModel.findByIdAndUpdate({_id : id},{$push : { posts : id}})
    posts : {type : mongoose.Schema.Types.ObjectId, ref : 'posts', default : undefined},
    active : { type : Boolean, default : false}
}, {timestamps : true})

// time to live, if not validate then expire
schema.index({expiresAt : 1},{expireAfterSeconds : 0})

const UserModel = mongoose.model('user',schema)
module.exports = UserModel