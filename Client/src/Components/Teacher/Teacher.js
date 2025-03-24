import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button, Box } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete"
import { useSelector, useDispatch } from 'react-redux'
import { updateTeachers } from '../../Redux/Actions/studentActions'

export default function Teacher() {
    const dispatch = useDispatch()

    const { teachers } = useSelector(state => state.student)
    const [teachersInfo, setTeachersInfo] = useState(teachers)

    const handleChange = (id_teacher, value) => {
        setTeachersInfo(prev =>
            prev.map(teacher =>
                teacher.id_teacher === id_teacher ? { ...teacher, name: value } : teacher
            )
        )
    }

    const handleAddNewTeacher = () => {
        const newTeacher = {
            id_teacher: Date.now(),
            name: "**NOM**"
        }
        setTeachersInfo(prevTeachers => [...prevTeachers, newTeacher])
    }

    const handleDeleteTeacher = (id) => {
        setTeachersInfo(prevTeachers => prevTeachers.filter(teacher => teacher.id_teacher !== id))
    }

    const handleSave = () => {
        dispatch(updateTeachers(teachersInfo))
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
                <Button onClick={handleAddNewTeacher} variant="contained">Afegir professor/a</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom i cognoms</TableCell>
                            <TableCell>{'Accions'}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachersInfo.map((row) => (
                            <TableRow key={row.id_teacher}>
                                <TableCell>
                                    <TextField
                                        value={row.name || ""}
                                        onChange={(e) => handleChange(row.id_teacher, e.target.value)}
                                        variant="standard"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <IconButton color="secondary" onClick={() => handleDeleteTeacher(row.id_teacher)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={handleSave} variant="contained" sx={{ ml: 2 }}>Guardar</Button>
            </Box>
        </>
    )
}