"use strict";

// BLACK FORGE — barra de navegação PADRÃO do site.
// Como usar em qualquer página:
//   <div id="navbar-menu"></div>            (onde a barra deve aparecer)
//   <script src="./navbar-menu.js"></script>
// O HTML da barra fica aqui dentro (não em outro arquivo) para funcionar
// também abrindo a página direto do computador (file://), sem servidor.
// Mudou algo aqui? Muda em todas as páginas.
(() => {
	// A classe "bf-home" faz a barra usar o mesmo visual da página principal.
	const navbarHTML = `
<div class="bf-navbar bf-home">
<style id="bf-navbar-responsive-css">
/* Ajuste responsivo APENAS do menu compartilhado da Black Forge. */
.bf-navbar .header .nav {
  display:flex;
  flex-wrap:nowrap;
  align-items:center;
  gap:clamp(12px, 1.45vw, 28px);
  white-space:nowrap;
}
.bf-navbar .header .nav a { flex-shrink:0; }
@media (max-width:1220px) {
  .bf-navbar .header {
    height:auto;
    min-height:84px;
    flex-wrap:wrap;
    row-gap:9px;
    padding-top:14px;
    padding-bottom:10px;
  }
  .bf-navbar .header .nav {
    position:static;
    order:3;
    width:100%;
    justify-content:center;
    gap:clamp(12px, 2.3vw, 28px);
    padding:9px 0 4px;
    border-top:1px solid #302d2a;
    background:transparent;
  }
  .bf-navbar .header-actions { margin-left:auto; }
}
@media (max-width:700px) {
  .products-page .bf-navbar .header,
  .bf-navbar .header { margin-bottom:0; }
  .bf-navbar .header .nav {
    position:static;
    justify-content:flex-start;
    overflow-x:auto;
    overscroll-behavior-x:contain;
    max-width:100%;
    flex-wrap:nowrap;
    gap:20px;
    scrollbar-width:thin;
  }
  .bf-navbar .header .nav a { font-size:10px; }
}
</style>
<div class="announcement" aria-label="Avisos da loja">
  <span>BLACK FORGE / EST. 2026</span>
  <span>FRETE GRÁTIS EM OUTUBRO</span>
  <span>MODA ALTERNATIVA • BRASIL</span>
</div>

<header class="header" id="topo">
  <a class="brand" href="index.html" aria-label="Black Forge, página inicial">
    <span class="brand-mark" aria-hidden="true">✦</span>
    <span>BLACK<span class="brand-light">FORGE</span><small>DARKWEAR &amp; STREETWEAR</small></span>
  </a>
  <nav class="nav" aria-label="Navegação principal">
    <a href="index.html">INÍCIO</a>
    <a href="promocoes.html">PROMOÇÕES</a>
    <a href="produtos.html">PRODUTOS</a>
    <a href="colecao-outubro.html">OCTOBER DROP</a>
    <a href="anime-district.html">ANIME DISTRICT</a>
    <a href="index.html#duvidas">DÚVIDAS</a>
  </nav>
  <div class="header-actions">
    <button id="searchToggle" class="icon-btn" type="button" aria-label="Buscar produtos" aria-expanded="false">
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
    <input id="searchInput" type="search" placeholder="Buscar roupas, acessórios, calçados..." autocomplete="off">
    <button id="searchClose" type="button" aria-label="Fechar busca">✕</button>
  </div>
</div>
</div>
`;

	const lugar = document.getElementById("navbar-menu");
	if (!lugar) return;

	// Troca o <div id="navbar-menu"> pelo HTML da barra
	lugar.outerHTML = navbarHTML;
	marcarPaginaAtual();
	ligarBusca();
	// Avisa o carrinho.js para atualizar o número do botão
	document.dispatchEvent(new CustomEvent("bf:cart-updated"));

	// Destaca o link da página em que o usuário está (aria-current="page")
	function marcarPaginaAtual() {
		const paginaAtual = location.pathname.split("/").pop() || "index.html";
		for (const link of document.querySelectorAll(".header .nav a")) {
			if (link.getAttribute("href") === paginaAtual) link.setAttribute("aria-current", "page");
		}
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
