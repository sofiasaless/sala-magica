import './style.css'
import { Link } from 'react-router-dom';

// componentes
import Header from '../../components/Header/Header'
import CardProduto from '../../components/CardProduto/CardProduto'
import Titulo from '../../components/Titulo/Titulo';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import Banner from '../../components/Banner/Banner';
import Container from '../../components/Container/Container';
import Footer from '../../components/Footer/Footer';

// assets
import img1 from '../../assets/banner/creative-thinking-animate.svg'
import img2 from '../../assets/banner/kindergarten-student-animate.svg'
import imgHome from '../../assets/material/img-home.png'

// outros imports
import ProdutosFs from '../../firebase/firestore/ProdutoFs';
import { useEffect, useState } from 'react';

export default function Home() {

  // instância para o firestore
  const produtosRepositorio = ProdutosFs();

  const [produtosSecaoUm, setProdutosSecaoUm] = useState([])
  const [produtosSecaoDois, setProdutosSecaoDois] = useState([])

  const recuperarProdutos = async () => {
    await produtosRepositorio.recuperarProdutoPorCategoria('Enfeites de parede').then((resultado) => {
      setProdutosSecaoUm(resultado);
    })

    await produtosRepositorio.recuperarProdutoPorCategoria('Materiais educativos').then((resultado) => {
      setProdutosSecaoDois(resultado);
    })
  }

  useEffect(() => {
    recuperarProdutos();
  }, [])

  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />

      <div className='area-introducao d-flex pt-5 align-items-start'>
        <div className='d-flex justify-content-center align-items-center flex-column container'>
          <h1 className='h1-home'>Bem-vindo a Sala Mágica!</h1>
          <p className='text-center p-home'>O site perfeito para encontrar enfeites e decorações personalizadas para maternais e jardins de infância. Nossos produtos são feitos com muito carinho e criatividade, utilizando materiais como EVA, papel crepom e TNT para deixar cada espaço mais alegre e acolhedor.</p>
          <div className='div-img-home d-flex align-items-center justify-content-center rounded-circle shadow-lg'>
            <img className='img-home' src={imgHome} alt="" />
          </div>
        </div>

      </div>

      <Container>
        <Titulo titulo={"Enfeites de parede"} upper={true} />

        <section className='container py-5 gap-4 justify-content-center'>

          {
            (produtosSecaoUm.length != 0)
              ?
              produtosSecaoUm.map((p) => (
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
          <Link to={'/produtos'} className='bt-verTodos p-3 rounded-4 mt-1 mb-4 text-decoration-none'>Ver todos os produtos</Link>
        </section>
      </Container>


      <div>
        <Banner
          imgImport={img2}
          conteudoTXT={"Personalizamos cada peça com carinho, utilizando EVA, papel crepom, TNT e muito mais para criar um ambiente lúdico e inspirador para suas crianças."}
        />
      </div>

      <Container>
        <Titulo titulo={"Materiais educativos"} upper={true} />

        <section className='container py-5 gap-4 justify-content-center'>

          {
            (produtosSecaoDois.length != 0)
              ?
              produtosSecaoDois.map((p) => (
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
          <div className='bt-verTodos p-3 rounded-4 mt-1 mb-4 text-decoration-none'>Ver todos os produtos</div>
        </section>
      </Container>

      <div>
        <Banner
          imgImport={img1}
          conteudoTXT={"Você imagina, nós criamos! Também oferecemos decorações personalizadas feitas do jeitinho que você quiser. Nós criamos cada detalhe com carinho para deixar o ambiente ainda mais acolhedor e divertido."}
        />
      </div>

      <Footer />

      <MobileHeader />
    </main>
  );
}