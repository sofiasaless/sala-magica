import './style.css'

import logo from '../../assets/material/logo1.png'
import { Link } from 'react-router-dom'

export default function Cadastrar() {
  return (
    <main style={{ background: 'var(--verdeUm)', height: '100vh' }} className='d-flex align-items-center justify-content-center'>
      <div className="area p-4 rounded-4 shadow d-flex flex-column gap-3">

        <div className="logo-area d-flex align-items-center justify-content-center">
          <img className='img-logo' src={logo} alt="" />
        </div>

        <form className="form-area">

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Nome completo</label>
            <input type="text" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">E-mail</label>
            <input type="email" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Telefone</label>
            <input type="text" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Senha</label>
            <input type="password" className="form-control input-login" />
          </div>

          <div className="p-0 mb-3 area-input-login">
            <label className="form-label ms-1">Repita a senha</label>
            <input type="password" className="form-control input-login" />
          </div>

        </form>

        <div className="bts-area d-flex align-items-end gap-4">
          <div>
            <button className='btn-form btn-um p-1 px-4 rounded-pill text-center'>Fazer cadastro</button>
          </div>

          <div className='d-flex flex-column'>
            <span className='text-center span-form'>Já possui cadastro?</span>
            <Link to={"/entrar"} className='btn-form btn-dois p-1 rounded-pill text-center'>Entrar</Link>
          </div>
        </div>

      </div>
    </main>
  )
}