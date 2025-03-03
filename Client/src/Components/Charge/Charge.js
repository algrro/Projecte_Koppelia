import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import PaymentIcon from '@mui/icons-material/Payment'
import { useSelector } from 'react-redux'
import ModalMatricula from '../ModalMatricula/ModalMatricula'
import MonthInvoice from '../MonthInvoice/MonthInvoice'

export default function Charge() {

    const [openModalMatricula, setOpenModalMatricula] = useState(false)
    const [openModalMonth, setOpenModalMonth] = useState(false)
    const [idStudent, setIdStudent] = useState(0)
    const { students, studentsClassroom } = useSelector(state => state.student)
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom i cognoms</TableCell>
                            <TableCell>Pagament matrícula</TableCell>
                            <TableCell>Pagament mes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students
                            .filter(row => (!row.month_paid || !row.matricula_paid) && studentsClassroom.some(item => item.id_student === row.id_student))
                            .map((row) => (
                                <TableRow key={row.id_student}>
                                    <TableCell>{`${row.name} ${row.surname}`}</TableCell>
                                    <TableCell>
                                        <div>{row.matricula_paid ? "✅" : "🔴"}
                                            {
                                                !row.matricula_paid && (<IconButton color="primary"
                                                    onClick={
                                                        () => {
                                                            setIdStudent(row.id_student)
                                                            setOpenModalMatricula(!openModalMatricula)
                                                        }
                                                    }>
                                                    <PaymentIcon />
                                                </IconButton>)
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>{row.month_paid ? "✅" : "🔴"}
                                            {
                                                !row.month_paid && (<IconButton color="secondary"
                                                    onClick={
                                                        () => {
                                                            setIdStudent(row.id_student)
                                                            setOpenModalMonth(!openModalMonth)
                                                        }
                                                    }>
                                                    <PaymentIcon />
                                                </IconButton>)
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModalMatricula && <ModalMatricula openModal={openModalMatricula} idStudent={idStudent} setOpenModalMatricula={setOpenModalMatricula} />}
            {openModalMonth && <MonthInvoice openModal={openModalMonth} idStudent={idStudent} setOpenModalMonth={setOpenModalMonth} />}
        </>
    )
}