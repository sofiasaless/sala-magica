// componentes
import CardProduto from "../../components/CardProduto/CardProduto";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import NavProdutos from "../../components/NavProdutos/NavProdutos";
import Footer from "../../components/Footer/Footer";
import ProdutosFs from "../../firebase/firestore/ProdutoFs";

// imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Produtos() {

  // categoria de produtos
  const location = useLocation();
  const categoria = location.state;

  // instância para o firestore
  const produtosRepositorio = ProdutosFs();

  const [produtosSecaoUm, setProdutosSecaoUm] = useState([])

  const recuperarProSecUm = async () => {
    await produtosRepositorio.recuperarProdutoPorCategoria(categoria).then((resultado) => {
      setProdutosSecaoUm(resultado);
    })
  }

  useEffect(() => {
    recuperarProSecUm();

  }, [])


  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <Container>
        <Titulo titulo={"Enfeites de parede"} upper={true} />

        <NavProdutos />

        <section className='container py-5 gap-4 justify-content-center'>

          {
            (produtosSecaoUm.length != 0)
              ?
              produtosSecaoUm.map((p) => (
                <CardProduto key={p.id} titulo={p.titulo} preco={p.preco} imagemCapa={p.imagemCapa} id={p.id} />
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

      </Container>

      <Footer />

      <MobileHeader />
    </main>
  );
}