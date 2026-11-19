# BLACK FORGE — Meta Pixel (site) + API de Conversões (servidor)

Pixel: **1848258306208127** (já configurado em `privacidade-pixel.js`; existe um único carregamento do Pixel em todo o site).

## Eventos
| Evento | Onde | Quando dispara | Valor / moeda | event_id |
|---|---|---|---|---|
| PageView | todas as páginas (`privacidade-pixel.js`) | ao carregar a página, se a publicidade foi aceita | — | — |
| ViewContent | `produto.html` (`meta-eventos.js`) | ao abrir um produto ativo (peças descontinuadas não disparam) | preço exibido, já com a Black Friday quando ela estiver ativa, em BRL | `vc-…` |
| AddToCart | `produto.html` (`meta-eventos.js`) | só quando o carrinho **aceita** o item (opções válidas) | preço da variação escolhida, em BRL | `atc-…` |
| InitiateCheckout | `pedido.html` (`pedido.js` → `meta-eventos.js`) + **servidor** | depois que o servidor **cria a sessão de Checkout da Stripe** | total calculado pelo servidor (desconto + frete), em BRL | `checkout-<pedido>` (igual no servidor) |
| Purchase | **servidor** (webhook Stripe) + `retorno.html` (`retorno.js`) | servidor: quando a Stripe confirma o pagamento. Navegador: só se o servidor responder que o pedido está `paid` | total real cobrado, em BRL | `purchase-<pedido>` (igual no servidor) |

### Por que o Purchase é seguro
- Abrir `retorno.html` **não** dispara nada sozinho. A página consulta `GET /api/checkout/confirmation?session_id=…` no servidor, que só responde `paid` depois que o **webhook assinado da Stripe** confirmou o pagamento.
- **Pagamentos assíncronos** (ex.: boleto): `checkout.session.completed` chega com `unpaid`, e nada é enviado. Quando chega `checkout.session.async_payment_succeeded`, o servidor envia o Purchase pela API de Conversões, mesmo que o cliente já tenha fechado a página.
- Navegador e servidor usam o mesmo `event_id`, e a Meta conta uma única compra. Recarregar a página de sucesso não repete o evento (há uma trava por pedido no navegador).

### Consentimento (LGPD)
- Sem clicar em “Aceitar publicidade”, a biblioteca da Meta **não é carregada** e **nenhum evento** sai do navegador.
- O checkout informa ao servidor se o cliente aceitou (`bf_marketing_consent`) e envia os cookies `_fbp`/`_fbc` **só com aceite**. Sem aceite, o servidor não envia nada à Meta.
- O aviso de cookies agora aparece em todas as páginas. “Configurar cookies”, no rodapé, permite mudar a escolha.
- O navegador não envia dados pessoais. O servidor envia e-mail, telefone, nome, cidade, UF e CEP **apenas em hash SHA-256**.

## Ordem de publicação
1. **Servidor primeiro** (repo `black-forge-pagamentos`, branch `feature/meta-capi`): faça o merge e o deploy no Render e configure as variáveis abaixo.
2. **Depois o site** (este repo): faça o merge do PR do redesign/BALCKER e depois deste PR de Pixel.
   - Se o site for publicado antes do servidor, a página de retorno apenas mostra “em processamento” e **não** dispara o Purchase. Nada quebra.

### Variáveis no Render (Environment)
- `META_PIXEL_ID=1848258306208127`
- `META_CAPI_ACCESS_TOKEN=` gerado em **Gerenciador de Eventos > Fontes de dados > (Pixel) > Configurações > API de Conversões > Gerar token de acesso**. Nunca coloque no GitHub nem no site.
- `META_TEST_EVENT_CODE=` só durante os testes (veja abaixo). **Apague depois.**

## Como testar no Gerenciador de Eventos da Meta
1. **Abra a ferramenta de teste:** Gerenciador de Eventos > selecione o Pixel **1848258306208127** > aba **Testar eventos**.
2. **Eventos do navegador:** em “Confirmar eventos do navegador”, informe `https://lojablackforge.com.br` (ou a URL de prévia) e clique em **Abrir site**. Na janela que abrir:
   - clique em **Aceitar publicidade** no aviso de cookies → deve aparecer **PageView**;
   - abra um produto → **ViewContent** (com `value`, `currency: BRL`, `content_ids`);
   - escolha as opções e clique em **Adicionar ao carrinho** → **AddToCart**. Tente adicionar sem escolher as opções: **não** deve aparecer nada;
   - vá ao carrinho, preencha os dados e clique em pagar → **InitiateCheckout** só aparece depois que a página da Stripe é aberta.
   - Extensão opcional: **Meta Pixel Helper** (Chrome) mostra cada evento e seus parâmetros.
3. **Eventos do servidor:** copie o **código de teste** (ex.: `TEST12345`) para `META_TEST_EVENT_CODE` no Render e reinicie o serviço. A Stripe precisa estar em **modo de teste** (chave `sk_test_` e webhook de teste).
   - Faça uma compra de teste com o cartão `4242 4242 4242 4242` (qualquer data futura e qualquer CVC).
   - Na aba Testar eventos deve aparecer **InitiateCheckout (Servidor)** ao abrir o checkout e **Purchase (Servidor)** quando o webhook confirmar. O Purchase do navegador aparece na página de retorno. A coluna de deduplicação deve mostrar que os dois foram **combinados** (mesmo `event_id`).
   - Confira se o `value` do Purchase é o total pago na Stripe.
4. **Pagamento assíncrono:** se a sua conta Stripe oferecer boleto, pague um pedido de teste por boleto. Na página de retorno deve aparecer “Pagamento em processamento”, **sem Purchase**. Simule o pagamento no painel da Stripe (modo de teste): o Purchase do servidor aparece só nesse momento.
5. **Sem consentimento:** em uma janela anônima, clique em **Rejeitar publicidade** e repita a compra. **Nenhum evento** deve aparecer no Testar eventos.
6. **Depois dos testes:** apague `META_TEST_EVENT_CODE` no Render. Na aba **Visão geral**, acompanhe nas horas seguintes a “Qualidade da correspondência de eventos” e o indicador de deduplicação.

## Arquivos
- `privacidade-pixel.js`: o gancho `blackForgeMetaTrack` agora aceita `eventID` e avisa quando o consentimento muda.
- `meta-eventos.js` (novo): ViewContent, AddToCart, InitiateCheckout e campos de consentimento no checkout.
- `retorno.js` (novo) + `retorno.html`: confirmação pelo servidor e Purchase.
- `pedido.js`: **duas linhas**. Guarda o orçamento que já era calculado e chama o InitiateCheckout antes de ir para a Stripe. O envio do pedido e a Stripe não mudaram.
- Páginas: o Pixel/aviso de cookies foi incluído em catálogo, produto, pedido, retorno, BALCKER e Anime District.
- `politica-privacidade.html`: o texto agora descreve o Pixel ativo e a API de Conversões. **Revise antes de publicar.**
