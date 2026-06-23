function CursoCard({ titulo, descricao, cargaHoraria }) {
    return (
        <article className="curso-card">
            <h3>{titulo}</h3> {/* {} insere a variável na tela */}
            <p>{descricao}</p>
            <span className="carga">{cargaHoraria}h</span>
        </article>
    );
}
export default CursoCard;