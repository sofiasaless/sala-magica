import './style.css'

// assets
import imgZap from '../../assets/material/whatsapp.png'
import imgInsta from '../../assets/material/instagram.png'
import imgPin from '../../assets/material/pinterest-logo.png'

export default function Footer() {
  return (
    <>
      <footer className='pt-5 pb-5'>
        <div className='container conteudos d-flex justify-content-between gap-5'>

          <div className='conteudo'>

            <span className='text-uppercase'>Sala mágica</span>
            <div className='my-1 rounded-3' style={{ height: '2px', background: 'var(--cinzaDois)' }}></div>
            <p className='m-0'>A “Sala Mágica” é um website desenvolvido com fins de divulgação de enfeites e decorações artesanais para salas de aula de maternais e jardins de infância, feitos com materiais como EVA, papel crepom e TNT. Nosso objetivo é oferecer inspirações criativas e personalizadas para tornar o ambiente escolar mais acolhedor, lúdico e encantador. Não realizamos vendas diretas pelo site, mas conectamos você ao fornecedor para encomendas e personalizações.</p>
            <div className='my-1 rounded-3' style={{ height: '2px', background: 'var(--cinzaDois)' }}></div>

            <div className='d-flex gap-4 mt-2'>
              <a><img src={imgZap} alt="" className='img-social' /></a>
              <a><img src={imgInsta} alt="" className='img-social' /></a>
              <a><img src={imgPin} alt="" className='img-social' /></a>
            </div>

          </div>

          <div className='conteudo'>

            <span className='text-uppercase'>Saiba mais</span>
            <div className='my-1 rounded-3' style={{ height: '2px', background: 'var(--cinzaDois)' }}></div>
            <a className='link-footer nav-link'>Política e Privacidade</a>
            <div className='my-1 rounded-3' style={{ height: '2px', background: 'var(--cinzaDois)' }}></div>
            <a className='link-footer nav-link'>Autores</a>
            <div className='my-1 rounded-3' style={{ height: '2px', background: 'var(--cinzaDois)' }}></div>
            <a className='link-footer nav-link'>Quem somos</a>
            <div className='my-1 rounded-3' style={{ height: '2px', background: 'var(--cinzaDois)' }}></div>
            

          </div>

        </div>
      </footer>
    </>
  )
}