"use strict";

// BLACK FORGE — rodapé PADRÃO do site.
// Como usar:  <div id="site-footer"></div>  +  <script src="./site-footer.js" defer></script>
// Dados da empresa: mantenha iguais aos das políticas legais.
(() => {
	const lugar = document.getElementById("site-footer");
	if (!lugar) return;
	const ano = new Date().getFullYear();
	lugar.outerHTML = `
<footer class="footer fx-footer">
  <div class="fx-footer-top">
    <div class="fx-footer-brand">
      <a class="fx-brand" href="index.html" aria-label="Black Forge, página inicial"><span class="fx-brand-word">BLACK<span>FORGE</span></span></a>
      <p class="fx-footer-claim">FORGE YOUR STYLE.</p>
      <p class="fx-footer-text">Moda alternativa, underground e urbana. Feita no Brasil para quem escolhe o próprio caminho.</p>
    </div>
    <nav class="fx-footer-col" aria-label="Loja">
      <h2>LOJA</h2>
      <a href="produtos.html">Catálogo Black Forge</a>
      <a href="produtos.html#estilos">Estilos alternativos</a>
      <a href="balcker.html">BALCKER <small>em breve</small></a>
      <a href="pedido.html">Carrinho e pedido</a>
    </nav>
    <nav class="fx-footer-col" aria-label="Ajuda e políticas">
      <h2>AJUDA</h2>
      <a href="index.html#duvidas">Dúvidas frequentes</a>
      <a href="politica-entrega.html">Entregas e frete</a>
      <a href="trocas-devolucoes.html">Trocas e devoluções</a>
      <a href="termos-de-compra.html">Termos de compra</a>
      <a href="politica-privacidade.html">Privacidade e dados</a>
      <button class="bf-cookie-link" data-bf-cookie-settings type="button">Configurar cookies</button>
    </nav>
    <div class="fx-footer-col">
      <h2>ATENDIMENTO</h2>
      <a href="mailto:blackforge.oficial@gmail.com">blackforge.oficial@gmail.com</a>
      <a href="https://wa.me/5549991729078" rel="noopener noreferrer" target="_blank">WhatsApp (49) 99172-9078</a>
      <p class="fx-footer-note">Nunca envie dados completos do cartão nem senhas por mensagem.</p>
    </div>
  </div>
  <div class="fx-footer-legal" aria-label="Dados da empresa">
    <span><strong>BLACK FORGE</strong> · Razão social: 69.794.125 TATIANE APARECIDA BALCKER POLUCENO · CNPJ: 69.794.125/0001-37</span>
    <span>Endereço comercial: 10A Rua Sebastiana Coelho Avila de Souza, nº 287, Cond. Bom Jesus, bairro Poco Rico, Otacílio Costa/SC, CEP 88540-000</span>
  </div>
  <div class="fx-footer-bottom">
    <span>© ${ano} BLACK FORGE</span>
    <span>PAGAMENTO PROCESSADO PELA STRIPE</span>
    <a href="#topo">VOLTAR AO TOPO ↑</a>
  </div>
</footer>`;
})();
