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
            
            idStudent === 0 ? dispatch(addStudent(formData)) : dispatch(editStudent(formData))
        }
        setOpenModalEditAdd(false)
    }
   
    return (
        <Modal open={openModal} onClose={() => handleEditOrAdd(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>{idStudent === 0 ? 'Afegir estudiant' : `Editar: ${student.name} ${student.surname}.`}</Typography>
                <Typography component="div" sx={{ mt: 2 }}>
                    <Box sx={{  maxWidth: 900, margin: 'auto', padding: 3, backgroundColor: '#f1f8ff', borderRadius: 2 }}>
                        <form>
                        {}
                            <Grid container spacing={2}>
                                
                                {}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nom"
                                        variant="outlined"
                                        fullWidth
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        sx={{ fontSize: 16 }}
                                    />
                                </Grid>

                                {}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Cognoms"
                                        variant="outlined"
                                        fullWidth
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        sx={{ fontSize: 16 }}
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
                                        label="Matrícula pagada"
                                        sx={{ fontSize: 16 }}
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
                                        label="Mes pagat"
                                        sx={{ fontSize: 16 }}
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
                                        label="Autoritza fotografies"
                                        sx={{ fontSize: 16 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.family_disc}
                                                onChange={handleChange}
                                                name="family_disc"
                                                sx={{ color: '#1976d2' }}
                                            />
                                        }
                                        label="Descompte familiar"
                                        sx={{ fontSize: 16 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <TextField
                                                
                                                type="date"
                                                fullWidth
                                                variant="outlined"
                                                name="birth_date"
                                                value={formData.birth_date || ''}
                                                onChange={handleChange}
                                                sx={{
                                                    fontSize: 16,
                                                    '& input': {
                                                        fontSize: 16,
                                                    },
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        }
                                        label="Data de naixement"
                                        labelPlacement="top"
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
                                                sx={{ fontSize: 16 }}
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
                                                sx={{ fontSize: 16 }}
                                            />
                                        }
                                        label="Telèfon"
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
                                                sx={{ fontSize: 16 }}
                                            />
                                        }
                                        label="Tutor/a"
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
                                                sx={{ fontSize: 16 }}
                                            />
                                        }
                                        label="Contacte tutor/a"
                                        labelPlacement="top"
                                    />
                                </Grid>
                                {}

                            </Grid>
                        </form>
                    </Box>
                </Typography>
                <Button onClick={() => handleEditOrAdd(false)} sx={{ mt: 2 }} variant="outlined">
                    Tancar
          </Button>
                <Button onClick={() => handleEditOrAdd(true)} sx={{ mt: 2 }} variant="outlined">
                    Guardar
          </Button>
            </Box>
        </Modal>
    )
}
