var DataTypes = require("sequelize").DataTypes;
var _products = require("./products");
var _users = require("./users");
var _usercategories = require ("./usercategories");

function initModels(sequelize) {
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var usercategories = _usercategories(sequelize, DataTypes);

  users.belongsTo(usercategories, { as: "userCategory", foreignKey: "idUserCategory" });
  usercategories.hasMany(users, { as: "user", foreignKey: "idUserCategory" });

  return {
    products,
    users,
    usercategories,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
