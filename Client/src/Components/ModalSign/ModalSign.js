import React, { useState } from "react"
import { Modal, Box, Typography, Button, Checkbox, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useSelector } from "react-redux"

export default function ModalSign({ openModal, idStudent, setOpenModalSign }) {

    const { classrooms } = useSelector(state => state.student)
    const { studentsClassroom } = useSelector(state => state.student)
    const [selectedRows, setSelectedRows] = useState(studentsClassroom.filter((element) => element.id_student === idStudent).map((item) => item.id_classroom))

    const handleSelect = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        )
    }

    const handleConfirm = (guardar) => {
        if (guardar) {
            console.log("Selected rows:", selectedRows)
        }
        setOpenModalSign(false)
    }

    return (
        <Modal open={openModal} onClose={() => handleConfirm(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography component="div" variant="h6">Seleccionar classes</Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300, mt: 2 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Dia</TableCell>
                                <TableCell>Classe</TableCell>
                                <TableCell>Hora inici</TableCell>
                                <TableCell>Hora acabament</TableCell>
                                <TableCell>Seleccionar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classrooms.map((item) => (
                                <TableRow key={item.id_classroom}>
                                    <TableCell>{item.day}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.start_time}</TableCell>
                                    <TableCell>{item.end_time}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedRows.includes(item.id_classroom)}
                                            onChange={() => handleSelect(item.id_classroom)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <Button onClick={() => handleConfirm(false)} variant="outlined">Cancel·lar</Button>
                    <Button onClick={() => handleConfirm(true)} variant="contained" sx={{ ml: 2 }}>Confirmar</Button>
                </Box>
            </Box>
        </Modal>
    )
}