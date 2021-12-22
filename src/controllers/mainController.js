const { productModel } = require('../models/Product');






const controlador = {

    main: (req, res) => {
       res.render('home')
    },

    productCart: (req,res) => {
        res.render('productCart')
    },
   
    list: (req, res) => {
        db.Users.findAll()
            .then(function(usuarios){
                res.send({usuarios})

            })
    },
    list2: (req, res) => {
        db.Products.findAll()
            .then(function(usuarios){
                res.send({usuarios})

            })
    }
    
}

	


module.exports = controlador