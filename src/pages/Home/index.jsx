import './style.css'

import Header from '../../components/Header/Header'
import CardProduto from '../../components/CardProduto/CardProduto'
import Titulo from '../../components/Titulo/Titulo';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#e8e8e8' }}>
      <Header/>
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
      </main>
      <MobileHeader />
    </div>
  );
}