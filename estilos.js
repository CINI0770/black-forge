/* BLACK FORGE — coleções e estilos (somente navegação).
   Não altera preços, IDs, estoque nem o catálogo.
   Um produto aparece num estilo quando o NOME ou a DESCRIÇÃO já cadastrados
   citam aquele estilo. Para ajustar, edite as palavras-chave abaixo.
   Estilo sem produtos aparece como "sem peças no momento" — nunca com itens fictícios. */
(() => {
  'use strict';
  const normal = x => String(x || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const BLACK_FORGE_STYLES = [
    { slug: 'gothic',   name: 'Gothic / Darkwear',  short: 'GOTHIC',   line: 'Darkwear, vitoriano, sombrio.',
      match: /\b(gotic\w*|goth\w*|darkwear|dark|vitorian\w*|vampir\w*)\b/ },
    { slug: 'punk',     name: 'Punk / Rock',        short: 'PUNK',     line: 'Rebites, correntes, atitude.',
      match: /\b(punk\w*|rock\w*|rebite\w*|spikes?|tachas?)\b/ },
    { slug: 'grunge',   name: 'Grunge',             short: 'GRUNGE',   line: 'Xadrez, desgaste, camadas.',
      match: /\bgrunge\b/ },
    { slug: 'emo',      name: 'Emo / Scene',        short: 'EMO',      line: 'Contraste, franja, música.',
      match: /\b(emo|scene)\b/ },
    { slug: 'y2k',      name: 'Y2K Alternativo',    short: 'Y2K',      line: 'Anos 2000 pelo lado escuro.',
      match: /\by2k\b/ },
    { slug: 'techwear', name: 'Techwear / Utility', short: 'TECHWEAR', line: 'Cargo, fivelas, funcional.',
      match: /\b(techwear|utility|utilitari\w*|cargo|tatic\w*|militar\w*|harness)\b/ }
  ];

  // BALCKER: apenas nomes das futuras linhas. Sem produtos, preços ou datas.
  const BALCKER_LINES = ['Streetwear', 'Essentials', 'Old Money', 'Casual Premium'];

  const isActiveCollection = p => p && p.collection !== 'anime-district' && p.category !== 'PROMOÇÕES';
  const styleOf = slug => BLACK_FORGE_STYLES.find(s => s.slug === slug) || null;
  const matches = (p, style) => !!style && style.match.test(normal((p.name || '') + ' ' + (p.description || '')));

  window.BFCollections = Object.freeze({ BLACK_FORGE_STYLES, BALCKER_LINES, isActiveCollection, styleOf, matches, normal });
})();
