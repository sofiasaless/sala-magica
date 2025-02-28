import './style.css'

// assets e outros
import img1 from '../../assets/banner/creative-thinking-animate.svg'

export default function Banner( { conteudoTXT } ) {
  return (
    <>
      <div className="container-banner py-4 d-flex flex-column">
        
        <div className='container container-banner-interno d-flex align-items-center justify-content-center gap-5'>
          
          <div className='banner-imgs'>
            <img src={img1} className='img-banner' />
          </div>
          
          <div className='barra-banner rounded-4'></div>

          <div className='txt-banner'>
            <p>{conteudoTXT}</p>
          </div>

        </div>

      </div>
    </>
  )
}