const router = require('express').Router()
const teacher_controller = require("../../Controllers/Teacher_controller")

router.get('/', teacher_controller.getTeachers)
router.post('/update', teacher_controller.updateTeachers)
router.delete('/:id_teacher', teacher_controller.deleteTeacher)

module.exports = router