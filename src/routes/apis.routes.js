const express = require('express');
const router = express.Router();
const controllerUsersApi = require('../Controllers/apiUsersController');
const controllerProducstApi = require('../controllers/apiProductsController');

/*** GET APIS PRODUCT ***/ 

router.use('/products/:id', controllerProducstApi.detail);
router.use('/products', controllerProducstApi.allProducts);




/*** GET APIS USERS ***/

router.use('/users/:id',controllerUsersApi.detail);
router.use('/users',controllerUsersApi.allUsers);





module.exports = router