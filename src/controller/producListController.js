let products = require("../model/products.json");
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
        products = products.filter((item) => item.id != id);

        fs.writeFileSync(
            path.join(__dirname, "../model/products.json"),
            JSON.stringify(products, null, 4),
            {
                encoding: "utf-8",
            }
        );
        res.render("productList", { products: products });
    },

    getProductToEdit: (req, res) => {
        let id = req.params.id;
        let productToEdit = products.find((item) => item.id == id);
        res.render('editProduct', { products: productToEdit })
    },

    editProduct: (req, res) => {
        let id = req.params.id;
        const archivo = req.file;
        const { nombre, precio,categoria, description } = req.body;
        products.forEach(product => {
            if(product.id == id){
            product.nombre= nombre,
            product.description= description,
            product.categoria= categoria,
            product.producto= `img/products/${archivo.filename}`,
            product.precio= precio
            }
        })
        fs.writeFileSync(
            path.join(__dirname, "../model/products.json"),
            JSON.stringify(products, null, 4),
            {
                encoding: "utf8",
            }
        );
        res.render( "productList",{ products: products });
    },

    abmproduct: (req, res) => {
        let archivo = req.file;
        const newId = products[(products.length) - 1].id + 1
        let productoNuevos = {
            id: newId,
            nombre: req.body.nombre,
            description: req.body.description,
            precio: req.body.precio,
            categoria: req.body.categorias,
            producto: `img/products/${archivo.filename}`,
        };
        products.push(productoNuevos);
        fs.writeFileSync(
            path.join(__dirname, "../model/products.json"),
            JSON.stringify(products, null, 4),
            {
                encoding: "utf-8",
            });
        res.render("productList", { products: products });
    },

    productInsert: (req, res) => {
        const newId = products[(products.length) - 1].id + 1
        const {nombre,descripcion,detalle,cantidad,precio,descuento,envio}=req.body;
        const newProduct={ // creo un objeto con toda la info del body
                "id": newId,
                "image": "../img/site-not-found.png",
                "descripcion": descripcion,
                "categoria": categoria,
                "actualPrice": actualPrice,             
        };
        products.push(newProduct);
        fs.writeFileSync(path.join(__dirname,"../model/products.json"), JSON.stringify(products, null, 4), {
            encoding: "utf8",
          });
          res.render(path.join(__dirname, '../views/productList.ejs'), { products: products });
    },

    productDetail: (req, res) => {
        const id = req.params.id;
        const producto = products.find(item => item.id == id);
        res.render(path.join(__dirname, '../views/productDetail.ejs'), { product: producto })
    }
}

module.exports = controller;