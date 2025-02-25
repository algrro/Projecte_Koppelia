function CalculatePrice(numclass, UnitPrice, Disc) {
	return UnitPrice * numclass * (1 - Disc)
}

function CreateConcept(numClass, UnitPrice, Disc, Subtotal, isballet = true) {
	if (isballet == true) {
		return {
			line: "Clases de ballet. ",
			num: numClass,
			price: UnitPrice,
			disc: Disc * 100,
			sub: Subtotal,
		}
	} else {
		return {
			line: "Otras clases. ",
			num: numClass,
			price: UnitPrice,
			disc: 0,
			sub: Subtotal,
		}
	}
}
function CalculateTotalConcept(priceData, family_disc = false) {
	let Concept = []
	let TotalPrice = 0
	//Clases sueltas
	let Sueltas = priceData.filter((obj) => obj.id_price == 4)

	if (Sueltas.length > 0) {
		Subtotal = CalculatePrice(Sueltas.length, Sueltas[0].unit_price, 0)
		Concept.push(
			CreateConcept(Sueltas.length, Sueltas[0].unit_price, Subtotal, false)
		)
		TotalPrice = TotalPrice + Subtotal
	}
	let numDisc = 0
	//Half hour point classes. No disc, only if there are 2,4,6...
	let Puntas = priceData.filter((obj) => obj.id_price == 5)
	if (Puntas.length != 0) {
		numDisc = Math.floor(Puntas.length / 2)
		let numNoDisc = Puntas.length % 2
		//Manage point classes without disc
		if (numNoDisc != 0) {
			Subtotal = CalculatePrice(numNoDisc, Puntas[0].unit_price, 0)

			Concept.push(
				CreateConcept(numNoDisc, Puntas[0].unit_price, Subtotal, false)
			)
		}
	}
	//Classes with discount

	numDisc =
		numDisc +
		priceData.filter((obj) => obj.id_price != 4 && obj.id_price != 5).length
	let unitp = priceData.filter(
		(obj) => obj.id_price != 4 && obj.id_price != 5
	)[0].unit_price
	let disc = 0
	switch (numDisc) {
		case 2:
			disc = priceData.filter(
				(obj) => (obj.id_price != 4) | (obj.id_price != 5)
			)[0].disc2
			break
		case 3:
			disc = priceData.filter(
				(obj) => (obj.id_price != 4) | (obj.id_price != 5)
			)[0].disc3
			break
		case 4:
			disc = priceData.filter(
				(obj) => (obj.id_price != 4) | (obj.id_price != 5)
			)[0].disc4
			break
		case 5:
			disc = priceData.filter(
				(obj) => (obj.id_price != 4) | (obj.id_price != 5)
			)[0].disc5
			break
		default:
			break
	}
	if (numDisc != 0) {
		let Subtotal = CalculatePrice(numDisc, unitp, disc)

		Concept.push(CreateConcept(numDisc, unitp, disc, Subtotal))
		TotalPrice = TotalPrice + Subtotal
	}

	//family discount???
	let ConceptString = ""
	Concept.forEach((element) => {
		ConceptString =
			ConceptString +
			element.line +
			" Numero de clases: " +
			element.num +
			". Descuento: " +
			element.disc +
			"%. " +
			"Subtotal: " +
			element.sub +
			"€.\n"
	})
	if (family_disc == true) {
		let discAmount = 0.1 * TotalPrice
		ConceptString =
			ConceptString +
			" Descuento familiar: 10%" +
			+"Subtotal: " +
			-discAmount +
			"€.\n"
		TotalPrice = TotalPrice / discAmount
	}
	return { Concept: ConceptString, Price: TotalPrice }
}

module.exports = { CalculateTotalConcept }
