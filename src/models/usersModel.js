const db = require('../database/models');

const usersModel = {
    findAll: async function () {
        return await db.users.findAll()
    },
    generateId: async function (){
        let users = await this.findAll();
        let lastUser = await users.pop();

        if (lastUser) {
            return lastUser.id + 1;
        } else {
            return 1;
        }
    },

    findByPk: async function (id) {
        return await db.users.findByPk(id,{
        });
    },

    findByField: async function (field, text) {
        return await db.users.findOne({
            where: { [field]: text }
        })
    },

    findAllByField: async function (field, text) {
        return await db.users.findAll({
            where: { [field]: text }
        })
    },

    create: async function (newUser) {
        await db.users.create(newUser)
    },

    update: async function (userData, id) {
        await db.users.update({
                user: userData.user,
                name: userData.name,
                surname: userData.surname,
                email: userData.email,
                image: userData.image,
                password: userData.password,
                idUserCategory: userData.idUserCategory,
        },{
            where: { id: id }
        })
    },

    delete: async function (id) {
        await db.users.destroy({
            where: { id: id }
        })
    }
}

module.exports = usersModel;