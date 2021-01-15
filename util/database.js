const Sequelize = require('sequelize');

const sequelize = new Sequelize('elm', 'postgres', 'Wvurbiz1@', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;
