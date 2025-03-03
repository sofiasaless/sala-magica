import './style.css'

import { Link } from 'react-router-dom';

// importação de imagem
import template from '../../assets/cards/calendario.png'

export default function CardProdutoEditar() {

  return (
    <>
      <Link to={'/editar-produto'} id='card-favorito' className="card nav-link rounded-5 shadow-sm">
        <img id='card-photo-fav' src={template} className="card-img-top rounded-5" alt="..." />
        <div className="card-body d-flex justify-content-center align-items-center text-center">
          <div className='card-textos'>
            <h5 className="card-favorito-title">Calendário</h5>
            <p className="p-card m-0">R$50,00</p>
            <span style={{color: 'var(--cinzaDois)', fontWeight: 500}}>Anunciado há 5 dias...</span>
          </div>
        </div>
      </Link>
    </>
  );
}