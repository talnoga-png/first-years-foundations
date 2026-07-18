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
    // Close on Escape and return focus to the burger (keyboard users)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        navList.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    });
  }

  /* ── 3. FAQ accordion (with ARIA state for screen readers) ── */
  document.querySelectorAll('.faq-q').forEach((btn, i) => {
    const item = btn.closest('.faq-item');
    const answer = item ? item.querySelector('.faq-a') : null;
    // Wire up ARIA so assistive tech announces expand/collapse state.
    btn.setAttribute('aria-expanded', item && item.classList.contains('open') ? 'true' : 'false');
    if (answer) {
      if (!answer.id) answer.id = 'faq-a-' + i;
      btn.setAttribute('aria-controls', answer.id);
    }
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all others and reset their ARIA state
      document.querySelectorAll('.faq-item.open').forEach((el) => {
        el.classList.remove('open');
        const q = el.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── 5. Cookie consent banner ── */
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    let stored = null;
    try { stored = localStorage.getItem('fyf-consent'); } catch (e) {}
    if (!stored) banner.hidden = false; // no choice yet → ask
    banner.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-consent]');
      if (!btn) return;
      const accepted = btn.getAttribute('data-consent') === 'accept';
      try { localStorage.setItem('fyf-consent', accepted ? 'granted' : 'denied'); } catch (e) {}
      if (accepted && typeof window.fyfLoadAnalytics === 'function') {
        window.fyfLoadAnalytics();
      }
      banner.hidden = true;
    });
  }

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
