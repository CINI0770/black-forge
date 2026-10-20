"use strict";

// BLACK FORGE — página principal: ano do rodapé.
// A barra de navegação (com a busca) fica no navbar-menu.js.
// O carrinho fica no carrinho.js.
(() => {
	const ano = document.getElementById("year");
	if (ano) ano.textContent = new Date().getFullYear();
})();
