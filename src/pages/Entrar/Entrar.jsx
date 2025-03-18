import './style.css'
import logo from '../../assets/material/logo1.png'

// imports
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../../firebase/authentication/AuthService'
import { AuthErrorCodes } from 'firebase/auth'
import Modal from '../../components/Modal/Modal'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Entrar() {
  const navegador = useNavigate();
  const authServ = AuthService();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // states para o modal
  const [mensagem, setMensagem] = useState('');
  const [titulo, setTitulo] = useState('');

  // controle de carregamento
  const [carregando, setCarregando] = useState(false)

  const entrar = async () => {
    setCarregando(true)

    const objUsuario = {
      email: email,
      senha: senha
    };

    await authServ.entrarComUsuario(objUsuario).then((resultado) => {
      if (!resultado.status) {
        let msgErro =
          resultado.erro === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
            ? "E-mail ou senha incorretos!"
            : "Ocorreu um erro inesperado. Tente novamente.";
        setMensagem(msgErro);
        setTitulo('Ops...')
        setCarregando(false)
      } else {
        setMensagem("Login efetuado com sucesso! Te redirecionando...");
        setTitulo('Sucesso!')
        setCarregando(false)
        setTimeout(() => navegador("/perfil"), 2000);
      }
    });
  };

  return (
    <main style={{ background: 'var(--verdeUm)', height: '100vh' }} className='d-flex align-items-center justify-content-center'>
      <div className="area p-4 rounded-4 shadow d-flex flex-column gap-3">
        <div className="logo-area d-flex align-items-center justify-content-center">
          <img className='img-logo' src={logo} alt="" />
        </div>

        <form className="form-area"
          onSubmit={(e) => {
            e.preventDefault();
            entrar();
          }}
        >
          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">E-mail</label>
            <input required onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Senha</label>
            <input required onChange={(e) => setSenha(e.target.value)} type="password" className="form-control input-login" />
          </div>

          <div className="bts-area d-flex align-items-end gap-4">
            <div>
              <button type='submit' className='btn-form btn-um p-1 px-5 rounded-pill text-center' disabled={carregando}>
                {
                  (carregando) ?
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <>
                      Entrar
                    </>
                }
              </button>
            </div>

            <div className='d-flex flex-column'>
              <span className='text-center span-form'>Ainda não possui cadastro?</span>
              <Link type='button' to={"/cadastrar"} className='btn-form btn-dois p-1 rounded-pill text-center'>Fazer cadastro</Link>
            </div>
          </div>
        </form>
      </div>

      {mensagem && <Modal mensagem={mensagem} setMensagem={setMensagem} tituloModal={titulo} />}
    </main>
  );
}