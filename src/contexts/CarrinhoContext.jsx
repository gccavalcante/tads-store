/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    const salvos = localStorage.getItem("carrinho");
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function adicionarAoCarrinho(produto) {
    setCarrinho((prev) => {
      const itemExiste = prev.find((item) => item.produto.id === produto.id);
      if (itemExiste) {
        // Se já existe, aumenta a quantidade
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona com quantidade 1
        return [...prev, { produto, quantidade: 1 }];
      }
    });
  }

  function removerDoCarrinho(id) {
    setCarrinho((prev) => prev.filter((item) => item.produto.id !== id));
  }

  function atualizarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) return;
    setCarrinho((prev) =>
      prev.map((item) =>
        item.produto.id === id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  // Cálculos úteis para a interface
  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = carrinho.reduce((acc, item) => acc + (item.produto.price * item.quantidade), 0);

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