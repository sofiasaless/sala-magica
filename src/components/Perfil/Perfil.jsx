import './style.css'

// assets
import fotoPerfil from '../../assets/material/profile-user.png'

export default function Perfil () {
  return (
    <>
      <div className='py-4 d-flex align-items-center'>
        <div>
          <img src={fotoPerfil} alt="" className='foto-perfil' />
        </div>

        <div className='ms-3'>
          <h4 className='m-0 nome-usuario'>Maria Socorro</h4>
          <span className='admin-desc'>Você é um administrador!</span>
        </div>
      </div>
    </>
  )
}