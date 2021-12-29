const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const  productsModel = require('../models/productsModel');

const { validationResult } = require('express-validator');

const productController = {
    createProduct: async function (req, res) {
        try {
            const products = await productsModel.findAll();
            const file = req.file;
            const id = await productsModel.generateId();
            
            let newProduct = {
                id: id,
                ...req.body,
                imagen: `img/${file.filename}`,
            }
            await productsModel.create(newProduct);            
            res.render("./product/productList", {products});
        } catch (error) {
            res.status(404).render('not-found');
        } 
    },
    getCreateProduct: (req, res) => {
        res.render('./product/createProduct')
    },
    productList: async function (req, res) {
        try{
            const products = await productsModel.findAll(); 
            res.render('./product/productList', {products})
        } catch (error) {
        res.status(404).render('not-found');
        }  
    },
    productDetail: async function (req, res) {
        try{
            const id = req.params.id;
            const product = await productsModel.findByPk(id);
            res.render('../views/product/productDetail', {product})
        } catch (error) {
            res.status(404).render('not-found');
        } 
    },
    getProductToEdit: async function (req, res) {
        try{
            const id = req.params.id;
            const products = await productsModel.findByPk(id);
            res.render("./product/editProduct", {products})
        } catch (error) {
            res.status(404).render('not-found');
        } 
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
    
    
    deleteProduct:  async function (req, res) {
        try{
            const products = await productsModel.findAll();
            await productsModel.delete(req.params.id);
            return res.render("./product/productList", {products});
        } catch (error) {
            res.status(404).render('not-found');
        } 
    }
}

module.exports = productController;