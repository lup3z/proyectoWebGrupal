const products = require('../model/products.json');
let newProductsbd = require('../model/nuevosProductos.json');
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
        const id = req.params.id;
        newProductsbd = newProductsbd.filter((item) => item.id != id);

        fs.writeFileSync(
            path.join(__dirname, "../model/nuevosProductos.json"),
            JSON.stringify(newProductsbd, null, 4),
            {
                encoding: "utf-8",
            }
        );
        res.render("productList", { products: newProductsbd });
    },

    editProduct: (req, res) => {
        let id = req.params.id;
        const productToEdit = newProductsbd.find((item) => item.id === id);
        res.render('editProduct', { productToEdit: productToEdit })
    },

    editProductPrueba: (req, res) => {
        const id = req.params.id;
        console.log(id);
        const archivo = req.file;
        const { nombre, precio } = req.body;
        const indexProducto = newProductsbd.findIndex((item) => item.id === id);
        console.log("55555"+indexProducto);
        newProductsbd[indexProducto] = {
            id: id,
            nombre: nombre,
            producto: `img/${archivo.filename}`,
            precio: precio,
        }
        fs.writeFileSync(
            path.join(__dirname, "../model/nuevosProductos.json"),
            JSON.stringify(db, null, 4),
            {
                encoding: "utf8",
            }
        );
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
        console.log(productoNuevos);
        newProductsbd.push(productoNuevos);
        fs.writeFileSync(
            path.join(__dirname, "../model/nuevosProductos.json"),
            JSON.stringify(newProductsbd, null, 4),
            {
                encoding: "utf-8",
            });
        res.render("productList", { products: newProductsbd });
    }
}

module.exports = controller;