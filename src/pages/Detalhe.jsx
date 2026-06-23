import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Detalhe() {
  // Pega o ID da URL de forma dinâmica
  const { id } = useParams();
  
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Busca os dados do produto específico toda vez que o ID mudar
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((dados) => {
        setProduto(dados);
        setCarregando(false);
      });
  }, [id]);

  if (carregando) return <h2 style={{ textAlign: "center" }}>Carregando detalhes...</h2>;

  return (
    <article className="detalhe-produto" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
      {/* O Link substitui a tag <a> para não recarregar a página */}
      <Link to="/" style={{ textDecoration: "none", color: "#0b6e83", fontWeight: "bold" }}>
        ← Voltar para a vitrine
      </Link>
      
      <h1 style={{ marginTop: "20px" }}>{produto.title}</h1>
      <img src={produto.thumbnail} alt={produto.title} style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }} />
      
      <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>{produto.description}</p>
      
      <p className="preco" style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f7a30" }}>
        {produto.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
      
      <p><strong>Marca:</strong> {produto.brand || "Não especificada"}</p>
      <p><strong>Categoria:</strong> {produto.category}</p>
    </article>
  );
}

export default Detalhe;