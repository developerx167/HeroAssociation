const express = require('express')
const { loginRouterController } = require('../controller/controller')
const router = express()
router.post('/',loginRouterController)
module.exports = router