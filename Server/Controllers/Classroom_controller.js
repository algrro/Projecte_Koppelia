const Classroom = require("../Models/classroom")
const Student = require("../Models/student")
const StudentClassroom = require("../Models/student_classroom")

exports.getClassrooms = (_, res) => {
	Classroom.findAll()
		.then((response) => {
			let arrayResponse = JSON.parse(JSON.stringify(response))
			res.status(200).send( arrayResponse )
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
        console.error("Error al actualizar clases:", err)
        res.status(500).send({ err_message: err.message })
    }
}

exports.addClassroom = (req, res) => {
	Classroom.create({
		name: req.body.name,
		day: req.body.day,
		start_time: req.body.start_time,
		end_time: req.body.end_time,
		id_price: req.body.id_price,
		id_teacher: req.body.id_teacher,
	})
		.then(() => {
			res.status(200).send("Se ha asdasdinsertado la clase " + req.body.name)
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.deleteClassroom = (req, res) => {
	Classroom.destroy({ where: { id_classroom: req.params.id_classroom } })
		.then(() => {
			res.status(200).send("Se ha eliminado la clase seleccionada ")
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}

exports.getItsStudents = (req, res) => {
	StudentClassroom.findAll({ where: { id_classroom: req.params.id_classroom } })
		.then((resp) => {
			let arrayIdStudents = resp.map(item => item.id_student)
			Promise.all(
				arrayIdStudents.map(
					idStudent => Student.findByPk(idStudent)
						.then((objeto) => {
							return {
								id_student: objeto.id_student,
								nombre: objeto.name,
								apellidos: objeto.surname
							}
						})
						.catch((err) => {
							res.status(500).send({ err_message: err })
						})))
				.then((r) => {
					res.status(200).send({ alumnos_de_la_clase: JSON.parse(JSON.stringify(r)) })
				})
				.catch((err) => {
					res.status(500).send({ err_message: err })
				})
		})
		.catch((err) => {
			res.status(500).send({ err_message: err })
		})
}