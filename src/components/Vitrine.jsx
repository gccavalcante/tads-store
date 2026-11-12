import { useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { rotuloCategoria } from "../utils/formatacao";

function SkeletonGrade() {
  return (
    <div className="lista-produtos" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="sk-foto" />
          <div className="sk-linha curta" />
          <div className="sk-linha" />
        </div>
      ))}
    </div>
  );
}

function Vitrine() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [buscaLocal, setBuscaLocal] = useState("");
  const [categoria, setCategoria] = useState("");

  const [searchParams] = useSearchParams();
  const queryGlobal = searchParams.get("q") || "";

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/smartphones").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/laptops").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/tablets").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/mobile-accessories").then(res => res.json())
    ])
    .then((resultados) => {
      const todosOsEletronicos = resultados.flatMap(dados => dados.products || []);
      setProdutos(todosOsEletronicos);
      setErro(null);
    })
    .catch(() => {
      setErro("Não foi possível carregar os produtos.");
    })
    .finally(() => {
      setCarregando(false);
    });
  }, []);

  if (carregando) {
    return (
      <div className="catalogo-container" aria-busy="true">
        <div />
        <section>
          <div className="vitrine-cabecalho">
            <h1>Catálogo</h1>
            <span className="resultado">Carregando…</span>
          </div>
          <SkeletonGrade />
        </section>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="estado-vazio" role="alert">
        <p className="estado-erro">{erro}</p>
        <button type="button" className="btn btn-secundario" onClick={() => window.location.reload()}>
          Tentar de novo
        </button>
      </div>
    );
  }

  const produtosFiltrados = produtos.filter((p) => {
    if (!p || !p.title) return false;

    const bateComBuscaLocal = p.title.toLowerCase().includes(buscaLocal.toLowerCase());
    const bateComBuscaGlobal = p.title.toLowerCase().includes(queryGlobal.toLowerCase());
    const bateComCategoria = categoria === "" || p.category === categoria;

    return bateComBuscaLocal && bateComBuscaGlobal && bateComCategoria;
  });

  const categoriasUnicas = [...new Set(produtos.map((p) => p.category))];
  const contarCategoria = (cat) => produtos.filter((p) => p.category === cat).length;

  const tituloVitrine = categoria ? rotuloCategoria(categoria) : "Catálogo";

  return (
    <div className="catalogo-container">
      <aside className="filtros-sidebar" aria-label="Filtros">
        <div>
          <span className="filtro-rotulo" id="rotulo-categorias">Categoria</span>
          <ul className="categorias-lista" aria-labelledby="rotulo-categorias">
            <li>
              <button
                type="button"
                className={`btn-categoria ${categoria === "" ? "ativo" : ""}`}
                aria-pressed={categoria === ""}
                onClick={() => setCategoria("")}
              >
                Todas <span className="contagem">{produtos.length}</span>
              </button>
            </li>
            {categoriasUnicas.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  className={`btn-categoria ${categoria === cat ? "ativo" : ""}`}
                  aria-pressed={categoria === cat}
                  onClick={() => setCategoria(cat)}
                >
                  {rotuloCategoria(cat)} <span className="contagem">{contarCategoria(cat)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label className="filtro-rotulo" htmlFor="busca-local">Filtrar por nome</label>
          <div className="input-com-icone">
            <Search size={16} className="icone-busca" aria-hidden="true" />
            <input
              id="busca-local"
              type="text"
              className="input-base"
              placeholder="Ex.: Galaxy"
              value={buscaLocal}
              onChange={(e) => setBuscaLocal(e.target.value)}
            />
          </div>
        </div>
      </aside>

      <section className="vitrine-principal" aria-labelledby="titulo-vitrine">
        <div className="vitrine-cabecalho">
          <h1 id="titulo-vitrine">{tituloVitrine}</h1>
          <span className="resultado" aria-live="polite">
            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? "produto" : "produtos"}
          </span>
        </div>

        {queryGlobal && (
          <p className="busca-ativa">
            Resultados para “{queryGlobal}”
            <Link to="/" className="btn-link">Limpar busca</Link>
          </p>
        )}

        {produtosFiltrados.length === 0 ? (
          <div className="estado-vazio">
            <p>Nenhum produto com esses filtros.</p>
            <button
              type="button"
              className="btn btn-secundario"
              onClick={() => { setBuscaLocal(""); setCategoria(""); }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="lista-produtos">
            {produtosFiltrados.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Vitrine;
