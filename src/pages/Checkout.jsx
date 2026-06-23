import { useState } from "react";
import { ShoppingCart, MapPin, CreditCard } from "lucide-react";

function Checkout() {
  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    numero: ""
  });
  const [buscandoCep, setBuscandoCep] = useState(false);

  // Função que chama a API do ViaCEP
  const buscarCep = async (cepDigitado) => {
    // Remove tudo que não for número
    const cepLimpo = cepDigitado.replace(/\D/g, '');
    
    // Atualiza o estado para o input
    setEndereco({ ...endereco, cep: cepLimpo });

    // Só busca na API se tiver exatamente 8 números
    if (cepLimpo.length === 8) {
      setBuscandoCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await response.json();

        if (!dados.erro) {
          // Preenche automaticamente o estado com os dados da API
          setEndereco((prev) => ({
            ...prev,
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            uf: dados.uf
          }));
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setBuscandoCep(false);
      }
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ShoppingCart /> Finalizar Compra
      </h2>

      <div className="produto-card" style={{ marginTop: "30px", textAlign: "left" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--accent)" }}>
          <MapPin /> Endereço de Entrega
        </h3>
        
        <form style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <input 
              type="text" 
              placeholder="CEP (Somente números)" 
              value={endereco.cep}
              onChange={(e) => buscarCep(e.target.value)}
              maxLength="8"
              style={{ width: "200px" }}
            />
            {buscandoCep && <span style={{ color: "var(--accent)", alignSelf: "center" }}>Buscando...</span>}
          </div>

          <input 
            type="text" 
            placeholder="Rua / Logradouro" 
            value={endereco.logradouro} 
            readOnly 
            style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          />
          
          <div style={{ display: "flex", gap: "15px" }}>
            <input 
              type="text" 
              placeholder="Número" 
              value={endereco.numero}
              onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
              style={{ width: "150px" }}
            />
            <input 
              type="text" 
              placeholder="Bairro" 
              value={endereco.bairro} 
              readOnly 
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
            />
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <input 
              type="text" 
              placeholder="Cidade" 
              value={endereco.cidade} 
              readOnly 
              style={{ flex: 2, backgroundColor: "rgba(0,0,0,0.1)" }}
            />
            <input 
              type="text" 
              placeholder="UF" 
              value={endereco.uf} 
              readOnly 
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
            />
          </div>

          <hr style={{ borderColor: "#334155", margin: "20px 0" }} />

          <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--accent)" }}>
            <CreditCard /> Pagamento
          </h3>
          <button type="button" onClick={() => alert("Função de pagamento em desenvolvimento!")}>
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;