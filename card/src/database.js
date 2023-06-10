const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/cards", {
    dialectOptions:{
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false 
        // }        
    }, define: {
        timestamps: false
    }
});

module.exports = database;