const router = require('express').Router()
const Price_Controller = require("../../Controllers/Price_controller")

router.get('/', Price_Controller.getPrices)
router.post('/update', Price_Controller.updatePrices)

module.exports = router



