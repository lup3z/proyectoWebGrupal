const db = require('../database/models');

const productModel  = {
    
    findAll: async function () {
        return await db.products.findAll()
    }
}
module.exports = productModel;