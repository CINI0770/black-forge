"use strict";
const catalogItems = window.BLACK_FORGE_ITEMS || [];
const root = document.getElementById("catalogSections");

// Vitrine BLACK FORGE: oito seções, incluindo a coleção promocional.
const ordemCategorias = [
	"COLARES",
	"ANÉIS E PULSEIRAS",
	"CINTOS E ACESSÓRIOS",
	"CAMISETAS E CAMISAS",
	"MOLETONS E CASACOS",
	"CALÇAS E SAIAS",
	"CALÇADOS",
	"PROMOÇÕES",
  "ANIME DISTRICT"
];

// As categorias já estão definidas no catalogo.js.
const gruposProdutos = Object.fromEntries(ordemCategorias.map(c => [c, []]));
const numeroBF = p => Number((String(p.id || "").match(/\d+/) || [Infinity])[0]);
for (const p of catalogItems) {
	if (!p || p.active === false || p.placeholder || !(Number(p.price) > 0)) continue;
	const grupo = p.collection === "anime-district" ? "ANIME DISTRICT" : p.category;
	if (gruposProdutos[grupo]) gruposProdutos[grupo].push(p);
}
for (const lista of Object.values(gruposProdutos)) {
	lista.sort((a, b) => numeroBF(a) - numeroBF(b) || String(a.id).localeCompare(String(b.id)));
}
const groups = ordemCategorias.filter(c => gruposProdutos[c].length);

const money = n => Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function el(tag, cls, txt) { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }
for (const category of groups) {
	const items = gruposProdutos[category];
	const section = el("section", "category-section"); section.id = "categoria-" + groups.indexOf(category);
	const head = el("div", "category-head"), heading = el("div"); heading.append(el("p", "eyebrow", "CATÁLOGO / " + items.length + " PRODUTOS"), el("h2", "", category)); head.append(heading, el("span", "", items.length + " PRODUTOS")); section.append(head);
	const grid = el("div", "slot-grid");
	for (const [i, p] of items.entries()) {
		const active = p.active !== false && !p.placeholder && Number(p.price) > 0;
		const card = el("article", "slot-card"); card.dataset.productId = p.id;
		const art = el("div", "slot-art");
		const photoList = (Array.isArray(p.images) ? p.images : []).filter(Boolean);
		if (!photoList.length && p.image) photoList.push(p.image);
		if (photoList.length) {
			const img = el("img", "bf-product-image"); let current = 0;
			const show = () => { img.src = photoList[current]; img.alt = (p.name || p.id) + " — foto " + (current + 1); };
			img.loading = "lazy"; img.onerror = () => { img.style.display = "none"; if (!art.querySelector(".slot-icon")) art.append(el("span", "slot-icon", p.category === "PROMOÇÕES" ? "BLACK FORGE" : "SEM FOTO")) };
			img.onload = () => { img.style.display = "" }; show(); art.append(img);
			if (photoList.length > 1) {
				const controls = el("div", "bf-gallery-controls");
				const prev = el("button", "", "‹"), next = el("button", "", "›");
				prev.type = next.type = "button";
				prev.setAttribute("aria-label", "Foto anterior"); next.setAttribute("aria-label", "Próxima foto");
				prev.addEventListener("click", () => { current = (current - 1 + photoList.length) % photoList.length; show() });
				next.addEventListener("click", () => { current = (current + 1) % photoList.length; show() });
				controls.append(prev, next); art.append(controls);
			}
		} else art.append(el("span", "slot-icon", "＋"));
		art.append(el("span", "slot-index", String(i + 1).padStart(2, "0") + " / " + items.length));
		const info = el("div", "slot-info"); info.append(el("p", "", category), el("h3", "", p.name || "PRODUTO " + p.id + " — NÃO CADASTRADO"));
		if (p.description) info.append(el("p", "bf-description", p.description));
		if (p.category === "PROMOÇÕES" && Number(p.originalPrice) > Number(p.price)) {
			const oldPrice = el("s", "bf-original-price", money(p.originalPrice));
			oldPrice.style.cssText = "display:block;opacity:.65;font-size:.84em;margin:8px 0 3px";
			info.append(oldPrice);
		}
		if (Number(p.price) > 0) info.append(el("strong", "bf-price", money(p.price)));
		else info.append(el("span", "", p.placeholder ? "ESPAÇO RESERVADO" : "PREÇO A DEFINIR"));
		if (active) { const btn = el("button", "slot-choose", "ADICIONAR AO CARRINHO +"); btn.type = "button"; if ([p.sizes, p.colors, p.variants].some(a => Array.isArray(a) && a.length)) { btn.addEventListener("click", () => irParaProduto(p)); btn.textContent = "ESCOLHER OPÇÕES +"; } else btn.dataset.select = p.id; info.append(btn) }
		else info.append(el("span", "bf-reserved", "INDISPONÍVEL ATÉ CADASTRAR PREÇO"));
		const detail = el("button", "bf-open-details", "VER DETALHES ↗");
		detail.type = "button"; detail.addEventListener("click", () => irParaProduto(p));
		art.addEventListener("click", e => { if (!e.target.closest("button")) irParaProduto(p) });
		art.style.cursor = "pointer";
		info.append(detail);
		card.append(art, info); grid.append(card);
	}
	section.append(grid); root.append(section);
}

// Abre a página do produto: produto.html#ID (ex.: produto.html#BF-001)
function irParaProduto(p) {
	location.href = "produto.html#" + encodeURIComponent(p.id);
}
