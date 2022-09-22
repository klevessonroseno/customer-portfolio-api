import dotenv from 'dotenv';

dotenv.config();


module.exports = {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },

};