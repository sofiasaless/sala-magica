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

// imports
import AuthService from '../../firebase/authentication/AuthService';
import useAuth from '../../firebase/authentication/useAuth';
import { useEffect, useState } from 'react';

export default function PerfilAdmin() {

  const authServ = AuthService()

  // recuperando os dados do usuário
  const usuario = useAuth();

  // states para controle do perfil
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  // outros states
  const [txtBtn, setTxtBtn] = useState('Editar perfil')
  const [desabilitado, setDesabilitado] = useState(true)

  // realizando atualizações no perfil do usuário
  const habilitarEdicaoSalvarAlteracao = async () => {
    if (txtBtn === 'Editar perfil')   {
      setTxtBtn('Salvar alterações')
      setDesabilitado(false)
      return
    }

    await authServ.atualizarPerfilUsuario(email, nome, telefone)
    alert('Perfil atualizado com sucesso!')

    setTxtBtn('Editar perfil')
    setDesabilitado(true)
  }


  useEffect(() => {
    const recuperarDadosUsuario = async () => {
      if (usuario) {
        await authServ.retornarInfosUsuario(usuario.email).then((resultado) => {
          setNome(resultado.nomeCompleto)
          setEmail(resultado.email)
          setTelefone(resultado.telefone)
        })
      }
    }

    recuperarDadosUsuario()

  }, [usuario])

  return (
    <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem' }}>
      <Header />
      <div style={{ height: '100vh' }} className='container'>
        <Titulo titulo={"Bem-vindo ao seu perfil"} />

        <Perfil nomeUsuario={nome} admin={true} />

        <form className=''>
          <div className='area-infos d-flex gap-3 justify-content-between'>
            <div className="p-0 mb-3 area-input">
              <label className="form-label ms-1">Nome completo</label>
              <input type="text" className="form-control input-perfil" onChange={(e) => setNome(e.target.value)} value={nome} readOnly={desabilitado} />
            </div>

            <div className="p-0 mb-3 area-input">
              <label className="form-label ms-1">E-mail</label>
              <input type="email" className="form-control input-perfil" value={email} readOnly={true} />
            </div>

            <div className="p-0 mb-3 area-input">
              <label className="form-label ms-1">Telefone</label>
              <input type="text" className="form-control input-perfil" onChange={(e) => setTelefone(e.target.value)} value={telefone} readOnly={desabilitado} />
            </div>
          </div>
        </form>

        <div className='p-0 mb-4 d-flex gap-3'>
          <button className="p-2 px-3 rounded-4 btn-opc btn-azul" onClick={habilitarEdicaoSalvarAlteracao}>
            {txtBtn}
            <i class="bi bi-pencil-fill ms-2"></i>
          </button>
          <button className="p-2 px-3 rounded-4 btn-verm">
            Excluir conta
            <i class="bi bi-trash3-fill ms-2"></i>
          </button>
        </div>

        <Titulo titulo={'Opções de administrador'} />

        <section className='mt-4 d-flex flex-column gap-2'>

          <OpcaoAdmin redirecionamento={'novo-produto'} imgOp={img1} descricao={'Anunciar novo produto no catálogo'} />
          <OpcaoAdmin redirecionamento={'editar-produtos'} imgOp={img2} descricao={'Editar/excluir produtos do catálogo'} />
          <OpcaoAdmin redirecionamento={'visualizar-usuarios'} imgOp={img3} descricao={'Visualizar usuários'} />

        </section>

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

      </div>

      <MobileHeader />
    </main>
  );
}