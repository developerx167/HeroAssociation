const express = require('express')
const router = express.Router()
const { registrationRouteController } = require('../controller/controller')
router.post('/',registrationRouteController)
module.exports = router