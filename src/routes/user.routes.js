const express = require('express'); 
const router = express.Router();
const userController = require ('../controllers/userController');
const multer = require("multer");
const path = require('path');
const { body } = require('express-validator');

const uservalidation = [
    body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
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

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/img'));
		},
        filename: function (req, file, cb) {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null,fileName)
    }
})
const upload = multer({ storage: storage })

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/register', guestMiddleware, userController.register);
router.post('/register', upload.single('avatar'), uservalidation, userController.newUserRegister);
router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.loginProcess);
router.get('/profile', authMiddleware, userController.profile);
router.get('/logout', userController.logout);

module.exports = router