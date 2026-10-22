"use strict";
// BLACK FORGE — OCTOBER DROP 2026
// Lista oficial dos produtos já cadastrados no catalogo.js.
const OCTOBER_IDS = [
  "BF-138",
  "BF-139",
  "BF-140",
  "BF-141",
  "BF-142",
  "BF-143",
  "BF-144",
  "BF-145",
  "BF-146",
  "BF-147",
  "BF-148",
  "BF-149",
  "BF-150"
];
(() => {
  const root = document.getElementById("octoberProducts");
  if (!root) return;
  const catalog = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
  const entries = OCTOBER_IDS.map(id => {
    const p = catalog.find(item => item && item.id === id);
    if (!p) console.warn("OCTOBER DROP: produto não encontrado no catalogo.js:", id);
    else if (p.active === false || p.placeholder || !(Number(p.price) > 0)) console.warn("OCTOBER DROP: produto inativo ou sem preço:", id);
    return p && p.active !== false && !p.placeholder && Number(p.price) > 0 ? p : null;
  }).filter(Boolean);
  if (!entries.length) {
    console.warn("OCTOBER DROP: nenhum produto elegível. Confirme que catalogo.js está publicado, sem erros e contém os IDs.");
    return;
  }
  root.replaceChildren();
  const heading = document.querySelector(".collection .section-heading h2");
  const explanation = document.querySelector(".collection .section-heading p");
  if (heading) heading.textContent = "PEÇAS DA COLEÇÃO.";
  if (explanation) explanation.textContent = "Explore os produtos selecionados para o October Drop.";
  const money = n => Number(n).toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
  for (const p of entries) {
    const card = document.createElement("a");
    card.className = "product-card";
    card.href = "produto.html#" + encodeURIComponent(p.id);
    const media = document.createElement("div");
    media.className = "product-media";
    const src = (Array.isArray(p.images) && p.images.find(Boolean)) || p.image || "";
    if (src) {
      const img = document.createElement("img");
      img.loading = "lazy";
      img.alt = p.name || "Produto Black Forge";
      img.src = src;
      media.append(img);
    }
    const id = document.createElement("span");
    id.className = "product-id";
    id.textContent = p.id;
    media.append(id);
    const detail = document.createElement("div");
    detail.className = "product-info";
    const label = document.createElement("span");
    label.textContent = "BLACK FORGE / OCTOBER DROP";
    const name = document.createElement("h3");
    name.textContent = p.name || p.id;
    const price = document.createElement("strong");
    price.textContent = money(p.price);
    const action = document.createElement("span");
    action.className = "product-action";
    action.textContent = "VER PRODUTO ↗";
    detail.append(label, name, price, action);
    card.append(media, detail);
    root.append(card);
  }
})();
