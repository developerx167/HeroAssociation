const express = require('express')
const { replyRouterController } = require('../controller/controller')
const router = express.Router()
router.post('/',replyRouterController)
module.exports = router