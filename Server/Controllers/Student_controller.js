const Student = require("../Models/student")

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
		.then(() => {
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
			const updatedStudent = await Student.findByPk(studentId)
			res.status(200).send(updatedStudent)
		} else {
			res.status(200).send({ message: "Estudiant no existeix" })
		}
	} catch (err) {
		res.status(500).send({ err_message: err })
	}
}
