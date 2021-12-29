const db = require('../database/models');

const productsModel = {
    findAll: async function () {
        return await db.products.findAll();
    },
    generateId: async function (){
        let products = await this.findAll();
        let lastProduct = await products.pop();

        if (lastProduct) {
            return lastProduct.id + 1;
        } else {
            return 1;
        }
    },
    create: async function (newProduct) {
        await db.products.create(newProduct)
    },
    findByPk: async function (id) {
        return await db.products.findByPk(id);
    },
    delete: async function (id) {
        await db.products.destroy({
            where: { id: id }
        })
    },






    findByField: async function (field, text) {
        let productFound = await db.products.findOne({
            where: { [field]: text }
        })
        return await productFound;
    },

    findAllByField: async function (field, text) {
        let productsFound = await db.products.findAll({
            where: { [field]: text }
        })
        return await productsFound;
    },
    update: async function (productData, id) {
        await db.products.update({
            name: productData.name,
            description: productData.description,
            image: productData.image,
            idProductsCategory: productData.idProductsCategory,
            size: productData.size,
            price: productData.price,
            inSale: productData.inSale,
            discountPrice: productData.discountPrice,
            discount: productData.discount
        },{
            where: { id: id }
        })
    }
}
module.exports = productsModel;