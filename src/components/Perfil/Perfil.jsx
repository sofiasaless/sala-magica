import './style.css'

// assets
import fotoPerfil from '../../assets/material/profile-user.png'

export default function Perfil ( {nomeUsuario, admin} ) {
  return (
    <>
      <div className='py-4 d-flex align-items-center'>
        <div>
          <img src={fotoPerfil} alt="" className='foto-perfil' />
        </div>

        <div className='ms-3 d-flex flex-column'>
          <h4 className='m-0 nome-usuario'>{(nomeUsuario).split(' ')[0]}</h4>
          <span style={{display: (admin)?'':'none'}} className='admin-desc'>Você é um administrador!</span>
        </div>
      </div>
    </>
  )
}