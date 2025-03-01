import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favoritos from "./pages/Favoritos/Favoritos";

export default function Rotas () {
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

      </Routes>
    </BrowserRouter>
  );
}