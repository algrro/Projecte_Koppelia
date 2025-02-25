const sq = require("../Config")
const { DataTypes } = require("sequelize")
const Teacher = sq.define("teacher", {
    id_teacher: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    }
},
    {
        tableName: 'teacher',
        timestamps: false
    })

module.exports = Teacher