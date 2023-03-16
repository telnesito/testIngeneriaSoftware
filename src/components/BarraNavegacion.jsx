import React from 'react'
import './BarraNavegacion.css'
import { useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
const BarraNavegacion = () => {
  const navigate = useNavigate()
  return (
    <nav className='nav'>
      <p onClick={() => navigate('/')}><AiOutlineHome /></p>
      <p onClick={() => navigate('/editor-web')}>Web</p>
      <p onClick={() => navigate('/editor-ruby')}>Ruby</p>
      <p onClick={() => navigate('/editor-consola')}>Consola</p>



    </nav>
  )
}

export default BarraNavegacion