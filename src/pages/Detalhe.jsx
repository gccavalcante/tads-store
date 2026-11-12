import { Fragment, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Check } from "lucide-react";
import BotaoFavorito from "../components/BotaoFavorito";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { formatarMoeda, rotuloCategoria, LIMIAR_ESTOQUE_BAIXO } from "../utils/formatacao";

function Estrelas({ nota }) {
  return (
    <span className="estrelas" aria-label={`Nota ${nota} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < Math.round(nota) ? "currentColor" : "none"} aria-hidden="true" />
      ))}
    </span>
  );
}

function Detalhe() {
  // Pega o ID da URL de forma dinâmica
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [adicionado, setAdicionado] = useState(false);

  const { adicionarAoCarrinho } = useCarrinho();
  const navegar = useNavigate();

  // Busca os dados do produto específico toda vez que o ID mudar
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((dados) => {
        setProduto(dados);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <p className="disponibilidade" aria-busy="true">Carregando produto…</p>;

  if (!produto || !produto.id) {
    return (
      <div className="pagina-404">
        <h1>Produto não encontrado</h1>
        <Link to="/" className="btn btn-secundario">Voltar ao catálogo</Link>
      </div>
    );
  }

  const imagens = produto.images?.length ? produto.images : [produto.thumbnail];
  const imagemAtual = imagens.includes(imagemSelecionada) ? imagemSelecionada : imagens[0];

  const desconto = Math.round(produto.discountPercentage || 0);
  const precoOriginal = produto.price / (1 - (produto.discountPercentage || 0) / 100);
  const estoqueBaixo = produto.stock > 0 && produto.stock < LIMIAR_ESTOQUE_BAIXO;

  function adicionar() {
    adicionarAoCarrinho(produto);
    setAdicionado(true);
  }

  function comprarAgora() {
    adicionarAoCarrinho(produto);
    navegar("/checkout");
  }

  const specs = [
    ["Marca", produto.brand],
    ["Categoria", rotuloCategoria(produto.category)],
    ["Envio", produto.shippingInformation],
    ["Garantia", produto.warrantyInformation],
    ["Devolução", produto.returnPolicy],
    ["SKU", produto.sku],
  ].filter(([, valor]) => valor);

  return (
    <article>
      <nav className="migalha" aria-label="Você está em">
        <Link to="/">Catálogo</Link>
        <span aria-hidden="true">/</span>
        <span>{rotuloCategoria(produto.category)}</span>
      </nav>

      <div className="detalhe-grid">
        <div>
          <div className="galeria-principal">
            <img src={imagemAtual} alt={produto.title} />
          </div>
          {imagens.length > 1 && (
            <div className="galeria-miniaturas">
              {imagens.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`miniatura${src === imagemAtual ? " ativa" : ""}`}
                  onClick={() => setImagemSelecionada(src)}
                  aria-label={`Ver imagem ${i + 1} de ${imagens.length}`}
                  aria-pressed={src === imagemAtual}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detalhe-info">
          <div>
            <p className="produto-meta">
              <span>{produto.brand || "Sem marca"}</span>
              {typeof produto.rating === "number" && (
                <span className="nota">
                  <Estrelas nota={produto.rating} /> {produto.rating.toFixed(1)}
                  {produto.reviews?.length ? ` · ${produto.reviews.length} avaliações` : ""}
                </span>
              )}
            </p>
            <h1>{produto.title}</h1>
          </div>

          <div className="detalhe-preco">
            <p className="preco">{formatarMoeda(produto.price)}</p>
            {desconto > 0 && (
              <p className="preco-antigo">
                <span className="preco-riscado">
                  <span className="sr-only">De </span>
                  {formatarMoeda(precoOriginal)}
                </span>
                <span className="desconto">−{desconto}%</span>
              </p>
            )}
          </div>

          {typeof produto.stock === "number" && (
            <p className={`disponibilidade${estoqueBaixo ? " baixo" : ""}`}>
              {produto.stock === 0
                ? "Esgotado"
                : estoqueBaixo
                  ? `Últimas ${produto.stock} unidades`
                  : `Em estoque · ${produto.stock} unidades`}
            </p>
          )}

          <div className="detalhe-acoes">
            <button
              type="button"
              className="btn btn-primario btn-largo"
              onClick={adicionar}
              disabled={produto.stock === 0}
            >
              {adicionado ? <Check size={18} /> : <ShoppingCart size={18} />}
              {adicionado ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
            </button>
            <div className="detalhe-acoes-sec">
              <button
                type="button"
                className="btn btn-secundario"
                onClick={comprarAgora}
                disabled={produto.stock === 0}
              >
                Comprar agora
              </button>
              <BotaoFavorito produto={produto} tamanho={22} />
            </div>
            {adicionado && (
              <p className="disponibilidade" role="status">
                <Link to="/carrinho" className="btn-link">Ver carrinho</Link>
              </p>
            )}
          </div>

          {specs.length > 0 && (
            <dl className="detalhe-specs">
              {specs.map(([rotulo, valor]) => (
                <Fragment key={rotulo}>
                  <dt>{rotulo}</dt>
                  <dd>{valor}</dd>
                </Fragment>
              ))}
            </dl>
          )}
        </div>
      </div>

      <section className="detalhe-secao" aria-labelledby="titulo-descricao">
        <h2 id="titulo-descricao">Descrição</h2>
        <p>{produto.description}</p>
      </section>

      {produto.reviews?.length > 0 && (
        <section className="detalhe-secao" aria-labelledby="titulo-avaliacoes">
          <h2 id="titulo-avaliacoes">Avaliações</h2>
          <ul className="avaliacoes">
            {produto.reviews.map((r, i) => (
              <li key={`${r.reviewerEmail}-${i}`} className="avaliacao">
                <div className="avaliacao-topo">
                  <strong>{r.reviewerName}</strong>
                  <Estrelas nota={r.rating} />
                  <span className="data">
                    {new Date(r.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p>{r.comment}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

export default Detalhe;
