import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos/Favoritos";
import Produtos from "./pages/Produtos/Produtos";
import PerfilAdmin from "./pages/PerfilAdmin/PerfilAdmin";
import PerfilRegular from "./pages/PerfilRegular/PerfilRegular";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <Home />
          }
        />

        <Route path="/favoritos"
          element={
            <Favoritos />
          }
        />

        <Route path="/produtos"
          element={
            <Produtos />
          }
        />

        <Route path="/perfil"
          element={
            <PerfilAdmin />
          }
        />

        <Route path="/perfil/regular"
          element={
            <PerfilRegular />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}