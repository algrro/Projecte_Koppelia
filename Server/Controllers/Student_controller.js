const Student = require("../Models/student")
const Student_Classroom = require("../Models/student_classroom")
const Classroom = require("../Models/classroom")

exports.getStudents = (_, res) => {
	Student.findAll({ order: [['id_student', 'ASC']] })
		.then((response) => {
			let arrayResponse = JSON.parse(JSON.stringify(response))
			res.status(200).send(arrayResponse)
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.getOneStudent = (req, res) => {
	Student.findByPk(req.params.id_student)
		.then((response) => {
			let arrayResponse = JSON.parse(JSON.stringify(response))
			res.status(200).send({ student: arrayResponse })
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.getTheirClassrooms = (req, res) => {
	Student_Classroom.findAll({ where: { id_student: req.params.id_student } })
		.then((resp) => {
			let arrayIdClassroom = resp.map(item => item.id_classroom)
			Promise.all(
				arrayIdClassroom.map(
					idClassroom => Classroom.findByPk(idClassroom)
						.then((objeto) => {
							return {
								id_clase: objeto.id_classroom,
								nivel: objeto.name,
								dia: objeto.day
							}
						})
						.catch((err) => {
							res.status(500).send({ err_message: err })
						})))
				.then((r) => {
					res.status(200).send({ clases_del_alumno: JSON.parse(JSON.stringify(r)) })
				})
				.catch((err) => {
					res.status(500).send({ err_message: err })
				})
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.getStudentsMonthPaid = (req, res) => {
	Student.findAll({ where: { month_paid: false } })
		.then((response) => {
			let arrayResponse = JSON.parse(JSON.stringify(response))
			res.status(200).send({ students: arrayResponse })
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.addStudent = (req, res) => {
	Student.create({
		name: req.body.name,
		surname: req.body.surname,
		matricula_paid: req.body.matricula_paid,
		month_paid: req.body.month_paid,
		picture_permission: req.body.picture_permission,
		family_disc: req.body.family_disc,
		birth_date: req.body.birth_date,
		email: req.body.email,
		phone: req.body.phone,
		tutor: req.body.tutor,
		contacto_tutor: req.body.contacto_tutor
	})
		.then((newStudent) => {
			res.status(200).send(newStudent)
		})
		.catch((err) =>
			res.status(500).send({ err_message: err }))
}

exports.deleteStudent = ((req, res) => {
	Student.destroy({ where: { id_student: req.params.id_student } })
		.then((studentDeleted) => {
			res.status(200).send(req.params.id_student)
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
})

exports.editStudent = async (req, res) => {
	try {
		const studentId = req.params.id_student
		const [updated] = await Student.update(req.body, {
			where: { id_student: studentId }
		})
		if (updated) {
			const updatedStudent = await Student.findByPk(studentId);
			res.status(200).send(updatedStudent);
		} else {
			res.status(200).send({ message: "Estudiante no encontrado" });
		}
	} catch (err) {
		res.status(500).send({ err_message: err });
	}
};
