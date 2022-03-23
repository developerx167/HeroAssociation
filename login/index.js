const express = require('express')
const router = require('./router/router')
const routetomain = require('@heroassociation/routetomain')
const app = express()
const { expressSessionHandler } = require('./controller/controller')
const { expressErrorHandler } = require('@developerx167/expresserrorhandler')
const session = require('express-session')

// establish connection redis / mongo 
require('@developerx167/redisconn')
require('@developerx167/mongodbconn')

// required middlewares 
app.use(express.json())
app.use(session(expressSessionHandler))

// routes 
app.use('/login',router)
app.all('*',routetomain)

// handle errors
app.use(expressErrorHandler)

// listen
app.listen(process.env.PORT)