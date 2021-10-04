const newUsuario = require('../model/usuarios.json');
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
        let usuario = {
            id: uuidv4(),
            email: req.body.email,
            nombre: req.body.nombre,
            password: req.body.password,
            pais: req.body.pais
        };
        newUsuario.push(usuario);
        fs.writeFileSync(path.join(__dirname,"../model/usuarios.json"), JSON.stringify(newUsuario, null, 4),{
            encoding: "utf-8",
        });
        res.redirect("/")
    },

}

module.exports = controlador;
