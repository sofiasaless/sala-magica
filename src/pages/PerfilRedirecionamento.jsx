import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../firebase/authentication/useAuth";
import AuthService from "../firebase/authentication/AuthService";
import NaoLogado from "../components/NaoLogado/NaoLogado";

export default function PerfilRedirecionamento() {
  const navigate = useNavigate();
  const usuario = useAuth();
  const authServ = AuthService();

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarPermissao = async () => {
      if (usuario) {
        const resultado = await authServ.verificarPermissoes(usuario.email);
        if (resultado) {
          navigate('/perfil/admin', { replace: true });
        } else {
          navigate('/perfil/regular', { replace: true });
        }
      }
      setCarregando(false);
    };

    verificarPermissao();
  }, [usuario, navigate, authServ]);

  if (carregando) {
    return <p>Verificando permissões...</p>;
  }

  if (!usuario) {
    return <NaoLogado />
  }

  return null;
}