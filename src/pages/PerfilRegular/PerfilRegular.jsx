import './style.css'

// components
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import Perfil from "../../components/Perfil/Perfil";
import Footer from "../../components/Footer/Footer";

// assets
import imgSair from '../../assets/material/inbox-out.png'
import AuthService from '../../firebase/authentication/AuthService';

export default function PerfilRegular() {

  const authServ = AuthService()

  return (
    <main style={{ backgroundColor: '#e8e8e8'}}>
      <Header />
      <Container>
        <Titulo titulo={"Bem-vindo ao seu perfil"} />

        <Perfil admin={true} />

        <form className=''>
          <div className='area-infos d-flex gap-3 justify-content-between'>
            <div className="p-0 mb-3 area-input">
              <label className="form-label ms-1">E-mail</label>
              <input type="email" className="form-control input-perfil" />
            </div>

            <div className="p-0 mb-3 area-input">
              <label className="form-label ms-1">Telefone</label>
              <input type="text" className="form-control input-perfil" />
            </div>
          </div>
        </form>

        <div className='p-0 mb-4 d-flex gap-3'>
          <button className="p-2 px-3 rounded-4 btn-opc btn-azul">
            Editar perfil
            <i class="bi bi-pencil-fill ms-2"></i>
          </button>
          <button className="p-2 px-3 rounded-4 btn-verm">
            Excluir conta
            <i class="bi bi-trash3-fill ms-2"></i>
          </button>
        </div>

        <section className='mt-4 d-flex justify-content-end'>
          <div className='d-flex align-items-center area-sair' onClick={() => authServ.desconectarUsuario()}>
            <div className='me-3'>
              <span className='text-decoration-underline txt-sair'>Sair</span>
            </div>
            <div className='pb-2'>
              <img src={imgSair} alt="" />
            </div>
          </div>
        </section>

      </Container>

      <Footer />

      <MobileHeader />
    </main>
  );
}