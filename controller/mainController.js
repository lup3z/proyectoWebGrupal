const controlador = {

    main: (req, res) => {
       res.render('home')
    },
   login: () => {
       res.redirect('/login/')
    }


}

module.exports = controlador;