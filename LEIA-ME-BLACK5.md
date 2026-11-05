# BLACK FORGE — Atualização BLACK5 | 05/11/2026

Os arquivos existentes do site foram mantidos e atualizados no lugar. A vitrine e o pagamento são serviços diferentes; publique o ZIP de pagamentos no Render antes de publicar o ZIP da loja no GitHub Pages.

- Cupom BLACK5: 5% sobre o subtotal em centavos, frete grátis, sem mínimo, sem data final. Validação final acontece sempre no backend.
- Catálogos originais não foram alterados: `catalogo.js`, `anime-catalogo.js`, preços, fotos, variações e IDs permanecem iguais. Produtos BF-138 a BF-165 estavam no catálogo; foram recuperados no agrupamento principal, inclusive VESTIDOS, CINTOS e ACESSÓRIOS.
- A URL antiga `colecao-outubro.html` redireciona ao catálogo ou ao produto com ID na âncora.
- No carrinho e no pedido, informe BLACK5 e clique **APLICAR CUPOM**; o site consulta `/api/checkout/quote` e só grava o código quando o servidor aprova. O código persiste no navegador até ser removido.
- O frontend mostra preços-base e preços **condicionados ao cupom**, não altera o preço de venda permanentemente. Para variantes com preço específico, a página individual atualiza ambos os valores.
- O backend configura novos cupons em `cupons.json` (ZIP de pagamentos). Para encerrar BLACK5 e retirar sua comunicação visual, altere também `black5.js` e os banners.
- **Sem publicar e configurar o backend, o site não pode validar nem cobrar o cupom de verdade.** Uma falha de rede bloqueia a confirmação do cupom, em vez de cobrar um valor não verificado.
- As regras antigas de frete grátis em outubro e o anúncio de 15% de lançamento não devem voltar a ser publicados.

## Conferência para lançamento

Verifique em ambiente de teste da Stripe: desconto no resumo, frete grátis, cobrança real, webhook no Supabase, diferentes variantes BF-020 e BF-078, anime e compras mistas, versão mobile e desktop.
