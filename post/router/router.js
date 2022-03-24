const express = require('express')
const { postRoutehandler } = require('../controller/controller')
const router = express.Router()
router.post('/',postRoutehandler)
module.exports = router