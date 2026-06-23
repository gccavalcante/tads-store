import { createContext, useContext, useState, useEffect } from "react";

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const salvos = localStorage.getItem("favoritos");
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  function alternarFavorito(produto) {
    setFavoritos((prev) => {
      const existe = prev.find((p) => p.id === produto.id);
      if (existe) {
        return prev.filter((p) => p.id !== produto.id); 
      } else {
        return [...prev, produto]; 
      }
    });
  }

  function ehFavorito(id) {
    return favoritos.some((p) => p.id === id);
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