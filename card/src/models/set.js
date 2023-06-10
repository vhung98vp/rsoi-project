const Sequelize = require('sequelize');
const db = require('../database');

const Sets = db.define('sets',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  set_uid: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  level: {
    type: Sequelize.ENUM('EASY', 'MEDIUM', 'HARD'),
    allowNull: false
  },
  category_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
});
module.exports = Sets;
  