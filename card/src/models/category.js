const Sequelize = require('sequelize');
const db = require('../database');

const Categories = db.define('categories',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
});
module.exports = Categories;
  