import CardProduto from "../../components/CardProduto/CardProduto";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import NavProdutos from "../../components/NavProdutos/NavProdutos";
import Footer from "../../components/Footer/Footer";
import ProdutosFs from "../../firebase/firestore/ProdutoFs";
import { useEffect, useState } from "react";

export default function Produtos() {

  // instância para o firestore
  const produtosRepositorio = ProdutosFs();

  const [produtosSecaoUm, setProdutosSecaoUm] = useState([])

  const recuperarProSecUm = async () => {
    await produtosRepositorio.recuperarProdutos().then((resultado) => {
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
                <CardProduto key={p.id} titulo={p.titulo} preco={p.preco} imagemCapa={p.imagemCapa} />
              ))
              :
              <>
                <h1>ta vazio</h1>
              </>
          }

        </section>

      </Container>

      <Footer />

      <MobileHeader />
    </main>
  );
}