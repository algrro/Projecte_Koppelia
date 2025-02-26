import React, { useState } from 'react'
import { Modal, Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { addInvoice } from '../../Redux/Actions/studentActions'

export default function MonthInvoice({ openModal, idStudent, setOpenModalMonth }) {

    const dispatch = useDispatch()
    const student = useSelector(item => idStudent === 0 ? item.student.currentStudent : item.student.students.find((element) => element.id_student === idStudent))
    const [printPdf, setPrintPdf] = useState(false)

    const handlePay = async (guardar) => {
        if (guardar) {
            const updatedDate = { ...student, month_paid: true }
            console.log(updatedDate)
            await dispatch(addInvoice(updatedDate))
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
                <Typography component="div" variant="h6">Pagament matrícula</Typography>
                <Typography component="div" sx={{ mt: 2 }}>
                    <Box>{`El/la estudiant: `}
                        <strong>{student.name}</strong>
                        {` `}
                        <strong>{student.surname}</strong>
                        {"ha paga la quota del mes?"}
                    </Box>
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
                <Button onClick={() => handlePay(true)} sx={{ mt: 2 }} variant="outlined">Sí</Button>
            </Box>
        </Modal>
    )
}
