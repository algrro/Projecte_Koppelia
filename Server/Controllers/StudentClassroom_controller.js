const StudentClassroom = require("../Models/student_classroom")

exports.signUpStudentClass = (req, res) => {
    StudentClassroom.create({ id_student: req.body.id_student, id_classroom: req.body.id_classroom })
        .then(() => {
            res.status(200).send("Se ha matriculado la persona")
        })
        .catch((err) => {
            res.status(500).send({ err_message: err })
        })
}

exports.signOutStudentClass = (req, res) => {
    StudentClassroom.destroy({ where: { id_student: req.body.id_student, id_classroom: req.body.id_classroom } })
        .then(() => {
            res.status(200).send("Se ha desmatriculado la persona ")
        })
        .catch((err) => {
            res.status(500).send({ err_message: err })
        })
}
