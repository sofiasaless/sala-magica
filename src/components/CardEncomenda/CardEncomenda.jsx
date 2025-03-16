import './style.css'

// assets
import imgNot from '../../assets/material/order.png'

// imports
import { Link } from 'react-router-dom'

export default function CardEncomenda() {
  return (
    <Link to={'/detalhe-minha-encomenda'} className='nav-link card-notificacao d-flex rounded-2 p-3 align-items-center gap-2'>
      
      <div>
        <img src={imgNot} alt="" className='img-newNot' />
      </div>
      
      <div className='ms-2'>
        <span className='not-descri'>Nova encomenda solicitada por Cloroquina Gatuxa.</span>
      </div>

    </Link>
  )
}