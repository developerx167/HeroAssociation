const express = require('express')
const { likeRouteController } = require('../controller/controller')
const router = express.Router()
router.post('/',likeRouteController)
module.exports = router