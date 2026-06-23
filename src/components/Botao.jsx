function Botao({ texto = "Comprar", aoClicar }) {
    return (
        <button className="btn" onClick={aoClicar}>
            {texto}
        </button>
    );
}
export default Botao;
