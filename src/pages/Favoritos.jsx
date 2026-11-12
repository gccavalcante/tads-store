import { Link } from "react-router-dom";
import { useFavoritos } from "../contexts/FavoritosContext";
import ProdutoCard from "../components/ProdutoCard";

function Favoritos() {
  // Puxa a lista real do estado global
  const { favoritos } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <div className="pagina-404">
        <h1>Nenhum favorito ainda</h1>
        <p>Toque no coração de um produto para guardá-lo aqui e comparar depois.</p>
        <Link to="/" className="btn btn-primario">Ver catálogo</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="pagina-titulo">
        Favoritos
        <span className="contagem-titulo">{favoritos.length}</span>
      </h1>
      <div className="lista-produtos">
        {/* Reaproveitamos o ProdutoCard para desenhar a lista! */}
        {favoritos.map((p) => (
          <ProdutoCard key={p.id} produto={p} />
        ))}
      </div>
    </div>
  );
}

export default Favoritos;
