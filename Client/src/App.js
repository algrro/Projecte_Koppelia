import './App.css'
import MainPage from './Pages/MainPage/MainPage'
import { useState } from 'react'
import { IconButton } from '@mui/material'
import logo from "./Assets/logo_koppelia.png"

function App() {

  const [enter, setEnter] = useState(false)

  return (
    <>
      {enter ?

        <MainPage /> :

        <IconButton onClick={() => setEnter(!enter)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
          <img
            src={logo}
            alt="icono"
            style={{
              width: '400px',
              height: '400px',
            }}
          />
        </IconButton>}
    </>
  )
}

export default App
