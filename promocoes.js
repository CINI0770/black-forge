"use strict";
// BLACK FORGE — promoções ligadas à página individual de cada produto.
// O preço já é definido no catalogo.js; não aplicamos 15% uma segunda vez.
(() => {
  const all = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const root = document.getElementById("promoGrid");
  if (!root) return;

  const money = value => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const node = (tag, cls = "", text) => {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const photosOf = p => {
    const photos = Array.isArray(p.images) ? p.images.filter(v => typeof v === "string" && v.trim()) : [];
    if (!photos.length && typeof p.image === "string" && p.image.trim()) photos.push(p.image);
    return photos;
  };
  // Mesmo formato de URL usado pelo catálogo: produto.html#BF-003, por exemplo.
  const productUrl = p => "produto.html#" + encodeURIComponent(p.id);
  const hasOptions = p => [p.sizes, p.colors, p.variants].some(v => Array.isArray(v) && v.length > 0);

  const style = node("style");
  style.textContent = `
    .promo-photo {position:relative;cursor:pointer}
    .promo-gallery-controls {position:absolute;bottom:12px;left:12px;display:flex;gap:8px;z-index:5}
    .promo-gallery-arrow {width:38px;height:38px;border:1px solid #e6e1d6;background:#101010e8;color:#fff;font-size:26px;cursor:pointer;border-radius:0}
    .promo-gallery-arrow:hover {background:#a20c17}
    .promo-card .promo-details-button {display:block;width:100%;margin-top:8px;padding:15px;border:1px solid #776e64;background:transparent;color:#f4eee7;font-size:11px;font-weight:900;letter-spacing:.09em;cursor:pointer}
    .promo-card .promo-details-button:hover {background:#2a2321}
    .promo-card .promo-buy {width:100%;cursor:pointer}
    .promo-card .promo-image-index {pointer-events:none}
    .promo-card .promo-product-title {cursor:pointer}
    .promo-card .promo-product-title:hover {text-decoration:underline;text-decoration-color:#b50c18;text-underline-offset:5px}
  `;
  document.head.append(style);

  const promos = all.filter(p => p && p.active === true && !p.placeholder && Number(p.price) > 0 &&
    (p.id === "BF-109" || p.promotion === "lancamento" || p.launchPromo === true));
  root.replaceChildren();

  if (!promos.length) {
    const empty = node("div", "promo-empty");
    empty.append(
      node("strong", "", "O PRÓXIMO DROP ESTÁ CHEGANDO."),
      node("p", "", "Explore nossa coleção e encontre seu próximo estilo.")
    );
    const link = node("a", "", "EXPLORAR PRODUTOS ↗");
    link.href = "produtos.html";
    empty.append(link);
    root.append(empty);
    return;
  }

  for (const p of promos) {
    const openPage = () => { window.location.href = productUrl(p); };
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
    photo.addEventListener("click", e => { if (!e.target.closest("button")) openPage(); });

    // Setas na vitrine navegam pelas fotos sem sair desta página.
    if (photos.length > 1) {
      const controls = node("div", "promo-gallery-controls");
      for (const [label, step, symbol] of [["Foto anterior", -1, "‹"], ["Próxima foto", 1, "›"]]) {
        const button = node("button", "promo-gallery-arrow", symbol);
        button.type = "button";
        button.setAttribute("aria-label", label + " de " + (p.name || p.id));
        button.addEventListener("click", e => {
          e.stopPropagation();
          currentPhoto = (currentPhoto + step + photos.length) % photos.length;
          photo.classList.remove("is-missing");
          img.src = photos[currentPhoto];
          img.alt = (p.name || "Produto") + " — foto " + (currentPhoto + 1);
        });
        controls.append(button);
      }
      photo.append(controls);
    }

    const current = Number(p.price);
    const previous = Number(p.originalPrice);
    const hasOriginal = Number.isFinite(previous) && previous > current;
    if (hasOriginal) {
      photo.append(node("span", "promo-off-label", Math.round((1 - current / previous) * 100) + "% OFF"));
    }
    photo.append(node("span", "promo-image-index", p.id + " / DROP 001"));

    const info = node("div", "promo-card-info");
    info.append(node("p", "promo-card-kicker", "BLACK FORGE / LANÇAMENTO"));
    const title = node("h3", "promo-product-title", p.name || p.id);
    title.addEventListener("click", openPage);
    info.append(title, node("p", "promo-description", p.description || "Nova peça da coleção Black Forge."));

    const prices = node("div", "promo-prices promo-price-feature");
    if (hasOriginal) {
      const original = node("div", "promo-price-original");
      original.append(node("span", "promo-price-caption", "PREÇO ORIGINAL"), node("s", "promo-oldprice", money(previous)));
      prices.append(original);
    }
    const promotional = node("div", "promo-price-new");
    promotional.append(
      node("span", "promo-price-caption", hasOriginal ? "PREÇO DE LANÇAMENTO" : "PREÇO ATUAL"),
      node("strong", "promo-price", money(current))
    );
    prices.append(promotional);
    if (hasOriginal) {
      prices.append(node("span", "promo-price-saving", "VOCÊ ECONOMIZA " + money(Math.round((previous - current) * 100) / 100)));
    }
    info.append(prices);

    // Sem janela pop-up: tanto as opções quanto os detalhes levam à página individual.
    const buy = node("button", "promo-buy", hasOptions(p) ? "ESCOLHER OPÇÕES +" : "VER PRODUTO +");
    buy.type = "button";
    buy.addEventListener("click", openPage);
    const details = node("button", "promo-details-button", "VER DETALHES ↗");
    details.type = "button";
    details.addEventListener("click", openPage);
    info.append(buy, details);
    card.append(photo, info);
    root.append(card);
  }
})();
