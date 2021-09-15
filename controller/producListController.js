const products = require ('../model/products.json');

const controller = {
    
    productList: (req,res) => {
        res.render('productList', {
            products: products})
    },

    createProduct: (req,res) => {
        res.render('createProduct')
    },
}

module.exports = controller;