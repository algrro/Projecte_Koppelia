import React, { useState, useEffect } from "react"
import StudentsInfo from "../../Components/StudentsInfo/StudentsInfo"
import Charge from "../../Components/Charge/Charge"
import Price from "../../Components/Price/Price"
import { Tabs, Tab, Box, Typography } from "@mui/material"
import { useDispatch } from 'react-redux'
import { fetchClassrooms, fetchPrices, fetchStudentClassrooms, fetchStudents, fetchTeachers } from '../../Redux/Actions/studentActions'
import Teacher from "../../Components/Teacher/Teacher"

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default function MainPage() {

  const dispatch = useDispatch()

  //LLAMADA PRINCIPAL AL SERVIDOR PARA OBTENER LOS ESTADOS
  useEffect(() => {
    dispatch(fetchStudents())
    dispatch(fetchClassrooms())
    dispatch(fetchStudentClassrooms())
    dispatch(fetchPrices())
    dispatch(fetchTeachers())
  }, [dispatch]) // Solo se ejecuta una vez cuando el componente se monta

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (

    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Cobrar" />
        <Tab label="Alumnat" />
        <Tab label="Matricular" />
        <Tab label="Classes" />
        <Tab label="Professorat" />
        <Tab label="Preus" />
      </Tabs>
      <TabPanel value={value} index={0}><Charge /></TabPanel>
      <TabPanel value={value} index={1}><StudentsInfo isSign={false} /></TabPanel>
      <TabPanel value={value} index={2}><StudentsInfo isSign={true} /></TabPanel>
      <TabPanel value={value} index={3}>Llistat classes, com alumnes</TabPanel>
      <TabPanel value={value} index={4}><Teacher /></TabPanel>
      <TabPanel value={value} index={5}><Price /></TabPanel>
    </Box>
  )
}