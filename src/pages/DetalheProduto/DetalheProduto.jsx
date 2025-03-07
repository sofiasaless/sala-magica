import './style.css'

// componentes
import Container from "../../components/Container/Container";
import Titulo from "../../components/Titulo/Titulo";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MobileHeader from "../../components/MobileHeader/MobileHeader"

// assets
import imgProduto from '../../assets/cards/calendario.png'
import imgFav from '../../assets/material/heart_pink_contorno.png'
import imgCompart from '../../assets/material/share.png'
import imgCart from '../../assets/material/cart.png'
import CardProduto from '../../components/CardProduto/CardProduto';

// imports
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProdutosFs from '../../firebase/firestore/ProdutoFs';


export default function DetalheProduto() {

  // parametros passados na rota
  const { id } = useParams()

  // instância para o firestore
  const produtoRepositorio = ProdutosFs()

  // states
  const [produto, setProduto] = useState()
  const [produtoSugestao, setProdutoSugestao] = useState([])

  const [imagemEmFoco, setImagemEmFoco] = useState('')

  // recuperando o produto
  const recuperarProdutoEmFoco = async () => {
    console.log('entrei aqui')
    await produtoRepositorio.recuperarProdutoPorId(id).then((resultado) => {
      setProduto(resultado)
      setImagemEmFoco(resultado.imagemCapa)
    })
  }

  const recuperarProdutosSugestao = async () => {
    await produtoRepositorio.recuperarProdutosSugestao().then((resultado) => {
      setProdutoSugestao(resultado);
    })
  }

  useEffect(() => {

    recuperarProdutoEmFoco()

    recuperarProdutosSugestao()
  }, [id])


  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />

      <div className='container-princiapl d-flex align-items-center justify-content-center flex-column'>

        <section className='area-total py-5'>

          <div className='container secao-detalhe d-flex p-4 justify-content-center'>

            {
              (produto === undefined) ?
                <>
                  <div className="text-center">
                    <div style={{ color: 'var(--verdeDois)' }} className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </>
                :
                <>
                  <div className='divisao produto-imgs d-flex flex-column justify-content-center align-itens-center'>
                    <div className='principal-img mb-3 d-flex justify-content-center'>
                      <img className='img-foco rounded-4' src={imagemEmFoco} alt="" />
                    </div>
                    <div className='outras-imgs d-flex gap-2 align-items-center justify-content-center flex-wrap'>
                      <div onClick={(e) => {
                        e.preventDefault()
                        setImagemEmFoco(produto.imagemCapa)
                      }}>
                        <img className='img-opcao rounded-2' src={produto.imagemCapa} alt="outra" />
                      </div>

                      {
                        produto.imagens.map((p) => (
                          <div onClick={(e) => {
                            e.preventDefault()
                            setImagemEmFoco(p)
                          }}>
                            <img className='img-opcao rounded-2' src={p} alt="outra" />
                          </div>
                        ))
                      }

                    </div>
                  </div>

                  <div className='divisao produto-info d-flex flex-column align-items-start justify-content-center ps-3'>

                    <div className='d-flex flex-column infos'>
                      <h2 className='nome-produto text-uppercase'>{produto.titulo}</h2>
                      <h4 className='preco-produto'>R$ {Number(produto.preco).toFixed(2)}</h4>
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
                      <p className='p-desc m-0 lh-sm'>{produto.descricao}</p>
                    </div>

                    <div style={{ width: '100%' }}>
                      <span className='produto-desc-titulo'>Medidas (AltxComp)</span>
                      <div className='my-1 rounded-3' style={{ width: '40%', height: '3px', background: 'var(--cinzaUm)' }}></div>
                      <p className='p-desc m-0'>Altura: {Number(produto.altura).toFixed(2)}cm</p>
                      <p className='p-desc'>Comprimento: {Number(produto.comprimento).toFixed(2)}cm</p>
                    </div>

                    <div>
                      <span className='produto-desc-titulo'>Confecção e modelagem</span>
                      <div className='my-1 rounded-3' style={{ width: '40%', height: '3px', background: 'var(--cinzaUm)' }}></div>
                      <p className='p-desc m-0  lh-sm'>{produto.modelagem}</p>
                    </div>
                  </div>
                </>
            }

          </div>

        </section>

        <Container>
          <Titulo titulo={"Você também vai gostar..."} />

          <section className='container py-5 gap-4 justify-content-center'>

            {
              (produtoSugestao.length != 0)
              ?
              produtoSugestao.map((p) => (
                <CardProduto key={p.id} id={p.id} titulo={p.titulo} preco={p.preco} imagemCapa={p.imagemCapa} />
              ))
              :
              <>
                <div className="text-center">
                  <div style={{ color: 'var(--verdeDois)' }} className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </>
            }

          </section>

        </Container>

      </div>

      <Footer />

      <MobileHeader />
    </main>
  );
}