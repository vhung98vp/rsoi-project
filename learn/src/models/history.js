const Sequelize = require('sequelize');
const db = require('../database');

const Histories = db.define('histories',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  history_uid: {
    type: Sequelize.UUID,
    allowNull: false
  },
  set_uid: {
    type: Sequelize.UUID,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  remember_rate: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100
    }
  },
  last_learn: {
    type: Sequelize.DATE,
    allowNull: true
  },
  last_test: {
    type: Sequelize.DATE,
    allowNull: true
  },
  notification: {
    type: Sequelize.DATE,
    allowNull: true
  }
});
module.exports = Histories;
  