/* BLACK FORGE — produtos descontinuados (Anime District, linha encerrada).
   Carregar DEPOIS de catalogo.js + anime-catalogo.js e ANTES de variacoes.js/selecao.js/carrinho.js.

   O que faz: marca os produtos da coleção encerrada como inativos (active=false).
   A lógica comercial existente já trata produto inativo:
   - produto.js não mostra o botão de compra ("PRODUTO INDISPONÍVEL");
   - variacoes.js recusa o item ("Produto indisponível."), então selecao.js não adiciona;
   - carrinho.js e pedido.js sinalizam o item e bloqueiam o pagamento até ele ser removido.
   Nada é apagado: os produtos continuam na lista para histórico, atendimento e carrinhos antigos.

   IMPORTANTE: isto protege o SITE. O servidor de pagamentos (Render) também precisa
   marcar estes produtos como inativos para recusar pedidos enviados diretamente à API. */
(() => {
  'use strict';
  const COLECOES_ENCERRADAS = ['anime-district'];
  const items = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  let total = 0;
  for (const p of items) {
    if (p && COLECOES_ENCERRADAS.includes(p.collection)) {
      p.active = false;
      p.discontinued = true;
      total++;
    }
  }
  window.BF_DISCONTINUED = Object.freeze({ collections: COLECOES_ENCERRADAS, total });

  // Página de produto: explica por que a peça não está à venda.
  function avisoProduto() {
    const area = document.getElementById('produto');
    if (!area) return;
    const id = decodeURIComponent(location.hash.slice(1)).trim().toUpperCase();
    const p = items.find(x => String(x.id).toUpperCase() === id);
    if (!p || !p.discontinued || area.querySelector('.bf-discontinued-note')) return;
    const alvo = area.querySelector('.produto-indisponivel');
    if (!alvo) return;
    alvo.textContent = 'PEÇA DESCONTINUADA';
    const nota = document.createElement('p');
    nota.className = 'bf-discontinued-note';
    nota.innerHTML = 'Esta peça fazia parte da coleção Anime District, encerrada. Ela não está mais à venda. ' +
      'Tem um pedido dessa linha? Fale com a gente pelo <a href="https://wa.me/5549991729078" rel="noopener noreferrer" target="_blank">WhatsApp</a> ' +
      'ou pelo e-mail <a href="mailto:blackforge.oficial@gmail.com">blackforge.oficial@gmail.com</a>.';
    alvo.after(nota);
    // Remove o que sugere compra: cupom/promoção, seletores de opção e vantagens.
    area.querySelectorAll('.produto-vantagens, .bf-black5-price, .bf-friday-priceblock').forEach(el => el.remove());
    area.querySelectorAll('select[data-field]').forEach(sel => (sel.closest('label') || sel).remove());
  }
  const agendar = () => setTimeout(avisoProduto, 0);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', agendar); else agendar();
  window.addEventListener('hashchange', agendar);
})();
