const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

// Definindo o modelo de User
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
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    generated_token: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
  defaultScope: {
    attributes: { exclude: ['password'] }
  }
});

module.exports = { User, sequelize };