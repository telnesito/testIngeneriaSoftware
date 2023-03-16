import React from 'react'
import './BarraNavegacion.css'
import { useNavigate } from 'react-router-dom'
const BarraNavegacion = () => {
  const navigate = useNavigate()
  return (
    <nav className='nav'>

      <p onClick={() => navigate('/')}>Editor Web</p>
      <p onClick={() => navigate('/editor-consola')}>Editor Consola</p>




    </nav>
  )
}

export default BarraNavegacion