import React from 'react'
import './BarraNavegacion.css'
import { useNavigate } from 'react-router-dom'
const BarraNavegacion = () => {
  const navigate = useNavigate()
  return (
    <nav className='nav'>

      <p onClick={() => navigate('/')}>Web</p>
      <p onClick={() => navigate('/editor-ruby')}>Ruby</p>
      <p onClick={() => navigate('/editor-consola')}>Consola</p>



    </nav>
  )
}

export default BarraNavegacion