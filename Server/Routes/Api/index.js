const router = require('express').Router()

router.use('/student', require('./student'))
router.use('/teacher', require('./teacher'))
router.use('/classroom', require('./classroom'))
router.use('/student_classroom', require('./student_classroom'))
router.use('/price', require('./price'))
router.use('/invoice', require('./invoice'))

module.exports = router

