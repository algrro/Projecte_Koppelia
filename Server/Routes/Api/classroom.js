const router = require('express').Router()
const Classroom_controller = require("../../Controllers/Classroom_controller")

router.get('/', Classroom_controller.getClassrooms)
router.post('/update', Classroom_controller.updateClassrooms)

module.exports = router



