const Teacher = require("../Models/teacher")

exports.getTeachers = (_, res) => {
	Teacher.findAll()
		.then((response) => {
			let arrayResponse = JSON.parse(JSON.stringify(response))
			res.status(200).send({ teachers: arrayResponse })
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.addTeacher = (req, res) => {
	Teacher.create({name: req.body.name})
		.then(() => {
			res.status(200).send(`New teacher: ${req.body.name}`)
		})
		.catch((err) =>
			res.status(500).send({ err_message: err }))
}

exports.deleteTeacher = ((req, res) => {
	Teacher.destroy({ where: { id_teacher: req.params.id_teacher } })
		.then(() => {
			res.status(200).send(`Se ha eliminado el profesor ${req.params.id_teacher}`)
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
})