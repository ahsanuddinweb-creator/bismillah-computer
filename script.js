(() => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    const close = () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','মেনু খুলুন'); };
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন');
    });
    links.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); toggle.focus(); } });
    document.addEventListener('click', e => { if (!e.target.closest('.nav')) close(); });
  }
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();