const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('kopelia', 'postgres', 'postgres',{host:'localhost',dialect:'postgres', logging: false})
//const sequelize = new Sequelize('Kopelia', 'postgres', 'postgres',{host:'localhost',dialect:'postgres'})

module.exports = sequelize

