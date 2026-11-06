# BLACK FORGE — BLACK FRIDAY 2026

## Publicação do site

1. Publique **primeiro** o backend atualizado `black-forge-pagamentos-main` no Render.
2. Verifique `https://black-forge-pagamentos.onrender.com/api/campaign` para confirmar a campanha ativa com `30%`.
3. Publique o conteúdo desta pasta `black-forge-main` no GitHub Pages (ou no serviço já usado pelo domínio `lojablackforge.com.br`). Preserve os arquivos e as imagens.
4. Limpe o cache do navegador, se necessário, e verifique a campanha nas páginas `index.html`, `produtos.html`, `anime-district.html`, `promocoes.html`, `produto.html`, `pedido.html` e no carrinho.
5. Teste a finalização com Stripe em modo de teste, incluindo produtos com variações e múltiplas unidades. Só depois libere em produção.

## Como funciona

- O arquivo `black-friday.js` **consulta `/api/campaign` no backend** para saber se a campanha está ativa. O controle central fica em **`black-forge-pagamentos-main/black-friday.json`**; não é necessário editar o catálogo nem o site para desativar.
- Não há contador regressivo até que uma **data real** de encerramento seja definida no servidor.
- 30% de desconto em todos os produtos, incluindo Anime District, sem cupom, com original riscado, preço automático e etiqueta.
- Carrinho, pedido e Stripe usam valores calculados em centavos no servidor. O frete normal é preservado, inclusive frete já embutido da Anime District.
- BLACK5 e outros cupons não são aplicados durante a promoção; ao desativá-la, o mecanismo anterior de cupom volta a ficar disponível.
- Os arquivos originais `catalogo.js`, `anime-catalogo.js` e `variacoes.js` não foram alterados. Todas as 519 imagens presentes no ZIP anterior foram preservadas exatamente.
- Se a página não conseguir consultar o backend, não anunciará automaticamente o desconto até validar a campanha. Por isso, **publique e teste o backend antes do site**.

## Observações de testes

- Lógica do servidor testada com 281 produtos ativos, incluindo 119 da Anime District, múltiplas unidades, percentuais, arredondamento e não cumulatividade, com Stripe/Supabase **simulados**.
- Teste da atualização visual e da mudança de modelo feito na lógica JavaScript com DOM simulado.
- Não houve cobrança real. O navegador automatizado disponível bloqueou a abertura das páginas locais; **verifique o visual e a responsividade em celulares e desktop após a publicação**.
