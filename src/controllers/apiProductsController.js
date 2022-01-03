const apiProductsModel = require('../models/apiProductsModel');

const controller = {

    allProducts: async function (req, res) {
        try { 
           
            const products = await apiProductsModel.findAll();
            res.status(200).json({
                count: products.length,
               
                products: products.map(item => ({   
                    data: item,
                    detail: `http://localhost:3030/api/products/${item.id}`
                })), 
                status: 200
                })
        } catch (error) {
            res.status(404).render('not-found');
        }
    },
    
    detail: async function (req, res) {
        try {
            const product = await apiProductsModel.findByPk(req.params.id);
            res.status(200).json(
                {   product: product,
                    status: 200
                });
        } catch (error) {
            res.status(404).render('not-found');
        }
    }
}

module.exports = controller;