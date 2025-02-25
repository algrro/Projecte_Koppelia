import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { useSelector } from 'react-redux'

export default function ModalDelete({ openModal, handleDelete, idStudent }) {

    const infoModalStudentToDelete = useSelector(item => item.student.students.find((element) => element.id_student === idStudent))
    return (
        <Modal open={openModal} onClose={() => handleDelete(false)}>
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
                <Typography component="div" variant="h6">Borrar estudiante</Typography>
                <Typography component="div" sx={{ mt: 2 }}>
                    <Box>{`Seguro que quieres borrar a `}
                        <strong>{infoModalStudentToDelete.name}</strong>
                        {` `}
                        <strong>{infoModalStudentToDelete.surname}</strong>
                        {` con id = `}
                        <strong>{idStudent}</strong> </Box>
                </Typography>
                <Button onClick={() => handleDelete(false)} sx={{ mt: 2 }} variant="outlined">Cerrar</Button>
                <Button onClick={() => handleDelete(true)} sx={{ mt: 2 }} variant="outlined">Borrar</Button>
            </Box>
        </Modal>
    )
}
