/* BLACK FORGE — eventos padrão do Meta Pixel no navegador.
   Carregar DEPOIS de privacidade-pixel.js, catalogo.js, variacoes.js e selecao.js.

   - ViewContent: ao abrir um produto (produto.html#ID). Não dispara para peças descontinuadas.
   - AddToCart: só quando o carrinho realmente aceita o item (bf:add-to-cart não cancelado).
   - InitiateCheckout: chamado por pedido.js depois que o servidor cria a sessão da Stripe.
   - Purchase: NÃO fica aqui. É disparado por retorno.js somente com o pagamento confirmado.

   Tudo passa por window.blackForgeMetaTrack, que só envia com consentimento de publicidade.
   Nenhum dado pessoal (nome, e-mail, telefone, endereço) é enviado pelo navegador. */
(() => {
  'use strict';
  const items = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const byId = id => items.find(p => String(p.id).toUpperCase() === String(id || '').toUpperCase());
  const track = (name, params, eventID) => typeof window.blackForgeMetaTrack === 'function' &&
    window.blackForgeMetaTrack(name, params, eventID ? { eventID } : {});
  const round = n => Math.round(Number(n) * 100) / 100;
  // Preço exibido ao cliente: aplica a Black Friday somente se o servidor a confirmou.
  const shownPrice = price => {
    const bf = window.BFBlackFriday;
    return round(bf && typeof bf.price === 'function' ? bf.price(price) : price);
  };
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2));

  // ---------- ViewContent ----------
  let lastViewed = '';
  // Espera a confirmação da campanha (Black Friday) para enviar o preço exibido, no máximo 3 s.
  const campaignReady = () => Promise.race([
    Promise.resolve(window.BFBlackFriday && window.BFBlackFriday.ready).catch(() => {}),
    new Promise(r => setTimeout(r, 3000))
  ]);
  async function viewContent() {
    if (!document.getElementById('produto')) return;
    await campaignReady();
    const id = decodeURIComponent(location.hash.slice(1)).trim().toUpperCase();
    const p = byId(id);
    if (!p || p.active !== true || p.discontinued || p.placeholder || !(Number(p.price) > 0)) return;
    if (lastViewed === p.id) return;
    const sent = track('ViewContent', {
      content_ids: [p.id], content_type: 'product', content_name: p.name,
      content_category: p.category, value: shownPrice(p.price), currency: 'BRL'
    }, 'vc-' + uid());
    if (sent) lastViewed = p.id;
  }

  // ---------- AddToCart ----------
  // Este ouvinte é registrado depois do selecao.js: se o carrinho recusar, o evento chega cancelado.
  document.addEventListener('bf:add-to-cart', event => {
    if (event.defaultPrevented) return;
    const d = event.detail || {};
    const p = byId(d.id);
    if (!p) return;
    const check = window.BlackForgeVariants?.validate(p, { qty: 1, size: d.size || '', color: d.color || '', model: d.model || '' });
    if (!check || !check.valid) return;
    const price = shownPrice(check.unitPrice);
    track('AddToCart', {
      content_ids: [p.id], content_type: 'product', content_name: p.name,
      contents: [{ id: p.id, quantity: 1, item_price: price }],
      value: price, currency: 'BRL'
    }, 'atc-' + uid());
  });

  // ---------- InitiateCheckout (chamado pelo pedido.js) ----------
  // quote = resposta de /api/checkout/quote (valores calculados pelo servidor, em centavos).
  // Nunca bloqueia o pagamento: resolve em no máximo ~400 ms.
  function initiateCheckout(orderItems, quote, orderId) {
    return new Promise(resolve => {
      try {
        const list = Array.isArray(orderItems) ? orderItems : [];
        const total = quote && Number.isSafeInteger(quote.total_cents) ? quote.total_cents / 100 : null;
        if (!list.length || total === null || !orderId) return resolve(false);
        const sent = track('InitiateCheckout', {
          content_ids: [...new Set(list.map(i => i.id))], content_type: 'product',
          contents: list.map(i => ({ id: i.id, quantity: i.qty })),
          num_items: list.reduce((n, i) => n + (Number(i.qty) || 0), 0),
          value: round(total), currency: 'BRL'
        }, 'checkout-' + orderId); // mesmo event_id enviado pelo servidor (API de Conversões)
        // Pequena espera para o navegador enviar a requisição antes de ir para a Stripe.
        setTimeout(() => resolve(sent), sent ? 350 : 0);
      } catch { resolve(false); }
    });
  }

  // ---------- Consentimento e identificadores para o servidor (pedido.html) ----------
  // Antes do pedido.js ler o formulário, preenche campos ocultos. O servidor só usa
  // _fbp/_fbc e envia eventos à Meta quando bf_marketing_consent = "accept".
  const cookie = name => (document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)')) || [])[1] || '';
  function setHidden(form, name, value) {
    let input = form.querySelector(`input[type="hidden"][name="${name}"]`);
    if (!input) { input = document.createElement('input'); input.type = 'hidden'; input.name = name; form.append(input); }
    input.value = value;
  }
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form || form.id !== 'checkoutForm') return;
    const consent = typeof window.blackForgeMarketingConsent === 'function' ? window.blackForgeMarketingConsent() : null;
    const accepted = consent === 'accept';
    setHidden(form, 'bf_marketing_consent', accepted ? 'accept' : 'reject');
    setHidden(form, 'bf_fbp', accepted ? decodeURIComponent(cookie('_fbp')) : '');
    setHidden(form, 'bf_fbc', accepted ? decodeURIComponent(cookie('_fbc')) : '');
  }, true); // fase de captura: roda antes do envio tratado pelo pedido.js

  window.BFMeta = Object.freeze({ initiateCheckout });

  // Dispara ViewContent quando o consentimento já existe ou quando é dado na própria página.
  const start = () => setTimeout(viewContent, 0);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.addEventListener('hashchange', viewContent);
  document.addEventListener('bf:marketing-consent', e => { if (e.detail?.value === 'accept') setTimeout(viewContent, 50); });
})();
