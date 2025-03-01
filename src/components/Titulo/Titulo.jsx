import './style.css'

// assets
import imgAdmin from '../../assets/material/function-process.png'

export default function Titulo({ titulo, upper, admin }) {
  return (
    <>
      <div className='titulo-body'>
        <h4 style={{ textTransform: (upper) ? 'uppercase' : 'none' }} className='m-0'>{titulo}</h4>
        <div style={{display: (admin)?'flex':'none'}} className='align-items-center'>
          <img src={imgAdmin} alt="" className='me-2' />
          <span className='txt-admin'>Administrador</span>
        </div>
        <div className='break mt-2'></div>
      </div>
    </>
  );
}