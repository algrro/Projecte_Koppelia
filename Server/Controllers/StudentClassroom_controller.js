const StudentClassroom = require("../Models/student_classroom")

exports.getStudentClassroom = (_, res) => {
    StudentClassroom.findAll()
        .then((response) => {
            let arrayResponse = JSON.parse(JSON.stringify(response))
            res.status(200).send(arrayResponse)
        })
        .catch((err) => {
            res.status(500).send({ err_message: err })
        })
}

exports.signUpStudentClass = async (req, res) => {
    try {
        const { id_student, id_classroom_enroll, id_classroom_unenroll } = req.body
        let enrolledClassrooms = []
        if (id_classroom_unenroll.length > 0) {
            await StudentClassroom.destroy({
                where: {
                    id_student,
                    id_classroom: id_classroom_unenroll
                }
            })
        }
        if (id_classroom_enroll.length > 0) {
            for (const classroomId of id_classroom_enroll) {
                const existingEnrollment = await StudentClassroom.findOne({
                    where: { id_student, id_classroom: classroomId }
                })
                if (!existingEnrollment) {
                    const newEnrollment = await StudentClassroom.create({ id_student, id_classroom: classroomId })
                    enrolledClassrooms.push(newEnrollment.id_classroom)
                }
            }
        }
        res.status(200).send({ id_student, id_enrolled: enrolledClassrooms })
    } catch (err) {
        res.status(500).send({ err_message: err })
    }
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
