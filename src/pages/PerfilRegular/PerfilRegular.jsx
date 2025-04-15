import './style.css'

// components
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import MobileHeader from "../../components/MobileHeader/MobileHeader"
import Perfil from "../../components/Perfil/Perfil";
import Footer from "../../components/Footer/Footer";
import Modal from '../../components/Modal/Modal';
import OpcaoAdmin from '../../components/OpcaoAdmin/OpcaoAdmin';

// assets
import imgSair from '../../assets/material/inbox-out.png'
import img4 from '../../assets/material/order-history.png'

// imports
import AuthService from '../../firebase/authentication/AuthService';
import useAuth from '../../firebase/authentication/useAuth';
import { useEffect, useState } from 'react';

export default function PerfilRegular() {

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

  // states para modal
  const [mensagem, setMensagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [mensagemAcao, setMensagemAcao] = useState('');
  const [tituloAcao, setTituloAcao] = useState('');

  // realizando atualizações no perfil do usuário
  const habilitarEdicaoSalvarAlteracao = async () => {
    if (txtBtn === 'Editar perfil') {
      setTxtBtn('Salvar alterações')
      setDesabilitado(false)
      return
    }

    await authServ.atualizarPerfilUsuario(email, nome, telefone)
    // alert('Perfil atualizado com sucesso!')

    setMensagem('Perfil atualizado com sucesso!')
    setTitulo('Sucesso!')

    setTxtBtn('Editar perfil')
    setDesabilitado(true)
  }

  // realizando exclusão da conta
  const abrirModalExclusao = async () => {
    setMensagemAcao('Tem certeza que deseja excluir sua conta?')
    setTituloAcao('Atenção!')
  }

  const excluirConta = async () => {
    const senha = prompt("Digite sua senha para confirmar a exclusão da conta:");

    if (!senha) {
      alert("A senha é necessária para excluir a conta.");
      return;
    }

    await authServ.deletarUsuario(usuario, usuario.email, senha)
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
    <main style={{ backgroundColor: '#e8e8e8' }}>
      {/* <Header /> */}
      <section className='container d-flex flex-column' style={{ height: '90vh' }}>
        <Titulo titulo={"Bem-vindo ao seu perfil"} />

        <Perfil nomeUsuario={nome} />

        <form className=''>
          <div className='area-infos d-flex gap-3 justify-content-between'>
            <div className="p-0 mb-3 area-input">
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Nome completo</label>
                <input type="text" className="form-control input-perfil" onChange={(e) => setNome(e.target.value)} value={nome} readOnly={desabilitado} />
              </div>

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
          <button className="p-2 px-3 rounded-4 btn-verm" onClick={abrirModalExclusao}>
            Excluir conta
            <i class="bi bi-trash3-fill ms-2"></i>
          </button>
        </div>

        <Titulo titulo={'Opções de usuário'} />

        <section className='mt-4 d-flex flex-column gap-2'>

          <OpcaoAdmin redirecionamento={'minhas-encomendas'} imgOp={img4} descricao={'Minhas encomendas'} />

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

      </section>

      <Footer />

      <MobileHeader />

      {mensagem && <Modal mensagem={mensagem} setMensagem={setMensagem} tituloModal={titulo} />}

      {/* modal de ação para exclusão */}
      <div className="modal fade show" style={{ display: (mensagemAcao != '') ? "block" : "none" }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg" style={{ backgroundColor: 'var(--verdeDois)' }}>
            <div className="modal-header">
              <h5 style={{ color: 'white' }} className="modal-title">{tituloAcao}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setMensagemAcao("")}></button>
            </div>
            <div className="modal-body">
              <p className="p-modal">{mensagemAcao}</p>
              <div className="d-flex gap-3 justify-content-end">
                <button className='btn btn-secondary' onClick={() => {
                  setMensagemAcao("")
                }}>Cancelar</button>
                <button className='btn btn-danger' onClick={() => {
                  setMensagemAcao('')
                  excluirConta()
                }}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}