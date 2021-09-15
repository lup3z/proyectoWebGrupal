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

router.get('/createProduct', producListController.createProduct)

router.post('/createProduct', producListController.abmproduct)

router.get('/editProduct/:id', producListController.editProduct)
router.put('/editProduct', function(req,res){
    res.send('Estoy editando')
})

module.exports = router