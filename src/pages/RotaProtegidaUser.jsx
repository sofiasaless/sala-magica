// imports
import useAuth from '../firebase/authentication/useAuth';

// componentes
import NaoLogado from '../components/NaoLogado/NaoLogado';

export default function RotaProtegidaUser({ children }) {

  const usuario = useAuth()

  if (!usuario) {
    return <NaoLogado />
  }

  if (usuario) {
    return children
  }

}