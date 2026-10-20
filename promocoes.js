"use strict";
// BLACK FORGE — promoções com a mesma experiência de opções do catálogo.
// Preços vêm exclusivamente de catalogo.js. Não recalcula o desconto nem altera o checkout.
(() => {
  const all = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const root = document.getElementById("promoGrid");
  if (!root) return;

  const CART_KEY = "blackforge-selection-v4";
  const money = value => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  function node(tag, cls = "", text) {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  const photosOf = p => {
    const photos = Array.isArray(p.images) ? p.images.filter(v => typeof v === "string" && v.trim()) : [];
    if (!photos.length && typeof p.image === "string" && p.image.trim()) photos.push(p.image);
    return photos;
  };
  const valuesOf = options => Array.isArray(options)
    ? [...new Set(options.map(v => typeof v === "object" && v !== null ? String(v.name || "") : String(v || "")).map(s => s.trim()).filter(Boolean))]
    : [];
  function variantsOf(p) {
    const choices = [
      { field: "size", label: "TAMANHO", values: valuesOf(p.sizes) },
      { field: "color", label: "COR", values: valuesOf(p.colors) }
    ];
    // Repete a regra do catálogo: objetos usados apenas como variações de cor
    // não viram uma segunda escolha redundante de MODELO.
    const colorVariants = Array.isArray(p.variants) && p.variants.length &&
      p.variants.every(v => v && typeof v === "object") && valuesOf(p.colors).length;
    if (!colorVariants) choices.push({ field: "model", label: "MODELO", values: valuesOf(p.variants) });
    return choices.filter(c => c.values.length);
  }
  function priceInfo(p) {
    const current = Number(p.price), previous = Number(p.originalPrice);
    return { current, previous, hasOriginal: Number.isFinite(previous) && previous > current };
  }
  // A página de pedido atual consulta localStorage (não sessionStorage).
  function cartQuantity(id, selected) {
    try {
      const group = JSON.parse(localStorage.getItem(CART_KEY) || "{}")[id];
      if (!group) return 0;
      const entries = Array.isArray(group.items) ? group.items : [group];
      return entries.filter(v => ["size", "color", "model"].every(k => !selected[k] || String(v[k] || "") === selected[k]))
        .reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    } catch { return 0; }
  }
  function addToCart(p, selection, feedback, button) {
    const detail = { id: p.id, ...selection };
    const before = cartQuantity(p.id, selection);
    document.dispatchEvent(new CustomEvent("bf:add-to-cart", { detail }));
    const after = cartQuantity(p.id, selection);
    feedback.replaceChildren();
    if (after > before) {
      feedback.append(node("span", "", "Adicionado ao carrinho! "));
      const link = node("a", "", "FINALIZAR PEDIDO ↗");
      link.href = "pedido.html";
      feedback.append(link);
      if (button) button.textContent = "ADICIONAR OUTRA UNIDADE +";
      document.dispatchEvent(new CustomEvent("bf:cart-updated"));
      return true;
    }
    feedback.textContent = "Não foi possível confirmar o produto no carrinho. Verifique a integração com o carrinho.";
    return false;
  }

  const style = node("style");
  style.textContent = `
    .promo-photo{position:relative;cursor:pointer}
    .promo-gallery-controls{position:absolute;bottom:12px;left:12px;display:flex;gap:8px;z-index:5}
    .promo-gallery-arrow{width:36px;height:36px;border:1px solid #e6e1d6;background:#101010e8;color:#fff;font-size:24px;cursor:pointer;border-radius:0}
    .promo-gallery-arrow:hover{background:#a20c17}
    .promo-photo .promo-image-index{pointer-events:none}
    .promo-card .promo-buy{margin-top:18px}
    .promo-card .promo-details-button{width:100%;margin-top:8px;padding:15px;border:1px solid #776e64;background:transparent;color:#f4eee7;font-size:11px;font-weight:900;letter-spacing:.09em;cursor:pointer}
    .promo-card .promo-details-button:hover{background:#2a2321}
    .bf-promo-overlay[hidden]{display:none!important}
    .bf-promo-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:18px}
    .bf-promo-modal{position:relative;overflow:auto;max-height:92vh;width:min(980px,100%);border:2px solid #e4ddd2;background:#151413;color:#f6f0e7;padding:30px;box-shadow:9px 9px 0 #a20c17}
    .bf-promo-close{position:absolute;z-index:2;right:12px;top:12px;border:1px solid #c8bfb4;background:#eee9df;color:#080808;font-size:20px;min-width:39px;min-height:39px;cursor:pointer}
    .bf-promo-modal-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;align-items:start}
    .bf-promo-main-photo{display:block;width:100%;max-height:520px;aspect-ratio:4/5;object-fit:contain;background:#272423}
    .bf-promo-main-photo[hidden],.bf-promo-no-photo[hidden]{display:none!important}
    .bf-promo-no-photo{min-height:260px;display:grid;place-items:center;background:#252120;color:#d1cac2}
    .bf-promo-thumbnails{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
    .bf-promo-thumbnails button{padding:10px 14px;background:#292523;border:1px solid #6d655f;color:#fff;cursor:pointer}
    .bf-promo-thumbnails button.active{background:#eee9df;color:#111;border-color:#eee9df}
    .bf-promo-modal-kicker{font-size:11px;letter-spacing:.13em;color:#c5bbb1;font-weight:800}
    .bf-promo-modal-title{font:900 clamp(35px,4vw,54px)/.95 'Barlow Condensed',Impact,sans-serif;margin:14px 40px 14px 0}
    .bf-promo-modal-description{font-size:13px;line-height:1.6;color:#d3cbc2}
    .bf-promo-modal-prices{margin:18px 0 20px;display:flex;flex-direction:column;gap:6px}
    .bf-promo-modal-old{color:#b7aaa0;font-size:14px;text-decoration:line-through}
    .bf-promo-modal-price{font:900 38px 'Barlow Condensed',Impact,sans-serif}
    .bf-promo-modal-field{display:flex;flex-direction:column;gap:7px;margin:13px 0;font-size:11px;font-weight:800;letter-spacing:.08em}
    .bf-promo-modal-field select{width:100%;min-height:44px;padding:11px 12px;border:1px solid #857a71;border-radius:0;background:#252322;color:#fff;font:500 13px 'DM Sans',sans-serif}
    .bf-promo-modal-buy{width:100%;margin-top:15px;padding:16px;border:0;background:#eee9df;color:#0b0b0b;font-weight:900;font-size:12px;cursor:pointer}
    .bf-promo-modal-buy:hover{background:white}
    .bf-promo-feedback{font-size:12px;min-height:20px;margin-top:12px;color:#f2e9e0;line-height:1.6}
    .bf-promo-feedback a{color:#f2e9e0;text-decoration:underline}
    @media(max-width:680px){.bf-promo-modal{padding:23px 14px 18px;box-shadow:none}.bf-promo-modal-grid{grid-template-columns:1fr;gap:16px}.bf-promo-main-photo{max-height:300px;aspect-ratio:4/3}.bf-promo-modal-title{font-size:38px}}
  `;
  document.head.append(style);

  const overlay = node("div", "bf-promo-overlay");
  overlay.hidden = true;
  const modal = node("section", "bf-promo-modal");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Detalhes do produto");
  overlay.append(modal);
  document.body.append(overlay);
  let previousFocus = null;
  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) closeModal(); });

  function openDetails(p) {
    previousFocus = document.activeElement;
    modal.replaceChildren();
    const close = node("button", "bf-promo-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Fechar detalhes");
    close.addEventListener("click", closeModal);
    modal.append(close);

    const layout = node("div", "bf-promo-modal-grid");
    const visual = node("div");
    const body = node("div");
    const pics = photosOf(p);
    const main = node("img", "bf-promo-main-photo");
    const noPhoto = node("div", "bf-promo-no-photo", "IMAGEM INDISPONÍVEL");
    const thumbnails = node("div", "bf-promo-thumbnails");
    main.alt = p.name || p.id;
    main.addEventListener("error", () => { main.hidden = true; noPhoto.hidden = false; });
    function showPhoto(i) {
      if (!pics[i]) return;
      main.hidden = false;
      noPhoto.hidden = true;
      main.src = pics[i];
      main.alt = (p.name || "Produto") + " — foto " + (i + 1);
      [...thumbnails.children].forEach((b, index) => b.classList.toggle("active", index === i));
    }
    if (pics.length) {
      noPhoto.hidden = true;
      pics.forEach((_, index) => {
        const thumb = node("button", "", String(index + 1).padStart(2, "0"));
        thumb.type = "button";
        thumb.setAttribute("aria-label", "Ver foto " + (index + 1));
        thumb.addEventListener("click", () => showPhoto(index));
        thumbnails.append(thumb);
      });
      showPhoto(0);
    } else { main.hidden = true; }
    visual.append(main, noPhoto, thumbnails);

    body.append(node("p", "bf-promo-modal-kicker", "BLACK FORGE / " + p.id + " / LANÇAMENTO"));
    body.append(node("h2", "bf-promo-modal-title", p.name));
    body.append(node("p", "bf-promo-modal-description", p.description || "Peça da coleção Black Forge."));
    const { current, previous, hasOriginal } = priceInfo(p);
    const prices = node("div", "bf-promo-modal-prices");
    if (hasOriginal) prices.append(node("s", "bf-promo-modal-old", money(previous)));
    prices.append(node("strong", "bf-promo-modal-price", money(current)));
    body.append(prices);

    const selects = [];
    const fixed = {};
    const variantGroups = variantsOf(p);
    for (const group of variantGroups) {
      if (group.values.length === 1) { fixed[group.field] = group.values[0]; continue; }
      const label = node("label", "bf-promo-modal-field");
      label.append(node("span", "", group.label));
      const select = node("select");
      select.dataset.field = group.field;
      select.setAttribute("aria-label", group.label);
      const first = node("option", "", "SELECIONE " + group.label);
      first.value = "";
      select.append(first);
      for (const value of group.values) {
        const option = node("option", "", value);
        option.value = value;
        select.append(option);
      }
      label.append(select);
      body.append(label);
      selects.push(select);
    }
    // Fotos por cor/modelo: se a sequência corresponder às opções, troca a foto.
    for (const select of selects) {
      const field = select.dataset.field;
      const group = variantGroups.find(g => g.field === field);
      select.addEventListener("change", () => {
        if (!select.value) return;
        if (field === "color") {
          const match = Array.isArray(p.variants) ? p.variants.find(v => v && typeof v === "object" && v.name === select.value) : null;
          const position = match && match.image ? pics.indexOf(match.image) : -1;
          if (position >= 0) return showPhoto(position);
        }
        if (pics.length === group.values.length) showPhoto(group.values.indexOf(select.value));
      });
    }

    const buy = node("button", "bf-promo-modal-buy", "ADICIONAR AO CARRINHO +");
    buy.type = "button";
    const feedback = node("p", "bf-promo-feedback");
    feedback.setAttribute("role", "status");
    buy.addEventListener("click", () => {
      const missing = selects.find(select => !select.value);
      if (missing) {
        feedback.textContent = "Escolha todas as opções antes de adicionar ao carrinho.";
        missing.focus();
        return;
      }
      const selection = { ...fixed };
      for (const select of selects) selection[select.dataset.field] = select.value;
      addToCart(p, selection, feedback, buy);
    });
    body.append(buy, feedback);
    layout.append(visual, body);
    modal.append(layout);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    close.focus();
  }

  const promos = all.filter(p => p && p.active === true && !p.placeholder && Number(p.price) > 0 &&
    (p.id === "BF-109" || p.promotion === "lancamento" || p.launchPromo === true));
  root.replaceChildren();
  if (!promos.length) {
    const empty = node("div", "promo-empty");
    empty.append(node("strong", "", "O PRÓXIMO DROP ESTÁ CHEGANDO."),
      node("p", "", "Explore nossa coleção e encontre seu próximo estilo."));
    const link = node("a", "", "EXPLORAR PRODUTOS ↗");
    link.href = "produtos.html";
    empty.append(link);
    root.append(empty);
    return;
  }

  for (const p of promos) {
    const card = node("article", "promo-card");
    const photo = node("div", "promo-photo");
    const img = node("img");
    const photos = photosOf(p);
    let currentPhoto = 0;
    if (photos.length) {
      img.src = photos[0];
      img.alt = p.name || "Produto Black Forge";
      img.loading = "lazy";
      img.addEventListener("error", () => photo.classList.add("is-missing"));
    } else photo.classList.add("is-missing");
    photo.append(img, node("div", "promo-image-fallback", "BLACK FORGE / DROP 001"));
    photo.addEventListener("click", e => { if (!e.target.closest("button")) openDetails(p); });
    if (photos.length > 1) {
      const controls = node("div", "promo-gallery-controls");
      for (const [label, step, symbol] of [["Foto anterior", -1, "‹"], ["Próxima foto", 1, "›"]]) {
        const button = node("button", "promo-gallery-arrow", symbol);
        button.type = "button";
        button.setAttribute("aria-label", label + " de " + p.name);
        button.addEventListener("click", () => {
          currentPhoto = (currentPhoto + step + photos.length) % photos.length;
          photo.classList.remove("is-missing");
          img.src = photos[currentPhoto];
          img.alt = (p.name || "Produto") + " — foto " + (currentPhoto + 1);
        });
        controls.append(button);
      }
      photo.append(controls);
    }
    const { current, previous, hasOriginal } = priceInfo(p);
    if (hasOriginal) {
      photo.append(node("span", "promo-off-label", Math.round((1 - current / previous) * 100) + "% OFF"));
    }
    photo.append(node("span", "promo-image-index", p.id + " / DROP 001"));
    const info = node("div", "promo-card-info");
    info.append(node("p", "promo-card-kicker", "BLACK FORGE / LANÇAMENTO"),
      node("h3", "", p.name), node("p", "promo-description", p.description || "Nova peça da coleção Black Forge."));
    const prices = node("div", "promo-prices promo-price-feature");
    if (hasOriginal) {
      const original = node("div", "promo-price-original");
      original.append(node("span", "promo-price-caption", "PREÇO ORIGINAL"),
        node("s", "promo-oldprice", money(previous)));
      prices.append(original);
    }
    const promotional = node("div", "promo-price-new");
    promotional.append(node("span", "promo-price-caption", hasOriginal ? "PREÇO DE LANÇAMENTO" : "PREÇO ATUAL"),
      node("strong", "promo-price", money(current)));
    prices.append(promotional);
    if (hasOriginal) {
      prices.append(node("span", "promo-price-saving", "VOCÊ ECONOMIZA " + money(Math.round((previous - current) * 100) / 100)));
    }
    info.append(prices);
    const withOptions = variantsOf(p).some(g => g.values.length > 0);
    const buy = node("button", "promo-buy", withOptions ? "ESCOLHER OPÇÕES +" : "ADICIONAR AO CARRINHO +");
    buy.type = "button";
    if (withOptions) buy.addEventListener("click", () => openDetails(p));
    else buy.addEventListener("click", () => {
      const feedback = info.querySelector(".promo-card-feedback");
      addToCart(p, {}, feedback, buy);
    });
    const details = node("button", "promo-details-button", "VER DETALHES ↗");
    details.type = "button";
    details.addEventListener("click", () => openDetails(p));
    const feedback = node("p", "promo-card-feedback");
    feedback.setAttribute("role", "status");
    info.append(buy, details, feedback);
    card.append(photo, info);
    root.append(card);
  }
})();
