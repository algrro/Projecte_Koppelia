const sq = require("../Config")
const { DataTypes } = require("sequelize")
const Classroom = sq.define("classroom", {
    id_classroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    start_time: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    end_time: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    id_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false
    },
    id_teacher: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false
    }
},
    {
        tableName: 'classroom',
        timestamps: false
    })

module.exports = Classroom