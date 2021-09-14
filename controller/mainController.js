
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

    create: (req,res) => {
        let usuario = {
            mail: req.body.mail,
            nombre: req.body.nombre,
            contrasena: req.body.contrasena,
            pais: req.body.pais
        }
        res.redirect("/")
    },

    

    productList: (req,res) => {
        res.render('productList')
    }
}

module.exports = controlador;
