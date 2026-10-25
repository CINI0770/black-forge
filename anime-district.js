/* Anime District / vitrine independente — não altera o carrinho e não permite pedidos em rascunho. */
(() => {
  "use strict";
  const items = Array.isArray(window.BLACK_FORGE_ANIME_ITEMS) ? window.BLACK_FORGE_ANIME_ITEMS : [];
  const names = ["Camisetas", "Blusas e croppeds", "Moletons", "Calças", "Jaquetas e casacos", "Acessórios", "Bolsas e mochilas", "Bonés e gorros"];
  const params = new URLSearchParams(window.location.search);
  const preview = params.get("preview") === "1";
  const root = document.querySelector("#animeGrid");
  const empty = document.querySelector("#emptyState");
  const count = document.querySelector("#visibleCount");
  const summary = document.querySelector("#stockSummary");
  const tiles = document.querySelector("#categoryTiles");
  const filters = document.querySelector("#filterChips");
  const search = document.querySelector("#animeSearch");
  const notice = document.querySelector("#previewNotice");
  const modal = document.querySelector("#productDialog");
  const modalContent = document.querySelector("#dialogContent");
  let selected = "Todas";

  // Nunca publicar rascunho por acidente ou exibir preço indefinido.
  function isPublished(p) {
    return p && p.active === true && p.placeholder === false &&
      typeof p.name === "string" && p.name.trim().length > 0 &&
      Number.isFinite(Number(p.price)) && Number(p.price) > 0 &&
      Array.isArray(p.images) && p.images.some(src => typeof src === "string" && src.trim().length > 0);
  }
  function text(el, value) { el.textContent = value == null ? "" : String(value); }
  function node(tag, className, value) { const el = document.createElement(tag); if (className) el.className = className; if (value != null) text(el, value); return el; }
  function money(value) { return Number(value).toLocaleString("pt-BR", {style:"currency",currency:"BRL"}); }
  const published = items.filter(isPublished);
  if (preview) notice.hidden = false;
  text(summary, published.length ? `${published.length} PEÇAS DISPONÍVEIS` : "COLEÇÃO EM PREPARAÇÃO");

  function choose(category) {
    selected = category;
    renderControls(); renderItems();
    document.getElementById("catalogo").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function renderControls() {
    tiles.replaceChildren();
    names.forEach((name,index) => {
      const qty = published.filter(p=>p.anime_category === name).length;
      const button = node("button", "category-card"+(selected===name?" active":""));
      button.type="button"; button.setAttribute("aria-pressed",String(selected===name));
      const smallTop = node("span","category-card-number"); smallTop.append(node("span","",String(index+1).padStart(2,"0")),node("span","","↗"));
      button.append(smallTop,node("strong","",name.toUpperCase()),node("small","",qty ? `${qty} ${qty===1?"PEÇA DISPONÍVEL":"PEÇAS DISPONÍVEIS"}` : "EM PREPARAÇÃO"));
      button.addEventListener("click",()=>choose(name)); tiles.append(button);
    });
    filters.replaceChildren();
    ["Todas",...names].forEach(name=>{
      const chip = node("button","chip",name); chip.type="button"; chip.setAttribute("aria-pressed",String(selected===name));
      chip.addEventListener("click",()=>choose(name)); filters.append(chip);
    });
  }
  function createCard(p) {
    const active = isPublished(p); const card = node("article","product-card"+(active?"":" product-draft"));
    const imageBox = node("div","product-image");
    if (active) {
      const img = document.createElement("img"); img.src = p.images[0]; img.alt = p.name;
      img.loading="lazy"; img.addEventListener("error",()=>{ img.remove(); imageBox.append(node("span","frame-symbol","BF / AN")); });
      imageBox.append(img);
    } else { imageBox.append(node("span","frame-symbol","BF / AN"),node("span","frame-id",p.id)); }
    imageBox.append(node("span","product-badge",active?"DISPONÍVEL":"EM BREVE"));
    card.append(imageBox,node("div","product-type",p.anime_category.toUpperCase()),node("h3","product-name",active?p.name:`ESPAÇO ${p.id}`));
    if (active) card.append(node("div","product-price",money(p.price)));
    else card.append(node("div","product-meta","BASE RESERVADA / SEM PREÇO"));
    if (active) {const open=node("button","product-open","VER DETALHES ↗"); open.type="button"; open.addEventListener("click",()=>showDetails(p)); card.append(open);}
    return card;
  }
  function renderItems() {
    const term = search.value.toLocaleLowerCase("pt-BR").trim();
    const visible = (preview?items:published).filter(p=>(selected==="Todas"||p.anime_category===selected)&&
      [p.id,p.name,p.anime_category,p.anime,p.description].some(v=>String(v||"").toLocaleLowerCase("pt-BR").includes(term)));
    root.replaceChildren(...visible.map(createCard));
    empty.hidden = visible.length!==0;
    text(count, preview?`${visible.length} BASES EXIBIDAS / MODO PRÉVIA`:`${visible.length} ${visible.length===1?"PRODUTO PUBLICADO":"PRODUTOS PUBLICADOS"}`);
  }
  function showDetails(p) {
    modalContent.replaceChildren();
    const shell = node("div","modal-body"); const image = document.createElement("img"); image.src=p.images[0]; image.alt=p.name;
    const right = node("div","modal-info");
    right.append(node("div","product-type",p.anime_category.toUpperCase()),node("h3","",p.name),node("strong","",money(p.price)),node("p","",p.description || "Detalhes do produto em atualização."));
    [["TAMANHO",p.sizes],["COR",p.colors]].forEach(([title,options])=>{
      if (!Array.isArray(options)||!options.length) return;
      const label=node("label","",title); const sel=document.createElement("select"); sel.setAttribute("aria-label",title);
      options.forEach(opt=>{const option=document.createElement("option"); option.value=String(opt);text(option,opt);sel.append(option);});
      label.append(sel);right.append(label);
    });
    right.append(node("p","modal-notice","Para comprar, confira o item no catálogo principal da Black Forge quando sua integração de carrinho estiver ativa."));
    const a=node("a","product-open","IR AO CATÁLOGO GERAL ↗"); a.href="produtos.html";right.append(a);
    shell.append(image,right);modalContent.append(shell);modal.showModal();
  }
  search.addEventListener("input",renderItems);
  renderControls();renderItems();
})();
