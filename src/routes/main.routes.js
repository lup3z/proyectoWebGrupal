const express = require('express'); 
const router = express.Router(); 
const maincontroller = require('../controller/mainController');
const producListController = require('../controller/producListController')

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if(req.body.description){
			cb(null, './public/img')
		}else{
			cb(null, './public/img/profile')
		}
		},
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,fileName)
    }
})
const upload = multer({ storage: storage })

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


const validationsCreateProduct = [
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('description').notEmpty().withMessage('Tienes que escribir una descripcion'),
    body('producto').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', '.png'];
		
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
    body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})

]

router.get('/', maincontroller.main);

router.get('/login', guestMiddleware, maincontroller.login);
router.post('/login', maincontroller.loginProcess);

router.get('/productCart', maincontroller.productCart);

router.get('/register', guestMiddleware, maincontroller.register);
router.post('/register', upload.single('avatar'), uservalidation, maincontroller.registerCreate);

router.get('/productList', producListController.productList);

router.get('/createProduct', producListController.createProduct);
router.post('/createProduct', upload.single("producto"), validationsCreateProduct, producListController.abmproduct);

router.get('/editProduct/:id', producListController.getProductToEdit);
router.put('/:id', upload.single('producto'), producListController.editProduct);

router.get('/productList', producListController.productList);
router.delete('/:id', producListController.deleteProduct);

router.get('/productDetail/:id', producListController.productDetail);


router.get('/profile', authMiddleware, maincontroller.profile )
router.get('/logout', maincontroller.logout);


router.get('/hola123', maincontroller.list)
router.get('/hola456', maincontroller.list2)



module.exports = router