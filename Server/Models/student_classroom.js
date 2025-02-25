const sq = require("../Config")
const { DataTypes } = require("sequelize")
const StudentClassroom = sq.define("student_classroom", {
    id_student: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_classroom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
        tableName: 'student_classroom',
        timestamps: false
    })

module.exports = StudentClassroom