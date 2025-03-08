import CardProdutoFavorito from "../../components/CardProdutoFavorito/CardProdutoFavorito";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import Footer from "../../components/Footer/Footer"
import Modal from "../../components/Modal/Modal";

// imports
import { useNavigate } from "react-router-dom";

export default function Favoritos() {

  const navegador = useNavigate()

  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <Container>
        <Titulo titulo={"Lista de desejos"} />

        <section className='container py-5 gap-4 justify-content-center'>

          <CardProdutoFavorito />
          <CardProdutoFavorito />
          <CardProdutoFavorito />
          <CardProdutoFavorito />
          <CardProdutoFavorito />
          <CardProdutoFavorito />
          <CardProdutoFavorito />

        </section>

      </Container>

      <Footer />

      <MobileHeader />
    </main>
  );
}