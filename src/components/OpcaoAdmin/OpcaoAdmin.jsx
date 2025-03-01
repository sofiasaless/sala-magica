import { Link } from 'react-router-dom'
import './style.css'

export default function OpcaoAdmin ( {imgOp, descricao, redirecionamento} ) {
  return (
    <>
      <Link to={`/${redirecionamento}`} className='area-opcao nav-link d-flex p-2 align-items-center rounded-3 justify-content-start'>
        <div className='d-flex p-2'>
          <img src={imgOp} alt="" className='me-2' />
        </div>
        <div>
          <span className='opcao-descricao'>{descricao}</span>
        </div>
      </Link>
    </>
  )
}