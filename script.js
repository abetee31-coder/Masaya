/* =========================================================
   Quick Job — interactions
   ========================================================= */
(() => {
  'use strict';

  const nav      = document.getElementById('nav');
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const floatCTA = document.querySelector('.float-line');
  const hero     = document.querySelector('.hero');

  /* ---- Sticky header + floating CTA ---- */
  const onScroll = () => {
    nav.classList.toggle('is-stuck', window.scrollY > 24);
    if (floatCTA && hero) {
      floatCTA.classList.toggle('is-shown', window.scrollY > hero.offsetHeight * 0.6);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- Scroll reveal (staggered) with enhanced effects ---- */
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('is-in'), delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((el) => io.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-in'));
  }

  /* ---- Parallax scroll effect for sections ---- */
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  const onParallaxScroll = () => {
    parallaxElements.forEach((el) => {
      const speed = Number(el.dataset.parallax) || 0.5;
      const offset = window.scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  };
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', onParallaxScroll, { passive: true });
  }

  /* ---- Count-up numbers ---- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const runCount = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1500;
    let start = null;
    const tick = (now) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target).toLocaleString('ja-JP') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(runCount);
  }

  /* ---- Hero parallax (pointer) ---- */
  const blobs = document.querySelectorAll('.blob');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5);
      const dy = (e.clientY / window.innerHeight - 0.5);
      blobs.forEach((b, i) => {
        const depth = (i + 1) * 16;
        b.style.translate = `${dx * depth}px ${dy * depth}px`;
      });
    }, { passive: true });
  }

  /* ---- Card hover elevation ---- */
  const cards = document.querySelectorAll('.bento__card, .num-card, .voices__card, .faq__item');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.transition = 'transform .3s var(--ease), box-shadow .3s var(--ease)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  /* ---- Smooth number reveal on hover ---- */
  const numberElements = document.querySelectorAll('[data-count]');
  numberElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      el.style.color = 'var(--green)';
      el.style.transition = 'color .3s var(--ease)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.color = 'inherit';
    });
  });

  /* ---- FAQ: single-open accordion ---- */
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => { if (other !== item) other.open = false; });
      }
    });
  });
})();
