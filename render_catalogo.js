"use strict";
const catalogItems=window.BLACK_FORGE_ITEMS||[];
const root=document.getElementById("catalogSections");

// Vitrine BLACK FORGE: sete seções, sem alterar o cadastro original.
const ordemCategorias = [
  "COLARES",
  "ANÉIS E PULSEIRAS",
  "CINTOS E ACESSÓRIOS",
  "CAMISETAS E CAMISAS",
  "MOLETONS E CASACOS",
  "CALÇAS E SAIAS",
  "CALÇADOS"
];

// As categorias já estão definidas no catalogo.js.
const gruposProdutos = Object.fromEntries(ordemCategorias.map(c => [c, []]));
const numeroBF = p => Number((String(p.id || "").match(/\d+/) || [Infinity])[0]);
for (const p of catalogItems) {
  if (!p || p.active === false || p.placeholder || !(Number(p.price) > 0)) continue;
  if (gruposProdutos[p.category]) gruposProdutos[p.category].push(p);
}
for (const lista of Object.values(gruposProdutos)) {
  lista.sort((a, b) => numeroBF(a) - numeroBF(b) || String(a.id).localeCompare(String(b.id)));
}
const groups = ordemCategorias.filter(c => gruposProdutos[c].length);

const money=n=>Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function el(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;}
for(const category of groups){
 const items=gruposProdutos[category];
 const section=el("section","category-section");section.id="categoria-"+groups.indexOf(category);
 const head=el("div","category-head"), heading=el("div");heading.append(el("p","eyebrow","CATÁLOGO / "+items.length+" PRODUTOS"),el("h2","",category));head.append(heading,el("span","",items.length+" PRODUTOS"));section.append(head);
 const grid=el("div","slot-grid");
 for(const [i,p] of items.entries()){
  const active=p.active!==false&&!p.placeholder&&Number(p.price)>0;
  const card=el("article","slot-card");card.dataset.productId=p.id;
  const art=el("div","slot-art");
  const photoList=(Array.isArray(p.images)?p.images:[]).filter(Boolean);
  if(!photoList.length&&p.image)photoList.push(p.image);
  if(photoList.length){
   const img=el("img","bf-product-image");let current=0;
   const show=()=>{img.src=photoList[current];img.alt=(p.name||p.id)+" — foto "+(current+1);};
   img.loading="lazy";img.onerror=()=>{img.style.display="none";if(!art.querySelector(".slot-icon"))art.append(el("span","slot-icon","SEM FOTO"))};
   img.onload=()=>{img.style.display=""};show();art.append(img);
   if(photoList.length>1){
    const controls=el("div","bf-gallery-controls");
    const prev=el("button","","‹"),next=el("button","","›");
    prev.type=next.type="button";
    prev.setAttribute("aria-label","Foto anterior");next.setAttribute("aria-label","Próxima foto");
    prev.addEventListener("click",()=>{current=(current-1+photoList.length)%photoList.length;show()});
    next.addEventListener("click",()=>{current=(current+1)%photoList.length;show()});
    controls.append(prev,next);art.append(controls);
   }
  }else art.append(el("span","slot-icon","＋"));
  art.append(el("span","slot-index",String(i+1).padStart(2,"0")+" / "+items.length));
  const info=el("div","slot-info");info.append(el("p","",category),el("h3","",p.name||"PRODUTO "+p.id+" — NÃO CADASTRADO"));
  if(p.description)info.append(el("p","bf-description",p.description));
  if(Number(p.price)>0)info.append(el("strong","bf-price",money(p.price)));
  else info.append(el("span","",p.placeholder?"ESPAÇO RESERVADO":"PREÇO A DEFINIR"));
  if(active){const btn=el("button","slot-choose","ADICIONAR AO CARRINHO +");btn.type="button";if([p.sizes,p.colors,p.variants].some(a=>Array.isArray(a)&&a.length)){btn.addEventListener("click",()=>openDetails(p));btn.textContent="ESCOLHER OPÇÕES +";}else btn.dataset.select=p.id;info.append(btn)}
  else info.append(el("span","bf-reserved","INDISPONÍVEL ATÉ CADASTRAR PREÇO"));
  const detail=el("button","bf-open-details","VER DETALHES ↗");
  detail.type="button";detail.addEventListener("click",()=>openDetails(p));
  art.addEventListener("click",e=>{if(!e.target.closest("button"))openDetails(p)});
  art.style.cursor="pointer";
  info.append(detail);
  card.append(art,info);grid.append(card);
 }
 section.append(grid);root.append(section);
}

