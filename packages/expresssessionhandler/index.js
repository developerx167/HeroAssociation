const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('@developerx167/redisconn')

module.exports = {
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