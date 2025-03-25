import React, { useState, useMemo } from "react"
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch, useSelector } from "react-redux"
import { updateClassrooms } from "../../Redux/Actions/studentActions"


export default function Classroom() {
    const dispatch = useDispatch()

    const { classrooms } = useSelector(state => state.student)
    const id_prices = useSelector(state => state.student.prices)
    const memoizedIdPrices = useMemo(() => id_prices.map(info => info.id_price), [id_prices])
    const id_teachers = useSelector(state => state.student.teachers)
    const memoizedIdTeachers = useMemo(() => id_teachers.map(info => info.id_teacher), [id_teachers])

    const [classroomsInfo, setClassroomsInfo] = useState(classrooms)

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

    const hours = Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`)

    const handleAddNewClass = () => {
        setClassroomsInfo([...classroomsInfo, { id_classroom: Date.now(), name: "", day: "", start_time: "", end_time: "", id_price: "", id_teacher: "" }])
    }

    const handleChange = (id, field, value) => {
        setClassroomsInfo(classroomsInfo.map(record => record.id_classroom === id ? { ...record, [field]: value } : record))
    }

    const handleDeleteClass = (id) => {
        setClassroomsInfo(classroomsInfo.filter(record => record.id_classroom !== id))
    }

    const handleConfirm = () => {
        dispatch(updateClassrooms(classroomsInfo))
    }

    const getValidValue = (value, options) => {
        return options.includes(value) ? value : ""
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
                <Button onClick={handleAddNewClass} variant="contained">Afegir nova classe</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>Dia</TableCell>
                            <TableCell>Hora Inici</TableCell>
                            <TableCell>Hora Fi</TableCell>
                            <TableCell>ID Preu</TableCell>
                            <TableCell>ID Professor</TableCell>
                            <TableCell>Accions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classroomsInfo.map((row) => (
                            <TableRow key={row.id_classroom}>
                                <TableCell>
                                    <TextField value={row.name} onChange={(e) => handleChange(row.id_classroom, "name", e.target.value)} variant="standard" />
                                </TableCell>
                                <TableCell>
                                    <Select value={row.day} onChange={(e) => handleChange(row.id_classroom, "day", e.target.value)} variant="standard">
                                        {daysOfWeek.map(day => <MenuItem key={day} value={day}>{day}</MenuItem>)}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select value={row.start_time} onChange={(e) => handleChange(row.id_classroom, "start_time", e.target.value)} variant="standard">
                                        {hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select value={row.end_time} onChange={(e) => handleChange(row.id_classroom, "end_time", e.target.value)} variant="standard">
                                        {hours.map(hour => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={getValidValue(row.id_price, memoizedIdPrices)}
                                        onChange={(e) => handleChange(row.id_classroom, "id_price", e.target.value)}
                                        variant="standard"
                                    >
                                        {memoizedIdPrices.map((price) => (
                                            <MenuItem key={price} value={price}>
                                                {price}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={getValidValue(row.id_teacher, memoizedIdTeachers)}
                                        onChange={(e) => handleChange(row.id_classroom, "id_teacher", e.target.value)}
                                        variant="standard"
                                    >
                                        {memoizedIdTeachers.map((teacher) => (
                                            <MenuItem key={teacher} value={teacher}>
                                                {teacher}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="secondary" onClick={() => handleDeleteClass(row.id_classroom)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={handleConfirm} variant="contained" sx={{ ml: 2 }}>Actualitzar</Button>
            </Box>
        </>
    )
}
