const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
  }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
  });
};

