import BotaoFavorito from "./BotaoFavorito";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Zap } from "lucide-react";
import { useCarrinho } from "../contexts/CarrinhoContext";

function ProdutoCard({ produto }) {
  const { id, title, price, thumbnail, brand, rating, discountPercentage } = produto;
  const { adicionarAoCarrinho } = useCarrinho();
  const navegar = useNavigate();

  const precoOriginal = price / (1 - (discountPercentage / 100));
  const formatarMoeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  function comprarAgora() {
    adicionarAoCarrinho(produto);
    navegar("/checkout");
  }

  return (
    <article className="produto-card">
      <div className="card-header">
        <span className="badge-desconto">-{Math.round(discountPercentage)}%</span>
        <BotaoFavorito produto={produto} />
      </div>

      <Link to={`/produto/${id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        <div className="imagem-container">
          <img src={thumbnail} alt={title} loading="lazy" />
        </div>
        
        <div className="card-info">
          <span className="produto-marca">{brand || "Genérico"}</span>
          <h3>{title}</h3>
          
          <div className="produto-avaliacao">
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{rating.toFixed(1)}</span>
          </div>

          <div className="preco-container">
            <span className="preco-riscado">{formatarMoeda(precoOriginal)}</span>
            <p className="preco">{formatarMoeda(price)}</p>
          </div>
        </div>
      </Link>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "15px" }}>
        <button className="btn-add-cart" onClick={() => adicionarAoCarrinho(produto)} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", padding: "10px", backgroundColor: "var(--bg-dark)", color: "var(--text-main)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
          <ShoppingCart size={18} /> Adicionar
        </button>
        <button className="btn-buy-now" onClick={comprarAgora} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", padding: "10px", backgroundColor: "var(--accent)", color: "white", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", fontWeight: "bold" }}>
          <Zap size={18} /> Comprar Agora
        </button>
      </div>
    </article>
  );
}

export default ProdutoCard;