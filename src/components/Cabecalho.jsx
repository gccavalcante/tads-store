import { useAuth } from "../contexts/AuthContext";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, User, Sun, Moon, LogOut, Search } from "lucide-react";

function Cabecalho({ titulo }) {
  const { logado, sair } = useAuth();
  const { totalItens } = useCarrinho();
  const navegar = useNavigate();
  
  const [isLightMode, setIsLightMode] = useState(() => localStorage.getItem("tema") === "light");
  const [termoBusca, setTermoBusca] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
      localStorage.setItem("tema", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("tema", "dark");
    }
  }, [isLightMode]);

  useEffect(() => {
    const lidarComScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", lidarComScroll);
    return () => window.removeEventListener("scroll", lidarComScroll);
  }, []);

  function fazerBuscaGlobal(e) {
    e.preventDefault();
    if (termoBusca.trim() !== "") {
      navegar(`/?q=${termoBusca}`);
      setTermoBusca(""); 
    }
  }

  return (
    <header className={`cabecalho-loja ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/" className="logo-link" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img 
          src="/NexusTech-logo.jpg" 
          alt="Logo NexusTech" 
          style={{ width: "60px", height: "auto", objectFit: "contain", borderRadius: "8px" }} 
        />
        <h1 style={{ fontSize: "1.6rem", margin: 0 }}>{titulo}</h1>
      </Link>
      
      <form onSubmit={fazerBuscaGlobal} className="search-bar-header">
        <input 
          type="text" 
          placeholder="O que você está procurando?" 
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn" title="Buscar">
          <Search size={20} />
        </button>
      </form>
      
      <nav className="nav-icones">
        <button onClick={() => setIsLightMode(!isLightMode)} className="btn-icone" title="Alternar Tema">
          {isLightMode ? <Moon size={24} /> : <Sun size={24} />}
        </button>

        <Link to="/favoritos" className="btn-icone" title="Favoritos">
          <Heart size={24} />
        </Link>
        
        <Link to="/carrinho" className="btn-icone carrinho-icone" title="Carrinho">
          <ShoppingCart size={24} />
          {totalItens > 0 && <span className="badge-carrinho">{totalItens}</span>}
        </Link>

        {logado ? (
          <div className="usuario-menu">
            <Link to="/minha-conta" className="btn-icone" title="Minha Conta">
              <User size={24} />
            </Link>
            <button onClick={sair} className="btn-icone sair" title="Sair">
              <LogOut size={24} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-icone" title="Entrar">
            <User size={24} />
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Cabecalho;