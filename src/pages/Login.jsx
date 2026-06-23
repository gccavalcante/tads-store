import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  
  const { entrar } = useAuth();
  const navegar = useNavigate();

  function aoEnviar(e) {
    e.preventDefault(); // Impede a página de recarregar [cite: 2308]
    
    // Login SIMULADO conforme a apostila: "aluno" e "1234" [cite: 2309, 2310]
    if (usuario === "aluno" && senha === "1234") {
      entrar();
      navegar("/minha-conta"); // Redireciona para a área protegida no sucesso [cite: 2312]
    } else {
      setErro("Usuário ou senha inválidos.");
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Acesso à Conta</h2>
      <form onSubmit={aoEnviar} style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "0 auto", gap: "15px" }}>
        <input 
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Usuário (dica: aluno)" 
          style={{ padding: "10px" }}
        />
        <input 
          type="password" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha (dica: 1234)" 
          style={{ padding: "10px" }}
        />
        {erro && <p style={{ color: "red", margin: 0 }}>{erro}</p>}
        <button type="submit" style={{ padding: "10px", backgroundColor: "#0b6e83", color: "white", border: "none", cursor: "pointer" }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;