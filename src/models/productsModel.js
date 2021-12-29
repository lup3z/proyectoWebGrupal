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
    update: async function (productData, id) {
        await db.products.update({
            nombre: productData.nombre,
            descripcion: productData.descripcion,
            volumen: productData.volumen,
            autor: productData.autor,
            artista: productData.artista,
            editorial: productData.editorial,
            qDePaginas: productData.qDePaginas,
            colorObyn: productData.colorObyn,
            edicion: productData.edicion,
            precio: productData.precio,
            imagen: productData.imagen
        },{
            where: { id: id }
        })
    }
}
module.exports = productsModel;