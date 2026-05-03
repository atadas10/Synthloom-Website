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

  // ── Demo / Calendly prefill ────────────────────────────────
  function initDemoBooking() {
    var btn = document.getElementById('demo-prefill-submit');
    if (!btn) return;

    var nameInput    = document.getElementById('demo-prefill-name');
    var subjectPreview = document.getElementById('demo-subject-preview');

    // Update the subject preview live as the user types
    nameInput.addEventListener('input', function () {
      var val = nameInput.value.trim();
      subjectPreview.textContent = 'Synthloom Demo: ' + (val || 'Your Name');
    });

    btn.addEventListener('click', function () {
      var name  = nameInput.value.trim();
      var email = (document.getElementById('demo-prefill-email').value || '').trim();

      if (!name) {
        nameInput.focus();
        return;
      }

      // Hide form, show widget container
      document.getElementById('demo-prefill').style.display = 'none';
      var widgetEl = document.getElementById('demo-calendly-widget');
      widgetEl.style.display = 'block';

      // Calendly subject is driven by the event type name in your Calendly
      // dashboard — set it to: "Synthloom Demo: {Invitee Full Name}"
      Calendly.initInlineWidget({
        url: 'https://calendly.com/synthloom-info?hide_event_type_details=1&hide_gdpr_banner=1&background_color=111115&text_color=e4e4e7&primary_color=7c6ff7',
        parentElement: widgetEl,
        prefill: {
          name:  name,
          email: email
        }
      });
    });

    // Also allow Enter key on the email field to submit
    document.getElementById('demo-prefill-email').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
    });
  }

  // ── Init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initFadeUp();
    staggerChildren('.features-grid', 60);
    staggerChildren('.platform-grid', 80);
    staggerChildren('.pipeline', 70);
    initNavScroll();
    initDemoBooking();
  });
}());
