const controlador = {

    main: (req, res) => {
       res.render('home')
    },
   login: (req,res) => {
       res.render('login')
    },

    productCart: (req,res) => {
        res.render('productCart')
    },


    productDetails: (req,res) => {
        res.render('productDetails')
    },

    register: (req,res) => {
        res.render('register')
    },

    productList: (req,res) => {
        res.render('productList')
    }
}

module.exports = controlador;
