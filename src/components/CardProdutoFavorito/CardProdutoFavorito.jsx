import './style.css'

// importação de imagem
import template from '../../assets/cards/calendario.png'
import favoritar from '../../assets/material/heart_pink_contorno.png'
import desfavoritar from '../../assets/material/heart_pink_preenchido.png'

// importações
import { Link } from 'react-router-dom';

export default function CardProdutoFavorito( {id, titulo, preco, imagemCapa} ) {

  return (
    <>
      <Link to={`/produto/${id}`} id='card-favorito' className="card rounded-5 shadow-sm nav-link">
        <img id='card-photo-fav' src={imagemCapa} className="card-img-top rounded-5" alt="..." />
        <div className="card-body d-flex">
          <div className='card-textos d-flex flex-column'>
            <h5 className="card-favorito-title">{titulo}</h5>
            <p className="card-text">R${Number(preco).toFixed(2)}</p>
          </div>
          <div className='d-flex justify-content-end align-items-end'>
            <img style={{ cursor: 'pointer' }} src={desfavoritar} alt="" />
          </div>
        </div>
      </Link>
    </>
  );
}