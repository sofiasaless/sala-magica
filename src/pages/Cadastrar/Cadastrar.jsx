import './style.css'

// assets
import logo from '../../assets/material/logo1.png'

// imports
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../../firebase/authentication/AuthService'
import { AuthErrorCodes } from 'firebase/auth'

export default function Cadastrar() {

  const navegador = useNavigate()

  // instância pro serviço de autenticação
  const authServ = AuthService()

  // states para cadastrar usuario
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // cadastrando o usuário
  const cadastrar = async () => {
    // objeto usuario
    const obj = {
      nomeCompleto: nomeCompleto,
      telefone: telefone,
      email: email,
      senha: senha,
    }

    await authServ.cadastrarNovoUsuário(obj).then((resultado) => {
      console.log(resultado)
      if (!(resultado.status)) {
        let msgModal = (resultado.erro === AuthErrorCodes.EMAIL_EXISTS)?'Usuário com e-mail já cadastrado no sistema! Tente novamente com outro e-mail.'
        :'Ocorreu um erro inesperado. Tente novamente.'

        alert(msgModal)
      } else {
        alert(resultado.mensagem)
        navegador('/entrar')
      }
    })

  }

  return (
    <main style={{ background: 'var(--verdeUm)', height: '100vh' }} className='d-flex align-items-center justify-content-center'>
      <div className="area p-4 rounded-4 shadow d-flex flex-column gap-3">

        <div className="logo-area d-flex align-items-center justify-content-center">
          <img className='img-logo' src={logo} alt="" />
        </div>

        <form className="form-area" onSubmit={(e) => {
          e.preventDefault()
          cadastrar()
        }}>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Nome completo</label>
            <input required={true} onChange={(e) => setNomeCompleto(e.target.value)} type="text" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">E-mail</label>
            <input required={true} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Telefone</label>
            <input required={true} onChange={(e) => setTelefone(e.target.value)} type="text" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Senha</label>
            <input required={true} min={6} onChange={(e) => setSenha(e.target.value)} type="password" className="form-control input-login" />
          </div>

          <div className="bts-area d-flex align-items-end gap-4">
            <div>
              <button
                type='submit'
                className='btn-form btn-um p-1 px-4 rounded-pill text-center'>
                Fazer cadastro
              </button>
            </div>

            <div className='d-flex flex-column'>
              <span className='text-center span-form'>Já possui cadastro?</span>
              <Link to={"/entrar"} className='btn-form btn-dois p-1 rounded-pill text-center'>Entrar</Link>
            </div>
          </div>

        </form>
      </div>
    </main>
  )
}