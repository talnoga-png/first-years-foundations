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

  /* ── 5. Cookie consent banner (Accept All / Reject All / Customize) ── */
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    let stored = null;
    try { stored = localStorage.getItem('fyf-consent'); } catch (e) {}
    if (!stored) banner.hidden = false; // no choice yet → ask

    const options       = document.getElementById('cookie-options');
    const analyticsCbx  = document.getElementById('consent-analytics');
    const customizeBtn  = document.getElementById('consent-customize-btn');
    const saveBtn       = document.getElementById('consent-save-btn');

    const closeBtn = document.getElementById('consent-close-btn');
    const GA_ID = 'G-PYRBFC16BM';
    let opener = null;

    // Withdrawing consent: stop GA from sending and remove its cookies.
    const disableAnalytics = () => {
      window.fyfAnalyticsAllowed = false;
      window['ga-disable-' + GA_ID] = true;
      const host = location.hostname;
      const domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
      document.cookie.split(';').forEach((c) => {
        const name = c.split('=')[0].trim();
        if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid' || name.indexOf('_gat') === 0) {
          domains.forEach((d) => {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' +
              (d ? '; domain=' + d : '');
          });
        }
      });
    };

    const closePanel = () => {
      banner.hidden = true;
      if (opener && opener.focus) opener.focus();
      opener = null;
    };

    // Store the choice and load analytics only if the visitor allowed it.
    // Analytics is the only optional category, so every path resolves to a
    // single granted/denied value (kept simple + backwards compatible).
    const finish = (granted) => {
      try { localStorage.setItem('fyf-consent', granted ? 'granted' : 'denied'); } catch (e) {}
      if (granted) {
        window['ga-disable-' + GA_ID] = false;
        if (typeof window.fyfLoadAnalytics === 'function') window.fyfLoadAnalytics();
      } else {
        disableAnalytics();
      }
      closePanel();
    };

    // Reopen from the footer "Cookie settings" control on any page: show the
    // customize panel with the current choice pre-selected.
    const openSettings = (trigger) => {
      let cur = null;
      try { cur = localStorage.getItem('fyf-consent'); } catch (e) {}
      opener = trigger || null;
      if (analyticsCbx) analyticsCbx.checked = (cur === 'granted');
      if (options)      options.hidden = false;
      if (customizeBtn) customizeBtn.hidden = true;
      if (saveBtn)      saveBtn.hidden = false;
      if (closeBtn)     closeBtn.hidden = !cur;
      banner.hidden = false;
      if (analyticsCbx && analyticsCbx.focus) analyticsCbx.focus();
    };

    document.querySelectorAll('[data-cookie-settings]').forEach((el) => {
      el.addEventListener('click', () => openSettings(el));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !banner.hidden && closeBtn && !closeBtn.hidden) closePanel();
    });

    banner.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-consent]');
      if (!btn) return;
      const action = btn.getAttribute('data-consent');
      if (action === 'accept') {
        finish(true);
      } else if (action === 'reject') {
        finish(false);
      } else if (action === 'close') {
        closePanel();
      } else if (action === 'customize') {
        if (options)      options.hidden = false;
        if (customizeBtn) customizeBtn.hidden = true;
        if (saveBtn)      saveBtn.hidden = false;
        if (analyticsCbx && analyticsCbx.focus) analyticsCbx.focus();
      } else if (action === 'save') {
        finish(!!(analyticsCbx && analyticsCbx.checked));
      }
    });
  }

  // Outbound intent only: never count a click as a purchase or completed signup.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link || !window.fyfAnalyticsAllowed) return;
    const url = new URL(link.href, location.href);
    if (url.hostname === 'whop.com') {
      const product = url.pathname.split('/').filter(Boolean).pop();
      gtag('event', 'guide_purchase_click', {guide: product, page_path: location.pathname, transport_type: 'beacon'});
    } else if (url.hostname === 'first-years-foundations-ndpk6k.subscribepage.io') {
      gtag('event', 'free_guide_signup_click', {page_path: location.pathname, transport_type: 'beacon'});
    } else if (url.origin === location.origin && url.pathname === '/free.html') {
      gtag('event', 'free_guide_click', {page_path: location.pathname});
    }
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
