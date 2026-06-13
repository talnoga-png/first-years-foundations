/* ============================================================
   FIRST YEAR FOUNDATIONS — site.js
   Handles: nav scroll shadow, mobile burger, FAQ accordion,
            scroll-reveal (Intersection Observer).
   No dependencies. ~2 KB minified.
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Nav: add .scrolled class for blur/shadow ── */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── 2. Mobile burger menu ── */
  const burger  = document.querySelector('.nav-burger');
  const navList = document.querySelector('.nav-links');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        navList.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── 3. FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── 4. Scroll-reveal (Intersection Observer) ── */
  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealTargets.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    // Fallback: just show everything immediately
    revealTargets.forEach((el) => el.classList.add('visible'));
  }

})();
