const express = require('express'); 
const router = express.Router(); 
const maincontroller = require('../controller/mainController');
const producListController = require('../controller/producListController')

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/products')
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
})

const uploadFile= multer({ storage });




const validationsCreateProduct = [
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripcion'),
    body('producto').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			};
		}

		return true;
	}),
    body('precio').notEmpty().withMessage('Tienes que indicar un precio'),
    body('categorias').notEmpty().withMessage('Tienes que elegir una categoria'),
]
const uservalidation = [
    body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('pais').notEmpty().withMessage('Tienes que elegir un país'),

]

router.get('/', maincontroller.main);

router.get('/login', maincontroller.login);

router.get('/productCart', maincontroller.productCart);

router.get('/register', maincontroller.register);
router.post('/register',uservalidation, maincontroller.registerCreate);

router.get('/productList', producListController.productList);

router.get('/createProduct', producListController.createProduct);
router.post('/createProduct', uploadFile.single('producto'),validationsCreateProduct, producListController.abmproduct);

router.post('/productList',producListController.productInsert);

router.get('/editProduct/:id', producListController.editProduct);
router.put('/:id', uploadFile.single('producto'), producListController.editProductPrueba);

router.get('/productList', producListController.productList);
router.delete('/:id', producListController.deleteProduct);

router.get('/productDetail/:id', producListController.productDetail);



module.exports = router