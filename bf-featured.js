/* BLACK FORGE — apresentação compartilhada das vitrines (sem alterar o catálogo ou preços). */
(() => {
  'use strict';
  const items = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const normal = x => String(x || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const money = n => Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const available = p => p && p.active === true && !p.placeholder && Number(p.price) > 0 && Array.isArray(p.images) && p.images.some(Boolean);
  const featuredIds = ['BF-164','BF-165','BF-021','BF-011','BF-002','BF-013','BF-008','BF-034','BF-020','BF-033','BF-012','BF-109'];
  const priority = new Map(featuredIds.map((id,i) => [id,i]));
  const rank = p => priority.has(p.id) ? priority.get(p.id) : 10000 + Number((p.id.match(/\d+/) || [0])[0]) * -.01;
  const sorted = list => [...list].sort((a,b) => rank(a) - rank(b) || a.name.localeCompare(b.name,'pt-BR'));
  const el = (tag, cls, text) => { const n=document.createElement(tag); if(cls)n.className=cls; if(text!==undefined)n.textContent=String(text); return n; };
  const productUrl = p => 'produto.html#' + encodeURIComponent(p.id);
  function card(p, compact=false) {
    const art=el('article','forge-product'+(compact?' forge-product-compact':''));art.dataset.productId=p.id;
    const figure=el('a','forge-product-photo');figure.href=productUrl(p);figure.setAttribute('aria-label','Ver '+p.name);
    const pic=el('img');pic.src=p.images.filter(Boolean)[0];pic.alt=p.name;pic.loading='lazy';pic.decoding='async';
    pic.addEventListener('error',()=>{pic.remove();figure.append(el('span','forge-image-fallback','BLACK FORGE'));},{once:true});
    figure.append(pic);
    if(!compact)figure.append(el('span','forge-product-serial',p.id));
    const info=el('div','forge-product-info');
    const group=el('p','forge-product-category',p.category);
    const name=el('a','forge-product-title',p.name);name.href=productUrl(p);
    const price=el('strong','forge-product-price',money(p.price));
    info.append(group,name,price);
    window.BFPromo?.decorate(info,p.price,{variable:Array.isArray(p.variantPrices)&&p.variantPrices.length>0});
    window.BFBlackFriday?.decorate(info,p.price,price,{variable:Array.isArray(p.variantPrices)&&p.variantPrices.length>0});
    if(!compact){
      const buttons=el('div','forge-product-actions');
      const visit=el('a','forge-product-link','VER PRODUTO ↗');visit.href=productUrl(p);
      const detail=el('button','forge-product-details','DETALHES');detail.type='button';detail.dataset.details=p.id;
      buttons.append(visit,detail);info.append(buttons);
    }
    art.append(figure,info);return art;
  }
  window.BFStoreVisual=Object.freeze({items,featuredIds,priority,sorted,rank,card,available,normal,money,el,productUrl});
  const selection=document.getElementById('featuredGrid');
  if(selection){
    const candidates=sorted(items.filter(available));const featured=featuredIds.map(id=>candidates.find(p=>p.id===id)).filter(Boolean);
    const picked=featured.concat(candidates.filter(p=>!featured.includes(p)).slice(0,Math.max(0,12-featured.length))).slice(0,12);
    selection.replaceChildren(...picked.map(p=>card(p)));
    document.querySelectorAll('#featuredGrid [data-details]').forEach(button=>button.addEventListener('click',()=>{location.href='produto.html#'+encodeURIComponent(button.dataset.details)}));
    const cheap=document.getElementById('accessibleGrid');
    if(cheap)cheap.replaceChildren(...candidates.slice().sort((a,b)=>a.price-b.price||a.name.localeCompare(b.name,'pt-BR')).slice(0,4).map(p=>card(p,true)));
    const newest=document.getElementById('newestGrid');
    if(newest)newest.replaceChildren(...candidates.slice().sort((a,b)=>Number(b.id.slice(3))-Number(a.id.slice(3))).slice(0,4).map(p=>card(p,true)));
  }
})();
