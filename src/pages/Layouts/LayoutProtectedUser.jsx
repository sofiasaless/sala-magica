import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import RotaProtegidaUser from '../RotaProtegidaUser'

export default function LayoutProtectedUser() {
  return (
    <>
      <RotaProtegidaUser>
        <Header />
        <Outlet />
      </RotaProtegidaUser>
    </>
  )
}
