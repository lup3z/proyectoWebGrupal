const newUsuario = require('../model/usuarios.json');
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const bcrypt = require("bcryptjs");
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
				
			});
		}

		;
	},
	login: (req, res) => {
		return res.render('userLoginForm');
	},
     profile: (req, res) => {
		return res.render('userProfile');
	},
}

	


module.exports = controlador;
