import './style.css'

// components
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import Perfil from "../../components/Perfil/Perfil";
import OpcaoAdmin from '../../components/OpcaoAdmin/OpcaoAdmin';

// assets
import img1 from '../../assets/material/box-open.png'
import img2 from '../../assets/material/boxes.png'
import img3 from '../../assets/material/admin-alt.png'
import imgSair from '../../assets/material/inbox-out.png'

export default function PerfilAdmin() {
  return (
    <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem' }}>
      <Header />
      <div style={{height: '100vh'}} className='container'>
        <Titulo titulo={"Bem-vindo ao seu perfil"} />

        <Perfil />

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

        <Titulo titulo={'Opções de administrador'} />

        <section className='mt-4 d-flex flex-column gap-2'>

          <OpcaoAdmin redirecionamento={'novo-produto'} imgOp={img1} descricao={'Anunciar novo produto no catálogo'}/>
          <OpcaoAdmin redirecionamento={'editar-produtos'} imgOp={img2} descricao={'Editar/excluir produtos do catálogo'}/>
          <OpcaoAdmin redirecionamento={'visualizar-usuarios'} imgOp={img3} descricao={'Visualizar usuários'}/>

        </section>

        <section className='mt-4 d-flex justify-content-end'>
          <div className='d-flex align-items-center area-sair'>
            <div className='me-3'>
              <span className='text-decoration-underline txt-sair'>Sair</span>
            </div>
            <div className='pb-2'>
              <img src={imgSair} alt="" />
            </div>
          </div>
        </section>

      </div>

      <MobileHeader />
    </main>
  );
}