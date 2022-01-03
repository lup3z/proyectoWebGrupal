const apiProductsModel = require('../models/apiProductsModel');

const controller = {

    allProducts: async function (req, res) {
        try {
            // const categoryJinete = await apiProductsModel.findAll({where: {idProductsCategory: {[op.eq]: 1}}}).then((resultado => {return resultado}))
            const products = await apiProductsModel.findAll();
            res.status(200).json({
                count: products.length,
                // countByCategory: {jinete: categoryJinete.length},
                products: products.map(item => ({   
                    data: item,
                    detail: `http://localhost:3000/api/products/${item.id}`
                })), 
                status: 200
                })
        } catch (error) {
            res.status(404).render('404-page.ejs');
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
            res.status(404).render('404-page.ejs');
        }
    }
}

module.exports = controller;