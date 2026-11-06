/* BLACK FORGE — BLACK FRIDAY 2026. O backend /api/campaign é a autoridade.
   Sem configuração válida do servidor, NÃO divulgamos descontos automáticos. */
(() => {
  'use strict';
  const API = 'https://black-forge-pagamentos.onrender.com';
  const nodes = new Set();
  let configuration = {active:false,discount:0,startDate:null,endDate:null};
  const money = cents => (cents / 100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const cents = price => Math.round(Number(price) * 100);
  const promotionalCents = value => Math.round(value * (100 - configuration.discount) / 100);
  const active = () => configuration.active === true;
  const element = (tag, cls, content) => {const n=document.createElement(tag);n.className=cls;if(content!==undefined)n.textContent=content;return n;};

  function decorate(container, price, priceElement, options={}) {
    if (!container || !(Number(price) > 0)) return {update(){}};
    const root=element('div','bf-friday-priceblock');
    root.hidden=true;
    const badge=element('span','bf-friday-badge','BLACK FRIDAY • 30% OFF');
    const amount=element('strong','bf-friday-price','');
    const note=element('small','bf-friday-price-note','DESCONTO AUTOMÁTICO · SEM CUPOM');
    root.append(badge,amount,note);
    if(options.variable) root.append(element('small','bf-friday-variable','O preço depende do modelo selecionado.'));
    container.append(root);
    const target={root,priceElement,price};
    nodes.add(target);
    updateNode(target);
    return {update(nextPrice){target.price=nextPrice;updateNode(target)}};
  }
  function updateNode(item){
    const on=active(), base=cents(item.price);
    item.root.hidden=!on;
    if(item.priceElement){item.priceElement.classList.toggle('bf-friday-original',on);item.priceElement.textContent=money(base);}
    if(on){
      item.root.querySelector('.bf-friday-price').textContent=money(promotionalCents(base));
      item.root.querySelector('.bf-friday-badge').textContent=`BLACK FRIDAY • ${configuration.discount}% OFF`;
    }
  }
  const price = value => active() ? promotionalCents(cents(value))/100 : Number(value);
  function renderSite(){
    document.body?.classList.toggle('bf-friday-active',active());
    nodes.forEach(item=>{ if(item.root.isConnected)updateNode(item);else nodes.delete(item); });
    const freteFaq=document.getElementById('bfFreteFaq');
    if(freteFaq)freteFaq.textContent=active() ?
      'Durante a Black Friday, o desconto de 30% é automático. O frete continua sendo informado no resumo do pedido; itens com entrega incluída não geram cobrança duplicada.' :
      'Com o cupom BLACK5 você ganha frete grátis e 5% de desconto em todo o site. Sem cupom, o frete aplicável aparece no resumo do pedido antes do pagamento.';
    if (!active()) {
      document.querySelectorAll('.bf-friday-home-hero,.bf-friday-secondary,.bf-friday-promo-intro,.bf-friday-anime-ribbon').forEach(n=>n.remove());
      const announcement=document.querySelector('.bf-navbar .announcement span:nth-child(2)');
      if(announcement)announcement.textContent='5% OFF + FRETE GRÁTIS COM O CUPOM BLACK5';
      const animeLine=document.querySelector('.bf-black5-topline');
      if(animeLine && document.querySelector('.bf-site-header'))animeLine.textContent='5% OFF + FRETE GRÁTIS COM O CUPOM BLACK5';
      const kicker=document.querySelector('.promo-section-label span');
      if(kicker)kicker.textContent='01 / DESTAQUES BLACK5';
      const second=document.querySelector('.promo-section-label span:nth-child(2)');
      if(second)second.textContent='CUPOM VÁLIDO EM TODA A LOJA';
      const footer=document.querySelector('.promo-footer .footer-bottom span:nth-child(2)');
      if(footer)footer.textContent='BLACK5 · 5% OFF + FRETE GRÁTIS · CUPOM OBRIGATÓRIO';
      return;
    }
    const banner='BLACK FRIDAY | '+configuration.discount+'% OFF EM TODO O SITE';
    const announcement=document.querySelector('.bf-navbar .announcement span:nth-child(2)');
    if(announcement)announcement.textContent=banner;
    const animeLine=document.querySelector('.bf-black5-topline');
    if(animeLine)animeLine.textContent=banner;
    // Anúncio próprio nas páginas com menu alternativo.
    const animeHeader=document.querySelector('.bf-site-header');
    if(animeHeader && !document.querySelector('.bf-friday-anime-ribbon')){
      const ribbon=element('a','bf-friday-anime-ribbon',banner+' · VER PEÇAS ↗');
      ribbon.href='produtos.html';animeHeader.after(ribbon);
    }
    const promoSection=document.querySelector('.promo-collection');
    if(promoSection){
      document.title='BLACK FRIDAY 2026 | BLACK FORGE';
      const meta=document.querySelector('meta[name="description"]');
      if(meta)meta.content=`BLACK FRIDAY BLACK FORGE: ${configuration.discount}% OFF automático em todos os produtos, incluindo Anime District.`;
      const kicker=document.querySelector('.promo-section-label span');
      if(kicker)kicker.textContent='01 / SELEÇÃO BLACK FRIDAY';
      const second=document.querySelector('.promo-section-label span:nth-child(2)');
      if(second)second.textContent='DESCONTO AUTOMÁTICO EM TODA A LOJA';
      const footer=document.querySelector('.promo-footer .footer-bottom span:nth-child(2)');
      if(footer)footer.textContent=`BLACK FRIDAY · ${configuration.discount}% OFF AUTOMÁTICO`;
      if(!document.querySelector('.bf-friday-promo-intro')){
        const intro=document.createElement('section');intro.className='bf-friday-promo-intro';
        intro.innerHTML=`<span>BLACK FORGE / EDIÇÃO 2026</span><h1>BLACK<br>FRIDAY<span>.</span></h1><p>${configuration.discount}% OFF EM TODO O SITE</p><p class="bf-friday-caption">Seu estilo não entra em promoção. Os preços, sim.</p><a href="produtos.html">APROVEITAR BLACK FRIDAY ↗</a>`;
        promoSection.before(intro);
      }
    }
    const home=document.querySelector('.bf-home-launch-hero');
    if(home && !document.querySelector('.bf-friday-home-hero')){
      const hero=document.createElement('section');
      hero.className='bf-friday-home-hero';hero.setAttribute('aria-labelledby','bfFridayTitle');
      hero.innerHTML=`<div class="bf-friday-hero-copy"><p class="bf-friday-eyebrow">BLACK FORGE <span> / </span> STREETWEAR UNDERGROUND <span> / </span> EDIÇÃO 2026</p><span class="bf-friday-micro">A ÚNICA REGRA É NÃO SEGUIR REGRAS.</span><h1 id="bfFridayTitle"><span>BLACK</span><span>FRIDAY<i>.</i></span></h1><p class="bf-friday-hero-off">${configuration.discount}% OFF <small>EM TODO O SITE</small></p><p class="bf-friday-hero-copyline">Seu estilo não entra em promoção.<br>Os preços, sim.</p><a href="produtos.html" class="bf-friday-hero-cta">APROVEITAR BLACK FRIDAY <span aria-hidden="true">↗</span></a><div class="bf-friday-countdown" hidden aria-live="off"></div><div class="bf-friday-hero-baseline"><span>BF / 2026</span><span>MODA SEM PADRÕES.</span></div></div><div class="bf-friday-art" aria-hidden="true"><div class="bf-friday-art-inner"><span class="bf-friday-art-label">FORGED IN DARKNESS / 2026</span><span class="bf-friday-art-mark">BF<span>✳</span></span><strong>${configuration.discount}<sup>%</sup></strong><span class="bf-friday-art-off">OFF</span><span class="bf-friday-art-footer">EVERY PIECE. EVERY STYLE.<br>NO CODE. NO LIMITS.</span></div></div>`;
      home.before(hero);
      updateCountdown(hero.querySelector('.bf-friday-countdown'));
    }
    const oldDrop=document.querySelector('.bf-drop-banner');
    if(oldDrop && !document.querySelector('.bf-friday-secondary')){
      const aside=document.createElement('section');aside.className='bf-friday-secondary';
      aside.innerHTML=`<span>BLACK FORGE / BLACK FRIDAY</span><h2>SEM CUPOM.<br><em>SEM PADRÕES.</em></h2><p>${configuration.discount}% de desconto aplicado automaticamente no catálogo, incluindo Anime District. Frete calculado normalmente no checkout.</p><a href="produtos.html">EXPLORAR A COLEÇÃO ↗</a>`;
      oldDrop.before(aside);
    }
  }
  let countdownTimer;
  function updateCountdown(node){
    if(!node || !configuration.endDate)return; // sem data REAL, nenhum contador
    const deadline=Date.parse(configuration.endDate);
    if(!Number.isFinite(deadline))return;
    function tick(){
      const delta=Math.max(0,deadline-Date.now());
      const d=Math.floor(delta/86400000),h=Math.floor(delta/3600000)%24,m=Math.floor(delta/60000)%60,s=Math.floor(delta/1000)%60;
      node.hidden=!active() || delta===0;
      node.textContent=delta>0?`CAMPANHA TERMINA EM ${d}D ${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`:'';
      if(delta===0){clearInterval(countdownTimer);refresh();}
    }
    tick();countdownTimer=setInterval(tick,1000);
  }
  async function refresh(){
    let response;
    try {
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),10000);
      try { response=await fetch(API+'/api/campaign',{cache:'no-store',signal:controller.signal}); }
      finally {clearTimeout(timeout);}
      if(!response.ok)throw Error('Campanha não disponível');
      const data=await response.json();
      if (typeof data.active!=='boolean' || !Number.isInteger(data.discount) || data.discount<0 || data.discount>=100 ||
          data.stackable!==false || data.couponRequired!==false)throw Error('Dados da campanha inválidos');
      configuration=data;
    }catch(error){
      configuration={active:false,discount:0,startDate:null,endDate:null};
      console.warn('Black Friday: não foi possível confirmar a configuração no backend.',error.message);
    }
    if(document.readyState==='loading') await new Promise(resolve=>document.addEventListener('DOMContentLoaded',resolve,{once:true}));
    renderSite();
    document.dispatchEvent(new CustomEvent('bf:campaign-updated',{detail:{...configuration}}));
    return configuration;
  }
  const ready=refresh();
  window.BFBlackFriday=Object.freeze({ready,refresh,active,price,decorate,cents,money,
    get config(){return {...configuration}},
    previewUnitCents(originalCents){return active()?promotionalCents(originalCents):originalCents;}});
})();
