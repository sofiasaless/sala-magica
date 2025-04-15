import './style.css'

// componentes
import Container from "../../components/Container/Container";
import Titulo from "../../components/Titulo/Titulo";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MobileHeader from "../../components/MobileHeader/MobileHeader"

// assets
import imgProduto from '../../assets/cards/calendario.png'
import imgDesfav from '../../assets/material/heart_pink_contorno.png'
import imgFav from '../../assets/material/heart_pink_preenchido.png'
import imgCompart from '../../assets/material/share.png'
import imgCart from '../../assets/material/cart.png'
import CardProduto from '../../components/CardProduto/CardProduto';

// imports
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProdutosFs from '../../firebase/firestore/ProdutoFs';
import CurtidasFs from '../../firebase/firestore/CurtidasFs';
import useAuth from '../../firebase/authentication/useAuth';
import Modal from '../../components/Modal/Modal';


export default function DetalheProduto() {

  // parametros passados na rota
  const { id } = useParams()

  // recuperando o usuário para 
  const usuario = useAuth()

  // instância para o firestore
  const produtoRepositorio = ProdutosFs()
  const curtidaRepositorio = CurtidasFs()

  // states para modal
  const [mensagem, setMensagem] = useState('');

  // states
  const [produto, setProduto] = useState()
  const [produtoSugestao, setProdutoSugestao] = useState([])
  const [imagemEmFoco, setImagemEmFoco] = useState('')
  const [curtido, setCurtido] = useState(false)

  // recuperando o produto
  const recuperarProdutoEmFoco = async () => {
    // console.log('entrei aqui')
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

  // ações de curtida do produto
  const manipularCurtida = async () => {
    if (usuario) {
      if (curtido) {
        // se o produto ja estiver curtido e o usuario escolher descurtir ....
        await curtidaRepositorio.apagarCurtida(usuario.email, id);
        setCurtido(false)
      } else {
        // curtindo o produto
        await curtidaRepositorio.registrarCurtida(usuario.email, id);
        setCurtido(true)
      }
      return
    }

    // alert('Faça login para curtir o produto!')
    setMensagem('Para curtir os produtos da Sala Mágica é necessário estar logado.\nFaça login ou cadastre-se para curtir o produto!')
  }

  // verificar se há curtida no produto
  const verificarCurtida = async () => {
    if (usuario) {
      await curtidaRepositorio.temCurtidaNoProduto(usuario.email, id).then((resultado) => {
        // console.log('tem curtida? ', resultado)
        setCurtido(resultado)
      })
      return
    }
  }

  // manipulando a encomenda do produto
  const encomendarProduto = () => {
    const urlAtual = window.location.href; // vai puxar a url em que se encontra
    const mensagem = `Olá, tenho interesse em um dos seus produtos! \n Gostei desse aqui: ${urlAtual}`
    const mensagemCodificada = encodeURIComponent(mensagem);
    const numeroContato = import.meta.env.VITE_CONTACT_NUMBER
    const numeroFormatado = numeroContato.replace(/\D/g, '');
    window.open(`https://wa.me/${numeroFormatado}?text=${mensagemCodificada}`, "_blank");
  }

  const compartilharProduto = () => {
    const urlAtual = window.location.href; // vai puxar a url em que se encontra
    const mensagem = `Ei, olha o que eu achei!\n Decoração escolar ${produto.titulo} - ${urlAtual}`
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://api.whatsapp.com/send?text=${mensagemCodificada}`;
    window.open(linkWhatsApp, "_blank");
  }

  useEffect(() => {

    recuperarProdutoEmFoco()

    recuperarProdutosSugestao()

    verificarCurtida()

  }, [id, usuario])


  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      {/* <Header /> */}

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
                      <img src={imgCompart} className='img-manip' alt="" onClick={compartilharProduto}/>
                      <img src={(curtido) ? imgFav : imgDesfav} className='img-manip' alt="" onClick={manipularCurtida} />
                    </div>

                    <div className='d-flex'>
                      <button className='btn-encomendar p-3 text-uppercase d-flex align-items-center rounded-3' onClick={encomendarProduto}>
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

          <section className='container d-flex justify-content-center'>
            <Link to={`/produtos`} state={"Todos produtos"} className='bt-verTodos p-3 rounded-4 mt-1 mb-4 text-decoration-none'>Ver mais</Link>
          </section>

        </Container>

      </div>

      <Footer />

      <MobileHeader />

      {mensagem && <Modal mensagem={mensagem} setMensagem={setMensagem} tituloModal={'Ops...'} />}
    </main>
  );
}