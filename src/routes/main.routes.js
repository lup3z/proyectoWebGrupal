const express = require('express'); 
const router = express.Router(); 
const maincontroller = require('../controllers/mainController');

router.get('/', maincontroller.main);

module.exports = router