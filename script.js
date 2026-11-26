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

  // Visible highlighted cursor with a tiny walking kitten companion.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (finePointer.matches) {
    const dot = document.createElement('span');
    const ring = document.createElement('span');
    const kitten = document.createElement('span');
    dot.className = 'custom-cursor-dot';
    ring.className = 'custom-cursor-ring';
    kitten.className = 'custom-cursor-kitten';
    kitten.textContent = '🐈';
    [dot, ring, kitten].forEach(el => el.setAttribute('aria-hidden', 'true'));
    document.body.append(dot, ring, kitten);
    document.body.classList.add('custom-cursor-enabled');

    let mouseX = -120, mouseY = -120, ringX = -120, ringY = -120;
    let kittenX = -120, kittenY = -120, frame = 0;
    let kittenSide = 1;
    // The kitten playfully darts from one side of the pointer to the other.
    window.setInterval(() => {
      kittenSide *= -1;
      if (!frame && document.body.classList.contains('custom-cursor-visible')) {
        frame = requestAnimationFrame(renderCursor);
      }
    }, 1150);
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      const kittenTargetX = mouseX + (kittenSide > 0 ? 30 : -48);
      const kittenTargetY = mouseY + 19;
      kittenX += (kittenTargetX - kittenX) * 0.16;
      kittenY += (kittenTargetY - kittenY) * 0.16;
      dot.style.transform = `translate3d(${mouseX - 5.5}px,${mouseY - 5.5}px,0)`;
      ring.style.transform = `translate3d(${ringX - 21}px,${ringY - 21}px,0)`;
      kitten.style.transform = `translate3d(${kittenX}px,${kittenY}px,0)`;
      if (Math.abs(mouseX-ringX) > .15 || Math.abs(mouseY-ringY) > .15 ||
          Math.abs(mouseX+(kittenSide > 0 ? 30 : -48)-kittenX) > .2 || Math.abs(mouseY+19-kittenY) > .2) {
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
        dot.remove(); ring.remove(); kitten.remove();
        cancelAnimationFrame(frame);
      }
    });
  }

})();