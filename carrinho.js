"use strict";

// BLACK FORGE — carrinho lateral (gaveta), igual em todas as páginas.
// Precisa de: catalogo.js antes, e no cabeçalho um botão #cartToggle com um <b id="cartCount">.
// A gaveta é criada por este arquivo, então as páginas não precisam repetir o HTML dela.
// Fica dentro de (() => { ... })() para os nomes daqui não baterem com os de outros scripts.
(() => {
	const products = window.BLACK_FORGE_ITEMS || [];
	const cartKey = "blackforge-selection-v4";
	const $ = selector => document.querySelector(selector);
	const money = value => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

	// ---------- Cria a gaveta (overlay + aside) se a página ainda não tiver ----------
	function criarGaveta() {
		if ($("#cartDrawer")) return;
		document.body.insertAdjacentHTML("beforeend", `
			<div class="overlay" id="overlay" hidden></div>
			<aside class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-labelledby="cartTitle" aria-hidden="true" tabindex="-1">
				<div class="drawer-head">
					<div><span class="eyebrow">BLACK FORGE</span><h2 id="cartTitle">CARRINHO <span id="drawerCount">(0)</span></h2></div>
					<button class="close-btn" id="cartClose" type="button" aria-label="Fechar carrinho">✕</button>
				</div>
				<div id="cartItems" class="cart-items"></div>
				<div class="drawer-foot">
					<div class="subtotal"><span>SUBTOTAL</span><strong id="cartSubtotal">R$ 0,00</strong></div>
					<p>FRETE GRÁTIS PROMOCIONAL DURANTE OUTUBRO DE 2026.</p>
					<a class="btn btn-light checkout" href="pedido.html">FINALIZAR COMPRA ↗</a>
					<button id="continueShopping" class="continue" type="button">CONTINUAR COMPRANDO</button>
				</div>
			</aside>`);
	}

	// ---------- Ler e salvar no localStorage ----------
	function readCart() {
		try {
			const raw = JSON.parse(localStorage.getItem(cartKey) || sessionStorage.getItem(cartKey) || "{}");
			const result = {};
			for (const p of products) {
				const group = raw[p.id];
				if (!group) continue;
				const entries = Array.isArray(group.items) ? group.items : [group];
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
		try {
			localStorage.setItem(cartKey, JSON.stringify(cart));
			sessionStorage.setItem(cartKey, JSON.stringify(cart));
		} catch { }
		// Avisa outros scripts (ex.: contador do selecao.js) que o carrinho mudou.
		document.dispatchEvent(new CustomEvent("bf:cart-updated"));
	}

	// ---------- Desenha os itens ----------
	function el(tag, cls, txt) {
		const e = document.createElement(tag);
		if (cls) e.className = cls;
		if (txt !== undefined) e.textContent = txt;
		return e;
	}

	function renderCart() {
		const cart = readCart();
		const container = $("#cartItems");
		if (!container) return;
		container.replaceChildren();

		let count = 0;
		let subtotal = 0;

		for (const product of products) {
			const group = cart[product.id];
			if (!group) continue;

			group.items.forEach((item, index) => {
				count += item.qty;
				subtotal += Number(product.price) * item.qty;

				const row = el("div", "cart-item");
				const thumb = el("div", "cart-thumb", "✦");
				const info = el("div");

				const variants = [
					item.size && "Tamanho: " + item.size,
					item.color && "Cor: " + item.color,
					item.model && "Modelo: " + item.model
				].filter(Boolean).join(" · ");

				const quantity = el("div", "qty");
				const minus = el("button", "", "−");
				minus.type = "button";
				minus.addEventListener("click", () => changeQuantity(product.id, index, -1));
				const plus = el("button", "", "+");
				plus.type = "button";
				plus.addEventListener("click", () => changeQuantity(product.id, index, 1));
				quantity.append(minus, el("span", "", item.qty), plus);

				info.append(el("h3", "", product.name), el("p", "", money(product.price)), el("p", "", variants), quantity);

				const remove = el("button", "remove", "REMOVER");
				remove.type = "button";
				remove.addEventListener("click", () => removeItem(product.id, index));

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
				</div>`;
		}

		// Com itens: a lista ganha a classe "has-items" (estilo no style.css).
		// Vazio: fica com o estilo normal de .cart-items.
		container.classList.toggle("has-items", count > 0);

		const contador = $("#cartCount");
		if (contador) contador.textContent = count;
		$("#drawerCount").textContent = `(${count})`;
		$("#cartSubtotal").textContent = money(subtotal);
	}

	function changeQuantity(id, index, difference) {
		const cart = readCart();
		const group = cart[id];
		if (!group || !group.items[index]) return;
		group.items[index].qty = Math.min(20, group.items[index].qty + difference);
		if (group.items[index].qty <= 0) group.items.splice(index, 1);
		if (!group.items.length) delete cart[id];
		saveCart(cart);
	}

	function removeItem(id, index) {
		const cart = readCart();
		if (!cart[id]) return;
		cart[id].items.splice(index, 1);
		if (!cart[id].items.length) delete cart[id];
		saveCart(cart);
	}

	// ---------- Abrir e fechar ----------
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
		const botao = $("#cartToggle");
		if (botao) botao.focus();
	}

	// ---------- Liga tudo ----------
	criarGaveta();

	// O botão vem do navbar-menu.js e pode aparecer depois deste script rodar,
	// por isso escutamos o clique no documento inteiro.
	document.addEventListener("click", e => {
		if (e.target.closest("#cartToggle")) openCart();
	});
	$("#cartClose").addEventListener("click", closeCart);
	$("#continueShopping").addEventListener("click", closeCart);
	$("#overlay").addEventListener("click", closeCart);

	document.addEventListener("keydown", event => {
		if (event.key === "Escape" && $("#cartDrawer").classList.contains("open")) closeCart();
	});

	// Atualiza quando: algo é adicionado (selecao.js), a página volta do histórico,
	// ou o carrinho muda em outra aba.
	document.addEventListener("bf:cart-updated", renderCart);
	window.addEventListener("pageshow", renderCart);
	window.addEventListener("storage", e => { if (e.key === cartKey) renderCart(); });

	renderCart();

	// Outras páginas podem abrir a gaveta com BFCarrinho.abrir()
	window.BFCarrinho = { abrir: openCart, fechar: closeCart, atualizar: renderCart };
})();
