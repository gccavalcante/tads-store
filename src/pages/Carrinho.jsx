import { useCarrinho } from "../contexts/CarrinhoContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";

function Carrinho() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho, valorTotal } = useCarrinho();
  const navegar = useNavigate();

  const formatarMoeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (carrinho.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <ShoppingBag size={64} color="var(--text-muted)" style={{ margin: "0 auto 20px", opacity: 0.5 }} />
        <h2>Seu carrinho está vazio.</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>Dê uma olhada nos nossos produtos e adicione os que mais gostar!</p>
        <Link to="/" className="btn" style={{ padding: "12px 24px", backgroundColor: "var(--accent)", color: "white", textDecoration: "none", borderRadius: "var(--radius-sm)" }}>
          Continuar Comprando
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
        <ShoppingBag /> Meu Carrinho
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {carrinho.map((item) => (
          <div key={item.produto.id} className="produto-card" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "20px", padding: "15px" }}>
            <img src={item.produto.thumbnail} alt={item.produto.title} style={{ width: "80px", height: "80px", objectFit: "contain", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-dark)" }} />
            
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>{item.produto.title}</h3>
              <p style={{ color: "var(--success)", fontWeight: "bold", margin: 0 }}>{formatarMoeda(item.produto.price)}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)} style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-main)", cursor: "pointer" }}>-</button>
              <span style={{ fontWeight: "bold", width: "20px", textAlign: "center" }}>{item.quantidade}</span>
              <button onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)} style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-main)", cursor: "pointer" }}>+</button>
            </div>

            <p style={{ fontWeight: "bold", width: "100px", textAlign: "right" }}>
              {formatarMoeda(item.produto.price * item.quantidade)}
            </p>

            <button onClick={() => removerDoCarrinho(item.produto.id)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer", padding: "10px" }} title="Remover Item">
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        {/* Resumo do Pedido */}
        <div className="produto-card" style={{ marginTop: "20px", padding: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <button onClick={limparCarrinho} style={{ background: "transparent", border: "1px solid var(--danger)", color: "var(--danger)", padding: "8px 16px", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
              Limpar Carrinho
            </button>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "var(--text-muted)", margin: "0 0 5px 0" }}>Total a pagar:</p>
            <h2 style={{ color: "var(--success)", margin: "0 0 15px 0", fontSize: "2rem" }}>{formatarMoeda(valorTotal)}</h2>
            <button onClick={() => navegar("/checkout")} style={{ padding: "15px 30px", fontSize: "1.1rem", fontWeight: "bold", backgroundColor: "var(--accent)", color: "white", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer" }}>
              Prosseguir para Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;