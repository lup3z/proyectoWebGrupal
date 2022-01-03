const db = require('../database/models');

const apiUsersModel = {
    /* Return all the information from the database */
    findAll: async function () {
        return await db.users.findAll()
    },


    /* Find a user by its ID */
    findByPk: async function (id) {
        return await db.users.findByPk(id)
        
    },

}


module.exports = apiUsersModel;