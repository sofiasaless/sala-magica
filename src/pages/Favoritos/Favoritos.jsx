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

        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#meuModal">
          Abrir Modal
        </button>

        <Modal
          id="meuModal"
          titulo="Você não está logado!"
          mensagem="Para acessar essa página é necessário ter uma conta. Faça login ou cadastre-se para continuar."
          txtBtnUm="Continuar sem login"
          txtBtnDois="Fazer login"
          acao={() => navegador('/entrar')}
        />

      </Container>

      <Footer />

      <MobileHeader />
    </main>
  );
}