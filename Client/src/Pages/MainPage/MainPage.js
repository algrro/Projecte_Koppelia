import React, { useState, useEffect } from "react"
import TableInfo from "../../Components/TableInfo/TableInfo"
import { Tabs, Tab, Box, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../../Redux/Actions/studentActions'

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
  }, [dispatch]) // Solo se ejecuta una vez cuando el componente se monta

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (

    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Cobrar" />
        <Tab label="Alumnado" />
        <Tab label="Matricular" />
        <Tab label="Clases" />
        <Tab label="Profesorado" />
      </Tabs>
      <TabPanel value={value} index={0}>Bienvenido a la página de inicio.</TabPanel>
      <TabPanel value={value} index={1}><TableInfo /></TabPanel>
      <TabPanel value={value} index={2}>Sobre nosotros...</TabPanel>
      <TabPanel value={value} index={3}>Contáctanos en...</TabPanel>
      <TabPanel value={value} index={4}>¿Necesitas ayuda? Aquí tienes...</TabPanel>
    </Box>
  )
}