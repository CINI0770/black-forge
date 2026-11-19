/* BALCKER — contagem regressiva para o lançamento.
   Alvo: 5 de dezembro de 2026, 00h00, horário de Brasília (UTC−03:00).
   Ao chegar a zero, apenas mostra "THE NEW ERA HAS ARRIVED." —
   NÃO libera produtos: a ativação das vendas é manual. */
(() => {
  'use strict';
  const LAUNCH = Date.parse('2026-12-05T00:00:00-03:00');
  const box = document.getElementById('bkCountdown');
  if (!box || !Number.isFinite(LAUNCH)) return;
  const arrived = document.getElementById('bkArrived');
  const soon = document.getElementById('bkSoon');
  const srText = document.getElementById('bkCountdownText');
  const nums = {};
  box.querySelectorAll('[data-unit]').forEach(n => { nums[n.dataset.unit] = n; });
  const pad = n => String(n).padStart(2, '0');
  let timer = null, lastMinute = -1;

  function set(unit, value) {
    const node = nums[unit];
    if (node && node.textContent !== value) {
      node.textContent = value;
      node.classList.remove('is-tick'); void node.offsetWidth; node.classList.add('is-tick');
    }
  }
  function tick() {
    const diff = LAUNCH - Date.now();
    if (diff <= 0) {
      ['d','h','m','s'].forEach(u => set(u, '00'));
      clearInterval(timer);
      arrived.hidden = false;
      if (soon) soon.hidden = true;
      document.body.classList.add('bk-has-arrived');
      srText.textContent = 'O lançamento chegou.';
      return;
    }
    const total = Math.ceil(diff / 1000); // arredonda para cima: o zero coincide com 00h00
    const d = Math.floor(total / 86400), h = Math.floor(total % 86400 / 3600),
          m = Math.floor(total % 3600 / 60), s = total % 60;
    set('d', pad(d)); set('h', pad(h)); set('m', pad(m)); set('s', pad(s));
    // Texto para leitores de tela, atualizado só a cada minuto.
    if (m !== lastMinute) { lastMinute = m; srText.textContent = `Faltam ${d} dias, ${h} horas e ${m} minutos.`; }
  }
  box.hidden = false;
  tick();
  if (LAUNCH > Date.now()) {
    // Alinha os ticks à virada do segundo.
    setTimeout(() => { tick(); timer = setInterval(tick, 1000); }, 1000 - (Date.now() % 1000));
  }
  // Ao voltar para a aba, corrige imediatamente.
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
})();
