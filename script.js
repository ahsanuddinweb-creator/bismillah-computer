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

  // Elegant site-wide cursor enhancement (desktop mouse only).
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (finePointer.matches) {
    const dot = document.createElement('span');
    const ring = document.createElement('span');
    dot.className = 'custom-cursor-dot';
    ring.className = 'custom-cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring);
    document.body.classList.add('custom-cursor-enabled');

    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    let frame = 0;
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${mouseX - 3.5}px,${mouseY - 3.5}px,0)`;
      ring.style.transform = `translate3d(${ringX - 17}px,${ringY - 17}px,0)`;
      if (Math.abs(mouseX-ringX) > .1 || Math.abs(mouseY-ringY) > .1) {
        frame = requestAnimationFrame(renderCursor);
      } else { frame = 0; }
    };
    document.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.body.classList.add('custom-cursor-visible');
      if (!frame) frame = requestAnimationFrame(renderCursor);
    }, { passive: true });
    document.addEventListener('pointerover', event => {
      if (event.target.closest('a,button,input,textarea,select,summary,[role="button"]')) {
        document.body.classList.add('custom-cursor-hover');
      }
    }, { passive: true });
    document.addEventListener('pointerout', event => {
      if (event.target.closest('a,button,input,textarea,select,summary,[role="button"]') &&
          !event.relatedTarget?.closest?.('a,button,input,textarea,select,summary,[role="button"]')) {
        document.body.classList.remove('custom-cursor-hover');
      }
    }, { passive: true });
    document.addEventListener('pointerdown', () => document.body.classList.add('custom-cursor-press'), { passive: true });
    document.addEventListener('pointerup', () => document.body.classList.remove('custom-cursor-press'), { passive: true });
    document.addEventListener('pointerleave', () => document.body.classList.remove('custom-cursor-visible'), { passive: true });
    document.addEventListener('pointerenter', () => document.body.classList.add('custom-cursor-visible'), { passive: true });
    finePointer.addEventListener?.('change', event => {
      if (!event.matches) {
        document.body.classList.remove('custom-cursor-enabled','custom-cursor-visible','custom-cursor-hover','custom-cursor-press');
        dot.remove(); ring.remove();
        cancelAnimationFrame(frame);
      }
    });
  }

})();