// Helpers só de exibição. Não alteram dados: a lógica continua usando os valores originais da API.

export const formatarMoeda = (valor) => {
  const num = typeof valor === "number" && !isNaN(valor) ? valor : Number(valor) || 0;
  return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

// Slug da API (DummyJSON) → rótulo em português. O filtro continua recebendo o slug.
const ROTULOS_CATEGORIA = {
  smartphones: "Celulares",
  laptops: "Notebooks",
  tablets: "Tablets",
  "mobile-accessories": "Acessórios",
};

export const rotuloCategoria = (slug = "") =>
  ROTULOS_CATEGORIA[slug] || slug.replace(/-/g, " ");

// Desconto só vira destaque a partir deste valor; abaixo disso aparece discreto.
export const LIMIAR_DESCONTO = 10;

// Estoque considerado baixo para exibir aviso.
export const LIMIAR_ESTOQUE_BAIXO = 10;
