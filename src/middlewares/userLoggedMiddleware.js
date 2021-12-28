const usersModel = require('../models/usersModel');

async function userLoggedMiddleware(req, res, next) {
    try {
        res.locals.isLogged = false;

        let emailInCookie = req.cookies.userCookieEmail;
        if (emailInCookie) {
            let userFromCookie = await usersModel.findByField('email', emailInCookie);

            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }
        }

        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }

        next();

    } catch (error) {
        res.send(error);
    }
}

module.exports = userLoggedMiddleware;