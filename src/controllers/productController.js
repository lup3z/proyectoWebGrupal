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
    editProduct: async function (req, res) {
        try{
            const file = req.file;
            const id = req.params.id;

            let productToUpdate = {
                ...req.body,
                imagen: `img/${file.filename}`,
            }
            
            const products = await productsModel.findAll();
            await productsModel.update(productToUpdate, id);
            res.render( "./product/productList",{ products });
        } catch (error) {
            res.status(404).render('not-found');
        } 
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