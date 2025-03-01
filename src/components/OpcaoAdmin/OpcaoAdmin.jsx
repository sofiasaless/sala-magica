import './style.css'

export default function OpcaoAdmin ( {imgOp, descricao} ) {
  return (
    <>
      <div className='area-opcao d-flex p-2 align-items-center rounded-3 justify-content-start'>
        <div className='d-flex p-2'>
          <img src={imgOp} alt="" className='me-2' />
        </div>
        <div>
          <span className='opcao-descricao'>{descricao}</span>
        </div>
      </div>
    </>
  )
}