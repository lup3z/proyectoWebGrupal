const products = require('../model/products.json');
const newProductsbd = require('../model/nuevosProductos.json');
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { validationResult } = require('express-validator');

const controller = {

    productList: (req, res) => {
        res.render('productList', {
            products: products
        })
    },

    createProduct: (req, res) => {
        res.render('createProduct')
    },

    deleteProduct: (req, res) => {
        let items = newProductsbd.readJsonFile();
        let filteredItems = items.filter(currentItem => req.params.id != id );
        
        this.writeJsonFile(filteredItems);
        //newProductsbd.des
    },

    editProduct: (req, res) => {
        let idProduct = products.find(req.params.id);
        let productToEdit = products[idProduct];
        res.render('editProduct', { productToEdit: productToEdit })
       
/*
        products.update({


        })
        let productToEdit = products[idProduct];
        res.render('productList', { product: productToEdit });
        res.redirect('/productList');
        */
    },

    editProductPrueba: (req, res) => {
         
        let prueba = {
            description: idProduct.body.description,
            categoria: idProduct.body.categoria,
            actualPrice:idProduct.body.precio,
        }
        let jsonData = JSON.stringify(newProductsbd);
        fs.writeFile(path.join(__dirname,"../model/nuevosProductos.json"), jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });


        res.redirect('/productList');
    },

    abmproduct: (req, res) => {
        let archivo = req.file;
        let productoNuevos = {
            id: uuidv4(),
            nombre: req.body.nombre,
            description: req.body.description,
            precio: req.body.precio,
            categoria: req.body.categoria,
            producto: `img/${archivo.filename}`,
        };
        newProductsbd.push(productoNuevos);
        fs.writeFileSync(path.join(__dirname,"../model/nuevosProductos.json"), JSON.stringify(newProductsbd, null, 4),{
            encoding: "utf-8",
        });
        res.render("productList", {products : newProductsbd });
        /*
        console.log("----");
        const resultValidation =validationResult(req);
        console.log("----");
		if (resultValidation.errors.length > 0) {
            console.log("----1");
            console.log(errors.length)
			return res.render('createProduct', {
                errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        console.log("----2");
		return res.send({body: req.body, file: req.file});
        */
    }
}

module.exports = controller;