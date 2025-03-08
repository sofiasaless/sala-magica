// assets
import imgError from '../assets/material/paper-plane.png'

// imports
import { useNavigate } from 'react-router-dom';
import useAuth from '../firebase/authentication/useAuth';

// componentes
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileHeader from "../components/MobileHeader/MobileHeader";

export default function RotaProtegidaUser({ children }) {

  const navegador = useNavigate()

  const usuario = useAuth()

  if (!usuario) {
    return (
      <main style={{ backgroundColor: '#e8e8e8' }}>
        <Header />
        <section className="container d-flex justify-content-center align-items-center flex-column text-center" style={{ height: '90vh' }}>
          <div>
            <img style={{height: 'auto'}} src={imgError} alt="" />
          </div>
          <h2 style={{color: 'var(--vermelhoDois)'}} className='mt-4'>Ops... Você ainda não está logado!</h2>
          <h3 style={{color: 'var(--cinzaUm)'}}>Faça seu login ou cadastre-se para adicionar suas decorações favoritas e personalizar seu perfil!</h3>
          
          <div className='d-flex justify-content-around mt-3 gap-4'>
            <button onClick={() => navegador('/cadastrar')} className='btn-form btn-um p-1 px-3 rounded-pill text-center'>Fazer cadastro</button>
            <button onClick={() => navegador('/entrar')} className='btn-form btn-um p-1 px-3 rounded-pill text-center'>Entrar</button>
          </div>

        </section>

        <Footer />

        <MobileHeader />
      </main>
    )
  }

  if (usuario) {
    return children
  }

}