const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', 'vinayarva1306', '3000' , {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

