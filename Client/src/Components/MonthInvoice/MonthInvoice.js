import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { addInvoice, editStudent, deleteInvoice } from '../../Redux/Actions/studentActions'
import { generatePDF } from '../../Utils/generatePdf'

export default function MonthInvoice({ openModal, idStudent, setOpenModalMonth }) {

    const dispatch = useDispatch()
    const student = useSelector(item => idStudent === 0 ? item.student.currentStudent : item.student.students.find((element) => element.id_student === idStudent))
    const [printPdf, setPrintPdf] = useState(false)
    const [invoice, setInvoice] = useState(-1)

    useEffect(() => {
        const fetchInvoice = async () => {
            const data = await dispatch(addInvoice(idStudent))
            setInvoice(data)
        }
        fetchInvoice()
    }, [dispatch, idStudent])

    const handlePay = (guardar) => {
        if (guardar) {
            const updatedStudent = { ...student, month_paid: true }
            dispatch(editStudent(updatedStudent))
            printPdf && generatePDF(invoice)
        } else {
            dispatch(deleteInvoice(invoice.idInvoice))
        }
        setOpenModalMonth(false)
    }

    return (
        <Modal open={openModal} onClose={() => handlePay(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography component="div" variant="h6">Pagament mes</Typography>
                <Typography component="div" sx={{ mt: 2 }}>
                    <Box>{"Total factura a pagar: "}<strong>{`${invoice.total_price} €`}</strong></Box>
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={printPdf}
                            onChange={(event) => setPrintPdf(event.target.checked)}
                            color="primary"
                        />
                    }
                    label="Imprimir pdf factura"
                />
                <Button onClick={() => handlePay(false)} sx={{ mt: 2 }} variant="outlined">No</Button>
                <Button onClick={() => handlePay(true)} sx={{ mt: 2 }} variant="outlined">Paga</Button>
            </Box>
        </Modal>
    )
}
