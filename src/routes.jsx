import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos/Favoritos";
import Produtos from "./pages/Produtos/Produtos";
import PerfilAdmin from "./pages/PerfilAdmin/PerfilAdmin";
import PerfilRegular from "./pages/PerfilRegular/PerfilRegular";
import NovoProduto from "./pages/NovoProduto/NovoProduto";
import ListarProdutosEditar from "./pages/ListarProdutosEditar/ListarProdutosEditar";
import EditarProduto from "./pages/EditarProduto/EditarProduto";
import ListarUsuarios from "./pages/ListarUsuarios/ListarUsuarios";
import DetalheProduto from "./pages/DetalheProduto/DetalheProduto";
import Entrar from "./pages/Entrar/Entrar";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import ScrollToTop from "./components/ScrollToTop";
import RotaProtegidaUser from "./pages/RotaProtegidaUser";
import RotaProtegidaAdmin from "./pages/RotaProtegidaAdmin";
import PerfilRedirecionamento from "./pages/PerfilRedirecionamento";

export default function Rotas() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"
          element={
            <Home />
          }
        />

        <Route path="/favoritos"
          element={
            <RotaProtegidaUser>
              <Favoritos />
            </RotaProtegidaUser>
          }
        />

        <Route path="/produtos"
          element={
            <Produtos />
          }
        />

        <Route path="/perfil"
          element={
            <PerfilRedirecionamento/>         
          }
        />

        <Route path="/perfil/admin"
          element={
            <RotaProtegidaAdmin>
              <PerfilAdmin />
            </RotaProtegidaAdmin>
          }
        />

        <Route path="/perfil/regular"
          element={
            <RotaProtegidaUser>
              <PerfilRegular />
            </RotaProtegidaUser>
          }
        />

        <Route path="/novo-produto"
          element={
            <RotaProtegidaAdmin>
              <NovoProduto />
            </RotaProtegidaAdmin>
          }
        />

        <Route path="/editar-produtos"
          element={
            <RotaProtegidaAdmin>
              <ListarProdutosEditar />
            </RotaProtegidaAdmin>
          }
        />

        <Route path="/editar-produto"
          element={
            <RotaProtegidaAdmin>
              <EditarProduto />
            </RotaProtegidaAdmin>
          }
        />

        <Route path="/visualizar-usuarios"
          element={
            <RotaProtegidaAdmin>
              <ListarUsuarios />
            </RotaProtegidaAdmin>
          }
        />

        <Route path="/produto/:id"
          element={
            <DetalheProduto />
          }
        />

        <Route path="/entrar"
          element={
            <Entrar />
          }
        />

        <Route path="/cadastrar"
          element={
            <Cadastrar />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}