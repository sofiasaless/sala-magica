import './style.css'

// importação de imagem
import template from '../../assets/cards/calendario.png'
import favoritar from '../../assets/material/heart_pink_contorno.png'
import desfavoritar from '../../assets/material/heart_pink_preenchido.png'

export default function CardProduto() {

  return (
    <>
      <div className="card rounded-5 shadow-sm">
        <img id='card-photo' src={template} className="card-img-top rounded-5" alt="..."/>
          <div className="card-body d-flex">
            <div className='card-textos'>
              <h5 className="card-title">Calendário</h5>
              <p className="card-text">R$50,00</p>
            </div>
            <div className='d-flex justify-content-end align-items-end'>
              <img style={{cursor: 'pointer'}} src={favoritar} alt="" />
            </div>
          </div>
      </div>
    </>
  );
}