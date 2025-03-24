const Teacher = require("../Models/teacher")

exports.getTeachers = (_, res) => {
	Teacher.findAll()
		.then((response) => {
			let arrayResponse = JSON.parse(JSON.stringify(response))
			res.status(200).send(arrayResponse)
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.updateTeachers = async (req, res) => {
	const teachersToUpdate = req.body
	try {
		const existingTeachers = await Teacher.findAll({
			attributes: ["id_teacher"],
			raw: true
		})

		const existingIds = new Set(existingTeachers.map(t => t.id_teacher))
		const receivedIds = new Set(teachersToUpdate.map(t => t.id_teacher))

		const updatePromises = []
		const insertPromises = []

		teachersToUpdate.forEach(teacher => {
			if (existingIds.has(teacher.id_teacher)) {
				updatePromises.push(
					Teacher.update(
						{
							name: teacher.name
						},
						{ where: { id_teacher: teacher.id_teacher } }
					)
				)
			} else {
				insertPromises.push(
					Teacher.create({
						name: teacher.name
					})
				)
			}
		})

		const idsToDelete = [...existingIds].filter(id => !receivedIds.has(id))

		const deletePromises = idsToDelete.map(id =>
			Teacher.destroy({ where: { id_teacher: id } })
		)

		await Promise.all([...updatePromises, ...insertPromises, ...deletePromises])

		const allTeachers = await Teacher.findAll({ order: [["id_teacher", "ASC"]] })
		res.status(200).send(allTeachers)
	} catch (err) {
		console.error("Error al actualizar profesores:", err)
		res.status(500).send({ err_message: err.message })
	}
}

exports.addTeacher = (req, res) => {
	Teacher.create({ name: req.body.name })
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