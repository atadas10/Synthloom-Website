/* ============================================================
   Synthloom — main.js
   Lightweight scroll animations, no dependencies.
   ============================================================ */

(function () {
  'use strict';

  // ── Fade-up on scroll ──────────────────────────────────────
  function initFadeUp() {
    const targets = document.querySelectorAll(
      '.feature-card, .platform-block, .pipeline-step, .section-title, .section-label, .hero-stat-row, .hero-badge, .hero-sub'
    );

    targets.forEach(function (el) {
      el.classList.add('fade-up');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Stagger grid children ──────────────────────────────────
  function staggerChildren(selector, delay) {
    const groups = document.querySelectorAll(selector);
    groups.forEach(function (group) {
      Array.from(group.children).forEach(function (child, i) {
        child.style.transitionDelay = i * delay + 'ms';
      });
    });
  }

  // ── Nav background on scroll ───────────────────────────────
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.style.borderBottomColor = window.scrollY > 20
        ? 'rgba(255,255,255,0.09)'
        : 'rgba(255,255,255,0.07)';
    }, { passive: true });
  }

  // ── Init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initFadeUp();
    staggerChildren('.features-grid', 60);
    staggerChildren('.platform-grid', 80);
    staggerChildren('.pipeline', 70);
    initNavScroll();
  });
}());
