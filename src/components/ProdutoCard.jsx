import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Check } from "lucide-react";
import BotaoFavorito from "./BotaoFavorito";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { formatarMoeda, LIMIAR_DESCONTO, LIMIAR_ESTOQUE_BAIXO } from "../utils/formatacao";

function ProdutoCard({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (!produto || !produto.id) return null;

  const { id, title = "Produto", price = 0, thumbnail = "", brand = "", rating, discountPercentage = 0, stock } = produto;

  const precoNum = Number(price) || 0;
  const descNum = Number(discountPercentage) || 0;
  const precoOriginal = descNum > 0 && descNum < 100 ? precoNum / (1 - descNum / 100) : precoNum;
  const desconto = Math.round(descNum);
  const mostrarDesconto = desconto >= LIMIAR_DESCONTO;
  const estoqueBaixo = typeof stock === "number" && stock > 0 && stock < LIMIAR_ESTOQUE_BAIXO;

  function adicionar() {
    adicionarAoCarrinho(produto);
    setAdicionado(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdicionado(false), 1200);
  }

  return (
    <article className="produto-card">
      <div className="produto-card__foto">
        <img src={thumbnail} alt="" loading="lazy" />
      </div>

      <BotaoFavorito produto={produto} className="produto-card__fav" />

      <div className="produto-card__info">
        <div className="produto-meta">
          <span>{brand || "Sem marca"}</span>
          {typeof rating === "number" && !isNaN(rating) && (
            <span className="nota" aria-label={`Nota ${rating.toFixed(1)} de 5`}>
              <Star size={12} fill="currentColor" aria-hidden="true" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        <h3 className="produto-titulo">
          <Link to={`/produto/${id}`}>{title}</Link>
        </h3>

        <div className="produto-rodape">
          <div>
            <p className="preco">{formatarMoeda(precoNum)}</p>
            {mostrarDesconto && (
              <p className="preco-antigo">
                <span className="preco-riscado">
                  <span className="sr-only">De </span>
                  {formatarMoeda(precoOriginal)}
                </span>
                <span className="desconto">−{desconto}%</span>
              </p>
            )}
          </div>

          <button
            type="button"
            className={`btn-add${adicionado ? " adicionado" : ""}`}
            onClick={adicionar}
            aria-label={adicionado ? `${title} adicionado ao carrinho` : `Adicionar ${title} ao carrinho`}
            title="Adicionar ao carrinho"
          >
            {adicionado ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>

        {estoqueBaixo && <p className="estoque-baixo">Só {stock} em estoque</p>}
      </div>
    </article>
  );
}

export default ProdutoCard;
