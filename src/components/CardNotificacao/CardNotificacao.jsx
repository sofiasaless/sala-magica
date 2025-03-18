import './style.css'

// assets
import imgNot from '../../assets/material/chat.png'

// imports
import { Link } from 'react-router-dom'

export default function CardNotificacao( {titulo, notificacao} ) {

  const notificacaoObj = {
    id: notificacao.id,
    tituloNot: notificacao.tituloNot,
    descricaoNot: notificacao.descricaoNot,
    redirecionamento: notificacao.redirecionamento,
    tipo: notificacao.tipo,
    dataNotificacao: new Date((notificacao.dataNotificacao).seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' })
  }

  return (
    <Link to={'/detalhe-notificacao'} state={{ notificacaoObj }} className='nav-link card-notificacao d-flex rounded-2 p-3 align-items-center gap-2'>

      <div>
        <img src={imgNot} alt="" className='img-newNot' />
      </div>

      <span className='not-descri'>{titulo}</span>

    </Link>
  )
}