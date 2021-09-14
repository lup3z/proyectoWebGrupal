const products = require ('../model/products.json');

const controller = {
    
    productList: (req,res) => {
        res.render('productList', {
            products: products})
    },
}

module.exports = controller;