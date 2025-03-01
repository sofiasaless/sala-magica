import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos/Favoritos";
import Produtos from "./pages/Produtos/Produtos";

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

      </Routes>
    </BrowserRouter>
  );
}