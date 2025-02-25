import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalAdd from "../ModalAddUpdate/ModalAddUpdate"
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent } from '../../Redux/Actions/studentActions'
import ModalDelete from '../ModalDelete/ModalDelete'

export default function TableInfo() {

    const dispatch = useDispatch()
    const [openModalEditAdd, setOpenModalEditAdd] = useState(false) //modal addCreate
    const [openModalDelete, setOpenModalDelete] = useState(false) //modal delete
    const [idStudent, setIdStudent] = useState(0) //id_sudent
    const { students } = useSelector(state => state.student) //studens list

    const handleDelete = (action) => {
        setOpenModalDelete(!openModalDelete)
        action && dispatch(deleteStudent(idStudent))
    };

    return (
        <>
            {<Button variant="outlined" onClick={() => {
                setIdStudent(0)
                setOpenModalEditAdd(!openModalEditAdd)
            }}>Añadir estudiante</Button>}
            {
                (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre y apellidos</TableCell>
                                    <TableCell>Pago matrícula</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((row) => (
                                    <TableRow key={row.id_student}>
                                        <TableCell>{`${row.name} ${row.surname}`}</TableCell>
                                        <TableCell>{row.matricula_paid ? "✅" : "🔴"}</TableCell>
                                        <TableCell><div>
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
                                        </div></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            {openModalEditAdd && <ModalAdd openModal={openModalEditAdd} idStudent={idStudent} setOpenModalEditAdd={setOpenModalEditAdd} />}
            {openModalDelete && <ModalDelete openModal={openModalDelete} handleDelete={handleDelete} idStudent={idStudent} />}
        </>
    )
}