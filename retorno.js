/* BLACK FORGE — retorno do Checkout Stripe.
   Acessar esta página NÃO comprova pagamento. O script consulta o servidor
   (/api/checkout/confirmation), que só responde "paid" depois que o webhook
   da Stripe confirmou o pagamento. Apenas nesse caso o Purchase é enviado ao Pixel,
   com o valor real do pedido e o mesmo event_id usado pela API de Conversões.
   Pagamentos assíncronos (ex.: boleto) ficam como "em processamento": o Purchase
   chega pela API de Conversões quando a Stripe confirmar. */
(() => {
  'use strict';
  const API = (window.BFPromo && window.BFPromo.API) || 'https://black-forge-pagamentos.onrender.com';
  const $ = id => document.getElementById(id);
  const title = $('retornoTitulo'), text = $('retornoTexto'), state = $('retornoEstado');
  const sessionId = new URLSearchParams(location.search).get('session_id') || '';
  const ATTEMPTS = 8, INTERVAL = 3000;
  let confirmed = null;

  function show(kind, heading, message) {
    state.dataset.state = kind;
    title.textContent = heading;
    text.textContent = message;
  }

  // Envia o Purchase no máximo uma vez por pedido neste navegador.
  function sendPurchase() {
    if (!confirmed) return;
    const key = 'bf_meta_purchase_' + confirmed.event_id;
    try { if (localStorage.getItem(key)) return; } catch { /* segue: dedup também ocorre na Meta */ }
    const sent = typeof window.blackForgeMetaTrack === 'function' && window.blackForgeMetaTrack('Purchase', {
      value: confirmed.value, currency: 'BRL', content_type: 'product',
      content_ids: confirmed.content_ids, contents: confirmed.contents, num_items: confirmed.num_items
    }, { eventID: confirmed.event_id });
    if (sent) { try { localStorage.setItem(key, String(Date.now())); } catch { /* ignore */ } }
  }

  async function check(attempt) {
    try {
      const response = await fetch(API + '/api/checkout/confirmation?session_id=' + encodeURIComponent(sessionId), { cache: 'no-store' });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.status === 'paid' && typeof data.event_id === 'string' &&
          Number.isFinite(data.value) && data.value > 0 && data.currency === 'BRL') {
        confirmed = data;
        show('paid', 'Pagamento confirmado.', 'Obrigado pela compra! Você receberá as informações do pedido no e-mail informado.');
        sendPurchase();
        return;
      }
      if (['failed', 'expired'].includes(data.status)) {
        show('failed', 'Pagamento não concluído.', 'A Stripe não confirmou este pagamento. Nenhum valor foi cobrado por este pedido. Você pode voltar ao carrinho e tentar novamente.');
        return;
      }
      if (response.status === 400) {
        show('unknown', 'Não encontramos este pagamento.', 'O link de retorno está incompleto. Se você concluiu a compra, confira seu e-mail ou fale com a gente.');
        return;
      }
    } catch { /* rede instável: tenta de novo */ }
    if (attempt + 1 < ATTEMPTS) { setTimeout(() => check(attempt + 1), INTERVAL); return; }
    show('pending', 'Pagamento em processamento.', 'A confirmação ainda não chegou. Em pagamentos como boleto ou Pix isso pode levar mais tempo. Avisaremos pelo e-mail informado na compra.');
  }

  if (!/^cs_(?:test_|live_)?[A-Za-z0-9]{10,200}$/.test(sessionId)) {
    show('unknown', 'Não encontramos este pagamento.', 'Esta página só confirma pedidos vindos do checkout. Se você concluiu a compra, confira seu e-mail ou fale com a gente.');
    return;
  }
  show('checking', 'Confirmando seu pagamento…', 'Estamos aguardando a confirmação da Stripe. Isso costuma levar alguns segundos.');
  check(0);
  // Se o consentimento for dado nesta página depois da confirmação, envia o Purchase.
  document.addEventListener('bf:marketing-consent', e => { if (e.detail?.value === 'accept') setTimeout(sendPurchase, 50); });
})();