// Janela de detalhes: mostra descrição, três fotos e variações.
const overlay=el("div","bf-detail-overlay");overlay.hidden=true;
overlay.setAttribute("role","presentation");
const dialog=el("section","bf-detail-dialog");
dialog.setAttribute("role","dialog");dialog.setAttribute("aria-modal","true");
dialog.setAttribute("aria-label","Detalhes do produto");
overlay.append(dialog);document.body.append(overlay);
let previousFocus=null;
function closeDetails(){overlay.hidden=true;document.body.style.overflow="";if(previousFocus)previousFocus.focus();}
overlay.addEventListener("click",e=>{if(e.target===overlay)closeDetails()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!overlay.hidden)closeDetails()});
function openDetails(p){
 previousFocus=document.activeElement;dialog.replaceChildren();
 const close=el("button","bf-detail-close","✕");close.type="button";close.setAttribute("aria-label","Fechar detalhes");close.onclick=closeDetails;dialog.append(close);
 const layout=el("div","bf-detail-layout"),visual=el("div","bf-detail-visual"),body=el("div","bf-detail-body");
 const photos=(Array.isArray(p.images)?p.images:[]).filter(Boolean);
 if(!photos.length&&p.image)photos.push(p.image);
 const main=el("img","bf-detail-main");main.alt=p.name||p.id;
 const fallback=el("div","bf-detail-fallback","FOTO NÃO DISPONÍVEL");fallback.hidden=true;
 visual.append(main,fallback);
 const thumbs=el("div","bf-detail-thumbs");
 let displayPhoto=()=>{};
 if(photos.length){
  photos.forEach((src,i)=>{
   const b=el("button","bf-detail-thumb",String(i+1).padStart(2,"0"));
   b.type="button";b.setAttribute("aria-label","Ver foto "+(i+1));
   b.onclick=()=>{displayPhoto(i);const modelSelect=body.querySelector('select[data-field="model"]');if(modelSelect&&modelSelect.options.length-1===photos.length){modelSelect.selectedIndex=i+1;}};
   thumbs.append(b);
  });
  main.onerror=()=>{main.hidden=true;fallback.hidden=false;};
  displayPhoto=(i)=>{if(i<0||i>=photos.length)return;main.hidden=false;fallback.hidden=true;main.src=photos[i];main.alt=(p.name||p.id)+" — foto "+(i+1);for(const [j,b] of [...thumbs.children].entries()){b.classList.toggle("active",j===i);b.setAttribute("aria-pressed",String(j===i));}};
  displayPhoto(0);
 }else{main.hidden=true;fallback.hidden=false;}
 visual.append(thumbs);
 body.append(el("p","bf-detail-kicker",(p.category || "PRODUTO")+" · "+p.id));
 body.append(el("h2","",p.name||"PRODUTO A CADASTRAR"));
 body.append(el("p","bf-detail-description",p.description||"Descrição ainda não cadastrada."));
 if(Number(p.price)>0)body.append(el("strong","bf-detail-price",money(p.price)));
 else body.append(el("p","","Preço ainda não cadastrado."));
 // Seletor universal: tamanho, cor e modelo, conforme o cadastro de cada produto.
 const selectors=[];
 const addOption=(label,field,values)=>{
  if(!Array.isArray(values)||!values.length)return;
  const choices=[...new Set(values.map(v=>String(typeof v === "object" && v !== null ? v.name : v).trim()).filter(Boolean))];
  if(!choices.length)return;
  const wrapper=el("label","bf-variant-field");wrapper.append(el("span","",label));
  const select=el("select","bf-variant-select");select.dataset.field=field;
  const prompt=el("option","","Selecione "+label.toLowerCase());prompt.value="";select.append(prompt);
  for(const value of choices){const opt=el("option","",value);opt.value=value;select.append(opt)}
  wrapper.append(select);body.append(wrapper);selectors.push(select);
 };
 addOption("TAMANHO","size",p.sizes);
 addOption("COR","color",p.colors);
 if (!(Array.isArray(p.variants) && p.variants.length && p.variants.every(v => v && typeof v === "object") && Array.isArray(p.colors) && p.colors.length)) {
   addOption("MODELO","model",p.variants);
  }
const modelPriceSelect = selectors.find(
  select => select.dataset.field === "model"
);

if (
  modelPriceSelect &&
  Array.isArray(p.variantPrices) &&
  p.variantPrices.length === p.variants.length
) {
  modelPriceSelect.addEventListener("change", () => {
    const index = modelPriceSelect.selectedIndex - 1;
    const newPrice = index >= 0
      ? Number(p.variantPrices[index])
      : Number(p.price);

    const priceElement = body.querySelector(".bf-detail-price");

    if (priceElement) {
      priceElement.textContent = money(newPrice);
    }
  });
}

 
const colorSelect = selectors.find(
  select => select.dataset.field === "color"
);

if (colorSelect && Array.isArray(p.colors) && p.colors.length) {
  colorSelect.addEventListener("change", () => {
    const index = colorSelect.selectedIndex - 1;
    if (index >= 0) {
      const color = colorSelect.value;
      const matched = Array.isArray(p.variants) ? p.variants.find(v => v && typeof v === "object" && v.name === color) : null;
      const photoIndex = matched && matched.image ? photos.indexOf(matched.image) : index;
      if (photoIndex >= 0) displayPhoto(photoIndex);
    }
  });
}

 // Quando há uma foto por modelo, a escolha A1...A7 muda a foto automaticamente.
 const modelSelect=selectors.find(select=>select.dataset.field==="model");
 if(modelSelect&&photos.length===modelSelect.options.length-1){
  modelSelect.addEventListener("change",()=>{
   if(modelSelect.selectedIndex>0)displayPhoto(modelSelect.selectedIndex-1);
  });
  // A primeira foto é uma prévia, não uma escolha automática de modelo.
  for(const [i,b] of [...thumbs.children].entries())b.setAttribute("aria-label","Ver foto do modelo "+modelSelect.options[i+1].value);
 }
 const active=p.active===true&&!p.placeholder&&Number(p.price)>0;
 if(active){
  const add=el("button","slot-choose bf-detail-buy","ADICIONAR AO CARRINHO +");add.type="button";
  const warning=el("p","bf-variant-warning","");warning.setAttribute("role","status");
  add.addEventListener("click",()=>{
   if(selectors.some(select=>!select.value)){warning.textContent="Escolha todas as opções antes de adicionar ao carrinho.";selectors.find(select=>!select.value).focus();return;}
   warning.textContent="";
   const data={id:p.id};for(const select of selectors)data[select.dataset.field]=select.value;
   document.dispatchEvent(new CustomEvent("bf:add-to-cart",{detail:data}));
   add.textContent="ADICIONADO ✓";setTimeout(()=>{add.textContent="ADICIONAR AO CARRINHO +"},1400);
  });body.append(add,warning);
 }else body.append(el("p","bf-detail-unavailable","PRODUTO INDISPONÍVEL — COMPLETE O CADASTRO"));
 layout.append(visual,body);dialog.append(layout);
 overlay.hidden=false;document.body.style.overflow="hidden";close.focus();
}
