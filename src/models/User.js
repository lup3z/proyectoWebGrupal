const db = require('../database/models');

const usersModel  = {
    
    findAll: async function () {
        return await db.users.findAll()
    }
}
module.exports = usersModel;