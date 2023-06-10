const Sequelize = require('sequelize');
const db = require('../database');

const Flashcards = db.define('flashcards',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  word: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  meaning: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  example: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  set_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = Flashcards;
  