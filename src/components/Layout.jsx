import Cabecalho from "./Cabecalho";
import Rodape from "./Rodape";

function Layout({ children }) {
  return (
    <div className="layout-app">
      <Cabecalho titulo="NexusTech" />
      
      <main className="conteudo-principal">{children}</main>
      
      <Rodape />
    </div>
  );
}

export default Layout;