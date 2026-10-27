/* ANIME DISTRICT — Kyoto Ink / filtros reais por tipo de produto. */
(() => {
  'use strict';
  const items = Array.isArray(window.BLACK_FORGE_ANIME_ITEMS) ? window.BLACK_FORGE_ANIME_ITEMS : [];
  const categoryMeta = [
    ['Camisetas','Tシャツ','Camisetas'],
    ['Moletons','パーカー','Moletons'],
    ['Canetas e papelaria','ペン','Canetas'],
    ['Mousepads','マウスパッド','Mousepads'],
    ['Figuras e colecionáveis','フィギュア','Figuras'],
    ['Chaveiros','キーホルダー','Chaveiros'],
    ['Joias e bijuterias','ジュエリー','Joias'],
    ['Regatas','タンクトップ','Regatas'],
    ['Bolsas e mochilas','バッグ','Bolsas'],
    ['Pantufas','スリッパ','Pantufas'],
    ['Pelúcias','ぬいぐるみ','Pelúcias'],
    ['Acessórios de cabelo','髪飾り','Acessórios de cabelo'],
    ['Porta-moedas','財布','Porta-moedas'],
    ['Vestidos','ドレス','Vestidos']
  ];
  const $ = s => document.querySelector(s);
  const root = $('#animeGrid'), empty = $('#emptyState'), count = $('#visibleCount');
  const tiles = $('#categoryTiles'), chips = $('#filterChips'), search = $('#animeSearch');
  const seriesSelect = $('#animeSeriesFilter'), sortSelect = $('#animeSort');
  const modal = $('#productDialog'), modalContent = $('#dialogContent');
  const loadMore = $('#animeLoadMore'), resetButton = $('#resetAnimeFilters');
  const currentCategory = $('#currentCategory');
  const money = value => Number(value).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const norm = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
  const node = (tag,cls,text) => {const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
  const valid = p => p && p.active === true && !p.placeholder && p.name && Number(p.price)>0 && Array.isArray(p.images) && p.images.length;
  const published = items.filter(valid);
  const categories = categoryMeta.filter(meta=>published.some(p=>p.anime_category === meta[0]));
  const meta = id => categoryMeta.find(m=>m[0] === id) || [id,'商品',id];
  const params = new URLSearchParams(location.search);
  let selected = categories.some(c=>c[0]===params.get('categoria')) ? params.get('categoria') : 'Todas';
  let pageSize=24;
  let term=params.get('busca') || '';
  search.value=term;
  $('#stockSummary').textContent=`${published.length} PRODUTOS DISPONÍVEIS`;

  function writeUrl(){
    if(location.protocol==='about:' || location.protocol==='data:') return;
    const u=new URL(location.href);
    if(selected==='Todas')u.searchParams.delete('categoria');else u.searchParams.set('categoria',selected);
    if(search.value.trim())u.searchParams.set('busca',search.value.trim());else u.searchParams.delete('busca');
    if(seriesSelect.value)u.searchParams.set('anime',seriesSelect.value);else u.searchParams.delete('anime');
    history.replaceState(null,'',u.pathname+u.search+u.hash);
  }
  function choose(name){
    selected=name;pageSize=24;renderControls();renderItems();writeUrl();
    const dest=$('#catalogo');if(dest)dest.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function renderControls(){
    tiles.replaceChildren();
    for(const [name,jp,short] of categories){
      const qty=published.filter(p=>p.anime_category===name).length;
      const btn=node('button','category-card'+(selected===name?' active':''));btn.type='button';btn.setAttribute('aria-pressed',String(selected===name));
      btn.append(node('span','category-japanese',jp),node('strong','',short.toUpperCase()),node('small','',`${qty} ${qty===1?'PRODUTO':'PRODUTOS'}`));
      btn.addEventListener('click',()=>choose(name));tiles.append(btn);
    }
    chips.replaceChildren();
    for(const name of ['Todas',...categories.map(c=>c[0])]){
      const chip=node('button','chip',name==='Todas'?'TODOS':name);chip.type='button';chip.setAttribute('aria-pressed',String(selected===name));
      chip.addEventListener('click',()=>choose(name));chips.append(chip);
    }
  }
  function initSeries(){
    const animes=[...new Set(published.map(p=>String(p.anime||'').trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'pt-BR'));
    for(const name of animes){const opt=node('option','',name);opt.value=name;seriesSelect.append(opt);}
    const initial=params.get('anime')||'';
    if(animes.includes(initial))seriesSelect.value=initial;
  }
  function linkToProduct(p,cls,txt){const a=node('a',cls,txt);a.href='produto.html#'+encodeURIComponent(p.id);return a;}
  function createCard(p){
    const card=node('article','product-card');card.dataset.productId=p.id;
    const imageBox=linkToProduct(p,'product-image');imageBox.setAttribute('aria-label','Ver '+p.name);
    const img=node('img');img.src=p.images[0];img.alt=p.name;img.loading='lazy';img.decoding='async';
    img.addEventListener('error',()=>{img.remove();imageBox.append(node('span','frame-symbol','BF / AN'));},{once:true});
    imageBox.append(img,node('span','product-badge','DISPONÍVEL'));
    const info=node('div','product-content');
    info.append(node('div','product-type',p.anime_category.toUpperCase()),linkToProduct(p,'product-name',p.name),node('div','product-price',money(p.price)));
    const actions=node('div','product-actions');actions.append(linkToProduct(p,'product-open','VER PRODUTO ↗'));
    const details=node('button','product-details','DETALHES');details.type='button';details.addEventListener('click',()=>showDetails(p));actions.append(details);
    info.append(actions);card.append(imageBox,info);return card;
  }
  function filtered(){
    const query=norm(search.value.trim());const anime=seriesSelect.value;
    const result=published.filter(p=>(selected==='Todas'||p.anime_category===selected)&&(!anime||p.anime===anime)&&
      (!query||[p.id,p.name,p.category,p.anime_category,p.anime,p.description].some(v=>norm(v).includes(query))));
    if(sortSelect.value==='menor')result.sort((a,b)=>Number(a.price)-Number(b.price));
    else if(sortSelect.value==='maior')result.sort((a,b)=>Number(b.price)-Number(a.price));
    else if(sortSelect.value==='nome')result.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
    return result;
  }
  function renderItems(){
    const results=filtered(),visible=results.slice(0,pageSize);
    root.replaceChildren(...visible.map(createCard));
    empty.hidden=results.length!==0;loadMore.hidden=pageSize>=results.length;
    const label=selected==='Todas'?'TODOS OS PRODUTOS':meta(selected)[2].toUpperCase();
    currentCategory.textContent=label;
    count.textContent=`${visible.length} DE ${results.length} PRODUTOS EXIBIDOS`;
    resetButton.hidden=(selected==='Todas'&&!search.value.trim()&&!seriesSelect.value&&sortSelect.value==='padrao');
  }
  function showDetails(p){
    modalContent.replaceChildren();
    const shell=node('div','modal-body'),gallery=node('div','modal-gallery'),image=node('img');
    image.src=p.images[0];image.alt=p.name;
    gallery.append(image);
    if(p.images.length>1){
      const thumbs=node('div','modal-thumbs');
      p.images.forEach((src,i)=>{
        const b=node('button','modal-thumb'+(i===0?' active':''));b.type='button';b.setAttribute('aria-label','Ver imagem '+(i+1));
        const thumb=node('img');thumb.src=src;thumb.alt='';b.append(thumb);
        b.addEventListener('click',()=>{image.src=src;image.alt=p.name+' — foto '+(i+1);thumbs.querySelectorAll('button').forEach(el=>el.classList.toggle('active',el===b));});thumbs.append(b);
      });gallery.append(thumbs);
    }
    const right=node('div','modal-info');
    const heading=node('h3','',p.name);heading.id='dialogTitle';
    right.append(node('div','product-type',p.anime_category.toUpperCase()),heading,node('strong','modal-price',money(p.price)),node('p','',p.description||''));
    if(Array.isArray(p.sizes)&&p.sizes.length)right.append(node('p','modal-options','TAMANHOS: '+p.sizes.join(' · ')));
    if(Array.isArray(p.colors)&&p.colors.length)right.append(node('p','modal-options','CORES: '+p.colors.join(' · ')));
    right.append(node('p','modal-notice','Frete incluso no preço. Escolha as opções na página do produto para adicionar ao carrinho.'));
    right.append(linkToProduct(p,'product-open','VER PRODUTO / COMPRAR ↗'));
    shell.append(gallery,right);modalContent.append(shell);
    if(typeof modal.showModal==='function')modal.showModal();else location.href='produto.html#'+encodeURIComponent(p.id);
  }
  search.addEventListener('input',()=>{pageSize=24;renderItems();writeUrl();});
  seriesSelect.addEventListener('change',()=>{pageSize=24;renderItems();writeUrl();});
  sortSelect.addEventListener('change',()=>{pageSize=24;renderItems();});
  loadMore.addEventListener('click',()=>{pageSize+=24;renderItems();});
  resetButton.addEventListener('click',()=>{selected='Todas';search.value='';seriesSelect.value='';sortSelect.value='padrao';pageSize=24;renderControls();renderItems();writeUrl();});
  modal.addEventListener('click',event=>{if(event.target===modal)modal.close();});
  initSeries();renderControls();renderItems();
})();
