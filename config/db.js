const { Sequelize, DataTypes } = require('sequelize');

// Configurações do Sequelize
const sequelize = new Sequelize('challenger_nodejs', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = { sequelize };