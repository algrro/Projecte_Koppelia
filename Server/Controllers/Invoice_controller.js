const Invoice = require("../Models/invoice")
const Student = require("../Models/student")
const invoiceCalculator = require("../Utils/invoiceCalculator")
const StudentClassroom = require("../Models/student_classroom")
const Classroom = require("../Models/classroom")
const Price = require("../Models/price")
const { DATEONLY } = require("sequelize")

exports.getInvoices = (_, res) => {
    Invoice.findAll()
        .then((response) => {
            let arrayResponse = JSON.parse(JSON.stringify(response))
            res.status(200).send({ invoices: arrayResponse })
        })
        .catch((err) => {
            res
                .status(500)
                .send({ err_message: err })
        })
}

exports.deleteInvoice = async (req, res) => {
    try {
        let invoiceData = await Invoice.findByPk(req.params.id_invoice)
        if (invoiceData != null) {
            let idStudent = JSON.parse(JSON.stringify(invoiceData)).id_student
            const studentData = await Student.findOne({ where: { id_student: idStudent } })
            await Invoice.destroy({ where: { id_invoice: req.params.id_invoice } })
            await studentData.update({ month_paid: false })
            res.status(200).send(`Se ha eliminado la factura seleccionada con id ${req.params.id_invoice}`)
        } else {
            res.status(200).send(`No existe la factura con id ${req.params.id_invoice}`)
        }
    }
    catch (err) {
        res.status(500).send({ err_message: err })
    }
}

exports.addInvoice = async (req, res) => {
    try {
        const studentData = await Student.findByPk(req.params.id_student, {
            attributes: ['id_student', 'name', 'surname', 'family_disc']
        })
        if (studentData != null) {
            const studentInfo = JSON.parse(JSON.stringify(studentData))
            const studentClassroomData = await StudentClassroom.findAll({ where: { id_student: studentInfo.id_student } })
            const studentClassroomInfo = JSON.parse(JSON.stringify(studentClassroomData))
            if (studentClassroomInfo.length > 0) {
                const priceData = await Promise.all(
                    studentClassroomData.map(async (element) => {
                        const classroomData = await Classroom.findByPk(element.id_classroom)
                        const priceObjectData = await Price.findByPk(classroomData.id_price)
                        const priceObjectInfo = JSON.parse(JSON.stringify(priceObjectData))
                        return priceObjectInfo
                    })
                )
                const result = invoiceCalculator.CalculateTotalConcept(
                    priceData,
                    studentInfo.family_disc
                )

                const newInvoice = await Invoice.create({
                    total: result.Price,
                    concept: result.Concept,
                    date: new DATEONLY(),
                    id_student: studentInfo.id_student,
                })
                //await studentData.update({ month_paid: true })
                const invoice = {...result, name: studentInfo.name, surname: studentInfo.surname, date: new Date(), idStudent: studentInfo.id_student, idInvoice: newInvoice.id_invoice}
                res.status(200).send(invoice)
            } else {
                res.status(200).send(`La alumna ${studentInfo.name} ${studentInfo.surname} no está matriculada en ninguna clase`)
            }
        } else {
            res.status(200).send(`No existe el alumno con id: ${req.params.id_student}`)
        }
    }
    catch (err) {
        res.status(500).send({ err_message: err })
    }
}