import './style.css'

// assets
import materialArquivo from '../../assets/material/folder-download.png'

export default function ArquivarProduto ( {descricao} ) {
  return (
    <>
      <div className='d-flex align-items-center area-arquivo'>
        <img src={materialArquivo} alt="" className='me-2' />
        <span className='text-decoration-underline' style={{fontWeight: 600}}>{descricao}</span>
      </div>
    </>
  )
}