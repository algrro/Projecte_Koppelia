import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ModalAdd from "../ModalAddUpdate/ModalAddUpdate"
import SchoolIcon from '@mui/icons-material/School'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent } from '../../Redux/Actions/studentActions'
import ModalDelete from '../ModalDelete/ModalDelete'
import ModalSign from '../ModalSign/ModalSign'

export default function StudentsInfo({ isSign }) {

    const dispatch = useDispatch()
    const [openModalEditAdd, setOpenModalEditAdd] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [openModalSign, setOpenModalSign] = useState(false)
    const [idStudent, setIdStudent] = useState(0)
    const { students } = useSelector(state => state.student)

    const handleDelete = (action) => {
        setOpenModalDelete(!openModalDelete)
        action && dispatch(deleteStudent(idStudent))
    }

    return (
        <>
            {!isSign && <Button variant="outlined" onClick={() => {
                setIdStudent(0)
                setOpenModalEditAdd(!openModalEditAdd)
            }}>Afegir estudiant</Button>}
            {
                (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nom i cognoms</TableCell>
                                    {/* <TableCell>Pagament matrícula</TableCell> */}
                                    <TableCell>{!isSign ? 'Accions' : 'Matricular'}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((row) => (
                                    <TableRow key={row.id_student}>
                                        <TableCell>{`${row.name} ${row.surname}`}</TableCell>
                                        {/* <TableCell>{row.matricula_paid ? "✅" : "🔴"}</TableCell> */}
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