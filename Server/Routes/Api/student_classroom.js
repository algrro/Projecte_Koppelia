const router = require('express').Router()
const StudentClassroom_controller = require("../../Controllers/StudentClassroom_controller")

router.get('/', StudentClassroom_controller.getStudentClassroom)
router.post('/sign', StudentClassroom_controller.signUpStudentClass)

module.exports = router