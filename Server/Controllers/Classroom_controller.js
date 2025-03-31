const Classroom = require("../Models/classroom")

exports.getClassrooms = (_, res) => {
	Classroom.findAll()
		.then((response) => {
			let arrayResponse = JSON.parse(JSON.stringify(response))
			res.status(200).send(arrayResponse)
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.updateClassrooms = async (req, res) => {
	const classroomsToUpdate = req.body

	try {
		const existingClassrooms = await Classroom.findAll({
			attributes: ["id_classroom"],
			raw: true
		})

		const existingIds = new Set(existingClassrooms.map(c => c.id_classroom))
		const receivedIds = new Set(classroomsToUpdate.map(c => c.id_classroom))

		const updatePromises = []
		const insertPromises = []

		classroomsToUpdate.forEach(classroom => {
			if (existingIds.has(classroom.id_classroom)) {
				updatePromises.push(
					Classroom.update(
						{
							name: classroom.name,
							day: classroom.day,
							start_time: classroom.start_time,
							end_time: classroom.end_time,
							id_price: classroom.id_price,
							id_teacher: classroom.id_teacher
						},
						{ where: { id_classroom: classroom.id_classroom } }
					)
				)
			} else {
				insertPromises.push(
					Classroom.create({
						name: classroom.name,
						day: classroom.day,
						start_time: classroom.start_time,
						end_time: classroom.end_time,
						id_price: classroom.id_price,
						id_teacher: classroom.id_teacher
					})
				)
			}
		})

		const idsToDelete = [...existingIds].filter(id => !receivedIds.has(id))

		const deletePromises = idsToDelete.map(id =>
			Classroom.destroy({ where: { id_classroom: id } })
		)

		await Promise.all([...updatePromises, ...insertPromises, ...deletePromises])

		const allClassrooms = await Classroom.findAll({ order: [["id_classroom", "ASC"]] })

		res.status(200).send(allClassrooms)
	} catch (err) {
		res.status(500).send({ err_message: err.message })
	}
}
