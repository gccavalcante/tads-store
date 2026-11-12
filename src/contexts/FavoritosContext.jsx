/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const salvos = localStorage.getItem("favoritos");
      const parsed = salvos ? JSON.parse(salvos) : [];
      return Array.isArray(parsed) ? parsed.filter((p) => p && typeof p === "object" && p.id) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function alternarFavorito(produto) {
    if (!produto || !produto.id) return;
    setFavoritos((prev) => {
      const existe = prev.find((p) => p?.id === produto.id);
      if (existe) {
        return prev.filter((p) => p?.id !== produto.id); 
      } else {
        return [...prev, produto]; 
      }
    });
  }

  function ehFavorito(id) {
    return favoritos.some((p) => p?.id === id);
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, alternarFavorito, ehFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  return useContext(FavoritosContext);
}
