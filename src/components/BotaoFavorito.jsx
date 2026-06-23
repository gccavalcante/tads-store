import { useFavoritos } from "../contexts/FavoritosContext";
import { Heart } from "lucide-react";

function BotaoFavorito({ produto }) {
  const { alternarFavorito, ehFavorito } = useFavoritos();
  const favorito = ehFavorito(produto.id);

  return (
    <button 
      onClick={() => alternarFavorito(produto)}
      style={{ 
        background: "transparent", 
        border: "none", 
        cursor: "pointer",
        color: favorito ? "var(--danger)" : "var(--text-muted)",
        transition: "var(--transition)"
      }}
      title={favorito ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    >
      <Heart fill={favorito ? "var(--danger)" : "none"} size={24} />
    </button>
  );
}

export default BotaoFavorito;