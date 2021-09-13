const express = require('express')
const router = express.Router()
const maincontroller = require('../controller/mainController')


router.get('/', maincontroller.home);

router.get('/login', maincontroller.login);


module.exports = router