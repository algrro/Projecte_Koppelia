import jsPDF from "jspdf"

export const generatePDF = (data) => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Factura", 80, 15)
    doc.setFontSize(12)
    doc.text(`Data d'emissió: ${data.date}`, 10, 30)
    doc.text(`Nom: ${data.name} ${data.surname}`, 10, 40)
    doc.text(`Concepte: ${data.Concept}`, 10, 50)
    doc.text(`Total: ${data.Price} €`, 10, 60)
    doc.save(`Factura_${data.name}_${data.date}.pdf`)
}