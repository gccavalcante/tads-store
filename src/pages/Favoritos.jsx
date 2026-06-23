import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavoritos } from "../contexts/FavoritosContext";
import ProdutoCard from "../components/ProdutoCard";

function Favoritos() {
  // Puxa a lista real do estado global
  const { favoritos } = useFavoritos(); 

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1280px", margin: "0 auto" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
        <Heart fill="var(--danger)" color="var(--danger)" /> Meus Favoritos
      </h2>

      {favoritos.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          marginTop: "20px", 
          padding: "60px 20px", 
          border: "1px dashed #334155",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--bg-card)"
        }}>
          <Heart size={48} color="var(--text-muted)" style={{ marginBottom: "20px", opacity: 0.5 }} />
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            Você ainda não tem nenhum produto salvo.
          </p>
          <Link to="/" className="btn" style={{ 
            display: "inline-block", 
            padding: "12px 24px", 
            backgroundColor: "var(--accent)", 
            color: "white", 
            textDecoration: "none",
            borderRadius: "var(--radius-sm)"
          }}>
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="lista-produtos">
          {/* Reaproveitamos o ProdutoCard para desenhar a lista! */}
          {favoritos.map((p) => (
            <ProdutoCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;