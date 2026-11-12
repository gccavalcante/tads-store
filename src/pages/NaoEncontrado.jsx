import { Link } from "react-router-dom";

function NaoEncontrado() {
  return (
    <div className="pagina-404">
      <span className="codigo">Erro 404</span>
      <h1>Página não encontrada</h1>
      <p>Ops! Parece que você se perdeu nos corredores da loja.</p>
      <Link to="/" className="btn btn-primario">Voltar ao catálogo</Link>
    </div>
  );
}

export default NaoEncontrado;
