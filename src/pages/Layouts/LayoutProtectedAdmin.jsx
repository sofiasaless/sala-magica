import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import RotaProtegidaUser from '../RotaProtegidaUser'
import RotaProtegidaAdmin from '../RotaProtegidaAdmin'

export default function LayoutProtectedAdmin() {
  return (
    <>
      <RotaProtegidaAdmin>
        <Header />
        <Outlet />
      </RotaProtegidaAdmin>
    </>
  )
}
