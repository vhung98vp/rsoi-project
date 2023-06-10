const Sequelize = require('sequelize');
const db = require('../database');

const Users = db.define('users',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('ADMIN', 'USER'),
    defaultValue: 'USER'
  }
});
module.exports = Users;
  