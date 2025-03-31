import jsPDF from "jspdf"

export const generatePDF = (data) => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Factura", 80, 15)
    doc.setFontSize(12)
    doc.text(`Data d'emissió: ${data.date}`, 10, 30)
    doc.text(`Nom: ${data.name} ${data.surname}`, 10, 40)
    doc.text(`Nombre de classes totals: ${data.total_classes}`, 10, 50)
    const conceptText = data.details.map(detail =>
        `Clase: ${detail.num_classes}, Precio: ${detail.unit_price}€, Descuento: ${detail.discount}, Final: ${detail.final_price}€`
    ).join("\n")
    const conceptLines = doc.splitTextToSize(conceptText, 180)
    doc.text(conceptLines, 10, 60)
    doc.text(`Total: ${data.total_price} €`, 10, 80)
    doc.save(`Factura_${data.name}_${data.date}.pdf`)
}
