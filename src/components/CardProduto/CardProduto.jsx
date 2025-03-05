import './style.css'
import { Link } from 'react-router-dom';

// importação de imagem
import template from '../../assets/cards/calendario.png'
import favoritar from '../../assets/material/heart_pink_contorno.png'
import desfavoritar from '../../assets/material/heart_pink_preenchido.png'

export default function CardProduto( {id, titulo, preco, imagemCapa} ) {

  return (
    <>
      <Link to={'/produto'} className="card nav-link rounded-5 shadow-sm">
        <img id='card-photo' src={imagemCapa} className="card-img-top rounded-5" alt="..."/>
          <div className="card-body d-flex">
            <div className='card-textos'>
              <h5 className="card-title">{titulo}</h5>
              <span className="card-text card-preco">R${Number(preco).toFixed(2)}</span>
            </div>
            <div className='d-flex justify-content-end align-items-end'>
              <img style={{cursor: 'pointer'}} src={favoritar} alt="" />
            </div>
          </div>
      </Link>
    </>
  );
}