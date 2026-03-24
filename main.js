(function () {
  // ── Dark mode ───────────────────────────────────
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (toggle) toggle.title = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  var saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Year in footer ──────────────────────────────
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Scroll progress bar ─────────────────────────
  var bar = document.createElement('div');
  bar.id = 'progress-bar';
  document.body.insertBefore(bar, document.body.firstChild);

  window.addEventListener('scroll', function () {
    var total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });

  // ── Active nav link ─────────────────────────────
  var links = document.querySelectorAll('.nav-links a');
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  links.forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (path === '' && href === '/')) {
      a.classList.add('active');
    }
  });
})();
