const router = require('express').Router()
const student_controller = require("../../Controllers/Student_controller")

router.get('/', student_controller.getStudents)
router.get('/reset_month_paid', student_controller.resetStudentsMonthPaid)
router.get('/:id_student', student_controller.getOneStudent)
router.get('/:id_student/get_classrooms', student_controller.getTheirClassrooms)
router.post('/add_student', student_controller.addStudent)
router.post('/edit_student/:id_student', student_controller.editStudent)
router.delete('/:id_student', student_controller.deleteStudent)

module.exports = router



