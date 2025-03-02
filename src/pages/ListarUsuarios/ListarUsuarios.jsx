// componentes
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar';
import CardUsuario from "../../components/CardUsuario/CardUsuario";

export default function ListarUsuarios() {
  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <Container>

        <BotaoVoltar />

        <Titulo titulo={"Lista de usuários"} admin={true} />

        <section className='container pt-4 p-0 gap-3'>
          
          <CardUsuario />
          <CardUsuario />
          <CardUsuario />

        </section>

      </Container>

      <MobileHeader />
    </main>
  );
}