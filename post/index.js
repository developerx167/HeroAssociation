const express = require('express')
const app = express()
const session = require('express-session')
const { expressSessionHandler } = require('@heroassociation/expresssessionhandler')
const { expressErrorHandler } = require('@developerx167/expresserrorhandler')
const routeToMain = require('@heroassociation/routetomain')
const router = require('./router/router')

// establish mongodb and redis connection
require('@developerx167/mongodbconn')
require('@developerx167/redisconn')

// handle session and other middlewares
app.use(session(expressSessionHandler))
app.use(express.json())

// routes 
app.use('/post',router)
app.all('*',routeToMain)

// handle errors
app.use(expressErrorHandler)

// listen
app.listen(process.env.PORT)