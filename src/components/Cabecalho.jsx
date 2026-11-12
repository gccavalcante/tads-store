import { useAuth } from "../contexts/AuthContext";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
    const lidarComScroll = () => setIsScrolled(window.scrollY > 8);
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

  const classeIcone = ({ isActive }) => `btn-icone${isActive ? " ativo" : ""}`;

  return (
    <header className={`cabecalho-loja ${isScrolled ? "scrolled" : ""}`}>
      <div className="cabecalho-interno">
        <Link to="/" className="logo-link" aria-label={`${titulo}, página inicial`}>
          <img src="/NexusTech-logo.jpg" alt="" className="logo-img" />
          <span className="logo-nome">{titulo}</span>
        </Link>

        <form onSubmit={fazerBuscaGlobal} className="search-bar-header" role="search">
          <label htmlFor="busca-global" className="sr-only">Buscar produtos</label>
          <input
            id="busca-global"
            type="search"
            placeholder="Buscar iPhone, Galaxy, Zenbook…"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn" aria-label="Buscar">
            <Search size={18} />
          </button>
        </form>

        <nav className="nav-icones" aria-label="Atalhos">
          <button
            type="button"
            onClick={() => setIsLightMode(!isLightMode)}
            className="btn-icone"
            aria-label={isLightMode ? "Usar tema escuro" : "Usar tema claro"}
            title={isLightMode ? "Tema escuro" : "Tema claro"}
          >
            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <NavLink to="/favoritos" className={classeIcone} aria-label="Favoritos" title="Favoritos">
            <Heart size={20} />
          </NavLink>

          <NavLink
            to="/carrinho"
            className={classeIcone}
            aria-label={`Carrinho, ${totalItens} ${totalItens === 1 ? "item" : "itens"}`}
            title="Carrinho"
          >
            <ShoppingCart size={20} />
            {totalItens > 0 && <span className="badge-carrinho" aria-hidden="true">{totalItens}</span>}
          </NavLink>

          {logado ? (
            <div className="usuario-menu">
              <NavLink to="/minha-conta" className={classeIcone} aria-label="Minha conta" title="Minha conta">
                <User size={20} />
              </NavLink>
              <button type="button" onClick={sair} className="btn-icone" aria-label="Sair" title="Sair">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={classeIcone} aria-label="Entrar" title="Entrar">
              <User size={20} />
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Cabecalho;
