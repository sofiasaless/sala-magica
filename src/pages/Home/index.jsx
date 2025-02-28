import './style.css'

import Header from '../../components/Header/Header'
import CardProduto from '../../components/CardProduto/CardProduto'
import Titulo from '../../components/Titulo/Titulo';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import Banner from '../../components/Banner/Banner';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <main className='container'>

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
          <div className='bt-verTodos p-3 rounded-4 mt-1 mb-4'>Ver todos os produtos</div>
        </section>

      </main>

      <main>
        <Banner 
          conteudoTXT={"Personalizamos cada peça com carinho, utilizando EVA, papel crepom, TNT e muito mais para criar um ambiente lúdico e inspirador para suas crianças."}
        />
      </main>


      <MobileHeader />
    </div>
  );
}