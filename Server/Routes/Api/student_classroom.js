const router = require('express').Router()
const StudentClassroom_controller = require("../../Controllers/StudentClassroom_controller")

router.post('/sign_up', StudentClassroom_controller.signUpStudentClass)
router.delete('/sign_out/:id_student/:id_classroom', StudentClassroom_controller.signOutStudentClass)
module.exports = router