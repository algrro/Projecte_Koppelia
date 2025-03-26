function CalculateInvoice(priceData) {
    const numClasses = priceData.length
    const discountKey = `disc_${numClasses}`
    let totalPrice = 0
    let details = []

    priceData.forEach((item) => {
        const discount = item[discountKey] || 0
        const priceWithDiscount = item.unit_price * (1 - discount / 100)
        totalPrice += priceWithDiscount

        details.push({
            num_classes: 1,
            unit_price: item.unit_price,
            discount: discount > 0 ? `${discount}%` : "0%",
            final_price: priceWithDiscount
        })
    })

    return {
        total_classes: numClasses,
        details: details,
        total_price: totalPrice
    }
}

module.exports = { CalculateInvoice }