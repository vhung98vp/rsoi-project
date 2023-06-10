const Sequelize = require('sequelize');
const db = require('../database');

const Statistics = db.define('statistics',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    default: new Date()
  },
  method: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  url: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
});
module.exports = Statistics;
  