import './style.css'

// assets
import logo from '../../assets/material/logo1.png'
import inicio from '../../assets/material/apps.png'
import favorito from '../../assets/material/heart.png'
import perfil from '../../assets/material/user.png'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <>
      <nav className='navbar navbar-expand-lg align-items-center justify-content-center sticky-top'>
        <div id='header' className='container d-flex'>
          <div>
            <img className='logo' src={logo} />
          </div>

          <div className='navbar-nav d-flex align-items-center gap-4'>
            <Link to={'/'} id='link' className="nav-link fonte-titulos">
              <img src={inicio} className='me-2 mb-2' />
              Início
            </Link>
            <Link to={'/favoritos'} id='link' className="nav-link fonte-titulos">
              <img src={favorito} className='me-2 mb-2' />
              Favoritos
            </Link>
            <Link to={'/perfil'} id='link' className="nav-link fonte-titulos">
              <img src={perfil} className='me-2 mb-2' />
              Perfil
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}