const db = require('../database/models');

const apiProductsModel = {
    async function () {
        return await db.products.findAll();
      },


    /* Find a user by its ID */
    findByPk: async function (id) {
        return await db.products.findByPk(id);
    },

}


module.exports = apiProductsModel;