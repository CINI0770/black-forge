"use strict";
const catalog = window.BLACK_FORGE_ITEMS || [];
const key = "blackforge-selection-v4";
const $ = id => document.getElementById(id);
const money = value => Number(value).toLocaleString("pt-BR", {style:"currency",currency:"BRL"});
const rules = window.BlackForgeVariants;

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "{}");
    const result = {};
    for (const product of catalog) {
      const group = raw[product.id];
      if (!group) continue;
      const items = (Array.isArray(group.items) ? group.items : [group])
        .filter(item => item && Number.isInteger(item.qty) && item.qty > 0)
        .map(item => rules.normalize(product, {
          qty: Math.min(20, item.qty), size:item.size, color:item.color, model:item.model
        }));
      if (items.length) result[product.id] = {items};
    }
    return result;
  } catch { return {}; }
}
function save(cart) {
  localStorage.setItem(key, JSON.stringify(cart));
  sessionStorage.setItem(key, JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent("bf:cart-updated"));
}
function cartProblems(selected) {
  const problems = [];
  for (const product of catalog) {
    for (const item of selected[product.id]?.items || []) {
      const result = rules.validate(product, item);
      if (!result.valid) problems.push({product, reason:result.reason});
    }
  }
  return problems;
}
function render() {
  const selected = read(), container = $("orderItems");
  container.replaceChildren();
  let quantity = 0, total = 0;
  for (const product of catalog) {
    const group = selected[product.id];
    if (!group) continue;
    group.items.forEach((item, index) => {
      const validation = rules.validate(product, item);
      quantity += item.qty;
      if (validation.valid) total += item.qty * validation.unitPrice;
      const row = document.createElement("div");
      row.className = "order-item";
      const info = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = product.name + " — " + (validation.valid ? money(validation.unitPrice) : "REVISAR OPÇÕES");
      const sub = document.createElement("small");
      sub.textContent = [
        item.size && "Tamanho: " + item.size,
        item.color && "Cor: " + item.color,
        item.model && "Modelo: " + item.model
      ].filter(Boolean).join(" · ");
      info.append(title, sub);
      if (!validation.valid) {
        const warning = document.createElement("p");
        warning.textContent = validation.reason + " Remova este item e escolha novamente as opções.";
        info.append(warning);
        const change = document.createElement("a");
        change.href = "produto.html#" + encodeURIComponent(product.id);
        change.textContent = "ESCOLHER NOVAMENTE ↗";
        info.append(change);
      }
      const controls = document.createElement("div");
      controls.className = "order-controls";
      const input = document.createElement("input");
      input.type = "number"; input.min = 1; input.max = 20; input.value = item.qty;
      input.setAttribute("aria-label", "Quantidade de " + product.name);
      input.addEventListener("change", () => {
        const n = Number(input.value);
        if (!Number.isInteger(n) || n < 1 || n > 20) { input.value = item.qty; return; }
        const updated = read();
        if (!updated[product.id]?.items[index]) return;
        updated[product.id].items[index].qty = n;
        save(updated); render();
      });
      const remove = document.createElement("button");
      remove.type = "button"; remove.textContent = "REMOVER";
      remove.addEventListener("click", () => {
        const updated = read();
        if (!updated[product.id]?.items[index]) return;
        updated[product.id].items.splice(index, 1);
        if (!updated[product.id].items.length) delete updated[product.id];
        save(updated); render();
      });
      controls.append(input, remove);
      row.append(info, controls);
      container.append(row);
    });
  }
  if (!quantity) container.textContent = "Nenhum produto selecionado.";
  $("orderQty").textContent = quantity;
  $("orderSubtotal").textContent = money(total);
  const problems = cartProblems(selected);
  $("payButton").disabled = !quantity || problems.length > 0;
  const status = $("checkoutStatus");
  if (problems.length) {
    status.textContent = "Revise " + problems.length + " item(ns) com opções inválidas antes de pagar.";
    status.dataset.cartWarning = "1";
  } else if (status.dataset.cartWarning) {
    status.textContent = "";
    delete status.dataset.cartWarning;
  }
}
$("clearOrder").addEventListener("click", () => { save({}); render(); });
$("checkoutForm").addEventListener("submit", async event => {
  event.preventDefault();
  const button = $("payButton"), status = $("checkoutStatus");
  button.disabled = true;
  status.textContent = "Preparando checkout...";
  try {
    const selected = read();
    const issues = cartProblems(selected);
    if (issues.length) throw Error("Existem opções inválidas no pedido. Revise os itens antes de continuar.");
    const items = Object.entries(selected).flatMap(([id, group]) =>
      group.items.map(item => ({id, ...item})));
    if (!items.length) throw Error("Seu carrinho está vazio.");
    const customer = Object.fromEntries(new FormData(event.currentTarget));
    if (!customer.consent) throw Error("Confirme o consentimento.");
    const response = await fetch("https://black-forge-pagamentos.onrender.com/api/checkout/preference", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({items, customer})
    });
    let data;
    try { data = await response.json(); } catch { throw Error("O servidor de pagamentos não respondeu corretamente."); }
    if (!response.ok) throw Error(data.error || "Não foi possível iniciar o pagamento.");
    if (!/^https:\/\//.test(data.checkout_url || "")) throw Error("Checkout indisponível.");
    window.location.assign(data.checkout_url);
  } catch (error) {
    status.textContent = error.message;
    button.disabled = false;
  }
});
render();
document.addEventListener("bf:cart-updated", render);
