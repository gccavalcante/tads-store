import { useState } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { formatarMoeda } from "../utils/formatacao";

function Carrinho() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho, valorTotal, totalItens } = useCarrinho();
  const navegar = useNavigate();
  const [confirmarLimpar, setConfirmarLimpar] = useState(false);

  if (carrinho.length === 0) {
    return (
      <div className="pagina-404">
        <h1>Seu carrinho está vazio</h1>
        <p>Os produtos que você adicionar aparecem aqui.</p>
        <Link to="/" className="btn btn-primario">Ver catálogo</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="pagina-titulo">
        Carrinho
        <span className="contagem-titulo">
          {totalItens} {totalItens === 1 ? "item" : "itens"}
        </span>
      </h1>

      <div className="carrinho-grid">
        <section aria-label="Itens do carrinho">
          <ul className="carrinho-lista">
            {carrinho.map((item) => {
              if (!item?.produto?.id) return null;
              return (
              <li key={item.produto.id} className="carrinho-item">
                <div className="carrinho-item__img">
                  <img src={item.produto.thumbnail || ""} alt="" />
                </div>

                <div className="carrinho-item__info">
                  <Link to={`/produto/${item.produto.id}`}>{item.produto.title || "Produto"}</Link>
                  <span className="unitario num">{formatarMoeda(item.produto.price)} / un.</span>
                </div>

                <div className="stepper" role="group" aria-label={`Quantidade de ${item.produto.title}`}>
                  <button
                    type="button"
                    onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)}
                    disabled={item.quantidade <= 1}
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={14} />
                  </button>
                  <output aria-live="polite">{item.quantidade}</output>
                  <button
                    type="button"
                    onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)}
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <p className="carrinho-item__subtotal num">
                  {formatarMoeda((Number(item.produto.price) || 0) * (Number(item.quantidade) || 1))}
                </p>

                <button
                  type="button"
                  className="btn-remover"
                  onClick={() => removerDoCarrinho(item.produto.id)}
                  aria-label={`Remover ${item.produto.title}`}
                  title="Remover"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            );})}
          </ul>

          <div className="carrinho-rodape-lista">
            {confirmarLimpar ? (
              <span className="confirmacao" role="alert">
                Remover todos os itens?
                <button type="button" className="btn-link perigo" onClick={limparCarrinho}>
                  Sim, esvaziar
                </button>
                <button type="button" className="btn-link" onClick={() => setConfirmarLimpar(false)}>
                  Cancelar
                </button>
              </span>
            ) : (
              <button type="button" className="btn-link perigo" onClick={() => setConfirmarLimpar(true)}>
                Esvaziar carrinho
              </button>
            )}
          </div>
        </section>

        <aside className="resumo" aria-labelledby="titulo-resumo">
          <h2 id="titulo-resumo">Resumo</h2>
          <div className="resumo-linha">
            <span>Subtotal ({totalItens} {totalItens === 1 ? "item" : "itens"})</span>
            <span className="num">{formatarMoeda(valorTotal)}</span>
          </div>
          <div className="resumo-linha">
            <span>Frete</span>
            <span>calculado no pagamento</span>
          </div>
          <div className="resumo-total">
            <span>Total</span>
            <span className="num">{formatarMoeda(valorTotal)}</span>
          </div>
          <button type="button" className="btn btn-primario btn-largo" onClick={() => navegar("/checkout")}>
            Ir para pagamento
          </button>
          <Link to="/" className="resumo-voltar">Continuar comprando</Link>
        </aside>
      </div>
    </div>
  );
}

export default Carrinho;
