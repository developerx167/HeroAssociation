const express = require('express')
const app = express()
const routetomain = require('@heroassociation/routetomain')
const router = require('./router/router')
const {expressErrorHandler} = require('@developerx167/expresserrorhandler')
// establish mongodb connection 
require('@developerx167/mongodbconn')

//required middlewares
app.use(express.json())

// routes 
app.use('/registration',router)
app.all('*',routetomain)

//handle errors
app.use(expressErrorHandler)

// listen
app.listen(process.env.PORT)