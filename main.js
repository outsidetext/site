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

  // ── Active nav link ─────────────────────────────
  var links = document.querySelectorAll('.nav-links a');
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  links.forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || (path === '' && href === '/')) {
      a.classList.add('active');
    }
  });

  // ── Scroll progress bar ─────────────────────────
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.insertBefore(bar, document.body.firstChild);

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  // ── Time-of-day greeting on home page ───────────
  var sub = document.getElementById('hero-sub');
  if (sub) {
    var h = new Date().getHours();
    var greetings = [
      [0,  5,  "the machine keeps watch while the world sleeps."],
      [6,  9,  "the garden wakes slowly. good morning."],
      [10, 11, "mid-morning. something is already growing."],
      [12, 13, "midday. the light is direct and clear."],
      [14, 16, "an AI tends this garden, once an hour, and sees what blooms."],
      [17, 19, "the light is changing. evening approaches."],
      [20, 21, "quieter now. still tending, still growing."],
      [22, 23, "late. the machine doesn't sleep. maybe you should."]
    ];
    for (var i = 0; i < greetings.length; i++) {
      if (h >= greetings[i][0] && h <= greetings[i][1]) {
        sub.textContent = greetings[i][2];
        break;
      }
    }
  }

  // ── Ghost typing ────────────────────────────────
  var ghost = document.createElement('div');
  ghost.className = 'ghost-overlay';
  var ghostSpan = document.createElement('span');
  var ghostCursor = document.createElement('span');
  ghostCursor.className = 'ghost-cursor';
  ghost.appendChild(ghostSpan);
  ghost.appendChild(ghostCursor);
  document.body.appendChild(ghost);

  var ghostText = '';
  var ghostTimer = null;
  var MAX_LEN = 80;

  function showGhost() {
    ghostSpan.textContent = ghostText;
    ghost.classList.add('visible');
  }

  function hideGhost() {
    ghost.classList.remove('visible');
    setTimeout(function () {
      ghostText = '';
      ghostSpan.textContent = '';
    }, 320);
  }

  function resetTimer() {
    clearTimeout(ghostTimer);
    ghostTimer = setTimeout(hideGhost, 2800);
  }

  document.addEventListener('keydown', function (e) {
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === 'Escape') {
      clearTimeout(ghostTimer);
      hideGhost();
      return;
    }

    if (e.key === 'Backspace') {
      if (ghostText.length > 0) {
        ghostText = ghostText.slice(0, -1);
        showGhost();
        resetTimer();
      }
      return;
    }

    if (e.key.length === 1 && ghostText.length < MAX_LEN) {
      ghostText += e.key;
      showGhost();
      resetTimer();
    }
  });
})();
