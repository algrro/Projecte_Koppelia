const sq = require("../Config")
const { DataTypes } = require("sequelize")
const Invoice = sq.define("invoice", {
    id_invoice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        primaryKey: false,
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,

    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        primaryKey: false,
    },
    id_student: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
    }
}, {
        tableName: 'invoice',
        timestamps: false
    })

module.exports = Invoice
