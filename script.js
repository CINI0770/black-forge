
"use strict";

// BLACK FORGE — carrinho com catálogo real
const products = window.BLACK_FORGE_ITEMS || [];
const cartKey = "blackforge-selection-v4";

const $ = selector => document.querySelector(selector);
const money = value => Number(value).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});

let toastTimer;

function readCart() {
  try {
    const raw = JSON.parse(
      localStorage.getItem(cartKey) ||
      sessionStorage.getItem(cartKey) ||
      "{}"
    );

    const result = {};

    for (const p of products) {
      const group = raw[p.id];
      if (!group) continue;

      const entries = Array.isArray(group.items)
        ? group.items
        : [group];

      const items = entries
        .filter(item => item && Number.isInteger(item.qty) && item.qty > 0)
        .map(item => ({
          qty: Math.min(20, item.qty),
          size: String(item.size || ""),
          color: String(item.color || ""),
          model: String(item.model || "")
        }));

      if (items.length) result[p.id] = { items };
    }

    return result;
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  sessionStorage.setItem(cartKey, JSON.stringify(cart));
}

function renderCart() {
  const cart = readCart();
  const container = $("#cartItems");

  container.replaceChildren();

  let count = 0;
  let subtotal = 0;

  for (const product of products) {
    const group = cart[product.id];
    if (!group) continue;

    group.items.forEach((item, index) => {
      count += item.qty;
      subtotal += Number(product.price) * item.qty;

      const row = document.createElement("div");
      row.className = "cart-item";

      const thumb = document.createElement("div");
      thumb.className = "cart-thumb";
      thumb.textContent = "✦";

      const info = document.createElement("div");

      const name = document.createElement("h3");
      name.textContent = product.name;

      const price = document.createElement("p");
      price.textContent = money(product.price);

      const variants = document.createElement("p");
      variants.textContent = [
        item.size && "Tamanho: " + item.size,
        item.color && "Cor: " + item.color,
        item.model && "Modelo: " + item.model
      ].filter(Boolean).join(" · ");

      const quantity = document.createElement("div");
      quantity.className = "qty";

      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "−";
      minus.addEventListener("click", () => {
        changeQuantity(product.id, index, -1);
      });

      const number = document.createElement("span");
      number.textContent = item.qty;

      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.addEventListener("click", () => {
        changeQuantity(product.id, index, 1);
      });

      quantity.append(minus, number, plus);
      info.append(name, price, variants, quantity);

      const remove = document.createElement("button");
      remove.className = "remove";
      remove.type = "button";
      remove.textContent = "REMOVER";
      remove.addEventListener("click", () => {
        removeItem(product.id, index);
      });

      row.append(thumb, info, remove);
      container.append(row);
    });
  }

  if (!count) {
    container.innerHTML = `
      <div class="cart-empty">
        <span class="symbol">✦</span>
        <p>SEU CARRINHO ESTÁ VAZIO.</p>
        <p>Escolha uma peça da coleção.</p>
      </div>
    `;
  }

  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = `(${count})`;
  $("#cartSubtotal").textContent = money(subtotal);
}

function changeQuantity(id, index, difference) {
  const cart = readCart();
  const group = cart[id];
  if (!group || !group.items[index]) return;

  group.items[index].qty = Math.min(
    20,
    group.items[index].qty + difference
  );

  if (group.items[index].qty <= 0) {
    group.items.splice(index, 1);
  }

  if (!group.items.length) delete cart[id];

  saveCart(cart);
  renderCart();
}

function removeItem(id, index) {
  const cart = readCart();
  if (!cart[id]) return;

  cart[id].items.splice(index, 1);

  if (!cart[id].items.length) delete cart[id];

  saveCart(cart);
  renderCart();
}

function openCart() {
  $("#overlay").hidden = false;
  $("#cartDrawer").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  renderCart();
  $("#cartClose").focus();
}

function closeCart() {
  $("#overlay").hidden = true;
  $("#cartDrawer").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
  $("#cartToggle").focus();
}

function toggleSearch(show) {
  $("#searchPanel").hidden = !show;
  $("#searchToggle").setAttribute("aria-expanded", String(show));

  if (show) $("#searchInput").focus();
}

$("#cartToggle").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#continueShopping").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);

$("#searchToggle").addEventListener("click", () => {
  toggleSearch($("#searchPanel").hidden);
});

$("#searchClose").addEventListener("click", () => {
  $("#searchInput").value = "";
  toggleSearch(false);
});

$("#searchInput").addEventListener("input", event => {
  const query = event.target.value.trim();
  if (query) {
    window.location.href =
      "produtos.html?busca=" + encodeURIComponent(query);
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if ($("#cartDrawer").classList.contains("open")) {
      closeCart();
    } else if (!$("#searchPanel").hidden) {
      toggleSearch(false);
    }
  }
});

$("#year").textContent = new Date().getFullYear();

renderCart();

window.addEventListener("pageshow", renderCart);

