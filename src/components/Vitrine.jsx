import { useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard";
import { Search, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function Vitrine() {
  // 1. Iniciamos o carregando como TRUE aqui
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

  if (carregando) return <h2 className="loading-state" style={{ textAlign: "center", padding: "40px" }}>Carregando catálogo...</h2>;
  if (erro) return <h2 className="error-state" style={{ textAlign: "center", color: "var(--danger)", padding: "40px" }}>{erro}</h2>;

  const produtosFiltrados = produtos.filter((p) => {
    if (!p || !p.title) return false; 
    
    const bateComBuscaLocal = p.title.toLowerCase().includes(buscaLocal.toLowerCase());
    const bateComBuscaGlobal = p.title.toLowerCase().includes(queryGlobal.toLowerCase());
    const bateComCategoria = categoria === "" || p.category === categoria;
    
    return bateComBuscaLocal && bateComBuscaGlobal && bateComCategoria;
  });

  const categoriasUnicas = [...new Set(produtos.map((p) => p.category))];

  return (
    <div className="catalogo-container">
      <aside className="filtros-sidebar">
        <div className="filtro-cabecalho">
          <Filter size={20} />
          <h3>Filtros</h3>
        </div>

        <div className="filtro-grupo">
          <label>Buscar Produto</label>
          <div className="input-com-icone">
            <Search size={18} className="icone-busca" />
            <input
              type="text"
              placeholder="Ex: Laptop..."
              value={buscaLocal}
              onChange={(e) => setBuscaLocal(e.target.value)}
            />
          </div>
        </div>

        <div className="filtro-grupo">
          <label>Categorias</label>
          <div className="categorias-lista">
            <button 
              className={`btn-categoria ${categoria === "" ? "ativo" : ""}`}
              onClick={() => setCategoria("")}
            >
              Todas
            </button>
            {categoriasUnicas.map((cat) => (
              <button 
                key={cat} 
                className={`btn-categoria ${categoria === cat ? "ativo" : ""}`}
                onClick={() => setCategoria(cat)}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="vitrine-principal">
        <div className="vitrine-cabecalho">
          <h2>Catálogo de Produtos</h2>
          <span>{produtosFiltrados.length} produtos encontrados</span>
        </div>

        {produtosFiltrados.length === 0 ? (
          <div className="empty-state" style={{ textAlign: "center", padding: "40px", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Nenhum produto encontrado com estes filtros.</p>
            <button 
              className="btn" 
              style={{ padding: "10px 20px", backgroundColor: "var(--accent)", color: "white", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }} 
              onClick={() => { setBuscaLocal(""); setCategoria(""); }}
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="lista-produtos">
            {produtosFiltrados.map((p) => (
              <ProdutoCard key={p.id} produto={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Vitrine;