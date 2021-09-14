const express = require('express')
const router = express.Router()
const maincontroller = require('../controller/mainController')
const producListController = require('../controller/producListController')


router.get('/', maincontroller.main);

router.get('/login', maincontroller.login);

router.get('/productCart', maincontroller.productCart);

router.get('/register', maincontroller.register);

router.post('/register', maincontroller.create);

router.get('/productList', producListController.productList)

module.exports = router