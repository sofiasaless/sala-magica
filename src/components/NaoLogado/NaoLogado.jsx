import imgError from '../../assets/material/paper-plane.png'

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MobileHeader from "../MobileHeader/MobileHeader";
import { useNavigate } from 'react-router-dom';

export default function NaoLogado() {
  const navegador = useNavigate()
  
  return (
    <main style={{ backgroundColor: '#e8e8e8' }}>
      <Header />
      <section className="container d-flex justify-content-center align-items-center flex-column text-center" style={{ height: '90vh' }}>
        <div>
          <img style={{ height: 'auto' }} src={imgError} alt="" />
        </div>
        <h2 style={{ color: 'var(--vermelhoDois)' }} className='mt-4'>Ops... Você ainda não está logado!</h2>
        <h3 style={{ color: 'var(--cinzaUm)' }}>Faça seu login ou cadastre-se para adicionar suas decorações favoritas e personalizar seu perfil!</h3>

        <div className='d-flex justify-content-around mt-3 gap-4'>
          <button onClick={() => navegador('/cadastrar')} className='btn-form btn-um p-1 px-3 rounded-pill text-center'>Fazer cadastro</button>
          <button onClick={() => navegador('/entrar')} className='btn-form btn-um p-1 px-3 rounded-pill text-center'>Entrar</button>
        </div>

      </section>

      <Footer />

      <MobileHeader />
    </main>
  );
}