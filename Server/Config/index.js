const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('DB_Koppelia', 'postgres', 'postgres',{host:'localhost',dialect:'postgres', logging: false})

module.exports = sequelize

