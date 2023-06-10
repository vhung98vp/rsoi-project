const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/statistics", {
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