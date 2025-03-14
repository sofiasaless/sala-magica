import './style.css'

import { Link } from 'react-router-dom';

// importação de imagem
import template from '../../assets/cards/calendario.png'

export default function CardProdutoEditar( {titulo, preco, imagemCapa, id, dataAnuncio} ) {

  return (
    <>
      <Link to={`/editar-produto/${id}`} id='card-favorito' className="card nav-link rounded-5 shadow-sm">
        <img id='card-photo-fav' src={imagemCapa} className="card-img-top rounded-5" alt="..." />
        <div className="card-body d-flex justify-content-center align-items-center text-center">
          <div className='card-textos'>
            <h5 className="card-favorito-title">{titulo}</h5>
            <p className="p-card m-0">R${Number(preco).toFixed(2)}</p>
            <span style={{color: 'var(--cinzaDois)', fontWeight: 500}}>Anunciado em {new Date(dataAnuncio.seconds * 1000).toLocaleDateString('pt-BR', { dateStyle: 'full' })}</span>
          </div>
        </div>
      </Link>
    </>
  );
}