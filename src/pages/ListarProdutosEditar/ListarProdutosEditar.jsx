import './style.css'

// componentes
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import CardProdutoEditar from '../../components/CardProdutoEditar/CardProdutoEditar';
import ArquivarProduto from '../../components/ArquivarProduto/ArquivarProduto';
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar';
import ProdutosFs from '../../firebase/firestore/ProdutoFs';
import { useEffect, useState } from 'react';

export default function ListarProdutosEditar() {

  // instancia para o firestore
  const produtoRepositorio = ProdutosFs()

  // states
  const [produtosTotal, setProdutosTotal] = useState([])

  // função para carregar os produtos
  const recuperarProdutos = async () => {
    await produtoRepositorio.recuperarProdutos().then((resultado) => {
      setProdutosTotal(resultado)
    })
  }

  useEffect(() => {
    recuperarProdutos()
  }, [])

  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      {/* <Header /> */}
      <Container>

        <BotaoVoltar />

        <Titulo titulo={"Selecione um produto para editá-lo ou excluí-lo"} admin={true} />

        <section className='container pt-5 gap-4 justify-content-center'>


          {
            (produtosTotal.length != 0)
              ?
              produtosTotal.map((p) => (
                <CardProdutoEditar key={p.id} titulo={p.titulo} preco={p.preco} imagemCapa={p.imagemCapa} id={p.id} dataAnuncio={p.dataAnuncio} />
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

        <section className='d-flex mt-4 justify-content-center align-items-center'>
          <ArquivarProduto descricao={'Acessar produtos arquivados'} />
        </section>

      </Container>

      <MobileHeader />
    </main>
  );
}