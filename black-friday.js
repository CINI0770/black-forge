/* BLACK FORGE — BLACK FRIDAY 2026.
   A vitrine pode pré-exibir o preço promocional enquanto o servidor responde.
   NUNCA inicia pagamento sem validação de 30% pelo backend. */
(() => {
  'use strict';
  const API = 'https://black-forge-pagamentos.onrender.com';
  const nodes = new Set();
  // Espelho de EXIBIÇÃO da promoção ativa no backend.
  // A cobrança continua sob autoridade do backend (black-friday.json).
  // Se alterar/desativar a campanha, publique os dois lados.
  let configuration = {active:false,discount:30,startDate:null,endDate:null,
    couponRequired:false,stackable:false};
  let serverVerified = false;
  const element = (tag, cls, content) => { const node=document.createElement(tag); if(cls)node.className=cls; if(content!==undefined)node.textContent=String(content); return node; };
  const money = cents => (cents / 100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const cents = price => Math.round(Number(price) * 100);
  const promotionalCents = value => Math.round(value * (100 - configuration.discount) / 100);
  const active = () => configuration.active === true;

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
      // Nenhum banner adicional é criado por este script.
      const announcement=document.querySelector('.bf-navbar .announcement span:nth-child(2)');
      if(announcement)announcement.textContent='FEITO PARA SER DIFERENTE · MODA ALTERNATIVA';
      const animeLine=document.querySelector('.bf-black5-topline');
      if(animeLine && document.querySelector('.bf-site-header'))animeLine.textContent='ANIME DISTRICT · BLACK FORGE / MODA SEM PADRÕES';
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
    // A campanha aparece discretamente na faixa informativa e nos preços;
    // não injeta outra hero, evitando conflito com a identidade da marca.
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
      serverVerified=true;
    }catch(error){
      // Sem confirmação, não exibe uma campanha de 30% como ativa.
      // O servidor permanece responsável por validar qualquer desconto.
      serverVerified=false;
      configuration = {...configuration,active:false};
      console.warn('Black Friday: o backend ainda não confirmou os 30%. Checkout protegido.',error.message);
    }
    if(document.readyState==='loading') await new Promise(resolve=>document.addEventListener('DOMContentLoaded',resolve,{once:true}));
    renderSite();
    document.dispatchEvent(new CustomEvent('bf:campaign-updated',{detail:{...configuration}}));
    return configuration;
  }
  const ready=refresh();
  window.BFBlackFriday=Object.freeze({ready,refresh,active,price,decorate,cents,money,
    get serverVerified(){return serverVerified},
    get config(){return {...configuration}},
    previewUnitCents(originalCents){return active()?promotionalCents(originalCents):originalCents;}});
  const showPreview=()=>{
    renderSite();
    document.dispatchEvent(new CustomEvent('bf:campaign-updated',{detail:{...configuration}}));
  };
  if(document.readyState==='loading')
    document.addEventListener('DOMContentLoaded',showPreview,{once:true});
  else showPreview();
})();
