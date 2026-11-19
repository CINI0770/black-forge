# BLACK FORGE — Redesign + lançamento BALCKER (branch `feature/balcker-launch`)

## Lançamento BALCKER — 05.12.2026
- `balcker.html` + `balcker.css` + `balcker.js`: página de pré-lançamento com a paleta oficial (#0B0B0B, #191919, #D8C7AD, #F2EDE5, #858585), tipografia editorial (Cormorant Garamond + DM Sans) e contagem regressiva real para **05/12/2026 00h00, horário de Brasília (UTC−03:00)**.
- Quando a data chega, a contagem para em zero e aparece **THE NEW ERA HAS ARRIVED.** Nenhum produto é liberado: a ativação das vendas é manual.
- A contagem usa o relógio do aparelho do visitante. Se o relógio do aparelho estiver errado, o número exibido também fica errado. Isso afeta só o visual, não as vendas.
- Home, menu (“BALCKER — EM BREVE”), barra de avisos e catálogo mostram a data do lançamento.

## Anime District — compras bloqueadas no site
- `descontinuados.js` (carregado logo após `anime-catalogo.js`) marca os produtos da coleção encerrada como inativos. Os arquivos de lógica comercial não foram alterados; o bloqueio usa as regras que já existem neles:
  - a página do produto mostra **PEÇA DESCONTINUADA**, sem botão de compra, sem seletores e sem cupom;
  - tentar adicionar ao carrinho é recusado pelo `variacoes.js`;
  - um carrinho antigo com item Anime District mostra o item como “indisponível” e o pagamento fica bloqueado até a pessoa removê-lo. Os demais itens não são afetados.
- **Pendente no servidor de pagamentos (Render):** marcar os produtos `BF-AN-*` como `active: false` no catálogo do backend. Só assim pedidos enviados diretamente à API também são recusados. Isso não pôde ser feito aqui porque o backend fica em outro repositório.

---

## Redesign geral (base: PR #2)

## O que mudou
- **Nova camada visual `forge.css`** (dark, editorial). Substitui `bf-redesign.css` em todas as páginas. O arquivo antigo continua no repositório para rollback.
- **Menu** (`navbar-menu.js`): Início · Black Forge · Estilos · BALCKER (em breve) · Sobre. No celular vira menu sanfonado, que fecha com a tecla Esc. Anime District saiu do menu.
- **Rodapé compartilhado** (`site-footer.js`) com razão social, CNPJ, endereço, contatos e políticas.
- **Home** (`index.html`): FORGE YOUR STYLE., Novidades (produtos com ID mais recente), Em destaque, Estilos alternativos, bloco BALCKER, Sobre, informações de compra e Dúvidas (com o texto original).
- **Catálogo** (`produtos.html` + `render_catalogo.js`): filtros por estilo, por tipo de peça e pelas linhas BALCKER (só links “em breve”), busca, ordenação por novidades e detalhes rápidos.
- **Estilos** (`estilos.js`): um produto entra num estilo quando o nome ou a descrição cadastrados citam aquele estilo (ex.: “gótico”, “punk”, “grunge”, “Y2K”, “cargo”). Para ajustar, edite as palavras-chave nesse arquivo. Estilo sem peças aparece desativado, sem produtos fictícios.
- **BALCKER** (`balcker.html` + `balcker.css`): página de pré-lançamento sem produtos, sem preços, sem datas, sem contagem regressiva e sem formulário.
- **Anime District**: saiu do menu, da home, do catálogo, da busca e do rodapé. `anime-district.html` agora mostra um aviso de “linha encerrada” (noindex), com os canais de atendimento e um link para a BALCKER.
  - **Foi preservado:** `anime-catalogo.js`, `anime-district.js/.css`, `anime-modelos-backup.json` e todas as imagens `BF-AN-*`. O `anime-catalogo.js` continua carregado para que carrinhos antigos, o pedido e o atendimento funcionem. Um link direto `produto.html#BF-AN-xxx` ainda abre a página, mas como peça descontinuada.
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
- Contagem regressiva com relógio simulado: valores corretos, virada ao vivo à meia-noite de 05/12 (horário de Brasília) e depois da data (para em zero, sem liberar produtos).
- Bloqueio da Anime District: sem botão de compra, adição recusada e pagamento bloqueado com item antigo no carrinho; liberado depois que o item é removido.
- Links internos verificados, nenhum quebrado.
- O projeto não tem uma suíte de testes própria (não há package.json nem testes). Os testes acima foram feitos com scripts de navegador automatizado nesta sessão.
- **Não testado:** pagamento real na Stripe, porque o backend não foi acessado. Antes de publicar, teste no modo de teste da Stripe.

## Para publicar
1. Revise o Pull Request da branch `redesign-black-forge`. Se o Pages tiver um preview, abra-o pelo celular.
2. Faça o merge na branch publicada pelo GitHub Pages. O backend no Render não precisa mudar.
3. Limpe o cache do navegador e confira home, catálogo, produto, carrinho, pedido e BALCKER.
4. Rollback: reverta o merge. Os arquivos antigos (`bf-redesign.css` etc.) continuam no repositório.
