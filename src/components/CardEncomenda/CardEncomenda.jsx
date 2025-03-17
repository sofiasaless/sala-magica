import './style.css'

// assets
import imgNot from '../../assets/material/order.png'

// imports
import { Link } from 'react-router-dom'

export default function CardEncomenda( {titulo, encomenda, admin} ) {

  const objEncomenda = {
    categoria: encomenda.categoria,
    descricao: encomenda.descricao,
    altura: encomenda.altura,
    comprimento: encomenda.comprimento,
    dataEncomenda: encomenda.dataEncomenda,
    imagemReferencia: encomenda.imagemReferencia,
    solicitante: (encomenda.solicitante).id
  }

  const direcaoRota = (admin)?'detalhe-encomenda':'detalhe-minha-encomenda'

  return (
    <Link to={`/${direcaoRota}`} state={{ objEncomenda }} className='nav-link card-notificacao d-flex rounded-2 p-3 align-items-center gap-2'>
      
      <div>
        <img src={imgNot} alt="" className='img-newNot' />
      </div>
      
      <div className='ms-2 d-flex flex-column'>
        <span className='not-descri'>{titulo}</span>
        <span className='data-encomenda'>Enviada em {new Date(encomenda.dataEncomenda.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' })}</span>
      </div>

    </Link>
  )
}