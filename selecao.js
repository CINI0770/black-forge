"use strict";
const selectionKey = "blackforge-selection-v4";
const catalog = window.BLACK_FORGE_ITEMS || [];
const validProducts = new Map(catalog.map(p => [p.id, p]));
const options = window.BlackForgeVariants;
const cleanText = value => typeof value === "string" ? value.trim().slice(0, 60) : "";

function readSelection() {
  try {
    const raw = JSON.parse(localStorage.getItem(selectionKey) || "{}");
    const valid = {};
    for (const product of catalog) {
      const entry = raw[product.id];
      if (!entry) continue;
      const old = Array.isArray(entry.items) ? entry.items : [entry];
      const items = [];
      for (const current of old) {
        if (!current || !Number.isInteger(current.qty) || current.qty < 1) continue;
        const item = options.normalize(product, {
          qty: Math.min(current.qty, 20),
          size: cleanText(current.size), color: cleanText(current.color), model: cleanText(current.model)
        });
        const existing = items.find(x => x.size === item.size && x.color === item.color && x.model === item.model);
        if (existing) existing.qty = Math.min(20, existing.qty + item.qty);
        else items.push(item);
      }
      if (items.length) valid[product.id] = {items};
    }
    return valid;
  } catch { return {}; }
}
function writeSelection(value) {
  try { localStorage.setItem(selectionKey, JSON.stringify(value)); } catch {}
  document.dispatchEvent(new CustomEvent("bf:cart-updated"));
}
const countEl = document.getElementById("selectionCount");
function updateCount() {
  if (countEl) countEl.textContent = Object.values(readSelection()).reduce((sum, group) =>
    sum + group.items.reduce((total, item) => total + item.qty, 0), 0);
}
function addToSelection(detail) {
  const product = validProducts.get(detail.id);
  const check = options.validate(product, {qty:1, size:detail.size, color:detail.color, model:detail.model});
  if (!check.valid) return false;
  const selected = readSelection();
  const group = selected[product.id] || {items:[]};
  const item = check.choice;
  const old = group.items.find(x => x.size === item.size && x.color === item.color && x.model === item.model);
  if (old) old.qty = Math.min(20, old.qty + 1);
  else group.items.push(item);
  selected[product.id] = group;
  writeSelection(selected);
  updateCount();
  return true;
}
document.addEventListener("bf:cart-updated", updateCount);
document.addEventListener("bf:add-to-cart", event => {
  if (!addToSelection(event.detail || {})) event.preventDefault();
});
document.addEventListener("click", event => {
  const button = event.target.closest("[data-select]");
  if (!button) return;
  const product = validProducts.get(button.dataset.select);
  if (!product) return;
  if ([product.sizes, product.colors, product.variants].some(list => Array.isArray(list) && list.length)) {
    location.href = "produto.html#" + encodeURIComponent(product.id);
    return;
  }
  if (!addToSelection({id:product.id})) return;
  button.textContent = "ADICIONADO ✓";
  setTimeout(() => { button.textContent = "ADICIONAR AO CARRINHO +"; }, 1300);
});
updateCount();
