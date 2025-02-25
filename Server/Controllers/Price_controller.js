const Price = require("../Models/price")

exports.getPrices = (_, res) => {
    Price.findAll()
        .then((response) => {
            let arrayResponse = JSON.parse(JSON.stringify(response))
            res.status(200).send({ prices: arrayResponse })
        })
        .catch((err) => {
            res
                .status(500)
                .send({ err_message: err })
        })
}

exports.addPrice = (req, res) => {
    Price.create({
        unit_price: req.body.unit_price,
        disc_2: req.body.disc_2,
        disc_3: req.body.disc_3,
        disc_4: req.body.disc_4,
        disc_5: req.body.disc_5
    })
        .then(() => {
            res.status(200).send("Se ha insertado el precio ")
        })
        .catch((err) => {
            res.status(500).send({ err_message: err })
        })
}

exports.deletePrice = (req, res) => {
    Price.destroy({ where: { id_price: req.params.id_price } })
        .then(() => {
            res.status(200).send("Se ha eliminado el precio seleccionado.")
        })
        .catch((err) => {
            res.status(500).send({ err_message: err })
        })
}
