const controlador = {

    main: (req, res) => {
        res.send('home')
    },
    login: () => {
        res.redirect('/login/')
    }


}

module.exports = controlador;