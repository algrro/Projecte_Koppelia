const Price = require("../Models/price")

exports.getPrices = (_, res) => {
    Price.findAll({
        order: [["id_price", "ASC"]]
    })
        .then((response) => {
            let arrayResponse = JSON.parse(JSON.stringify(response))
            res.status(200).send(arrayResponse)
        })
        .catch((err) => {
            res
                .status(500)
                .send({ err_message: err })
        })
}

exports.updatePrices = async (req, res) => {
    const pricesToUpdate = req.body
    try {
        const existingPrices = await Price.findAll({
            attributes: ["id_price"],
            raw: true
        })

        const existingIds = new Set(existingPrices.map(p => p.id_price))
        const receivedIds = new Set(pricesToUpdate.map(p => p.id_price))

        const updatePromises = []
        const insertPromises = []

        pricesToUpdate.forEach(price => {
            if (existingIds.has(price.id_price)) {
                updatePromises.push(
                    Price.update(
                        {
                            unit_price: price.unit_price,
                            disc_2: price.disc_2,
                            disc_3: price.disc_3,
                            disc_4: price.disc_4,
                            disc_5: price.disc_5
                        },
                        { where: { id_price: price.id_price } }
                    )
                )
            } else {
                insertPromises.push(
                    Price.create({
                        unit_price: price.unit_price,
                        disc_2: price.disc_2,
                        disc_3: price.disc_3,
                        disc_4: price.disc_4,
                        disc_5: price.disc_5
                    })
                )
            }
        })

        const idsToDelete = [...existingIds].filter(id => !receivedIds.has(id))

        const deletePromises = idsToDelete.map(id =>
            Price.destroy({ where: { id_price: id } })
        )

        await Promise.all([...updatePromises, ...insertPromises, ...deletePromises])

        const allPrices = await Price.findAll({ order: [["id_price", "ASC"]] })
        res.status(200).send(allPrices)
    } catch (err) {
        res.status(500).send({ err_message: err.message })
    }
}