import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { formatarMoeda } from "../utils/formatacao";

// Exibe o CEP como 00000-000 sem mudar o valor guardado (só números).
const mascararCep = (cep) => (cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep);

function Checkout() {
  const { carrinho, valorTotal, totalItens } = useCarrinho();

  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    numero: ""
  });
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");
  const [mensagemPedido, setMensagemPedido] = useState("");

  // Função que chama a API do ViaCEP
  const buscarCep = async (cepDigitado) => {
    // Remove tudo que não for número
    const cepLimpo = cepDigitado.replace(/\D/g, '').slice(0, 8);

    // Atualiza o estado para o input
    setEndereco({ ...endereco, cep: cepLimpo });
    setErroCep("");

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
          setErroCep("CEP não encontrado. Confira os números.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setErroCep("Não foi possível consultar o CEP agora.");
      } finally {
        setBuscandoCep(false);
      }
    }
  };

  return (
    <div>
      <h1 className="pagina-titulo">Pagamento</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <fieldset className="secao-form">
            <legend><span className="passo">1</span> Endereço de entrega</legend>

            <div className="linha-campos cep">
              <div className="campo">
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000-000"
                  value={mascararCep(endereco.cep)}
                  onChange={(e) => buscarCep(e.target.value)}
                  maxLength="9"
                  aria-describedby="cep-status"
                  aria-invalid={erroCep ? "true" : undefined}
                />
              </div>
              <span id="cep-status" className={erroCep ? "campo-erro status-cep" : "status-cep"} aria-live="polite">
                {buscandoCep ? "Buscando endereço…" : erroCep}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="logradouro">Rua</label>
              <input id="logradouro" type="text" value={endereco.logradouro} readOnly placeholder="Preenchido pelo CEP" />
            </div>

            <div className="linha-campos numero-bairro">
              <div className="campo">
                <label htmlFor="numero">Número</label>
                <input
                  id="numero"
                  type="text"
                  autoComplete="address-line2"
                  value={endereco.numero}
                  onChange={(e) => setEndereco({...endereco, numero: e.target.value})}
                />
              </div>
              <div className="campo">
                <label htmlFor="bairro">Bairro</label>
                <input id="bairro" type="text" value={endereco.bairro} readOnly placeholder="Preenchido pelo CEP" />
              </div>
            </div>

            <div className="linha-campos cidade-uf">
              <div className="campo">
                <label htmlFor="cidade">Cidade</label>
                <input id="cidade" type="text" value={endereco.cidade} readOnly placeholder="Preenchido pelo CEP" />
              </div>
              <div className="campo">
                <label htmlFor="uf">UF</label>
                <input id="uf" type="text" value={endereco.uf} readOnly />
              </div>
            </div>
          </fieldset>

          <fieldset className="secao-form">
            <legend><span className="passo">2</span> Pagamento</legend>
            <p className="aviso-pagamento">
              As formas de pagamento ainda estão em desenvolvimento neste projeto.
            </p>
            <button
              type="button"
              className="btn btn-primario"
              onClick={() => setMensagemPedido("Pagamento em desenvolvimento: o pedido ainda não é enviado.")}
            >
              Confirmar pedido
            </button>
            {mensagemPedido && <p className="mensagem-pedido" role="status">{mensagemPedido}</p>}
          </fieldset>
        </form>

        <aside className="resumo" aria-labelledby="titulo-pedido">
          <h2 id="titulo-pedido">Seu pedido ({totalItens})</h2>
          {carrinho.length === 0 ? (
            <p className="resumo-linha">
              Carrinho vazio. <Link to="/" className="btn-link">Ver catálogo</Link>
            </p>
          ) : (
            <ul className="resumo-itens">
              {carrinho.map((item) => {
                if (!item?.produto?.id) return null;
                return (
                <li key={item.produto.id} className="resumo-item">
                  <img src={item.produto.thumbnail || ""} alt="" />
                  <span className="nome">
                    {item.produto.title || "Produto"} <span className="qtd">×{item.quantidade}</span>
                  </span>
                  <span className="num">{formatarMoeda((Number(item.produto.price) || 0) * (Number(item.quantidade) || 1))}</span>
                </li>
              );})}
            </ul>
          )}
          <div className="resumo-total">
            <span>Total</span>
            <span className="num">{formatarMoeda(valorTotal)}</span>
          </div>
          <Link to="/carrinho" className="resumo-voltar">Editar carrinho</Link>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
