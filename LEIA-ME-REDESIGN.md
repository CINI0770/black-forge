# BLACK FORGE — Redesign + pré-lançamento BALCKER (branch `redesign-black-forge`)

## O que mudou
- **Nova camada visual `forge.css`** (dark, editorial). Substitui `bf-redesign.css` em todas as páginas. O arquivo antigo continua no repositório para rollback.
- **Menu** (`navbar-menu.js`): Início · Black Forge · Estilos · BALCKER (em breve) · Sobre. No celular vira menu sanfonado, que fecha com a tecla Esc. Anime District saiu do menu.
- **Rodapé compartilhado** (`site-footer.js`) com razão social, CNPJ, endereço, contatos e políticas.
- **Home** (`index.html`): FORGE YOUR STYLE., Novidades (produtos com ID mais recente), Em destaque, Estilos alternativos, bloco BALCKER, Sobre, informações de compra e Dúvidas (com o texto original).
- **Catálogo** (`produtos.html` + `render_catalogo.js`): filtros por estilo, por tipo de peça e pelas linhas BALCKER (só links “em breve”), busca, ordenação por novidades e detalhes rápidos.
- **Estilos** (`estilos.js`): um produto entra num estilo quando o nome ou a descrição cadastrados citam aquele estilo (ex.: “gótico”, “punk”, “grunge”, “Y2K”, “cargo”). Para ajustar, edite as palavras-chave nesse arquivo. Estilo sem peças aparece desativado, sem produtos fictícios.
- **BALCKER** (`balcker.html` + `balcker.css`): página de pré-lançamento sem produtos, sem preços, sem datas, sem contagem regressiva e sem formulário.
- **Anime District**: saiu do menu, da home, do catálogo e do rodapé. `anime-district.html` agora mostra um aviso de “linha encerrada” (noindex) com os canais de atendimento.
  - **Foi preservado:** `anime-catalogo.js`, `anime-district.js/.css`, `anime-modelos-backup.json` e todas as imagens `BF-AN-*`. O `anime-catalogo.js` continua carregado para que carrinhos antigos, o pedido e o atendimento funcionem. Um link direto `produto.html#BF-AN-xxx` ainda abre a página do produto.
- Produto, pedido, retorno e políticas receberam só o novo tema. No checkout, só o visual ficou mais neutro.

## O que NÃO mudou
`carrinho.js`, `pedido.js`, `selecao.js`, `variacoes.js`, `produto.js`, `black5.js`, `black-friday.js`, `catalogo.js`, `anime-catalogo.js`, `privacidade-pixel.js`, `CNAME`. Nenhuma chamada ao backend (Render/Stripe) foi alterada. Os IDs do formulário de pedido continuam os mesmos.

URLs antigas continuam funcionando: `produtos.html?categoria=...`, `?busca=...`, `?ordem=...`, `colecao-outubro.html`, `promocoes.html` e `anime-district.html`.

## Testes feitos (navegador automatizado, localmente)
- Adicionar produto simples ao carrinho; produto com variação bloqueado sem escolha e aceito com escolha (BF-020).
- Carrinho antigo com item Anime District aparece na gaveta e no pedido.
- Filtros por estilo e busca, detalhes rápidos, links antigos e redirecionamentos.
- BALCKER sem preço, sem formulário e sem botão de compra.
- Menu mobile com teclado. Sem rolagem lateral em 320, 360, 414, 768, 1024 e 1440 px. Sem erros de JavaScript.
- Visual com Black Friday ativa (resposta do servidor simulada) e com o cupom BLACK5.
- **Não testado:** pagamento real na Stripe, porque o backend não foi acessado. Antes de publicar, teste no modo de teste da Stripe.

## Para publicar
1. Revise o Pull Request da branch `redesign-black-forge`. Se o Pages tiver um preview, abra-o pelo celular.
2. Faça o merge na branch publicada pelo GitHub Pages. O backend no Render não precisa mudar.
3. Limpe o cache do navegador e confira home, catálogo, produto, carrinho, pedido e BALCKER.
4. Rollback: reverta o merge. Os arquivos antigos (`bf-redesign.css` etc.) continuam no repositório.
