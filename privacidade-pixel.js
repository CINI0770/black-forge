/* BLACK FORGE | preferência de cookies e integração opcional com Meta Pixel.
   Preencha apenas META_PIXEL_ID com o ID NUMÉRICO verdadeiro do Gerenciador de Eventos.
   Sem um ID válido ou sem consentimento para publicidade, nenhuma biblioteca da Meta
   é carregada por este arquivo. Não inclua <noscript> de rastreamento nas páginas. */
(() => {
  "use strict";
  const META_PIXEL_ID = "1848258306208127"; // BLACK FORGE — Pixel configurado.
  const CHOICE_KEY = "blackforge_marketing_consent_v1";
  let preference = null;
  let pixelLoaded = false;

  function readChoice() {
    try {
      const value = localStorage.getItem(CHOICE_KEY);
      if (value === "accept") return "accept";
      if (value === "reject") return "reject";
    } catch (_error) { /* storage bloqueado: pedir escolha novamente */ }
    return null;
  }
  function saveChoice(value) {
    try { localStorage.setItem(CHOICE_KEY, value); } catch (_error) { /* sessão sem persistência */ }
  }
  function pixelIsConfigured() { return /^\d{8,20}$/.test(META_PIXEL_ID); }
  function loadMetaPixel() {
    if (pixelLoaded || preference !== "accept" || !pixelIsConfigured()) return;
    pixelLoaded = true;
    if (!window.fbq) {
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
        t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);
      }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    }
    window.fbq('consent', 'grant');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
  // Gancho único para os eventos padrão (usado por meta-eventos.js e retorno.js).
  // Só envia com consentimento e Pixel carregado. options.eventID deduplica com a API de Conversões.
  // Não enviar CPF, e-mail, telefone, endereço nem detalhes sensíveis aos eventos.
  window.blackForgeMetaTrack = function(eventName, params = {}, options = {}) {
    const allowlist = ['ViewContent','AddToCart','InitiateCheckout','Purchase'];
    if (!allowlist.includes(eventName) || preference !== 'accept' || !pixelLoaded) return false;
    if (typeof window.fbq !== 'function') return false;
    const eventID = typeof options.eventID === 'string' && options.eventID ? options.eventID.slice(0, 120) : null;
    if (eventID) window.fbq('track', eventName, params, { eventID });
    else window.fbq('track', eventName, params);
    return true;
  };
  // Estado do consentimento para outros scripts (ex.: enviar ao servidor no checkout).
  window.blackForgeMarketingConsent = () => preference;
  function showBanner() {
    let banner = document.getElementById('bf-privacy-banner');
    if (banner) { banner.hidden = false; return; }
    banner = document.createElement('aside');
    banner.id = 'bf-privacy-banner';
    banner.className = 'bf-privacy-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Preferências de privacidade');
    banner.innerHTML = `
      <p class="bf-privacy-title">SUA PRIVACIDADE IMPORTA.</p>
      <p class="bf-privacy-text">Cookies essenciais mantêm a loja funcionando. Com sua autorização, o Meta Pixel poderá medir visitas e campanhas. Você pode recusar e continuar comprando. <a href="politica-privacidade.html">Ler política de privacidade</a>.</p>
      <div class="bf-privacy-actions">
        <button type="button" data-bf-choice="reject">Rejeitar publicidade</button>
        <button type="button" data-bf-choice="accept">Aceitar publicidade</button>
      </div>`;
    document.body.appendChild(banner);
    banner.addEventListener('click', (event) => {
      const button = event.target.closest('[data-bf-choice]');
      if (!button) return;
      setChoice(button.dataset.bfChoice);
    });
  }
  function setChoice(value) {
    if (value !== 'accept' && value !== 'reject') return;
    preference = value;
    saveChoice(value);
    const banner = document.getElementById('bf-privacy-banner');
    if (banner) banner.hidden = true;
    if (value === 'accept') {
      if (pixelLoaded && typeof window.fbq === 'function') {
        window.fbq('consent', 'grant');
        window.fbq('track', 'PageView');
      } else loadMetaPixel();
    } else if (typeof window.fbq === 'function') window.fbq('consent', 'revoke');
    document.dispatchEvent(new CustomEvent('bf:marketing-consent', { detail: { value } }));
    // Se o Pixel já tiver sido carregado nesta visita, uma rejeição posterior
    // impede novos eventos via blackForgeMetaTrack. Outras integrações precisam
    // obedecer à mesma preferência separadamente.
  }
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-bf-cookie-settings]');
    if (button) showBanner();
  });
  function init() {
    preference = readChoice();
    if (preference === 'accept') loadMetaPixel();
    if (!preference) showBanner();
    document.dispatchEvent(new CustomEvent('bf:marketing-ready', { detail: { value: preference } }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
