import { useFavoritos } from "../contexts/FavoritosContext";
import { Heart } from "lucide-react";

function BotaoFavorito({ produto, tamanho = 20, className = "" }) {
  const { alternarFavorito, ehFavorito } = useFavoritos();
  const favorito = ehFavorito(produto.id);
  const rotulo = favorito ? "Remover dos favoritos" : "Adicionar aos favoritos";

  return (
    <button
      type="button"
      onClick={() => alternarFavorito(produto)}
      className={`btn-favorito${favorito ? " ativo" : ""} ${className}`.trim()}
      aria-label={rotulo}
      aria-pressed={favorito}
      title={rotulo}
    >
      <Heart fill={favorito ? "currentColor" : "none"} size={tamanho} />
    </button>
  );
}

export default BotaoFavorito;
