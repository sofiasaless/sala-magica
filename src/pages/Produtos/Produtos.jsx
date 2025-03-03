import CardProduto from "../../components/CardProduto/CardProduto";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import NavProdutos from "../../components/NavProdutos/NavProdutos";
import Footer from "../../components/Footer/Footer";

export default function Produtos() {
  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <Container>
        <Titulo titulo={"Enfeites de parede"} upper={true} />

        <NavProdutos />

        <section className='container py-5 gap-4 justify-content-center'>

          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />
          <CardProduto />

        </section>

      </Container>

      <Footer />

      <MobileHeader />
    </main>
  );
}