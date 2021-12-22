const express = require('express'); 
const router = express.Router(); 
const maincontroller = require('../controllers/mainController');

router.get('/', maincontroller.main);

router.get('/hola123', maincontroller.list)
router.get('/hola456', maincontroller.list2)

module.exports = router