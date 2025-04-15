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
import Notificacoes from "./pages/Notificacoes/Notificacoes";
import GerenciarEncomendas from "./pages/GerenciarEncomendas/GerenciarEncomendas";
import EncomendasUsuario from "./pages/EncomendasUsuario/EncomendasUsuario";
import DetalheMinhaEncomenda from "./pages/DetalheMinhaEncomenda/DetalheMinhaEncomenda";
import DetalheEncomenda from "./pages/DetalheEncomenda/DetalheEncomenda";
import DetalheNotificacao from "./pages/DetalheNotificacao/DetalheNotificacao";
import Layout from "./pages/Layouts/Layout";
import LayoutProtectedUser from "./pages/Layouts/LayoutProtectedUser";
import LayoutProtectedAdmin from "./pages/Layouts/LayoutProtectedAdmin";

export default function Rotas() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/" element={
              <Home />
            }
          />

          <Route path="produtos"
            element={
              <Produtos />
            }
          />

          <Route path="produto/:id"
            element={
              <DetalheProduto />
            }
          />

        </Route>

        {/* rotas para usuario logado */}
        <Route element={<LayoutProtectedUser />}>
          <Route path="perfil"
            element={
              <>
                <PerfilRedirecionamento />
              </>
            }
          />

          <Route path="favoritos"
            element={
              <Favoritos />
            }
          />

          <Route path="perfil/regular"
            element={
              <PerfilRegular />
            }
          />

          <Route path="minhas-encomendas"
            element={
              <EncomendasUsuario />
            }
          />

          <Route path="detalhe-minha-encomenda"
            element={
              <DetalheMinhaEncomenda />
            }
          />

          <Route path="notificacoes"
            element={
              <Notificacoes />
            }
          />

          <Route path="detalhe-notificacao"
            element={
              <DetalheNotificacao />
            }
          />
        </Route>

        {/* rotas para usuario logado que é admin */}
        <Route element={<LayoutProtectedAdmin />}>
          <Route path="perfil/admin"
            element={
              <PerfilAdmin />
            }
          />

          <Route path="novo-produto"
            element={
              <NovoProduto />
            }
          />

          <Route path="editar-produtos"
            element={
              <ListarProdutosEditar />
            }
          />

          <Route path="editar-produto/:id"
            element={
              <EditarProduto />
            }
          />

          <Route path="visualizar-usuarios"
            element={
              <ListarUsuarios />
            }
          />

          <Route path="gerenciamento-encomendas"
            element={
              <GerenciarEncomendas />
            }
          />

          <Route path="detalhe-encomenda"
            element={
              <DetalheEncomenda />
            }
          />
        </Route>
        <Route path="entrar"
          element={
            <Entrar />
          }
        />

        <Route path="cadastrar"
          element={
            <Cadastrar />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}