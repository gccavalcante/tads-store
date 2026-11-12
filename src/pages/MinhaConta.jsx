import { Link } from "react-router-dom";

function MinhaConta() {
  return (
    <div className="pagina-estreita">
      <h1>Minha conta</h1>
      <p className="apoio">Você está conectado. Esta área só aparece para quem fez login.</p>
      <Link to="/favoritos" className="btn btn-secundario">Ver favoritos</Link>
    </div>
  );
}

export default MinhaConta;
