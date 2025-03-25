const router = require('express').Router()
const Classroom_controller = require("../../Controllers/Classroom_controller")

router.get('/', Classroom_controller.getClassrooms)
router.post('/update', Classroom_controller.updateClassrooms)
router.get('/:id_classroom', Classroom_controller.getItsStudents) 
router.delete("/:id_classroom",Classroom_controller.deleteClassroom)

module.exports = router



