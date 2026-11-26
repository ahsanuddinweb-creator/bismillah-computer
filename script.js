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

  // Slow, smooth cursor kitten companion.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  if (finePointer.matches) {
    const dot = document.createElement('span');
    const ring = document.createElement('span');
    dot.className = 'custom-cursor-dot';
    ring.className = 'custom-cursor-ring';
    [dot, ring].forEach(el => el.setAttribute('aria-hidden', 'true'));
    document.body.append(dot, ring);
    document.body.classList.add('custom-cursor-enabled');

    let mouseX = -120, mouseY = -120, ringX = -120, ringY = -120;
    let frame = 0;
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      dot.style.transform = `translate3d(${mouseX - 5.5}px,${mouseY - 5.5}px,0)`;
      ring.style.transform = `translate3d(${ringX - 21}px,${ringY - 21}px,0)`;
      if (Math.abs(mouseX-ringX) > .15 || Math.abs(mouseY-ringY) > .15) {
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



  // A small cat companion wanders independently along the bottom edge, never following the cursor.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const roamingCat = document.createElement('span');
    roamingCat.className = 'roaming-cat';
    roamingCat.textContent = '🐈';
    roamingCat.setAttribute('aria-hidden', 'true');
    document.body.append(roamingCat);
  }

  // Lightweight scroll reveals for content blocks; no layout or content changes.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealTargets = document.querySelectorAll(
      'main .section-head, main .service-card, main .training-card, main .value-card, main .process-list li, main .contact-card, main .map-panel, main .faq-item, main .cta-inner, main .location-card, main .about-highlight'
    );
    if (revealTargets.length) {
      document.documentElement.classList.add('js-motion-ready');
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
      revealTargets.forEach((el, index) => {
        el.classList.add('motion-reveal');
        if (index % 3 === 1) el.classList.add('motion-delay-1');
        if (index % 3 === 2) el.classList.add('motion-delay-2');
        revealObserver.observe(el);
      });
    }
  }

  // Lightweight page progress and accessible back-to-top control.
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  const progressBar = document.createElement('span');
  progress.append(progressBar);
  document.body.append(progress);

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'পাতার শুরুতে ফিরে যান');
  backToTop.textContent = '↑';
  document.body.append(backToTop);
  backToTop.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  }));

  let scrollFrame = 0;
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progressValue = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressBar.style.transform = 'scaleX(' + progressValue + ')';
    backToTop.classList.toggle('is-visible', window.scrollY > 480);
    scrollFrame = 0;
  };
  window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUI);
  }, { passive: true });
  window.addEventListener('resize', updateScrollUI, { passive: true });
  updateScrollUI();


  // Search the service directory without hiding the training section.
  const serviceSearch = document.querySelector('#serviceSearch');
  if (serviceSearch) {
    const serviceCards = [...document.querySelectorAll('main .service-card')];
    const serviceGrid = serviceCards[0]?.parentElement;
    const emptyState = document.createElement('p');
    emptyState.className = 'service-search-empty';
    emptyState.setAttribute('role', 'status');
    emptyState.textContent = 'এই নামে কোনো সেবা পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজুন।';
    emptyState.hidden = true;
    serviceGrid?.append(emptyState);
    serviceSearch.addEventListener('input', () => {
      const term = serviceSearch.value.trim().toLocaleLowerCase();
      let visibleCount = 0;
      serviceCards.forEach(card => {
        const matches = card.textContent.toLocaleLowerCase().includes(term);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      emptyState.hidden = visibleCount !== 0;
    });
  }


})();