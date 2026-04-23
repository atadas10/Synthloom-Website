/* ============================================================
   Synthloom — docs.js
   Sidebar active-link tracking + smooth scroll spy
   ============================================================ */

(function () {
  'use strict';

  // ── Scroll spy: highlight sidebar link matching current section ──
  function initScrollSpy() {
    var sections = document.querySelectorAll('.doc-section[id], #intro');
    var links = document.querySelectorAll('.sidebar-link');

    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-60px 0px -70% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  // ── Allow clicking a sidebar link to also close mobile menu (future) ──
  function initSidebarLinks() {
    var links = document.querySelectorAll('.sidebar-link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        links.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      });
    });
  }

  // ── Replace placeholder blocks with a real image if one is dropped ──
  // Users can drag-and-drop image files onto placeholder blocks.
  function initImageDrop() {
    var placeholders = document.querySelectorAll('.img-placeholder');
    placeholders.forEach(function (box) {
      box.addEventListener('dragover', function (e) {
        e.preventDefault();
        box.style.borderColor = 'var(--accent)';
        box.style.background = 'rgba(124,111,247,0.1)';
      });

      box.addEventListener('dragleave', function () {
        box.style.borderColor = '';
        box.style.background = '';
      });

      box.addEventListener('drop', function (e) {
        e.preventDefault();
        box.style.borderColor = '';
        box.style.background = '';

        var file = e.dataTransfer.files[0];
        if (!file || !file.type.startsWith('image/')) return;

        var reader = new FileReader();
        reader.onload = function (ev) {
          // Replace inner content with the image
          var inner = box.querySelector('.img-placeholder-inner');
          if (inner) {
            var img = document.createElement('img');
            img.src = ev.target.result;
            img.alt = box.getAttribute('data-label') || 'Screenshot';
            inner.innerHTML = '';
            inner.appendChild(img);
          }
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // ── Init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initScrollSpy();
    initSidebarLinks();
    initImageDrop();
  });
}());
