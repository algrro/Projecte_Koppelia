import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ModalAdd from "../ModalAddUpdate/ModalAddUpdate"
import SchoolIcon from '@mui/icons-material/School'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent } from '../../Redux/Actions/globalActions'
import ModalDelete from '../ModalDelete/ModalDelete'
import ModalSign from '../ModalSign/ModalSign'
import { blue } from '@mui/material/colors'

export default function StudentsInfo({ isSign }) {

    const dispatch = useDispatch()
    const [openModalEditAdd, setOpenModalEditAdd] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalSign, setOpenModalSign] = useState(false)
    const [idStudent, setIdStudent] = useState(0)
    const { students } = useSelector(state => state.global)

    const handleDelete = (action) => {
        setOpenModalDelete(!openModalDelete)
        action && dispatch(deleteStudent(idStudent))
    }

    return (
        <>
            {!isSign && (<Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}><Button variant="contained" onClick={() => {
                setIdStudent(0)
                setOpenModalEditAdd(!openModalEditAdd)
            }}>Afegir estudiant</Button></Box>)}
            {
                (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: blue[800], fontWeight: "bold" }}>Nom i cognoms</TableCell>
                                    <TableCell sx={{ color: blue[800], fontWeight: "bold" }}>{!isSign ? 'Accions' : 'Matricular'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((row) => (
                                        <TableRow key={row.id_student}>
                                            <TableCell>{`${row.name} ${row.surname}`}</TableCell>
                                            {
                                                !isSign ?
                                                    (<TableCell>
                                                        <div>
                                                            <IconButton color="primary" onClick={() => {
                                                                setIdStudent(row.id_student)
                                                                setOpenModalEditAdd(!openModalEditAdd)
                                                            }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton color="secondary" onClick={() => {
                                                                setIdStudent(row.id_student)
                                                                setOpenModalDelete(!openModalDelete)
                                                            }
                                                            }>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </div>
                                                    </TableCell>) :
                                                    (<TableCell>
                                                        <div>
                                                            <IconButton color="primary" onClick={() => {
                                                                setIdStudent(row.id_student)
                                                                setOpenModalSign(!openModalSign)
                                                            }}>
                                                                <SchoolIcon />
                                                            </IconButton>
                                                        </div>
                                                    </TableCell>)
                                            }
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            {openModalEditAdd && <ModalAdd openModal={openModalEditAdd} idStudent={idStudent} setOpenModalEditAdd={setOpenModalEditAdd} />}
            {openModalDelete && <ModalDelete openModal={openModalDelete} handleDelete={handleDelete} idStudent={idStudent} />}
            {openModalSign && <ModalSign openModal={openModalSign} idStudent={idStudent} setOpenModalSign={setOpenModalSign} />}
        </>
    )
}