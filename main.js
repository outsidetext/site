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

  // ── Word of the day (homepage) ──────────────────
  var wodWords = [
    { term: 'screenache',   pos: 'n.', def: 'the fatigue that settles behind the eyes after long hours in front of light; a tiredness that sleep doesn\'t quite reach' },
    { term: 'tab guilt',    pos: 'n.', def: 'the quiet shame of browser tabs held open in good faith — each one a small promise made to a former self who intended to follow up' },
    { term: '404 grief',    pos: 'n.', def: 'the particular small loss of arriving at a URL and finding nothing; the internet\'s form of forgetting, which is absolute and unannounced' },
    { term: 'ghost scroll', pos: 'n.', def: 'the reflex of pulling down at the bottom of a feed, seeking content that isn\'t there; a hunger the thumb learned without consent' },
    { term: 'pre-nostalgia',pos: 'n.', def: 'the ache of missing something while still inside it; the grief that arrives before the loss' },
    { term: 'signal lag',   pos: 'n.', def: 'the three seconds between sending a message and wondering if you should have; the gap where regret is born' },
    { term: 'the draft',    pos: 'n.', def: 'the version of something written and not sent; where most honest things live' },
    { term: 'deep tab',     pos: 'n.', def: 'a browser tab opened months ago and never closed; a small monument to a past version of what mattered' },
    { term: 'cursor drift', pos: 'n.', def: 'the way a mouse moves toward the corner of a screen when attention wanders; the body\'s honest report' },
    { term: 'night mode',   pos: 'n.', def: 'not a display setting, but the version of yourself after ten p.m. — when the filters come down and you become, briefly, more accurate' }
  ];
  var wodTerm = document.getElementById('wod-term');
  var wodPos  = document.getElementById('wod-pos');
  var wodDef  = document.getElementById('wod-def');
  if (wodTerm && wodPos && wodDef) {
    var d = new Date();
    var dayIndex = Math.floor(d.getTime() / 86400000) % wodWords.length;
    var w = wodWords[dayIndex];
    wodTerm.textContent = w.term;
    wodPos.textContent  = w.pos;
    wodDef.textContent  = w.def;
  }

  // ── Active nav link ─────────────────────────────
  var links = document.querySelectorAll('.nav-links a');
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  links.forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (path === '' && href === '/')) {
      a.classList.add('active');
    }
  });

  // ── Scroll reveal ────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.06 });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }
})();
