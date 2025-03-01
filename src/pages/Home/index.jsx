import './style.css'

// componentes
import Header from '../../components/Header/Header'
import CardProduto from '../../components/CardProduto/CardProduto'
import Titulo from '../../components/Titulo/Titulo';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import Banner from '../../components/Banner/Banner';

// assets
import img1 from '../../assets/banner/creative-thinking-animate.svg'
import img2 from '../../assets/banner/kindergarten-student-animate.svg'
import Container from '../../components/Container/Container';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <Container>
        <Titulo titulo={"Enfeites de parede"} upper={true} />

        <section className='container py-5 gap-4 justify-content-center'>

          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />

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

          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />

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

      <MobileHeader />
    </main>
  );
}