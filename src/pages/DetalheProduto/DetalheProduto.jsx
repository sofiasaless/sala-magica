import './style.css'

// componentes
import Container from "../../components/Container/Container";
import Titulo from "../../components/Titulo/Titulo";
import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader"

// assets
import imgProduto from '../../assets/cards/calendario.png'
import imgFav from '../../assets/material/heart_pink_contorno.png'
import imgCompart from '../../assets/material/share.png'
import imgCart from '../../assets/material/cart.png'
import CardProduto from '../../components/CardProduto/CardProduto';


export default function DetalheProduto() {
  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />

      <div className='container-princiapl d-flex align-items-center justify-content-center flex-column'>

        <section className='area-total py-5'>

          <div className='container secao-detalhe d-flex p-4 justify-content-center'>

            <div className='divisao produto-imgs d-flex flex-column justify-content-center align-itens-center'>
              <div className='principal-img mb-3 d-flex justify-content-center'>
                <img className='img-foco rounded-4' src={imgProduto} alt="" />
              </div>
              <div className='outras-imgs d-flex gap-2 align-items-center justify-content-center flex-wrap'>
                <div><img className='img-opcao rounded-2' src={imgProduto} alt="outra" /></div>
                <div><img className='img-opcao rounded-2' src={imgProduto} alt="outra" /></div>
                <div><img className='img-opcao rounded-2' src={imgProduto} alt="outra" /></div>
                <div><img className='img-opcao rounded-2' src={imgProduto} alt="outra" /></div>
                <div><img className='img-opcao rounded-2' src={imgProduto} alt="outra" /></div>
              </div>
            </div>

            <div className='divisao produto-info d-flex flex-column align-items-center justify-content-center'>

              <div className='d-flex flex-column infos'>
                <h2 className='nome-produto text-uppercase'>Calendário</h2>
                <h4 className='preco-produto'>R$ 50,00</h4>
              </div>

              <div className='d-flex gap-4 mt-3 mb-4'>
                <img src={imgCompart} className='img-manip' alt="" />
                <img src={imgFav} className='img-manip' alt="" />
              </div>

              <div className='d-flex'>
                <button className='btn-encomendar p-3 text-uppercase d-flex align-items-center rounded-3'>
                  Encomendar o seu
                  <img src={imgCart} className='ms-3' alt="" />
                </button>
              </div>
            </div>

            <div className='divisao produto-descr d-flex flex-column gap-4'>
              <div>
                <span className='produto-desc-titulo'>Descrição do produto</span>
                <div className='my-1 rounded-3' style={{ width: '40%', height: '3px', background: 'var(--cinzaUm)' }}></div>
                <p className='p-desc m-0 lh-sm'>O calendário de parede faz parte da nossa coleção de decorações para sala de aula, ele  pode ser fixado na parede e é excelente para interação com as crianças ao abordar meses do ano e dias da semanas.</p>
              </div>

              <div>
                <span className='produto-desc-titulo'>Medidas (AltxComp)</span>
                <div className='my-1 rounded-3' style={{ width: '40%', height: '3px', background: 'var(--cinzaUm)' }}></div>
                <p className='p-desc m-0'>Altura: 50,00cm</p>
                <p>Comprimento: 30,00cm</p>
              </div>

              <div>
                <span className='produto-desc-titulo'>Confecção e modelagem</span>
                <div className='my-1 rounded-3' style={{ width: '40%', height: '3px', background: 'var(--cinzaUm)' }}></div>
                <p className='p-desc m-0  lh-sm'>A decoração é confeccionada com folhas de papel E.V.A de várias cores, cola para madeira/isopor e muito carinho! O material garante a firmeza e durabilidade necessária para se manter conservado na sala de aula durante todo o período letivo.</p>
              </div>
            </div>

          </div>

        </section>

        <Container>
          <Titulo titulo={"Você também vai gostar..."} />

          <section className='container py-5 gap-4 justify-content-center'>

            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />
            <CardProduto />

          </section>

        </Container>

      </div>

      <MobileHeader />
    </main>
  );
}