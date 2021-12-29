const express = require('express'); 
const router = express.Router(); 
const maincontroller = require('../controllers/mainController');
const productController = require('../controllers/productController')

const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if(req.body.description){
			cb(null, './public/img')
		}else{
			cb(null, './public/img')
		}
		},
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,fileName)
    }
})
const upload = multer({ storage: storage })

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

router.get('/productList', productController.productList);
router.get('/createProduct', productController.getCreateProduct);
router.post('/createProduct', upload.single("imagen"), validationsCreateProduct, productController.createProduct);
router.get('/productDetail/:id', productController.productDetail);
router.get('/editProduct/:id', productController.getProductToEdit);
router.put('/:id', upload.single('producto'), productController.editProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router