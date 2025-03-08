import './style.css'

import logo from '../../assets/material/logo1.png'

// imports
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthService from '../../firebase/authentication/AuthService'
import { AuthErrorCodes } from 'firebase/auth'

export default function Entrar() {

  // navegador
  const navegador = useNavigate()

  // instância para o serviço de autenticação
  const authServ = AuthService()

  // states para fazer login
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  // entrando com o usuário
  const entrar = async () => {

    const objUsuario = {
      email: email,
      senha: senha
    }

    await authServ.entrarComUsuario(objUsuario).then((resultado) => {
      if(!resultado.status) {
        let msgErro = (resultado.erro === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)?'E-mail ou senha incorretas!':'Ocorreu um erro inesperado. Tente novamente.'
        alert(msgErro)
      } else {
        alert('Login efetuado com sucesso! Te redirecionando...')
        navegador('/perfil')
      }
    })

  }

  return (
    <main style={{ background: 'var(--verdeUm)', height: '100vh' }} className='d-flex align-items-center justify-content-center'>
      <div className="area p-4 rounded-4 shadow d-flex flex-column gap-3">

        <div className="logo-area d-flex align-items-center justify-content-center">
          <img className='img-logo' src={logo} alt="" />
        </div>

        <form className="form-area"
          onSubmit={(e) => {
            e.preventDefault()
            entrar()
          }}
        >

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">E-mail</label>
            <input required={true} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Senha</label>
            <input required={true} onChange={(e) => setSenha(e.target.value)} type="password" className="form-control input-login" />
          </div>

          <div className="bts-area d-flex align-items-end gap-4">
            <div>
              <button type='submit' className='btn-form btn-um p-1 px-5 rounded-pill text-center'>Entrar</button>
            </div>

            <div className='d-flex flex-column'>
              <span className='text-center span-form'>Ainda não possui cadastro?</span>
              <Link to={"/cadastrar"} className='btn-form btn-dois p-1 rounded-pill text-center'>Fazer cadastro</Link>
            </div>
          </div>
        </form>

      </div>
    </main>
  )
}