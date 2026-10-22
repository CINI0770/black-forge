/* BLACK FORGE — link OCTOBER DROP no menu das páginas existentes */
(() => {
  const url = 'colecao-outubro.html';
  const normalized = path => (path || '').split('#')[0].split('?')[0].replace(/^\.\//, '');
  function addLink(nav) {
    if (!nav || nav.querySelector('a[href*="colecao-outubro.html"]')) return;
    const link = document.createElement('a');
    link.href = url;
    link.textContent = 'OCTOBER DROP';
    link.className = 'bf-october-nav-link';
    if (normalized(location.pathname).endsWith(url)) link.setAttribute('aria-current','page');
    const links = [...nav.querySelectorAll('a')];
    const before = links.find(a => /manifesto|sobre|dúvidas|duvidas|categorias/i.test(a.textContent || ''));
    if (before) nav.insertBefore(link, before);
    else nav.append(link);
  }
  function update() {
    document.querySelectorAll('header nav, .header nav, nav.nav, nav[aria-label="Navegação principal"], nav[aria-label="Menu principal"]').forEach(addLink);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', update, {once:true});
  else update();
})();
