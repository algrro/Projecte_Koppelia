import React, { useState } from 'react'
import { Modal, Box, Typography, Button, TextField, Checkbox, FormControlLabel, Grid } from '@mui/material'
import { useDispatch, useSelector } from "react-redux"
import { addStudent, editStudent } from '../../Redux/Actions/studentActions'

export default function ModalAdd({ openModal, idStudent, setOpenModalEditAdd }) {

    const dispatch = useDispatch()
    const student = useSelector(item => idStudent === 0 ? item.student.currentStudent : item.student.students.find((element) => element.id_student === idStudent))
    const [formData, setFormData] = useState(student)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleEditOrAdd = (guardar) => {
        if (guardar) {
            //función validar
            idStudent === 0 ? dispatch(addStudent(formData)) : dispatch(editStudent(formData))
        }
        setOpenModalEditAdd(false)
    }
    /*
    const handleSubmit = (event) => {
      event.preventDefault()
      console.log("submitttttt")
    }
    */
    return (
        <Modal open={openModal} onClose={() => handleEditOrAdd(false)}>
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
                <Typography component="div" variant="h6">{idStudent === 0 ? 'Añadir nuevo estudiante' : `Editar: ${student.name} ${student.surname}. Id: ${student.id_student}`}</Typography>
                <Typography component="div" sx={{ mt: 2 }}>
                    <Box sx={{ width: '100%', maxWidth: 700, margin: 'auto', padding: 2, backgroundColor: 'lightblue' }}>
                        <form>
                        {/* <form onSubmit={handleSubmit}> */}
                            <Grid container spacing={2}>
                                
                                {/* Campo para el nombre del estudiante */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nombre"
                                        variant="outlined"
                                        fullWidth
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* Campo para el apellido del estudiante */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Apellido"
                                        variant="outlined"
                                        fullWidth
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.matricula_paid}
                                                onChange={handleChange}
                                                name="matricula_paid"
                                            />
                                        }
                                        label="Matrícula Pagada"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.month_paid}
                                                onChange={handleChange}
                                                name="month_paid"
                                            />
                                        }
                                        label="Mes Pagado"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.picture_permission}
                                                onChange={handleChange}
                                                name="picture_permission"
                                            />
                                        }
                                        label="Permiso para Foto"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.family_disc}
                                                onChange={handleChange}
                                                name="family_disc"
                                            />
                                        }
                                        label="Descuento familiar"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <TextField
                                                label="Fecha de Nacimiento"
                                                type="date"
                                                fullWidth
                                                variant="outlined"
                                                name="birth_date"
                                                value={formData.birth_date || ''}
                                                onChange={handleChange}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        }
                                        label="Fecha de Nacimiento"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <TextField
                                                fullWidth
                                                name="email"
                                                value={formData.email || ""}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Email"
                                        labelPlacement="top"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <TextField
                                                fullWidth
                                                name="phone"
                                                value={formData.phone || ""}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Teléfono"
                                        labelPlacement="top"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <TextField
                                                fullWidth
                                                name="tutor"
                                                value={formData.tutor || ""}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Tutor"
                                        labelPlacement="top"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <TextField
                                                fullWidth
                                                name="contacto_tutor"
                                                value={formData.contacto_tutor || ""}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Contacto del Tutor"
                                        labelPlacement="top"
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={() => setActionType('cancelar')}>
                                        Cancelar
            </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={() => setActionType('guardar')}>
                                        Guardar cambios
            </Button>
                                </Grid> */}

                            </Grid>
                        </form>
                    </Box>
                </Typography>
                <Button onClick={() => handleEditOrAdd(false)} sx={{ mt: 2 }} variant="outlined">
                    Cerrar
          </Button>
                <Button onClick={() => handleEditOrAdd(true)} sx={{ mt: 2 }} variant="outlined">
                    Guardar
          </Button>
            </Box>
        </Modal>
    )
}
