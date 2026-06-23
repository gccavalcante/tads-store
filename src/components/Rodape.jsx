function Rodape() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="rodape-principal">
      <div className="rodape-conteudo">
        <p>&copy; {anoAtual} Instituto Federal do Espírito Santo - Campus de Alegre.</p>
        <p>Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas</p>
      </div>
    </footer>
  );
}

export default Rodape;