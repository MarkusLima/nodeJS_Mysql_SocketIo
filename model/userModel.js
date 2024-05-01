const { Sequelize, DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

// Definindo o modelo de Usuário
const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
});

(async () => {
  await sequelize.sync();
  console.log('Model user synchronized with database');
})();

module.exports = { User };