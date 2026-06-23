/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Lê o localStorage ao iniciar para manter a sessão ativa se a página for recarregada [cite: 2267, 2269]
  const [logado, setLogado] = useState(
    () => localStorage.getItem("logado") === "true"
  );

  function entrar() {
    setLogado(true);
    localStorage.setItem("logado", "true");
  }

  function sair() {
    setLogado(false);
    localStorage.removeItem("logado");
  }

  return (
    <AuthContext.Provider value={{ logado, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

// Criamos esse "atalho" para facilitar o uso do contexto nos outros arquivos [cite: 2283]
export function useAuth() {
  return useContext(AuthContext);
}