
const newUsuario = require('../model/usuarios.json');
const User = require('../model/Users');
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');



const controlador = {

    main: (req, res) => {
       res.render('home')
    },
   login: (req,res) => {
       res.render('login')
    },

    productCart: (req,res) => {
        res.render('productCart')
    },

    register: (req,res) => {
        res.render('register')
    },

    registerCreate: (req,res) => {
        const resultValidation = validationResult(req);
       
        
		if (resultValidation.errors.length > 0) {
			
            
             return res.render('register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
        }
        let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('Register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});





		}
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            perfil: 'img/'+req.file.filename
            
        }
        let userCreated = User.create(userToCreate);
		return res.redirect('/login');
	},
	
}

	


module.exports = controlador