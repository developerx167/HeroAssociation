const express = require('express')
const app = express()
const { expressErrorHandler } = require('@developerx167/expresserrorhandler')
const routeToMain = require('@heroassociation/routetomain')
const router = require('./router/router')
const session = require('express-session')
const { expressSessionHandler } = require('@heroassociation/expresssessionhandler')

// establish connection
require('@developerx167/mongodbconn')

// required middelwares
app.use(express.json())
app.use(session(expressSessionHandler))

// routes
app.use('/like',router)
app.all('*',routeToMain)

// handle errors
app.use(expressErrorHandler)

// listen
app.listen(process.env.PORT)