"use strict";
// Somente apresenta os produtos já cadastrados no catalogo.js.
// O preço final é p.price: o desconto não é recalculado nem duplicado nesta página.
(() => {
  const all = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const root = document.getElementById("promoGrid");
  if (!root) return;
  const money = value => Number(value).toLocaleString("pt-BR", {style:"currency",currency:"BRL"});
  const node = (tag,cls,text) => {
    const el = document.createElement(tag);
    if (cls) el.className=cls;
    if (text!==undefined) el.textContent=text;
    return el;
  };
  const promos = all.filter(p => p && p.active===true && !p.placeholder && Number(p.price)>0 &&
    (p.id==="BF-109" || p.promotion==="lancamento" || p.launchPromo===true));
  root.replaceChildren();
  if (!promos.length) {
    const empty=node("div","promo-empty");
    empty.append(node("strong","","NOVA COLEÇÃO EM PREPARAÇÃO"),
      node("p","","A página já está pronta. Cadastre o BF-109 no catalogo.js para liberar a primeira peça."));
    const link=node("a","","Explorar o catálogo completo ↗");link.href="produtos.html";empty.append(link);root.append(empty);return;
  }
  for (const p of promos) {
    const card=node("article","promo-card");
    const photo=node("div","promo-photo");
    const img=node("img");
    const firstImage=(Array.isArray(p.images)?p.images:[]).find(Boolean)||p.image||"";
    if(firstImage){img.src=firstImage;img.alt=p.name||"Produto Black Forge";img.loading="lazy";
      img.addEventListener("error",()=>photo.classList.add("is-missing"));}
    else photo.classList.add("is-missing");
    photo.append(img,node("div","promo-image-fallback","BLACK FORGE / FOTO EM PREPARAÇÃO"));
    const old=Number(p.originalPrice);
    if(Number.isFinite(old) && old>Number(p.price)){
      const percent=Math.round((1-Number(p.price)/old)*100);
      photo.append(node("span","promo-off-label",percent+"% OFF"));
    }
    photo.append(node("span","promo-image-index",p.id+" / DROP 001"));
    const info=node("div","promo-card-info");
    info.append(node("p","promo-card-kicker","BLACK FORGE / LANÇAMENTO"),
      node("h3","",p.name),node("p","promo-description",p.description||"Nova peça da coleção Black Forge."));
    const price=node("div","promo-prices");
    if(Number.isFinite(old)&&old>Number(p.price))price.append(node("span","promo-oldprice",money(old)));
    price.append(node("strong","promo-price",money(p.price)));info.append(price);
    const choices={};
    for (const [field,label,key] of [["size","TAMANHO","sizes"],["color","COR","colors"],["model","MODELO","variants"]]) {
      const list=Array.isArray(p[key])?p[key].filter(x=>typeof x==="string"&&x.trim()):[];
      // Um único valor fica pré-selecionado; ex.: cor Preto no BF-109.
      if(list.length===1){choices[field]=list[0];if(field==="color")info.append(node("p","promo-note","COR: "+list[0].toUpperCase()));continue;}
      if(list.length>1){
        const labelNode=node("label","promo-field");labelNode.append(node("span","",label));
        const select=node("select");select.setAttribute("aria-label",label);
        const placeholder=node("option","","SELECIONE "+label);placeholder.value="";select.append(placeholder);
        for(const value of list){const o=node("option","",value);o.value=value;select.append(o);}
        choices[field]=select;labelNode.append(select);info.append(labelNode);
      }
    }
    const buy=node("button","promo-buy","ADICIONAR AO CARRINHO ↗");buy.type="button";
    const feedback=node("p","promo-card-feedback","");feedback.setAttribute("role","status");
    buy.addEventListener("click",()=>{
      const detail={id:p.id};
      for(const [field,choice] of Object.entries(choices)){
        detail[field]=typeof choice==="string"?choice:choice.value;
        if(!detail[field]){feedback.textContent="Selecione todas as opções antes de continuar.";choice.focus();return;}
      }
      // Mesmo evento utilizado pelo render_catalogo.js, tratado pelo selecao.js existente.
      document.dispatchEvent(new CustomEvent("bf:add-to-cart",{detail}));
      // Confere a gravação para não dizer que foi adicionado sem confirmação.
      let found=false;
      for(const area of [sessionStorage,localStorage]){
        try{
          const v=JSON.parse(area.getItem("blackforge-selection-v4")||"{}")[p.id];
          if(v && (Array.isArray(v.items)?v.items.some(i=>i.qty>0):v.qty>0))found=true;
        }catch{}
      }
      if(found){feedback.replaceChildren();feedback.append(node("span","","Adicionado ao carrinho! "));
        const go=node("a","","FINALIZAR PEDIDO ↗");go.href="pedido.html";go.style.textDecoration="underline";feedback.append(go);
        buy.textContent="ADICIONAR OUTRA UNIDADE +";
      }else{feedback.textContent="Não foi possível confirmar a seleção. Verifique se o selecao.js atual está conectado à página.";}
    });
    info.append(buy,feedback);card.append(photo,info);root.append(card);
  }
})();
