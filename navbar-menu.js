"use strict";

// BLACK FORGE — barra de navegação PADRÃO do site.
// Como usar em qualquer página:
//   <div id="navbar-menu"></div>            (onde a barra deve aparecer)
//   <script src="./navbar-menu.js"></script>
// O HTML da barra fica aqui dentro para funcionar também abrindo a página
// direto do computador (file://), sem servidor. Mudou aqui? Muda em todas as páginas.
// IDs usados por outros scripts (não renomear): cartToggle, cartCount,
// searchToggle, searchPanel, searchInput, searchClose.
(() => {
	const navbarHTML = `
<div class="bf-navbar fx-navbar">
<div class="announcement" aria-label="Avisos da loja">
  <span>BLACK FORGE / BRASIL</span>
  <span>FEITO PARA SER DIFERENTE · MODA ALTERNATIVA</span>
  <span>BALCKER — 05.12.2026</span>
</div>

<header class="header fx-header" id="topo">
  <button id="menuToggle" class="icon-btn fx-menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mainNav">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
  </button>
  <a class="brand fx-brand" href="index.html" aria-label="Black Forge, página inicial">
    <span class="fx-brand-word">BLACK<span>FORGE</span></span>
  </a>
  <nav class="nav fx-nav" id="mainNav" aria-label="Navegação principal">
    <a href="index.html">INÍCIO</a>
    <a href="produtos.html" data-nav="catalogo">BLACK FORGE</a>
    <a href="produtos.html#estilos" data-nav="estilos">ESTILOS</a>
    <a href="balcker.html" class="fx-nav-balcker">BALCKER <small>— EM BREVE</small></a>
    <a href="index.html#sobre">SOBRE</a>
  </nav>
  <div class="header-actions">
    <button id="searchToggle" class="icon-btn" type="button" aria-label="Buscar produtos" aria-expanded="false" aria-controls="searchPanel">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 5 5"/></svg>
    </button>
    <button id="cartToggle" class="cart-trigger" type="button" aria-label="Abrir carrinho">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16l-1.3 14H5.3L4 7ZM9 9V6a3 3 0 0 1 6 0v3"/></svg>
      <span>CARRINHO</span><b id="cartCount">0</b>
    </button>
  </div>
</header>

<div id="searchPanel" class="search-panel" hidden>
  <label for="searchInput">ENCONTRE SUA PRÓXIMA PEÇA</label>
  <div class="search-row">
    <input id="searchInput" type="search" placeholder="Buscar por peça, estilo ou código..." autocomplete="off" enterkeyhint="search">
    <button id="searchClose" type="button" aria-label="Fechar busca">✕</button>
  </div>
</div>
</div>
`;

	const lugar = document.getElementById("navbar-menu");
	if (!lugar) return;

	lugar.outerHTML = navbarHTML;
	marcarPaginaAtual();
	ligarMenuMobile();
	ligarBusca();
	// Avisa o carrinho.js para atualizar o número do botão
	document.dispatchEvent(new CustomEvent("bf:cart-updated"));

	// Destaca o link da página em que o usuário está (aria-current="page")
	function marcarPaginaAtual() {
		const paginaAtual = location.pathname.split("/").pop() || "index.html";
		for (const link of document.querySelectorAll(".fx-nav a")) {
			const href = link.getAttribute("href");
			if (href === paginaAtual) link.setAttribute("aria-current", "page");
		}
	}

	// Menu sanfonado no celular
	function ligarMenuMobile() {
		const botao = document.getElementById("menuToggle");
		const menu = document.getElementById("mainNav");
		if (!botao || !menu) return;
		const abrir = aberto => {
			botao.setAttribute("aria-expanded", String(aberto));
			botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
			menu.classList.toggle("is-open", aberto);
			document.body.classList.toggle("fx-menu-open", aberto);
		};
		botao.addEventListener("click", () => abrir(botao.getAttribute("aria-expanded") !== "true"));
		menu.addEventListener("click", e => { if (e.target.closest("a")) abrir(false); });
		document.addEventListener("keydown", e => {
			if (e.key === "Escape" && menu.classList.contains("is-open")) { abrir(false); botao.focus(); }
		});
		window.matchMedia("(min-width: 961px)").addEventListener?.("change", e => { if (e.matches) abrir(false); });
	}

	// Botão de lupa: abre/fecha o painel de busca
	function ligarBusca() {
		const $ = seletor => document.querySelector(seletor);
		const painel = $("#searchPanel");
		const botao = $("#searchToggle");
		const campo = $("#searchInput");
		if (!painel || !botao) return;

		function mostrarBusca(mostrar) {
			painel.hidden = !mostrar;
			botao.setAttribute("aria-expanded", String(mostrar));
			if (mostrar) campo.focus();
		}

		botao.addEventListener("click", () => mostrarBusca(painel.hidden));
		$("#searchClose").addEventListener("click", () => {
			campo.value = "";
			mostrarBusca(false);
			botao.focus();
		});
		campo.addEventListener("keydown", e => {
			const busca = campo.value.trim();
			if (e.key === "Enter" && busca) location.href = "produtos.html?busca=" + encodeURIComponent(busca);
		});
		document.addEventListener("keydown", e => {
			if (e.key === "Escape" && !painel.hidden) mostrarBusca(false);
		});
	}
})();
