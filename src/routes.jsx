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
            <RotaProtegidaUser>
              <PerfilAdmin />
            </RotaProtegidaUser>
          }
        />

        <Route path="/perfil/regular"
          element={
            <PerfilRegular />
          }
        />

        <Route path="/novo-produto"
          element={
            <NovoProduto />
          }
        />

        <Route path="/editar-produtos"
          element={
            <ListarProdutosEditar />
          }
        />

        <Route path="/editar-produto"
          element={
            <EditarProduto />
          }
        />

        <Route path="/visualizar-usuarios"
          element={
            <ListarUsuarios />
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