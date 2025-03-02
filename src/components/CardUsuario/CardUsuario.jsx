import './style.css'

// assets
import imgIcon from '../../assets/material/circle-user.png'
import imgExcl from '../../assets/material/trash-xmark.png'
import { useState } from 'react'

export default function CardUsuario () {
  
  const [selecionado, setSelecionado] = useState(true);
  
  return (
    <div className='card-usuario-area d-flex flex-column justify-content-center align-items-center'>
      <div className='card-usuario-body d-flex align-items-center p-3 rounded-3'
        onClick={() => {
          setSelecionado(!selecionado);
        }}
      >
        <div className='card-area-nome d-flex align-items-center gap-2'>
          <img className='img-card-usuario' src={imgIcon} alt="" />
          <h5 className='m-0'>Maria Isabel da Silva</h5>
        </div>

        <div>
          <h5 className='m-0 text-uppercase'>Normal</h5>
        </div>
      </div>

      <div style={{display: (selecionado)?'none':'flex'}} className='card-usuario-infos rounded-bottom p-3'>
        <div style={{flex: 1}} className='d-flex flex-column'>
          <span>Telefone: (88) 98732-8323</span>
          <span>E-mail: exemplo.novo@email.com</span>
          <span>Registrou-se em 5 de fevereiro de 2025</span>
        </div>

        <div className='d-flex align-items-center'>
          <img style={{height: '2.5rem', cursor: 'pointer'}} src={imgExcl} alt="" />
        </div>
      </div>

    </div>
  )
}