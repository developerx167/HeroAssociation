const express = require('express')
const { commentPostHandler } = require('../controller/controller')
const router = express.Router()
router.post('/',commentPostHandler)
module.exports = router