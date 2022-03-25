const express = require('express')
const app = express()
const { expressErrorHandler } = require('@developerx167/expresserrorhandler')
const { expressSessionHandler } = require('@heroassociation/expresssessionhandler')
const session = require('express-session')
const routeToMain = require('@heroassociation/routetomain')
const router = require('./router/router')

// establish mongodb connection
require('@developerx167/mongodbconn')

// required middlewares
app.use(express.json())
app.use(session(expressSessionHandler))

// routes
app.use('/reply',router)
app.all('*',routeToMain)

// handle errors
app.use(expressErrorHandler)

// listen
app.listen(process.env.PORT)