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

    productEdit:(req,res)=>{
        const id= req.params.id;
        const productToEdit = newProductsbd.find(item => item.id == id);
        res.render('../views/editProduct', { productToEdit: productToEdit })
    },

    productSaveEdited:(req,res)=>{
        const id= parseInt(req.params.id);
        console.log(id);
        const archivo = req.file;
        const {nombre, precio} = req.body;
        const saveEditedProduct={ 
            "id":id,
            "nombre":nombre,
            "producto": `img/${archivo.filename}`,
            "precio": precio,
        }
        dbProductos[id - 1] = saveEditedProduct;
        fs.writeFileSync(path.join(__dirname, "../model/products.json"), JSON.stringify(dbProductos, null, 4), {
            encoding: "utf8",
        }); 
        res.render(path.join(__dirname, '../views/productList'), { products: dbProductos });
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
            path.join(__dirname, "../model/products.json"),
            JSON.stringify(newProductsbd, null, 4),
            {
                encoding: "utf-8",
            });
        res.render("productList", { products: newProductsbd });
    }, 
    productDelete: (req,res)=>{
        const idABorrar= parseInt(req.params.id);
        let newModel = newProductsbd.filter((item) => item.id != idABorrar);
        newProductsbd = newModel;
        fs.writeFileSync(path.join(__dirname, "../model/products.json"), JSON.stringify(newProductsbd, null, 4), { encoding: "utf8", }); 
        res.render(path.join(__dirname, '../views/productList.ejs'), { products: newProductsbd });
    }
}

module.exports = controller;