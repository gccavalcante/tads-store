import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Detalhe from "./pages/Detalhe";
import Login from "./pages/Login";
import MinhaConta from "./pages/MinhaConta";
import NaoEncontrado from "./pages/NaoEncontrado";
import RotaPrivada from "./components/RotaPrivada";
import Checkout from "./pages/Checkout";
import Favoritos from "./pages/Favoritos";
import Carrinho from "./pages/Carrinho";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Detalhe />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/minha-conta" element={
          <RotaPrivada>
            <MinhaConta />
          </RotaPrivada>
        } />
        
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </Layout>
  );
}

export default App;