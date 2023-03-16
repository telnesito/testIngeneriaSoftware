import React from 'react'
import { Outlet } from 'react-router'
import BarraNavegacion from '../components/BarraNavegacion'
import './EditorPage.css'
const EditorPage = () => {
  return (
    <div className='contenedor-componentes'>

      <BarraNavegacion />

      <Outlet />



    </div>
  )
}

export default EditorPage