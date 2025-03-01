import './style.css'

// assets
import imgSeta from '../../assets/material/angle-double-small-left.png'
import { Link } from 'react-router-dom';

export default function BotaoVoltar () {
  return (
    <>
      <Link to={-1} className='d-flex nav-link p-1 pe-2 rounded-pill justify-content-center mt-3 btn-voltar'>
        <img src={imgSeta} alt="" />
        <span className='txt-voltar'>Voltar</span>
      </Link>
    </>
  );
}