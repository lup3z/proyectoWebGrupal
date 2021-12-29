const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Products', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    volumen: {
        type: DataTypes.STRING(255),
        allowNull: false
    }, 
    autor: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    artista: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    editorial: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    qDePaginas: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    colorObyn: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    edicion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    precio: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
    }, {
      sequelize,
      tableName: 'products',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        }
      ]
    });
  };
  