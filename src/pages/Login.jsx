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
    <div className="pagina-estreita">
      <h1>Entrar</h1>
      <p className="apoio">Acesso de demonstração: usuário <strong>aluno</strong>, senha <strong>1234</strong>.</p>

      <form onSubmit={aoEnviar} className="form-auth" noValidate>
        <div className="campo">
          <label htmlFor="usuario">Usuário</label>
          <input
            id="usuario"
            autoComplete="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            aria-describedby={erro ? "erro-login" : undefined}
          />
        </div>
        {erro && <p id="erro-login" className="campo-erro" role="alert">{erro}</p>}
        <button type="submit" className="btn btn-primario btn-largo">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
