/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    try {
      const salvos = localStorage.getItem("carrinho");
      const parsed = salvos ? JSON.parse(salvos) : [];
      if (!Array.isArray(parsed)) return [];

      // Normaliza itens caso venham de formato legado { id, title, price, quantidade }
      return parsed
        .map((item) => {
          if (!item) return null;
          if (item.produto && typeof item.produto === "object" && item.produto.id) {
            return {
              produto: item.produto,
              quantidade: Number(item.quantidade) > 0 ? Number(item.quantidade) : 1,
            };
          }
          if (item.id) {
            const { quantidade, ...resto } = item;
            return {
              produto: resto,
              quantidade: Number(quantidade) > 0 ? Number(quantidade) : 1,
            };
          }
          return null;
        })
        .filter(Boolean);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function adicionarAoCarrinho(produto) {
    if (!produto || !produto.id) return;
    setCarrinho((prev) => {
      const itemExiste = prev.find((item) => item?.produto?.id === produto.id);
      if (itemExiste) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { produto, quantidade: 1 }];
      }
    });
  }

  function removerDoCarrinho(id) {
    setCarrinho((prev) => prev.filter((item) => item?.produto?.id !== id));
  }

  function atualizarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) return;
    setCarrinho((prev) =>
      prev.map((item) =>
        item?.produto?.id === id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  // Cálculos úteis para a interface com blindagem contra undefined/NaN
  const totalItens = carrinho.reduce((acc, item) => acc + (Number(item?.quantidade) || 0), 0);
  const valorTotal = carrinho.reduce((acc, item) => {
    const preco = Number(item?.produto?.price) || 0;
    const qtd = Number(item?.quantidade) || 0;
    return acc + preco * qtd;
  }, 0);

  return (
    <CarrinhoContext.Provider value={{ 
      carrinho, adicionarAoCarrinho, removerDoCarrinho, 
      atualizarQuantidade, limparCarrinho, totalItens, valorTotal 
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
