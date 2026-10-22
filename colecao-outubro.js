"use strict";
// BLACK FORGE — OCTOBER DROP 001.
// Produtos vêm do catalogo.js; preços e fotos não são duplicados aqui.
const OCTOBER_IDS = [
  "BF-138", "BF-139", "BF-140", "BF-141", "BF-142",
  "BF-143", "BF-144", "BF-145", "BF-146", "BF-147",
  "BF-148", "BF-149", "BF-150"
];
(() => {
  const root = document.getElementById("octoberProducts");
  if (!root) return;
  const all = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const byId = new Map(all.filter(Boolean).map(p => [String(p.id), p]));
  const products = OCTOBER_IDS.map(id => byId.get(id)).filter(p => p && p.active !== false && !p.placeholder && Number(p.price) > 0);
  const currency = number => Number(number).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const element = (tag, className, content) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = content;
    return el;
  };
  root.replaceChildren();
  if (!products.length) {
    const empty = element("div", "empty-state");
    empty.append(element("strong", "", "OS PRODUTOS AINDA NÃO FORAM ENCONTRADOS."), element("p", "", "Confira se catalogo.js contém BF-138 a BF-150, ativos e com preço de venda."));
    root.append(empty);
    return;
  }
  for (const product of products) {
    const card = element("a", "product-card");
    card.href = "produto.html#" + encodeURIComponent(product.id);
    card.setAttribute("aria-label", "Ver " + product.name);
    const media = element("div", "product-media");
    const raw = (Array.isArray(product.images) && product.images.find(Boolean)) || product.image || "";
    const imagePath = String(raw).replace(/^(\.\/)?images\//i, "imagens/");
    const fallback = () => {
      media.querySelector("img")?.remove();
      if (!media.querySelector(".media-fallback")) media.prepend(element("div", "media-fallback", "FOTO INDISPONÍVEL"));
    };
    if (imagePath) {
      const img = element("img");
      img.alt = product.name || "Produto Black Forge";
      img.loading = "lazy";
      img.addEventListener("error", fallback);
      img.src = imagePath;
      media.append(img);
    } else fallback();
    media.append(element("span", "product-id", String(product.id)));
    const info = element("div", "product-info");
    info.append(element("span", "product-kicker", "BLACK FORGE / OCTOBER DROP"));
    info.append(element("h3", "", product.name || product.id));
    const price = element("div", "price-row");
    price.append(element("strong", "", currency(product.price)));
    const original = Number(product.originalPrice);
    if (Number.isFinite(original) && original > Number(product.price)) price.append(element("del", "", currency(original)));
    info.append(price, element("span", "product-action", "VER PRODUTO ↗"));
    card.append(media, info);
    root.append(card);
  }
})();
