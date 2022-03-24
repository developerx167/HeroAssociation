const express = require('express')
const router = require('./router/router')
const app = express()
const routeToMain = require('@heroassociation/routetomain')
const { expressErrorHandler } = require('@developerx167/expresserrorhandler')
const { expressSessionHandler } = require('@heroassociation/expresssessionhandler')
const session = require('express-session')

// establish connection 
require('@developerx167/mongodbconn')

// required middlewares
app.use(express.json())
app.use(session(expressSessionHandler))

// routes 
app.use('/comment',router)
app.all('*',routeToMain)


// handle errors
app.use(expressErrorHandler)

// listen
app.listen(process.env.PORT)