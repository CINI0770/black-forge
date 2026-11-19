/* BLACK FORGE — apresentação compartilhada das vitrines (sem alterar o catálogo ou preços).
   Expõe window.BFStoreVisual, usado também pelo render_catalogo.js. */
(() => {
  'use strict';
  const items = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const collections = window.BFCollections;
  const normal = x => String(x || '').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
  const money = n => Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const available = p => p && p.active === true && !p.placeholder && Number(p.price) > 0 && Array.isArray(p.images) && p.images.some(Boolean);
  const activeCollection = p => collections ? collections.isActiveCollection(p) : p.collection !== 'anime-district';
  const featuredIds = ['BF-164','BF-165','BF-021','BF-011','BF-002','BF-013','BF-008','BF-034','BF-020','BF-033','BF-012','BF-109'];
  const priority = new Map(featuredIds.map((id,i) => [id,i]));
  const rank = p => priority.has(p.id) ? priority.get(p.id) : 10000 + Number((p.id.match(/\d+/) || [0])[0]) * -.01;
  const sorted = list => [...list].sort((a,b) => rank(a) - rank(b) || a.name.localeCompare(b.name,'pt-BR'));
  const idNumber = p => Number((String(p.id).match(/^BF-(\d+)$/) || [0,0])[1]);
  const el = (tag, cls, text) => { const n=document.createElement(tag); if(cls)n.className=cls; if(text!==undefined)n.textContent=String(text); return n; };
  const productUrl = p => 'produto.html#' + encodeURIComponent(p.id);
  const label = c => String(c || '').replace(/ E /g,' & ');

  function card(p, compact=false) {
    const photos = p.images.filter(Boolean);
    const art=el('article','forge-product'+(compact?' forge-product-compact':''));art.dataset.productId=p.id;
    const figure=el('a','forge-product-photo');figure.href=productUrl(p);figure.setAttribute('aria-label','Ver '+p.name);
    const pic=el('img','forge-product-img');pic.src=photos[0];pic.alt=p.name;pic.loading='lazy';pic.decoding='async';pic.width=480;pic.height=600;
    pic.addEventListener('error',()=>{pic.remove();figure.append(el('span','forge-image-fallback','BLACK FORGE'));},{once:true});
    figure.append(pic);
    // Segunda foto real do produto aparece ao passar o mouse (apenas se existir).
    if(photos[1] && !compact){
      const alt=el('img','forge-product-img-alt');alt.src=photos[1];alt.alt='';alt.loading='lazy';alt.decoding='async';alt.setAttribute('aria-hidden','true');
      alt.addEventListener('error',()=>alt.remove(),{once:true});
      figure.append(alt);figure.classList.add('has-alt');
    }
    art.append(figure);
    if(!compact){
      const detail=el('button','forge-product-details','ESPIAR');detail.type='button';detail.dataset.details=p.id;
      detail.setAttribute('aria-label','Ver detalhes rápidos de '+p.name);
      art.append(detail);
    }
    const info=el('div','forge-product-info');
    const group=el('p','forge-product-category',label(p.category));
    const name=el('a','forge-product-title',p.name);name.href=productUrl(p);
    const price=el('strong','forge-product-price',money(p.price));
    info.append(group,name,price);
    const variable=Array.isArray(p.variantPrices)&&p.variantPrices.length>0;
    if(variable) info.append(el('small','forge-product-from','Preço varia conforme o modelo'));
    window.BFPromo?.decorate(info,p.price,{variable});
    window.BFBlackFriday?.decorate(info,p.price,price,{variable});
    art.append(info);return art;
  }

  window.BFStoreVisual=Object.freeze({items,featuredIds,priority,sorted,rank,card,available,normal,money,el,productUrl,activeCollection,idNumber,label});

  // ---------- Home ----------
  const candidates=sorted(items.filter(p=>available(p)&&activeCollection(p)));
  const quickToProduct = grid => grid.querySelectorAll('[data-details]').forEach(button=>button.addEventListener('click',()=>{location.href='produto.html#'+encodeURIComponent(button.dataset.details)}));

  const selection=document.getElementById('featuredGrid');
  if(selection){
    if(!candidates.length){selection.replaceChildren(el('p','fx-state','Não foi possível carregar os produtos agora. Atualize a página ou fale com a gente pelo WhatsApp.'));}
    else{
      const featured=featuredIds.map(id=>candidates.find(p=>p.id===id)).filter(Boolean);
      const picked=featured.concat(candidates.filter(p=>!featured.includes(p))).slice(0,8);
      selection.replaceChildren(...picked.map(p=>card(p)));
      quickToProduct(selection);
    }
  }
  const newest=document.getElementById('newGrid');
  if(newest && candidates.length){
    const list=candidates.slice().sort((a,b)=>idNumber(b)-idNumber(a)).slice(0,10);
    newest.replaceChildren(...list.map(p=>card(p)));
    quickToProduct(newest);
  }
  const styles=document.getElementById('stylesGrid');
  if(styles && collections){
    const used=new Set();
    styles.replaceChildren(...collections.BLACK_FORGE_STYLES.map((s,i)=>{
      const list=candidates.filter(p=>collections.matches(p,s));
      const a=el(list.length?'a':'div','fx-style-tile'+(list.length?'':' is-empty'));
      if(list.length)a.href='produtos.html?estilo='+s.slug+'#catalogSections';
      // Foto: primeira peça real do estilo que ainda não foi usada em outro bloco.
      const cover=list.find(p=>!used.has(p.id))||list[0];
      if(cover){used.add(cover.id);const img=el('img');img.src=cover.images.filter(Boolean)[0];img.alt='';img.loading='lazy';img.decoding='async';a.append(img);}
      const copy=el('span','fx-style-copy');
      copy.append(el('span','fx-style-index',String(i+1).padStart(2,'0')),el('strong','',s.name),el('span','fx-style-line',s.line),
        el('span','fx-style-count',list.length?`${list.length} ${list.length===1?'PEÇA':'PEÇAS'} ↗`:'SEM PEÇAS NO MOMENTO'));
      a.append(copy);return a;
    }));
  }
})();
