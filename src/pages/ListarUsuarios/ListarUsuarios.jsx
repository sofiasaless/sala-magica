// componentes
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar';
import CardUsuario from "../../components/CardUsuario/CardUsuario";
import AuthService from "../../firebase/authentication/AuthService";
import { useEffect, useState } from "react";

export default function ListarUsuarios() {

  const authServ = AuthService()

  const [usuarios, setUsuarios] = useState([])

  const carregarUsuarios = async () => {
    await authServ.recuperarUsuarios().then((resultado) => {
      setUsuarios(resultado)
    })
  }

  useEffect(() => {
    carregarUsuarios()
  }, [])

  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      {/* <Header /> */}
      <div style={{ height: '100vh' }} className="container">

        <BotaoVoltar />

        <Titulo titulo={"Lista de usuários"} admin={true} />

        <section className='container pt-4 p-0 gap-3'>

          {
            (usuarios.length != 0)
              ?
              usuarios.map((u) => (
                <CardUsuario key={u.id} nome={u.nomeCompleto} email={u.email} telefone={u.telefone} role={u.role} dataCadastro={u.dataCadastro} />
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

      </div>

      <MobileHeader />
    </main>
  );
}