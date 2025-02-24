import './style.css'

import Header from '../../components/Header'
import CardProduto from '../../components/CardProduto';

export default function Home () {
  return (
    <div style={{backgroundColor: '#e8e8e8'}}>
      <Header/>
      <main className='container'>

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
    </div>
  );
}