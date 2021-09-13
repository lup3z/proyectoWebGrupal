const express = require('express')
const router = express.Router()
const controller = require('../controller/mainController')


router.get('/', controller.main)
router.get('/login', controller.login)

module.exports = router