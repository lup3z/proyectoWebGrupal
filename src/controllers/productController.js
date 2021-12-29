const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const  productsModel = require('../models/productsModel');

const { validationResult } = require('express-validator');

const productController = {
    productList: async function (req, res) {
        try{
            const products = await productsModel.findAll(); 
            res.render('./product/productList', {products})
        } catch (error) {
        res.status(404).render('404-page.ejs');
    }
        
    },
    createProduct: (req, res) => {
        res.render('./product/createProduct')
    },
    abmproduct: async function (req, res) {
        try {
            const file = req.file;
            const id = await productsModel.generateId();
            
            let newProduct = {
                id: id,
                ...req.body,
                imagen: `img/${file.filename}`,
            }
            await productsModel.create(newProduct);            
            res.render("./product/productList");
        } catch (error) {
            res.status(404).render('not-found');
        } 
    },
    productDetail: (req, res) => {
        const id = req.params.id;
        const producto = products.find(item => item.id == id);
        res.render(path.join(__dirname, '../views/product/productDetail'), { product: producto })
    },
    getProductToEdit: (req, res) => {
        let id = req.params.id;
        let productToEdit = products.find((item) => item.id == id);
        res.render("./product/editProduct", { products: productToEdit })
    },
    editProduct: (req, res) => {
        let id = req.params.id;
        const archivo = req.file;
        const {nombre, description, volumen, autor, artista, qDePaginas, colorObyn, editorial, edicion, precio} = req.body
        products.forEach(product => {
            if(product.id == id){
            product.nombre= nombre,
            product.description= description,
            product.volumen=volumen,
            product.autor=autor,
            product.artista=artista,
            product.editorial=editorial,
            product.qDePaginas=qDePaginas,
            product.colorObyn= colorObyn,
            product.edicion=edicion,
            product.producto= `img/${archivo.filename}`,
            product.precio= precio
            }
        })
        fs.writeFileSync(
            path.join(__dirname, "../models/products.json"),
            JSON.stringify(products, null, 4),
            {
                encoding: "utf8",
            }
        );
        res.render( "./product/productList",{ products: products });
    },
    deleteProduct: (req, res) => {
        const id = req.params.id;
        products = products.filter((item) => item.id != id);

        fs.writeFileSync(
            path.join(__dirname, "../models/products.json"),
            JSON.stringify(products, null, 4),
            {
                encoding: "utf-8",
            }
        );
        res.render("./product/productList", { products: products });
    }
}

module.exports = productController;