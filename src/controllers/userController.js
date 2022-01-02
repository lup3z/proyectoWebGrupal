const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const  usersModel = require('../models/usersModel');

const userController = {
    login: (req, res) => {
        res.render("./user/login");
    },
    register: (req, res) => {
        res.render("./user/register");
    },
    newUserRegister: async (req, res) => {
        try {
        const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			
            
             return res.render('./user/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
        }
        
            let userInDB = await usersModel.findByField('email', req.body.email);
            if (userInDB) {
                return res.render("./user/register", {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
            const id = await usersModel.generateId();
        
            let userToCreate = {
                ...req.body, 
                id: id,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: 'img/' + req.file.filename,
                idUserCategory: 2
            }
            await usersModel.create(userToCreate);

            res.render("./user/login");
        } catch (error) {
            res.send(error)
        }
        
    },
        
    loginProcess: async function (req, res) {
        try {
        let userToLogin = await usersModel.findByField('email', req.body.email);
        if(userToLogin){
            let isOKThePass = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (isOKThePass) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
                return res.redirect('./profile');
                
            } else {
                res.render("./user/login", {
                    errors: {
                        email: {
                            msg: "Las credenciales son inválidas"
                        }
                    }
                });
            }
        } else {
            return res.render("./user/login", {
                errors: {
                    email: {
                        msg: "El mail no se encuentra registrado en nuestra base de datos"
                    }
                }
            });
        }
        } catch (error) {
        res.status(404).render('not-found');
        }
    },
    profile: (req, res) =>{
        res.render('./user/profile', {users: req.session.userLogged})
    },
    logout: (req, res) =>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    }
}

module.exports = userController;