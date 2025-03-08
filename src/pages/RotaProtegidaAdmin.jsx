// componentes
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import NaoLogado from "../components/NaoLogado/NaoLogado";

// imports
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from '../firebase/authentication/useAuth';
import AuthService from '../firebase/authentication/AuthService';

export default function RotaProtegidaAdmin({ children }) {
  const navegador = useNavigate();
  const usuario = useAuth();
  const authServ = AuthService();
  
  const [temPermissao, setTemPermissao] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarPermissao = async () => {
      if (usuario) {
        const resultado = await authServ.verificarPermissoes(usuario.email);
        setTemPermissao(resultado);
      }
    };

    verificarPermissao();
    setCarregando(false);
  }, [usuario]);

  if (!usuario) {
    return <NaoLogado />
  }

  if (carregando) {
    return <p>Verificando permissões...</p>;
  }

  if (!temPermissao) {
    return (
      <main style={{ backgroundColor: '#e8e8e8' }}>
        <Header />
        <section className="container d-flex justify-content-center align-items-center flex-column text-center" style={{ height: '90vh' }}>
          <h2 style={{ color: 'var(--vermelhoDois)' }}>Acesso negado</h2>
          <h3 style={{ color: 'var(--cinzaUm)' }}>Você não tem permissão para acessar esta página.</h3>
          <button onClick={() => navegador('/')} className='btn-form btn-um p-1 px-3 rounded-pill text-center'>Voltar à página inicial</button>
        </section>
        <Footer />
        <MobileHeader />
      </main>
    );
  }

  return children;
}