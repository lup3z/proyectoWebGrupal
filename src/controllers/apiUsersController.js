const apiUsersModel = require('../models/apiUsersModel');


let controller = {

  
    allUsers: async function (req, res) {
        try {
            const users = await apiUsersModel.findAll();
            res.status(200).json({
                count: users.length,
                Users: users.map(item => ({
                    id: item.id,
                   email: item.email,
                    name: item.nombre,
                    surname: item.apellido,
                    detail: `http://localhost:3030/api/users/${item.id}`
                })),
                status: 200
                })
        } catch (error) {
            res.status(404).render('not-found');
        }
    },
    
 
    detail: async function (req, res) {
        try {
            const user = await apiUsersModel.findByPk(req.params.id);
            res.status(200).json(
                { 
                User: {
                    id: user.id,
                    email: user.email,
                    name: user.nombre,
                    surname: user.apellido,
                    image: `http://localhost:3030/${user.avatar}`
                },
                status: 200
                });
        } catch (error) {
            res.status(404).render('not-found');
        }
    }
}

module.exports = controller