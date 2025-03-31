const router = require('express').Router()
const Invoice_controller = require("../../Controllers/Invoice_controller")

router.post('/:id_student', Invoice_controller.addInvoice)
router.delete('/:id_invoice',Invoice_controller.deleteInvoice)

module.exports = router



