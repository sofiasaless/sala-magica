import './style.css'

// componentes
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import CardProdutoEditar from '../../components/CardProdutoEditar/CardProdutoEditar';
import ArquivarProduto from '../../components/ArquivarProduto/ArquivarProduto';
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar';

export default function ListarProdutosEditar() {
  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <Container>

        <BotaoVoltar />

        <Titulo titulo={"Selecione um produto para editá-lo ou excluí-lo"} admin={true} />

        <section className='container pt-5 gap-4 justify-content-center'>

          <CardProdutoEditar />
          <CardProdutoEditar />
          <CardProdutoEditar />
          <CardProdutoEditar />
          <CardProdutoEditar />
          <CardProdutoEditar />
          <CardProdutoEditar />

        </section>
        
        <section className='d-flex mt-4 justify-content-center align-items-center'>
          <ArquivarProduto descricao={'Acessar produtos arquivados'} />
        </section>

      </Container>

      <MobileHeader />
    </main>
  );
}