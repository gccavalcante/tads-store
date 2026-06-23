import { Link } from "react-router-dom";

function NaoEncontrado() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Página não encontrada</h1>
      <p>Ops! Parece que você se perdeu nos corredores da loja.</p>
      <br />
      <Link to="/" style={{ padding: "10px 20px", backgroundColor: "#0b6e83", color: "white", textDecoration: "none", borderRadius: "5px" }}>
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default NaoEncontrado;