const router = require('express').Router()
const StudentClassroom_controller = require("../../Controllers/StudentClassroom_controller")

router.get('/', StudentClassroom_controller.getStudentClassroom)
router.post('/sign', StudentClassroom_controller.signUpStudentClass)
router.delete('/sign_out/:id_student/:id_classroom', StudentClassroom_controller.signOutStudentClass)
module.exports = router