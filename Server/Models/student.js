const sq = require("../Config")
const { DataTypes } = require("sequelize")

const Student = sq.define("student", {
    id_student: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
    },
    matricula_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        primaryKey: false,
        defaultValue: false,
    },
    month_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        primaryKey: false,
        defaultValue: false,
    },
    picture_permission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        primaryKey: false,
        defaultValue: false,
    },
    family_disc: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        primaryKey: false,
        defaultValue: false,
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        primaryKey: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
    },
    tutor: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
    },
    contacto_tutor: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
    }
},
    {
        tableName: 'student',
        timestamps: false
    })

module.exports = Student