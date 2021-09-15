const products = require ('../model/products.json');

const controller = {
    
    productList: (req,res) => {
        res.render('productList', {
            products: products})
    },

    createProduct: (req,res) => {
        res.render('createProduct')
    },

    editProduct: (req,res) => {
        let idProduct = req.params.idProduct;
        let productToEdit = products[idProduct];
        res.render('editProduct', {productToEdit : productToEdit})
    },

    abmproduct:(req,res) => {
    let producto = {
        nombre: req.body.nombre,
        description: req.body.description,
        producto: req.body.producto,
        precio: req.body.precio,
        categoria: req.body.categoria
    }
    res.redirect("/")
    },
}

module.exports = controller;