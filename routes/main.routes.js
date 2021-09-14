const express = require('express')
const router = express.Router()
const maincontroller = require('../controller/mainController')


router.get('/', maincontroller.main)

router.get('/login', maincontroller.login)

router.get('/productCart', maincontroller.productCart)

router.get('/productDetails', maincontroller.productDetails)

router.get('/register', maincontroller.register)

router.get('/productList', maincontroller.productList)

module.exports = router