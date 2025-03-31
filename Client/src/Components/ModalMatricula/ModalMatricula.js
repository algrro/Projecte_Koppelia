import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { editStudent } from '../../Redux/Actions/globalActions'

export default function ModalMatricula({ openModal, idStudent, setOpenModalMatricula }) {

    const dispatch = useDispatch()
    const student = useSelector(item => idStudent === 0 ? item.student.currentStudent : item.student.students.find((element) => element.id_student === idStudent))

    const handlePay = (guardar) => {
        if (guardar) {
            const updatedDate = { ...student, matricula_paid: true }
            dispatch(editStudent(updatedDate))
        }
        setOpenModalMatricula(false)
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
                    <Box>{`El/la estudiant `}
                        <strong>{student.name}</strong>
                        {` `}
                        <strong>{student.surname}</strong>
                        {" ha pagat la matrícula?"}
                    </Box>
                </Typography>
                <Button onClick={() => handlePay(false)} sx={{ mt: 2, mr: 2 }} variant="outlined">No</Button>
                <Button onClick={() => handlePay(true)} sx={{ mt: 2 }} variant="contained">Sí, ja ha pagat</Button>
            </Box>
        </Modal>
    )
}