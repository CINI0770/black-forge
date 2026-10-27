/* BLACK FORGE / ANIME DISTRICT — 119 produtos BF-AN-001 a BF-AN-119.
   Precos mantidos exatamente como no cadastro recebido.
   Para a vitrine: carregue catalogo.js ANTES de anime-catalogo.js.
   Para o servidor Stripe: o payment-server.js le este arquivo apos catalogo.js.
   As imagens .jpg precisam existir em /imagens/ para exibicao real.
*/
(function () {
  "use strict";
  const animeProducts = [
  {
    "id": "BF-AN-001",
    "name": "Regata Dark Duality Y2K",
    "category": "BLUSAS E CROPPEDS",
    "anime_category": "Blusas e croppeds",
    "collection": "anime-district",
    "anime": "",
    "price": 89.9,
    "images": [
      "imagens/BF-AN-001-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-001-01.jpg"
    ],
    "description": "Regata feminina Y2K com estampa estilo mangá, alças finas e estética grunge. Uma peça alternativa que combina influências góticas, emo e streetwear.",
    "sizes": [
      "P",
      "M",
      "G",
      "GG"
    ],
    "colors": [
      "Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Regata feminina punk grunge Y2K manga",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-002",
    "name": "Brincos Ronin Triple",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "One Piece",
    "price": 59.9,
    "images": [
      "imagens/BF-AN-002-01.jpg",
      "imagens/BF-AN-002-02.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-002-01.jpg",
      "imagens/BF-AN-002-02.jpg"
    ],
    "description": "Brincos triplos de pressão inspirados na estética dos espadachins de anime. Design metálico com três argolas e pingentes alongados, sem necessidade de perfuração. Disponíveis em prata e dourado. Ideais para composições alternativas, streetwear e cosplay.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Prata",
      "Dourado"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Brincos Zoro One Piece piercing triplo falso cosplay",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-003",
    "name": "Camiseta Hunter Manga Noir",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-003-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-003-01.jpg"
    ],
    "description": "Camiseta bege com estampa de mangá em preto, visual retrô e estética streetwear japonesa.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta harajuku",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-004",
    "name": "Camiseta Hunter Gon Vintage",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-004-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-004-01.jpg"
    ],
    "description": "Camiseta bege com estampa vintage de Gon e composição gráfica inspirada nos clássicos mangás japoneses.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter Gon camiseta vintage",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-005",
    "name": "Camiseta Hunter Eclipse Blue",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-005-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-005-01.jpg"
    ],
    "description": "Camiseta preta com estampa de anime em tons azuis e brancos. Uma peça marcante para looks urbanos e alternativos.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta preta azul",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-006",
    "name": "Camiseta Hunter Retro Panels",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-006-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-006-01.jpg"
    ],
    "description": "Camiseta bege com arte em quadros de mangá e tonalidades retrô. Combina estética japonesa com moda alternativa.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta manga retro",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-007",
    "name": "Camiseta Hunter Manga Frames",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-007-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-007-01.jpg"
    ],
    "description": "Camiseta bege com composição de painéis de mangá em preto e branco, inspirada no visual das histórias japonesas.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta manga panels",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-008",
    "name": "Camiseta Hunter Phantom Violet",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-008-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-008-01.jpg"
    ],
    "description": "Camiseta preta com ilustração em tons roxos, combinando referências de anime, streetwear e estética dark.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta preta roxa",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-009",
    "name": "Camiseta Hunter Mystic Eye",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-009-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-009-01.jpg"
    ],
    "description": "Camiseta bege com ilustração mística em roxo, trazendo um toque sombrio e alternativo ao estilo anime.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta simbolo roxo",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-010",
    "name": "Camiseta Hunter Pop Art",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-010-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-010-01.jpg"
    ],
    "description": "Camiseta bege com estampa de personagem em moldura rosa, misturando referências de anime e pop art japonesa.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta anime rosa",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-011",
    "name": "Camiseta Hunter Street Orange",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-011-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-011-01.jpg"
    ],
    "description": "Camiseta preta com composição gráfica colorida em tons de laranja e verde. Visual streetwear inspirado no universo anime.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta anime preta laranja",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-012",
    "name": "Camiseta Hunter Shadow Duo",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-012-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-012-01.jpg"
    ],
    "description": "Camiseta bege com estampa monocromática de personagens em silhueta, ideal para um visual minimalista e alternativo.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta bege silhuetas",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-013",
    "name": "Camiseta Hunter Silent Gaze",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-013-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-013-01.jpg"
    ],
    "description": "Camiseta bege com estampa horizontal de olhos em estilo mangá, trazendo uma estética discreta e misteriosa.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta olhos anime",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-014",
    "name": "Camiseta Hunter Dark Scene",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-014-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-014-01.jpg"
    ],
    "description": "Camiseta preta com arte de mangá em preto e branco, de visual intenso e urbano, perfeita para composições grunge.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta preta manga",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-015",
    "name": "Camiseta Hunter Violet Echo",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-015-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-015-01.jpg"
    ],
    "description": "Camiseta preta com elementos gráficos roxos e ilustração de anime, combinando identidade underground e streetwear.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta preta violeta",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-016",
    "name": "Camiseta Hunter Electric Blue",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 79.9,
    "images": [
      "imagens/BF-AN-016-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-016-01.jpg"
    ],
    "description": "Camiseta preta com estampa azul elétrica e composição de mangá, ideal para um estilo alternativo marcante.",
    "sizes": [
      "PP",
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hunter x Hunter camiseta preta azul manga",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-017",
    "name": "Caneta Katana Névoa Azul",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-017-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-017-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Visual azul-esverdeado e lâmina inspirada na estética dos caçadores de demônios.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Névoa Azul",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-018",
    "name": "Caneta Katana Relâmpago Dourado",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-018-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-018-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Visual amarelo e detalhes que remetem à velocidade do relâmpago.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Relâmpago Dourado",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-019",
    "name": "Caneta Katana Caçador Verde",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-019-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-019-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Estilo verde e preto com detalhes de katana.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Caçador Verde",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-020",
    "name": "Caneta Katana Chama Carmesim",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-020-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-020-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Estilo flamejante com detalhes vermelhos e dourados.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Chama Carmesim",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-021",
    "name": "Caneta Katana Coração Rosa",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-021-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-021-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Design delicado em rosa e verde, inspirado no universo dos animes.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Coração Rosa",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-022",
    "name": "Caneta Katana Borboleta Violeta",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-022-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-022-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Detalhes roxos com visual leve e elegante.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Borboleta Violeta",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-023",
    "name": "Caneta Katana Água Silenciosa",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-023-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-023-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Estilo sóbrio com espada de acabamento prateado.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Água Silenciosa",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-024",
    "name": "Caneta Katana Som Prateado",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-024-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-024-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Design com contraste escuro e detalhes metálicos.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Som Prateado",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-025",
    "name": "Caneta Katana Caçador Esmeralda",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-025-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-025-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Estampa de caçador com detalhes verdes e espada estilizada.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Caçador Esmeralda",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-026",
    "name": "Caneta Katana Fera Prateada",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-026-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-026-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Visual de caçador mascarado e acabamento prateado.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Fera Prateada",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-027",
    "name": "Caneta Katana Serpente Sombria",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-027-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-027-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Modelo preto com detalhes inspirados em serpentes.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Serpente Sombria",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-028",
    "name": "Caneta Katana Jornada do Caçador",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-028-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-028-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Composição de personagem e espada em tons escuros.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Jornada do Caçador",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-029",
    "name": "Caneta Katana Duelo Elemental",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-029-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-029-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Estilo com lâmina em tons de vermelho e azul.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Duelo Elemental",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-030",
    "name": "Caneta Katana Lâmina Noturna",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-030-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-030-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Detalhes escuros e lâmina contrastante em vermelho e branco.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Lâmina Noturna",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-031",
    "name": "Caneta Katana Flor Noturna",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-031-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-031-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Estampa de personagem e visual delicado em tons frios.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Flor Noturna",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-032",
    "name": "Caneta Katana Marca Carmesim",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-032-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-032-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Arte em tons avermelhados com estética de batalha.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Marca Carmesim",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-033",
    "name": "Caneta Katana Instinto Selvagem",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-033-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-033-01.jpg"
    ],
    "description": "Caneta gel temática de anime com corpo inspirado em katana, ponta de 0,5 mm e tinta preta. Estilo de guerreiro e katana com detalhes marcantes.",
    "sizes": [
      "Único"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Caneta gel katana Demon Slayer 0.5mm Instinto Selvagem",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-034",
    "name": "Mini Figura L Lawliet",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Death Note",
    "price": 49.9,
    "images": [
      "imagens/BF-AN-034-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-034-01.jpg"
    ],
    "description": "Mini figura decorativa do personagem L Lawliet, inspirada em Death Note. Peça compacta e estilizada, ideal para fãs de anime, colecionadores e composições geek com visual alternativo.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Death Note mini figure L Lawliet",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-035",
    "name": "Mini Figura Misa Amane",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Death Note",
    "price": 49.9,
    "images": [
      "imagens/BF-AN-035-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-035-01.jpg"
    ],
    "description": "Mini figura decorativa da Misa Amane, inspirada em Death Note. Modelo compacto com acabamento estilizado, perfeito para colecionadores e fãs de estética anime.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Death Note mini figure Misa Amane",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-036",
    "name": "Mini Figura Ryuk",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Death Note",
    "price": 49.9,
    "images": [
      "imagens/BF-AN-036-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-036-01.jpg"
    ],
    "description": "Mini figura decorativa do Ryuk, inspirada em Death Note. Uma peça compacta com visual marcante, ideal para coleções, decoração geek e fãs do universo dark do anime.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Death Note mini figure Ryuk",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-037",
    "name": "Mini Figura Light Yagami",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Death Note",
    "price": 49.9,
    "images": [
      "imagens/BF-AN-037-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-037-01.jpg"
    ],
    "description": "Mini figura decorativa do Light Yagami, inspirada em Death Note. Peça estilizada e compacta, perfeita para fãs do anime e para compor coleções com identidade geek.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Death Note mini figure Light Yagami",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-038",
    "name": "Mini Figura Bulbasaur",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Pokémon",
    "price": 109.9,
    "images": [
      "imagens/BF-AN-038-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-038-01.jpg"
    ],
    "description": "Mini figura colecionável do Bulbasaur, do universo Pokémon. Com visual adorável, acabamento colorido e tamanho compacto, é ideal para decorar mesas, estantes e espaços personalizados. Uma peça especial para fãs de anime e colecionadores.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Verde"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Pokemon Bulbasaur mini figure collectible",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-039",
    "name": "Laço Borboleta Shinobu",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 49.9,
    "images": [
      "imagens/BF-AN-039-01.jpg",
      "imagens/BF-AN-039-02.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-039-01.jpg",
      "imagens/BF-AN-039-02.jpg"
    ],
    "description": "Laço de cabelo inspirado na Shinobu Kocho de Demon Slayer. Com design de asas de borboleta, tons delicados de rosa e verde e acabamento em preto, combina perfeitamente com produções kawaii, cosplay e moda alternativa. Um acessório marcante para transformar qualquer penteado.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Rosa e Verde"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Shinobu Kocho butterfly hair bow Demon Slayer",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-040",
    "name": "Figura Chainsaw Man Denji Sentado",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Chainsaw Man",
    "price": 109.9,
    "images": [
      "imagens/BF-AN-040-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-040-01.jpg"
    ],
    "description": "Figura colecionável de Denji em sua transformação Chainsaw Man, sentado sobre as lâminas. Modelo em PVC com visual sombrio e detalhes marcantes. Versão sem caixa.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Chainsaw Man Denji C no box figure",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-041",
    "name": "Figura Chainsaw Man Denji Sentado Box",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Chainsaw Man",
    "price": 139.9,
    "images": [
      "imagens/BF-AN-041-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-041-01.jpg"
    ],
    "description": "Figura colecionável de Denji em sua forma Chainsaw Man, com pose sentada sobre as lâminas. Acompanha caixa ilustrada temática, ideal para exposição e coleção.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Chainsaw Man Denji C with box figure",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-042",
    "name": "Figura Chainsaw Man Berserker Box",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Chainsaw Man",
    "price": 179.9,
    "images": [
      "imagens/BF-AN-042-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-042-01.jpg"
    ],
    "description": "Figura colecionável de Chainsaw Man em pose de combate, com motosserra, base de exposição e detalhes intensos. Acompanha caixa temática ilustrada.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Chainsaw Man Denji B with box figure",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-043",
    "name": "Figura Chainsaw Man Berserker",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Chainsaw Man",
    "price": 159.9,
    "images": [
      "imagens/BF-AN-043-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-043-01.jpg"
    ],
    "description": "Figura colecionável de Denji transformado em Chainsaw Man, com postura agressiva, lâminas de motosserra e base circular. Versão sem caixa.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Chainsaw Man Denji B no box figure",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-044",
    "name": "Figura Chainsaw Man Dual Blades Box",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Chainsaw Man",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-044-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-044-01.jpg"
    ],
    "description": "Figura colecionável de Chainsaw Man em pé, com lâminas nos braços, uniforme característico e base de exposição. Acompanha caixa temática ilustrada.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Chainsaw Man Denji A with box figure",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-045",
    "name": "Figura Chainsaw Man Dual Blades",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Chainsaw Man",
    "price": 129.9,
    "images": [
      "imagens/BF-AN-045-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-045-01.jpg"
    ],
    "description": "Figura colecionável de Denji em sua transformação Chainsaw Man, com lâminas alongadas, camisa branca, gravata preta e base circular. Versão sem caixa.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Padrão"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Chainsaw Man Denji A no box figure",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-046",
    "name": "Mini Figura Hollow Knight — Cavaleiro Sombrio",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Hollow Knight",
    "price": 89.9,
    "images": [
      "imagens/BF-AN-046-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-046-01.jpg"
    ],
    "description": "Mini figura colecionável inspirada no universo de Hollow Knight. Apresenta o icônico Cavaleiro com máscara branca, capa esvoaçante e base decorativa detalhada. Ideal para decorar mesas, estantes e setups gamers. Uma peça especial para colecionadores e apaixonados por jogos indie.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Branco e Cinza"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hollow Knight Little Knight PVC Figure",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-047",
    "name": "Mousepad Anime District Neon Cosmos",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-047-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-047-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Estampa multicolorida de anime com tons de azul, roxo e amarelo sobre fundo escuro. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-048",
    "name": "Mousepad Anime District Manga Eclipse",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-048-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-048-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Estampa monocromática de estilo mangá, com contraste intenso entre preto e branco. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-049",
    "name": "Mousepad Anime District Hypnotic Eyes",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-049-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-049-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Estampa preta e branca com olhos espiralados e arte de personagem em estilo mangá. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-050",
    "name": "Mousepad Anime District Crimson Shadow",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-050-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-050-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Composição gráfica escura com detalhes marcantes em vermelho. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-051",
    "name": "Mousepad Anime District Black Impact",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-051-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-051-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Arte em preto e branco com cenas de ação de inspiração mangá. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-052",
    "name": "Mousepad Anime District Grey Chapters",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-052-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-052-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Composição de quadrinhos em tons de cinza e preto, com estética de mangá. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-053",
    "name": "Mousepad Anime District Pastel Panels",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-053-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-053-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Colagem de cenas de anime em tons claros e contrastes delicados. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-054",
    "name": "Mousepad Anime District Electric Pop",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-054-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-054-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Estampa vibrante em tons de roxo, amarelo e laranja, com visual pop-art. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-055",
    "name": "Mousepad Anime District Red Phantom",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-055-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-055-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Arte de personagem em preto e vermelho para um setup de visual sombrio. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-056",
    "name": "Mousepad Anime District Crimson Rush",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-056-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-056-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Estampa de ação em preto, vermelho e cinza para setups gamers. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-057",
    "name": "Mousepad Anime District Monochrome Motion",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-057-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-057-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Ilustração em preto e branco com composição dinâmica de mangá. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-058",
    "name": "Mousepad Anime District Dark Rebellion",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-058-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-058-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Estampa de anime com detalhes em vermelho e cinza sobre fundo escuro. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-059",
    "name": "Mousepad Anime District Orange Manga",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-059-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-059-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Colagem de quadros de mangá com detalhes em laranja e preto. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-060",
    "name": "Mousepad Anime District Inkstorm",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-060-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-060-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Arte em preto e branco com traços intensos e estilo de quadrinhos japoneses. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-061",
    "name": "Mousepad Anime District Emerald Chaos",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "",
    "price": 54.9,
    "images": [
      "imagens/BF-AN-061-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-061-01.jpg"
    ],
    "description": "Mousepad gamer 30x60 cm para teclado e mouse. Estampa com detalhes vermelhos e verdes em fundo escuro, de estética gamer. Ideal para personalizar o setup com a estética alternativa da Black Forge.",
    "sizes": [
      "30x60x0.2cm"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "anime manga gaming mouse pad 30x60x0.2cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-062",
    "name": "Chaveiro Kirby Sleepy",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Kirby",
    "price": 19.9,
    "images": [
      "imagens/BF-AN-062-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-062-01.jpg"
    ],
    "description": "Chaveiro colecionável do Kirby em versão fofinha e relaxada. Acessório compacto e kawaii, perfeito para mochilas, bolsas e chaves.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Rosa"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Kirby keychain F sleeping",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-063",
    "name": "Chaveiro Kirby Star Rider",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Kirby",
    "price": 19.9,
    "images": [
      "imagens/BF-AN-063-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-063-01.jpg"
    ],
    "description": "Chaveiro kawaii do Kirby sobre sua estrela amarela. Design colorido e divertido para personalizar bolsas, mochilas e acessórios.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Rosa e Amarelo"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Kirby yellow star keychain",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-064",
    "name": "Chaveiro Kirby Chef",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Kirby",
    "price": 19.9,
    "images": [
      "imagens/BF-AN-064-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-064-01.jpg"
    ],
    "description": "Chaveiro do Kirby com chapéu de chef branco e detalhes encantadores. Uma miniatura kawaii para fãs do personagem.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Rosa e Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Kirby chef hat keychain",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-065",
    "name": "Chaveiro Kirby Cloud Dash",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Kirby",
    "price": 19.9,
    "images": [
      "imagens/BF-AN-065-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-065-01.jpg"
    ],
    "description": "Chaveiro do Kirby em pose dinâmica, acompanhado por detalhes de nuvem branca. Um acessório divertido para o dia a dia.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Rosa e Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Kirby flying cloud keychain",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-066",
    "name": "Chaveiro Kirby Apple",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Kirby",
    "price": 19.9,
    "images": [
      "imagens/BF-AN-066-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-066-01.jpg"
    ],
    "description": "Chaveiro kawaii do Kirby acompanhado por uma maçã vermelha. Design compacto e delicado para personalizar seus acessórios.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Rosa e Vermelho"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Kirby apple keychain",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-067",
    "name": "Chaveiro Kirby Classic",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Kirby",
    "price": 19.9,
    "images": [
      "imagens/BF-AN-067-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-067-01.jpg"
    ],
    "description": "Chaveiro do Kirby em sua versão clássica, com corpo rosa, olhos expressivos e pés vermelhos. Ideal para fãs e colecionadores.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Rosa e Vermelho"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Kirby classic pink keychain",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-068",
    "name": "Pantufas Gengar Shadow",
    "category": "CALÇADOS",
    "anime_category": "Calçados",
    "collection": "anime-district",
    "anime": "Pokémon",
    "price": 129.9,
    "images": [
      "imagens/BF-AN-068-01.jpg",
      "imagens/BF-AN-068-02.jpg",
      "imagens/BF-AN-068-03.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-068-01.jpg",
      "imagens/BF-AN-068-02.jpg",
      "imagens/BF-AN-068-03.jpg"
    ],
    "description": "Pantufas de pelúcia inspiradas no Gengar de Pokémon. Com design roxo, expressão divertida e acabamento macio, são perfeitas para quem busca conforto sem abandonar o estilo alternativo. Modelo com meias, ideal para dias frios e momentos de descanso.",
    "sizes": [
      "35-42"
    ],
    "colors": [
      "Roxo"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Gengar Pokemon plush slippers with socks",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-069",
    "name": "Bolsa Hatsune Miku Kawaii",
    "category": "BOLSAS E MOCHILAS",
    "anime_category": "Bolsas e mochilas",
    "collection": "anime-district",
    "anime": "Hatsune Miku",
    "price": 109.9,
    "images": [
      "imagens/BF-AN-069-01.jpg",
      "imagens/BF-AN-069-02.jpg",
      "imagens/BF-AN-069-03.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-069-01.jpg",
      "imagens/BF-AN-069-02.jpg",
      "imagens/BF-AN-069-03.jpg"
    ],
    "description": "Bolsa de ombro de pelúcia inspirada na Hatsune Miku, com design kawaii, acabamento macio e detalhes em azul turquesa. Acompanha um chaveiro de pelúcia da personagem, formando um conjunto perfeito para fãs da cultura japonesa, moda alternativa e acessórios fofos. Ideal para passeios, eventos e composições criativas.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Turquesa"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Hatsune Miku plush shoulder bag with keychain",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-070",
    "name": "Pelúcia Pochita Chainsaw Man",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Chainsaw Man",
    "price": 89.9,
    "images": [
      "imagens/BF-AN-070-01.jpg",
      "imagens/BF-AN-070-02.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-070-01.jpg",
      "imagens/BF-AN-070-02.jpg"
    ],
    "description": "Pelúcia Pochita inspirada no anime Chainsaw Man. Com 25 cm de altura, tecido macio, corpo laranja, olhos expressivos e detalhes de motosserra, é perfeita para decorar quartos, setups e coleções. Um companheiro fofo para os fãs do universo Chainsaw Man.",
    "sizes": [
      "25 cm"
    ],
    "colors": [
      "Laranja"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Chainsaw Man Pochita plush 25cm",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-071",
    "name": "Brincos Kurapika Scarlet Chain",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Hunter x Hunter",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-071-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-071-01.jpg"
    ],
    "description": "Brincos inspirados em Kurapika de Hunter x Hunter. Com correntes prateadas e pingentes vermelhos em formato de gota, apresentam um visual elegante e misterioso. Perfeitos para composições alternativas, cosplay e looks inspirados na cultura japonesa.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Prata e Vermelho"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Kurapika Hunter x Hunter red drop chain earrings E196",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-072",
    "name": "Porta-Moedas Gama-chan Naruto",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Naruto",
    "price": 39.9,
    "images": [
      "imagens/BF-AN-072-01.jpg",
      "imagens/BF-AN-072-02.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-072-01.jpg",
      "imagens/BF-AN-072-02.jpg"
    ],
    "description": "Porta-moedas de sapinho inspirado no famoso Gama-chan de Naruto. Com exterior verde de pelúcia, olhos expressivos, fechamento metálico e interior vermelho, combina fofura e praticidade. Ideal para guardar moedas e pequenos acessórios, perfeito para fãs de anime e cultura japonesa.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Verde"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Naruto Gama-chan frog coin purse wallet",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-073",
    "name": "Anel Kaneki Dark Thorn",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Tokyo Ghoul",
    "price": 34.9,
    "images": [
      "imagens/BF-AN-073-01.jpg",
      "imagens/BF-AN-073-02.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-073-01.jpg",
      "imagens/BF-AN-073-02.jpg"
    ],
    "description": "Anel ajustável inspirado na estética sombria de Tokyo Ghoul. Com acabamento prateado, detalhes de espinhos entrelaçados e design punk gótico, é perfeito para composições alternativas, streetwear e looks underground. Modelo unissex com abertura ajustável.",
    "sizes": [
      "Ajustável"
    ],
    "colors": [
      "Prata"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Tokyo Ghoul Kaneki adjustable silver punk ring",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-074",
    "name": "Colar L Lawliet Death Note",
    "category": "ACESSÓRIOS",
    "anime_category": "Acessórios",
    "collection": "anime-district",
    "anime": "Death Note",
    "price": 19.9,
    "images": [
      "imagens/BF-AN-074-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-074-01.jpg"
    ],
    "description": "Colar inspirado no personagem L Lawliet de Death Note. Possui pingente metálico prateado em formato da icônica letra L e cordão preto. Um acessório minimalista e alternativo, perfeito para fãs de anime, moda gótica e estilo underground.",
    "sizes": [
      "Único"
    ],
    "colors": [
      "Prata"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Death Note L Lawliet silver pendant necklace",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-075",
    "name": "Moletom Luffy Gear 5 Shadow Black",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "One Piece",
    "price": 239.9,
    "images": [
      "imagens/BF-AN-075-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-075-01.jpg"
    ],
    "description": "Moletom preto com capuz e estampa de Monkey D. Luffy Gear 5, inspirado em One Piece. Visual marcante com arte de anime, mangas longas e estética streetwear. Ideal para composições urbanas e alternativas.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "One Piece Luffy Gear 5 black hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-076",
    "name": "Moletom Luffy Gear 5 White Awakening",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "One Piece",
    "price": 239.9,
    "images": [
      "imagens/BF-AN-076-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-076-01.jpg"
    ],
    "description": "Moletom branco com capuz e estampa de Luffy Gear 5. Inspirado no universo One Piece, combina arte japonesa com uma proposta streetwear moderna. Perfeito para fãs de anime e moda alternativa.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL"
    ],
    "colors": [
      "Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "One Piece Luffy Gear 5 white hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-077",
    "name": "Moletom Luffy Gear 5 Crimson",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "One Piece",
    "price": 239.9,
    "images": [
      "imagens/BF-AN-077-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-077-01.jpg"
    ],
    "description": "Moletom vermelho com capuz e estampa de Monkey D. Luffy em sua transformação Gear 5. Uma peça de visual intenso, com inspiração japonesa e identidade streetwear.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL"
    ],
    "colors": [
      "Vermelho"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "One Piece Luffy Gear 5 red hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-078",
    "name": "Moletom Luffy Gear 5 Ash Gray",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "One Piece",
    "price": 239.9,
    "images": [
      "imagens/BF-AN-078-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-078-01.jpg"
    ],
    "description": "Moletom cinza com capuz e estampa de Luffy Gear 5, inspirado em One Piece. Combina tons neutros, ilustração de anime e estética urbana para um visual moderno e alternativo.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL"
    ],
    "colors": [
      "Cinza"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "One Piece Luffy Gear 5 gray hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-079",
    "name": "Camiseta Higuruma Dark Justice",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Jujutsu Kaisen",
    "price": 99.9,
    "images": [
      "imagens/BF-AN-079-01.jpg",
      "imagens/BF-AN-079-02.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-079-01.jpg",
      "imagens/BF-AN-079-02.jpg"
    ],
    "description": "Camiseta oversized inspirada em Hiromi Higuruma de Jujutsu Kaisen. Confeccionada em algodão com acabamento preto lavado, apresenta a palavra JUSTICE na parte frontal e uma ilustração marcante do personagem nas costas. Com estética dark, grunge e streetwear japonês, é perfeita para composições urbanas e alternativas.",
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL"
    ],
    "colors": [
      "Preto Lavado"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Jujutsu Kaisen Hiromi Higuruma oversized washed cotton shirt CMSTYTXW156",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-080",
    "name": "Camiseta Rengoku Flame Ash",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 119.9,
    "images": [
      "imagens/BF-AN-080-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-080-01.jpg"
    ],
    "description": "Camiseta oversized preta lavada com estampa monocromática de Kyojuro Rengoku, o Hashira das Chamas de Demon Slayer. Design marcante com estética grunge e streetwear japonês.",
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Preto Lavado"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Demon Slayer Rengoku washed oversized shirt",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-081",
    "name": "Camiseta Akaza Upper Moon",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 119.9,
    "images": [
      "imagens/BF-AN-081-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-081-01.jpg"
    ],
    "description": "Camiseta oversized preta com estampa de Akaza, a Lua Superior Três de Demon Slayer. Visual monocromático de alto contraste, inspirado na força e na intensidade do personagem.",
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Demon Slayer Akaza Upper Moon oversized shirt",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-082",
    "name": "Camiseta Tengen Uzui Sound Hashira",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 119.9,
    "images": [
      "imagens/BF-AN-082-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-082-01.jpg"
    ],
    "description": "Camiseta oversized preta lavada com estampa de Tengen Uzui, o Hashira do Som de Demon Slayer. Uma peça com identidade marcante, estética japonesa e influência streetwear.",
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Preto Lavado"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Demon Slayer Tengen Uzui oversized graphic shirt",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-083",
    "name": "Camiseta Akaza Dark Moon",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 119.9,
    "images": [
      "imagens/BF-AN-083-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-083-01.jpg"
    ],
    "description": "Camiseta preta com estampa de Akaza, uma das Luas Superiores de Demon Slayer. Arte sombria e composição monocromática para um visual underground, grunge e alternativo.",
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Demon Slayer Akaza dark moon t-shirt",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-084",
    "name": "Camiseta Rengoku Eternal Flame",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 119.9,
    "images": [
      "imagens/BF-AN-084-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-084-01.jpg"
    ],
    "description": "Camiseta oversized preta lavada com estampa de Kyojuro Rengoku, o lendário Hashira das Chamas de Demon Slayer. Combina elementos de mangá, visual vintage e moda streetwear alternativa.",
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Preto Lavado"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Demon Slayer Rengoku vintage graphic washed t-shirt",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-085",
    "name": "Camiseta Tanjiro Demon Slayer",
    "category": "CAMISETAS E CAMISAS",
    "anime_category": "Camisetas",
    "collection": "anime-district",
    "anime": "Demon Slayer",
    "price": 119.9,
    "images": [
      "imagens/BF-AN-085-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-085-01.jpg"
    ],
    "description": "Camiseta oversized preta com estampa de Tanjiro Kamado, protagonista de Demon Slayer. Arte monocromática com visual urbano, inspiração japonesa e estética alternativa.",
    "sizes": [
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Demon Slayer Tanjiro Kamado black oversized shirt",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-086",
    "name": "Moletom Dark Blade Ivory",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-086-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-086-01.jpg"
    ],
    "description": "Moletom oversized creme com capuz e estampa artística de espada em tons rosados. Apresenta um visual alternativo com influências grunge, streetwear e estética dark. Ideal para composições urbanas e dias frios.",
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "2GG",
      "3GG"
    ],
    "colors": [
      "Creme"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Oversized sword graphic hoodie beige",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-087",
    "name": "Moletom Dark Blade Obsidian",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-087-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-087-01.jpg"
    ],
    "description": "Moletom oversized preto com capuz e estampa de espada em tonalidades rosadas. Combina elementos góticos, grunge e streetwear em uma peça de visual sombrio e marcante.",
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "2GG",
      "3GG"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Oversized sword graphic hoodie black",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-088",
    "name": "Moletom Dark Blade Midnight",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-088-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-088-01.jpg"
    ],
    "description": "Moletom oversized azul-marinho com capuz e estampa artística de espada. Seu design combina tons escuros com detalhes rosados, trazendo uma identidade alternativa, urbana e underground.",
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "2GG",
      "3GG"
    ],
    "colors": [
      "Azul-marinho"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Oversized sword graphic hoodie navy blue",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-089",
    "name": "Moletom Dark Blade Crimson",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-089-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-089-01.jpg"
    ],
    "description": "Moletom oversized vinho com capuz e estampa de espada em tons claros. Apresenta uma combinação de estética grunge, visual medieval alternativo e streetwear, criando uma peça marcante para o dia a dia.",
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "2GG",
      "3GG"
    ],
    "colors": [
      "Vinho"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Oversized sword graphic hoodie burgundy",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-090",
    "name": "Moletom Spiderweb Ivory",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-090-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-090-01.jpg"
    ],
    "description": "Moletom oversized branco com capuz, estampa de aranha e teia em rosa vibrante. Com tecido de aparência macia e visual inspirado na estética Y2K, emo e streetwear alternativo, é perfeito para composições urbanas marcantes.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Spiderweb pink spider white oversized hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-091",
    "name": "Moletom Spiderweb Ash",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-091-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-091-01.jpg"
    ],
    "description": "Moletom oversized cinza com capuz e estampa de aranha preta sobre teia rosa. Combina conforto e estética grunge, emo e Y2K, criando um visual alternativo para o dia a dia.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Cinza"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Spiderweb pink spider gray oversized hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-092",
    "name": "Moletom Spiderweb Obsidian",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-092-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-092-01.jpg"
    ],
    "description": "Moletom oversized preto com capuz e estampa de aranha e teia em tons rosa vibrante. Uma peça com identidade underground, perfeita para looks góticos, emo, grunge e streetwear.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Spiderweb pink spider black oversized hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-093",
    "name": "Moletom Spiderweb Pink",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-093-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-093-01.jpg"
    ],
    "description": "Moletom oversized rosa com capuz e estampa de aranha sobre teia estilizada. Combina elementos kawaii, Y2K e emo em uma peça confortável e cheia de personalidade.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Rosa"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Spiderweb pink oversized spider hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-094",
    "name": "Moletom California Teddy Sand",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 159.9,
    "images": [
      "imagens/BF-AN-094-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-094-01.jpg"
    ],
    "description": "Moletom feminino oversized em pelúcia macia, com gola alta, fechamento em zíper e bordado California no peito. Na tonalidade bege, combina conforto térmico com estética casual coreana e streetwear.",
    "sizes": [
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "California teddy fleece pullover beige",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-095",
    "name": "Moletom California Teddy Ivory",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 159.9,
    "images": [
      "imagens/BF-AN-095-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-095-01.jpg"
    ],
    "description": "Moletom feminino de pelúcia na cor creme, com gola alta, meio zíper e bordado California. Uma peça confortável e aconchegante, ideal para looks de inverno com influência da moda coreana.",
    "sizes": [
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Creme"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "California teddy fleece pullover apricot",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-096",
    "name": "Moletom California Teddy Midnight",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 159.9,
    "images": [
      "imagens/BF-AN-096-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-096-01.jpg"
    ],
    "description": "Moletom feminino preto de pelúcia com modelagem ampla, gola alta, fechamento em meio zíper e bordado California. Combina estética minimalista com o conforto da moda streetwear.",
    "sizes": [
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "California teddy fleece pullover black",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-097",
    "name": "Moletom California Teddy Ocean",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 159.9,
    "images": [
      "imagens/BF-AN-097-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-097-01.jpg"
    ],
    "description": "Moletom feminino de pelúcia azul com gola alta, fechamento em zíper e bordado California. Sua modelagem confortável e estética casual japonesa e coreana criam uma peça versátil para dias frios.",
    "sizes": [
      "L",
      "XL",
      "2XL"
    ],
    "colors": [
      "Azul"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "California teddy fleece pullover blue",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-098",
    "name": "Moletom Tokyo Underground Onyx",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 219.9,
    "images": [
      "imagens/BF-AN-098-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-098-01.jpg"
    ],
    "description": "Moletom oversized preto com capuz e estampa Tokyo Underground inspirada na cultura automobilística japonesa. Apresenta ilustração de carro esportivo, tipografia urbana e detalhes gráficos nas mangas. Perfeito para composições streetwear e underground.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Tokyo Underground racing car black hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-099",
    "name": "Moletom Tokyo Underground Snow",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 219.9,
    "images": [
      "imagens/BF-AN-099-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-099-01.jpg"
    ],
    "description": "Moletom oversized branco com estampa Tokyo Underground, carro esportivo japonês e detalhes gráficos contrastantes. Combina referências do automobilismo urbano com estética streetwear e moda alternativa.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Tokyo Underground racing car white hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-100",
    "name": "Moletom Tokyo Underground Ash",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 219.9,
    "images": [
      "imagens/BF-AN-100-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-100-01.jpg"
    ],
    "description": "Moletom oversized cinza com capuz e estampa inspirada nas corridas de rua japonesas. O design Tokyo Underground apresenta carro esportivo, letras marcantes e uma identidade urbana de influência Y2K.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Cinza"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Tokyo Underground racing car gray hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-101",
    "name": "Moletom Tokyo Underground Midnight",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 219.9,
    "images": [
      "imagens/BF-AN-101-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-101-01.jpg"
    ],
    "description": "Moletom oversized azul-marinho com estampa Tokyo Underground em alto contraste. Inspirado na cultura automotiva japonesa, apresenta ilustração de carro esportivo e grafismos urbanos para um visual streetwear marcante.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Azul-marinho"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Tokyo Underground racing car navy hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-102",
    "name": "Moletom Tokyo Underground Mocha",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 219.9,
    "images": [
      "imagens/BF-AN-102-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-102-01.jpg"
    ],
    "description": "Moletom oversized marrom com capuz e estampa automobilística Tokyo Underground. A combinação de tons terrosos, ilustração de carro esportivo e detalhes gráficos cria uma estética urbana, casual e alternativa.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Marrom"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Tokyo Underground racing car brown hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-103",
    "name": "Moletom Tokyo Underground Forest",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 219.9,
    "images": [
      "imagens/BF-AN-103-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-103-01.jpg"
    ],
    "description": "Moletom oversized verde-escuro com capuz, estampa Tokyo Underground e ilustração de carro esportivo. Com identidade inspirada no street racing japonês, combina elementos Y2K e underground em uma peça urbana.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Verde-escuro"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Tokyo Underground racing car dark green hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-104",
    "name": "Moletom Sakura Blossom Cream",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 189.9,
    "images": [
      "imagens/BF-AN-104-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-104-01.jpg"
    ],
    "description": "Moletom oversized bege com capuz e estampa de flores de cerejeira japonesas nas costas. Apresenta galhos pretos, flores rosadas e detalhes em escrita oriental. Uma peça que combina estética harajuku, streetwear japonês e moda alternativa.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Japanese Sakura cherry blossom beige oversized hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-105",
    "name": "Moletom Sakura Blossom Snow",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 189.9,
    "images": [
      "imagens/BF-AN-105-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-105-01.jpg"
    ],
    "description": "Moletom oversized branco com capuz e estampa artística de flores de cerejeira nas costas. Com galhos escuros, flores em tons rosados e elementos da cultura japonesa, combina conforto com estética harajuku, Y2K e streetwear alternativo.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Japanese Sakura cherry blossom white oversized hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-106",
    "name": "Moletom Sakura Cherry Blossom White",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 199.9,
    "images": [
      "imagens/BF-AN-106-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-106-01.jpg"
    ],
    "description": "Moletom oversized branco com capuz e estampa japonesa de flores de cerejeira nas costas e mangas. Com delicados detalhes florais em rosa, galhos escuros e elementos orientais, combina a elegância da cultura japonesa com a estética harajuku, Y2K e streetwear alternativo.",
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Branco"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Japanese Sakura Cherry Blossom white oversized hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-107",
    "name": "Moletom Sakura Cherry Blossom Cream",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 199.9,
    "images": [
      "imagens/BF-AN-107-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-107-01.jpg"
    ],
    "description": "Moletom oversized bege com capuz e estampa de flores de cerejeira japonesas nas costas e mangas. Apresenta detalhes florais rosados, galhos estilizados e escrita oriental, criando uma combinação entre moda japonesa, streetwear e estética Y2K. Uma peça confortável e marcante para looks alternativos.",
    "sizes": [
      "P",
      "M",
      "G",
      "GG",
      "EG"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Japanese Sakura Cherry Blossom beige oversized hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-108",
    "name": "Moletom Gothic Sigil Obsidian",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-108-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-108-01.jpg"
    ],
    "description": "Moletom oversized preto com capuz e estampa branca de símbolos góticos inspirados na estética do metal underground. Com grafismos marcantes nas costas e mangas, combina influências dark, grunge, punk e streetwear alternativo.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Gothic metal graphic black oversized hoodie WYSAND080189",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-109",
    "name": "Moletom Gothic Sigil Rose",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "",
    "price": 149.9,
    "images": [
      "imagens/BF-AN-109-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-109-01.jpg"
    ],
    "description": "Moletom oversized rosa com capuz e estampa de símbolos góticos em tons escuros. Uma peça que mistura a delicadeza do rosa com elementos do metal, emo e streetwear underground. Ideal para looks alternativos com personalidade.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Rosa"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Gothic metal graphic pink oversized hoodie WYSAND080189",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-110",
    "name": "Moletom Vinland Saga Thorfinn Red",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-110-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-110-01.jpg"
    ],
    "description": "Moletom bege oversized com capuz e estampa de Thorfinn de Vinland Saga, em composição gráfica vermelha e preta. Uma peça que combina a estética dos mangás, referências vikings e streetwear alternativo.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga Thorfinn khaki3 hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-111",
    "name": "Moletom Vinland Saga Nordic Portrait",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-111-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-111-01.jpg"
    ],
    "description": "Moletom oversized bege com estampa monocromática em estilo mangá vintage, inspirada no universo de Vinland Saga. Combina arte japonesa, influência nórdica e visual streetwear.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga manga portrait beige hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-112",
    "name": "Moletom Vinland Saga Warrior Legacy",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-112-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-112-01.jpg"
    ],
    "description": "Moletom bege com capuz e estampa de arte mangá inspirada nos guerreiros de Vinland Saga. Apresenta composição monocromática, visual vintage e estética streetwear japonesa.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga warrior manga hoodie beige",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-113",
    "name": "Moletom Vinland Saga Manga Panels",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-113-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-113-01.jpg"
    ],
    "description": "Moletom oversized bege com estampa de quadros de mangá inspirados em Vinland Saga. Design em preto e branco que combina cultura japonesa, visual grunge e moda urbana.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga manga panels hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-114",
    "name": "Moletom Vinland Saga Nordic Shadows",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-114-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-114-01.jpg"
    ],
    "description": "Moletom oversized bege com arte monocromática de Vinland Saga, em composição sombria e detalhada. Ideal para looks underground, grunge e streetwear com inspiração nórdica.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga nordic manga beige hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-115",
    "name": "Moletom Vinland Saga Viking Spirit",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-115-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-115-01.jpg"
    ],
    "description": "Moletom bege com capuz e estampa minimalista inspirada no universo de Vinland Saga. Com elementos gráficos escuros e estética nórdica, combina conforto e identidade streetwear alternativa.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga viking graphic hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-116",
    "name": "Moletom Vinland Saga Thorfinn Ink",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-116-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-116-01.jpg"
    ],
    "description": "Moletom oversized bege com ilustração em estilo mangá de Vinland Saga. Com arte centralizada, traços monocromáticos e visual vintage, é perfeito para composições urbanas e alternativas.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga Thorfinn manga print hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-117",
    "name": "Moletom Vinland Saga Crimson Sun",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-117-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-117-01.jpg"
    ],
    "description": "Moletom oversized bege com estampa circular vermelha inspirada em Vinland Saga. O contraste entre a base clara e a arte vermelha cria um visual marcante, com referências japonesas e nórdicas.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga red circle beige hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-118",
    "name": "Moletom Vinland Saga Battle Sketch",
    "category": "MOLETONS",
    "anime_category": "Moletons",
    "collection": "anime-district",
    "anime": "Vinland Saga",
    "price": 144.9,
    "images": [
      "imagens/BF-AN-118-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-118-01.jpg"
    ],
    "description": "Moletom bege com capuz e estampa em estilo mangá de Vinland Saga, apresentando uma composição ilustrada em preto e branco. Ideal para quem busca uma estética vintage, alternativa e inspirada na cultura japonesa.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "XXXL"
    ],
    "colors": [
      "Bege"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Vinland Saga manga battle sketch hoodie",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  },
  {
    "id": "BF-AN-119",
    "name": "Vestido Dark Siren Lace-Up",
    "category": "VESTIDOS",
    "anime_category": "Vestidos",
    "collection": "anime-district",
    "anime": "",
    "price": 129.9,
    "images": [
      "imagens/BF-AN-119-01.jpg"
    ],
    "image_slots": [
      "imagens/BF-AN-119-01.jpg"
    ],
    "description": "Vestido feminino preto com gola halter, modelagem ajustada e recortes laterais com amarração entrelaçada. Apresenta comprimento assimétrico e fenda marcante, combinando influências góticas, grunge e Y2K. Uma peça ousada para composições alternativas, eventos e produções noturnas.",
    "sizes": [
      "P",
      "M",
      "G"
    ],
    "colors": [
      "Preto"
    ],
    "active": true,
    "placeholder": false,
    "supplier_search": "Gothic black halter lace up asymmetric midi dress",
    "supplier_url": "",
    "licensing_status": "pendente",
    "supplier_cost_reference": null
  }
];
  window.BLACK_FORGE_ANIME_ITEMS = animeProducts;
  if (Array.isArray(window.BLACK_FORGE_ITEMS)) {
    const ids = new Set(window.BLACK_FORGE_ITEMS.map(p => p.id));
    for (const product of animeProducts) {
      if (product.active !== true || product.placeholder || !product.name ||
          !Number.isFinite(Number(product.price)) || Number(product.price) <= 0 ||
          !Array.isArray(product.images) || !product.images.length || ids.has(product.id)) continue;
      window.BLACK_FORGE_ITEMS.push(product);
      ids.add(product.id);
    }
  }
})();
