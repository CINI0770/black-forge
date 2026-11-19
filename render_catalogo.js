/* BLACK FORGE — Catálogo principal: estilos, tipos de peça, busca, ordenação e detalhes rápidos.
   Só exibe produtos reais e ativos do catalogo.js. Anime District não aparece (linha encerrada).
   Parâmetros de URL aceitos: ?estilo=gothic  ?categoria=COLARES  ?busca=texto  ?ordem=menor */
(() => {
  'use strict';
  const visual=window.BFStoreVisual;
  const C=window.BFCollections;
  const $=s=>document.querySelector(s);
  const grid=$('#catalogGrid'),chips=$('#categoryNav'),styleNav=$('#styleNav'),balckerNav=$('#balckerNav'),search=$('#catalogSearch'),sort=$('#catalogSort');
  const more=$('#catalogLoadMore'),empty=$('#catalogEmpty'),reset=$('#catalogReset');
  const dialog=$('#catalogDialog'),dialogContent=$('#catalogDialogContent');
  if(!grid)return;
  if(!visual||!C){grid.replaceChildren(Object.assign(document.createElement('p'),{className:'fx-state',textContent:'Não foi possível carregar o catálogo agora. Atualize a página ou fale com a gente pelo WhatsApp (49) 99172-9078.'}));return;}
  const {items,available,normal,money,el,card,sorted,productUrl,idNumber,label}=visual;
  const PAGE=24;
  const published=items.filter(p=>available(p)&&C.isActiveCollection(p));
  if(!published.length){grid.replaceChildren(el('p','fx-state','Não foi possível carregar o catálogo agora. Atualize a página ou fale com a gente pelo WhatsApp (49) 99172-9078.'));return;}
  const categoryOrder=['CAMISETAS E CAMISAS','MOLETONS E CASACOS','CALÇAS E SAIAS','VESTIDOS','CALÇADOS','COLARES','ANÉIS E PULSEIRAS','CINTOS E ACESSÓRIOS','CINTOS','ACESSÓRIOS'];
  const categories=[...new Set(published.map(p=>p.category))].sort((a,b)=>{
    const ia=categoryOrder.indexOf(a),ib=categoryOrder.indexOf(b);
    return (ia<0?100:ia)-(ib<0?100:ib)||a.localeCompare(b,'pt-BR');
  });
  const styleCount=new Map(C.BLACK_FORGE_STYLES.map(s=>[s.slug,published.filter(p=>C.matches(p,s)).length]));

  const url=new URLSearchParams(location.search);
  let category=categories.includes(url.get('categoria'))?url.get('categoria'):'Todas';
  let style=C.styleOf(url.get('estilo'))&&styleCount.get(url.get('estilo'))?url.get('estilo'):'';
  let visible=PAGE;
  search.value=url.get('busca')||'';
  sort.value=['menor','maior','nome','novos'].includes(url.get('ordem'))?url.get('ordem'):'recomendados';
  $('#bfProductCount').textContent=`${published.length} PEÇAS NO CATÁLOGO`;

  function syncUrl(){
    const u=new URL(location.href);
    const set=(k,v)=>v?u.searchParams.set(k,v):u.searchParams.delete(k);
    set('estilo',style);set('categoria',category==='Todas'?'':category);
    set('busca',search.value.trim());set('ordem',sort.value==='recomendados'?'':sort.value);
    if(location.protocol==='http:'||location.protocol==='https:')history.replaceState(null,'',u.pathname+u.search+u.hash);
  }
  const chip=(text,count,active,onClick)=>{
    const b=el('button','forge-chip'+(active?' active':''),text);b.type='button';b.setAttribute('aria-pressed',String(active));
    if(count!==undefined)b.append(el('span','fx-chip-count',String(count)));
    if(onClick)b.addEventListener('click',onClick);else b.disabled=true;
    return b;
  };
  function controls(){
    styleNav.replaceChildren(chip('TODOS',published.length,!style,()=>{style='';update();}),
      ...C.BLACK_FORGE_STYLES.map(s=>{const n=styleCount.get(s.slug);
        // Estilo sem produtos: aparece desativado, sem itens fictícios.
        const b=chip(s.name.toUpperCase(),n,style===s.slug,n?()=>{style=s.slug;update();}:null);
        if(!n)b.title='Sem peças neste estilo no momento';return b;}));
    chips.replaceChildren(chip('TODOS',undefined,category==='Todas',()=>{category='Todas';update();}),
      ...categories.map(name=>chip(label(name),published.filter(p=>p.category===name).length,category===name,()=>{category=name;update();})));
    if(balckerNav&&!balckerNav.childElementCount){
      balckerNav.replaceChildren(...C.BALCKER_LINES.map(line=>{const a=el('a','fx-chip-soon',line.toUpperCase());a.href='balcker.html';a.append(el('small','','EM BREVE'));return a;}));
    }
  }
  function update(){visible=PAGE;controls();render();syncUrl();}
  function filtered(){
    const term=normal(search.value.trim());
    const st=C.styleOf(style);
    let list=published.filter(p=>(category==='Todas'||p.category===category)&&(!st||C.matches(p,st))&&(!term||[p.id,p.name,p.category,p.description].some(t=>normal(t).includes(term))));
    if(sort.value==='menor')list.sort((a,b)=>a.price-b.price||a.name.localeCompare(b.name,'pt-BR'));
    else if(sort.value==='maior')list.sort((a,b)=>b.price-a.price||a.name.localeCompare(b.name,'pt-BR'));
    else if(sort.value==='nome')list.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
    else if(sort.value==='novos')list.sort((a,b)=>idNumber(b)-idNumber(a));
    else list=sorted(list);
    return list;
  }
  function render(){
    const result=filtered(),part=result.slice(0,visible);
    grid.replaceChildren(...part.map(p=>card(p)));
    const st=C.styleOf(style);
    const parts=[st?st.name:'',category!=='Todas'?label(category):''].filter(Boolean);
    $('#catalogCurrent').textContent=parts.length?parts.join(' · '):'TODO O CATÁLOGO';
    $('#catalogVisibleCount').textContent=result.length?`${part.length} DE ${result.length} PEÇAS`:'';
    more.hidden=part.length>=result.length;empty.hidden=result.length>0;
    reset.hidden=category==='Todas'&&!style&&!search.value.trim()&&sort.value==='recomendados';
  }
  function show(p){
    dialogContent.replaceChildren();
    const shell=el('div','forge-dialog-layout');
    const gallery=el('div','forge-dialog-gallery');
    const photos=p.images.filter(Boolean);const primary=el('img','forge-dialog-main');primary.src=photos[0];primary.alt=p.name;gallery.append(primary);
    if(photos.length>1){const thumbs=el('div','forge-dialog-thumbs');photos.forEach((src,index)=>{
      const b=el('button','forge-dialog-thumb'+(index===0?' active':''));b.type='button';b.setAttribute('aria-label','Ver fotografia '+(index+1));
      const img=el('img');img.src=src;img.alt='';img.loading='lazy';b.append(img);b.addEventListener('click',()=>{primary.src=src;primary.alt=p.name+' — fotografia '+(index+1);thumbs.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));});thumbs.append(b);
    });gallery.append(thumbs);}
    const info=el('div','forge-dialog-info');const title=el('h2','',p.name);title.id='catalogDialogTitle';
    const price=el('strong','forge-dialog-price',money(p.price));
    info.append(el('p','forge-eyebrow',label(p.category)+' / '+p.id),title,price);
    window.BFPromo?.decorate(info,p.price);
    window.BFBlackFriday?.decorate(info,p.price,price);
    if(p.description)info.append(el('p','forge-dialog-desc',p.description));
    const names=list=>Array.isArray(list)?list.map(x=>typeof x==='object'&&x?x.name:x).filter(Boolean):[];
    for(const [field,list] of [['TAMANHOS',p.sizes],['CORES',p.colors],['MODELOS',p.variants]]){
      const vals=names(list);if(!vals.length||field==='MODELOS'&&window.BlackForgeVariants?.variantsAreColors(p))continue;
      info.append(el('p','forge-dialog-opts',field+': '+vals.join(' · ')));
    }
    info.append(el('p','forge-dialog-note','Selecione as variações disponíveis na página do produto antes de adicionar ao carrinho.'));
    const link=el('a','forge-btn','VER PRODUTO E COMPRAR →');link.href=productUrl(p);info.append(link);
    shell.append(gallery,info);dialogContent.append(shell);
    if(typeof dialog.showModal==='function'){dialog.showModal();$('#catalogDialogClose').focus();}else location.href=productUrl(p);
  }
  grid.addEventListener('click',e=>{const b=e.target.closest('[data-details]');if(!b)return;
    const p=published.find(x=>x.id===b.dataset.details);if(p)show(p);
  });
  $('#catalogDialogClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  let typing;
  search.addEventListener('input',()=>{clearTimeout(typing);typing=setTimeout(()=>{visible=PAGE;render();syncUrl();},120);});
  sort.addEventListener('change',()=>{visible=PAGE;render();syncUrl();});
  more.addEventListener('click',()=>{const before=visible;visible+=PAGE;render();grid.children[before]?.querySelector('a')?.focus({preventScroll:true});});
  const clear=()=>{category='Todas';style='';search.value='';sort.value='recomendados';update();};
  reset.addEventListener('click',clear);$('#catalogClearEmpty').addEventListener('click',clear);
  controls();render();
  // Chegou por um link de estilo (#catalogSections ou #estilos): leva aos produtos.
  if(style&&location.hash) $('#catalogSections')?.scrollIntoView({block:'start'});
})();
