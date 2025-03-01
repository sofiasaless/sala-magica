import CardProdutoFavorito from "../../components/CardProdutoFavorito/CardProdutoFavorito";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"

export default function Favoritos() {
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

      <MobileHeader />
    </main>
  );
}