/* BLACK FORGE — Catálogo principal, filtros e modal como o Anime District. */
(() => {
  'use strict';
  const visual=window.BFStoreVisual;
  const $=s=>document.querySelector(s);
  const grid=$('#catalogGrid'),chips=$('#categoryNav'),search=$('#catalogSearch'),sort=$('#catalogSort');
  const more=$('#catalogLoadMore'),empty=$('#catalogEmpty'),reset=$('#catalogReset');
  const dialog=$('#catalogDialog'),dialogContent=$('#catalogDialogContent');
  if(!grid||!visual)return;
  const {items,available,normal,money,el,card,sorted,productUrl}=visual;
  const published=items.filter(p=>available(p)&&p.category!=='PROMOÇÕES'&&p.collection!=='anime-district');
  const categories=[...new Set(published.map(p=>p.category))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
  const url=new URLSearchParams(location.search);
  let category=categories.includes(url.get('categoria'))?url.get('categoria'):'Todas';
  let visible=24;
  search.value=url.get('busca')||'';
  sort.value=['menor','maior','nome'].includes(url.get('ordem'))?url.get('ordem'):'recomendados';
  $('#bfProductCount').textContent=`${published.length} PEÇAS NO CATÁLOGO`;
  function syncUrl(){
    const u=new URL(location.href);
    if(category==='Todas')u.searchParams.delete('categoria');else u.searchParams.set('categoria',category);
    if(search.value.trim())u.searchParams.set('busca',search.value.trim());else u.searchParams.delete('busca');
    if(sort.value==='recomendados')u.searchParams.delete('ordem');else u.searchParams.set('ordem',sort.value);
    if(location.protocol==='http:'||location.protocol==='https:')history.replaceState(null,'',u.pathname+u.search+u.hash);
  }
  function controls(){
    chips.replaceChildren();
    for(const name of ['Todas',...categories]){
      const count=name==='Todas'?published.length:published.filter(p=>p.category===name).length;
      const b=el('button','forge-chip'+(category===name?' active':''),`${name==='Todas'?'TODOS':name} · ${count}`);
      b.type='button';b.setAttribute('aria-pressed',String(category===name));
      b.addEventListener('click',()=>{category=name;visible=24;controls();render();syncUrl();});chips.append(b);
    }
  }
  function filtered(){
    const term=normal(search.value.trim());
    let list=published.filter(p=>(category==='Todas'||p.category===category)&&(!term||[p.id,p.name,p.category,p.description].some(t=>normal(t).includes(term))));
    if(sort.value==='menor')list.sort((a,b)=>a.price-b.price||a.name.localeCompare(b.name,'pt-BR'));
    else if(sort.value==='maior')list.sort((a,b)=>b.price-a.price||a.name.localeCompare(b.name,'pt-BR'));
    else if(sort.value==='nome')list.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
    else list=sorted(list);
    return list;
  }
  function render(){
    const result=filtered(),part=result.slice(0,visible);
    grid.replaceChildren(...part.map(p=>card(p)));
    $('#catalogCurrent').textContent=category==='Todas'?'TODOS OS PRODUTOS':category;
    $('#catalogVisibleCount').textContent=`${part.length} DE ${result.length} PRODUTOS EXIBIDOS`;
    more.hidden=part.length>=result.length;empty.hidden=result.length>0;
    reset.hidden=category==='Todas'&&!search.value.trim()&&sort.value==='recomendados';
  }
  function show(p){
    dialogContent.replaceChildren();
    const shell=el('div','forge-dialog-layout');
    const gallery=el('div','forge-dialog-gallery');
    const photos=p.images.filter(Boolean);const primary=el('img','forge-dialog-main');primary.src=photos[0];primary.alt=p.name;gallery.append(primary);
    if(photos.length>1){const thumbs=el('div','forge-dialog-thumbs');photos.forEach((src,index)=>{
      const b=el('button','forge-dialog-thumb'+(index===0?' active':''));b.type='button';b.setAttribute('aria-label','Ver fotografia '+(index+1));
      const img=el('img');img.src=src;img.alt='';b.append(img);b.addEventListener('click',()=>{primary.src=src;primary.alt=p.name+' — fotografia '+(index+1);thumbs.querySelectorAll('button').forEach(el=>el.classList.toggle('active',el===b));});thumbs.append(b);
    });gallery.append(thumbs);}
    const info=el('div','forge-dialog-info');const title=el('h2','',p.name);title.id='catalogDialogTitle';
    const price=el('strong','forge-dialog-price',money(p.price));
    info.append(el('p','forge-eyebrow',p.category+' / '+p.id),title,price);
    window.BFPromo?.decorate(info,p.price);
    window.BFBlackFriday?.decorate(info,p.price,price);
    if(p.description)info.append(el('p','forge-dialog-desc',p.description));
    const names=list=>Array.isArray(list)?list.map(x=>typeof x==='object'&&x?x.name:x).filter(Boolean):[];
    for(const [field,list] of [['TAMANHOS',p.sizes],['CORES',p.colors],['MODELOS',p.variants]]){
      const vals=names(list);if(!vals.length||field==='MODELOS'&&window.BlackForgeVariants?.variantsAreColors(p))continue;
      info.append(el('p','forge-dialog-opts',field+': '+vals.join(' · ')));
    }
    info.append(el('p','forge-dialog-note','Selecione as variações disponíveis na página do produto antes de finalizar a compra.'));
    const link=el('a','forge-btn','VER PRODUTO / COMPRAR ↗');link.href=productUrl(p);info.append(link);
    shell.append(gallery,info);dialogContent.append(shell);
    if(typeof dialog.showModal==='function')dialog.showModal();else location.href=productUrl(p);
  }
  grid.addEventListener('click',e=>{const b=e.target.closest('[data-details]');if(!b)return;
    const p=published.find(x=>x.id===b.dataset.details);if(p)show(p);
  });
  $('#catalogDialogClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  search.addEventListener('input',()=>{visible=24;render();syncUrl();});
  sort.addEventListener('change',()=>{visible=24;render();syncUrl();});
  more.addEventListener('click',()=>{visible+=24;render();});
  const clear=()=>{category='Todas';search.value='';sort.value='recomendados';visible=24;controls();render();syncUrl();};
  reset.addEventListener('click',clear);$('#catalogClearEmpty').addEventListener('click',clear);
  controls();render();
})();
