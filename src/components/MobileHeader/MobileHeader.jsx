import './style.css'

// assets
import inicio from '../../assets/material/apps.png'
import favorito from '../../assets/material/heart.png'
import perfil from '../../assets/material/user.png'

export default function MobileHeader() {
  return (
    <>
      <nav className='navmobile navbar fixed-bottom rounded-top-4'>
        <div id='header' className='container d-flex justify-content-center'>

          <div id='area-links' className='navbar-nav d-flex flex-row justify-content-around'>
            <div id='mobile-link' className="nav-link fonte-titulos">
              <img className='icones' src={inicio} />
            </div>
            <div id='mobile-link' className="nav-link fonte-titulos">
              <img className='icones' src={favorito} />
            </div>
            <div id='mobile-link' className="nav-link fonte-titulos">
              <img className='icones' src={perfil} />
            </div>
          </div>

        </div>
      </nav>
    </>
  )
}