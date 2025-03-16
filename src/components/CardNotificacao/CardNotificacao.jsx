import './style.css'

// assets
import imgNot from '../../assets/material/chat.png'

// imports
import { Link } from 'react-router-dom'

export default function CardNotificacao() {
  return (
    <Link to={'/detalhe-notificacao'} className='nav-link card-notificacao d-flex rounded-2 p-3 align-items-center gap-2'>

      <div>
        <img src={imgNot} alt="" className='img-newNot' />
      </div>

      <span className='not-descri'>Novo produto no catálogo! Venha conferir o “Calendário tema verde” da categoria enfeites de parede!</span>

      <div class="form-check d-flex align-items-center">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
        <label class="form-check-label ms-2 label-check" for="flexCheckDefault">
          Marcar como lida
        </label>
      </div>

    </Link>
  )
}