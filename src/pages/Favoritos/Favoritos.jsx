import CardProdutoFavorito from "../../components/CardProdutoFavorito/CardProdutoFavorito";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import Footer from "../../components/Footer/Footer"
import Modal from "../../components/Modal/Modal";

// imports
import { useNavigate } from "react-router-dom";
import CurtidasFs from "../../firebase/firestore/CurtidasFs";
import { useEffect, useState } from "react";
import useAuth from "../../firebase/authentication/useAuth";

export default function Favoritos() {

  const navegador = useNavigate()

  const usuario = useAuth()

  const curtidaServ = CurtidasFs()

  // states para produtos favoritos
  const [produtosFavoritos, setProdutosFavoritos] = useState([])

  useEffect(() => {
    const recuperarFavoritos = async () => {
      if (usuario) {
        let produtosFavs = await curtidaServ.recuperarCurtidasUsuario(usuario.email)
        setProdutosFavoritos(produtosFavs)
      }
    }

    recuperarFavoritos()
  }, [usuario])

  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <Container>
        <Titulo titulo={"Lista de desejos"} />

        <section className='container py-5 gap-4 justify-content-center'>

          {
            (produtosFavoritos.length != 0)
              ?
              produtosFavoritos.map((p) => (
                <CardProdutoFavorito key={p.id} id={p.id} titulo={p.titulo} preco={p.preco} imagemCapa={p.imagemCapa} />
              ))
              :
              <>
                <div className="text-center">
                  <h2>Você ainda favoritou nenhum produto! :(</h2>
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