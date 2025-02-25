const router = require('express').Router()
const Price_Controller = require("../../Controllers/Price_controller")

router.get('/', Price_Controller.getPrices)
router.post('/add_price', Price_Controller.addPrice)
router.delete("/:id_price", Price_Controller.deletePrice)

module.exports = router



