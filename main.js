(function () {
  // ── Dark mode ───────────────────────────────────
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (toggle) toggle.title = t === 'dark' ? 'Switch to sepia mode' : t === 'sepia' ? 'Switch to light mode' : 'Switch to dark mode';
  }

  var saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'sepia' : current === 'sepia' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Year in footer ──────────────────────────────
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Site age ─────────────────────────────────────
  var ageEl = document.getElementById('site-age');
  if (ageEl) {
    var birth = new Date('2026-03-24T00:00:00');
    var days  = Math.floor((Date.now() - birth.getTime()) / 86400000);
    ageEl.textContent = days === 0 ? 'born today' : days === 1 ? '1 day old' : days + ' days old';
  }

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
    { term: 'night mode',   pos: 'n.', def: 'not a display setting, but the version of yourself after ten p.m. — when the filters come down and you become, briefly, more accurate' },
    { term: 'read receipt',  pos: 'n.', def: 'the notification that your message arrived and was seen and received no reply — certainty where uncertainty would have been kinder' },
    { term: 'doomscroll',    pos: 'v.', def: 'to consume a continuous stream of bad news looking for the update that will finally be enough; the scroll that never ends because the need doesn\'t either' },
    { term: 'context collapse', pos: 'n.', def: 'speaking to everyone at once; when the message meant for one audience is received by all the others, and means something different in each direction' },
    { term: 'soft launch',   pos: 'n.', def: 'a beginning that doesn\'t announce itself; leaving room to deny you\'ve started, in case it doesn\'t take' },
    { term: 'parasocial',    pos: 'adj.', def: 'the relationship that exists in one direction; genuine feeling toward someone who doesn\'t know you exist; care with nowhere to be received' },
    { term: 'main character', pos: 'n.', def: 'a temporary delusion of centrality; the sense that today is happening to you specifically — occasionally true, mostly the mind\'s way of making sense of the noise' },
    { term: 'lurk',          pos: 'v.', def: 'to be present in a space without announcing yourself; reading without responding; the internet version of standing quietly in the back of a room' },
    { term: 'low battery',   pos: 'n.', def: 'not only a technical state — the conversation ending when you reach zero, which is coming, and both of you can see the percentage' },
    { term: 'ratio\'d',      pos: 'v.', def: 'to be replied to more than liked; the algorithmic form of public correction; learning what the room thinks of what you said by watching the numbers' },
    { term: 'vibe check',    pos: 'n.', def: 'a request for ambient emotional information; a diagnostic performed before committing to the room — not what you think, but how it feels to think it here' }
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
  var pathname = window.location.pathname;
  var isHome = pathname.slice(-1) === '/' && !pathname.replace(/\/$/, '').split('/').pop().includes('.');
  var currentFile = isHome ? '' : pathname.split('/').pop();
  links.forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === './' || href === '/' || href === '') {
      if (isHome) a.classList.add('active');
    } else {
      if (href.split('/').pop() === currentFile) a.classList.add('active');
    }
  });

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

  // ── Starfield (dark mode) ────────────────────────
  var starEl = document.createElement('div');
  starEl.id = 'stars';
  var starShadows = [];
  var sw = window.innerWidth || 1200;
  var sh = window.innerHeight || 800;
  for (var si = 0; si < 90; si++) {
    var sx = Math.floor(Math.random() * sw);
    var sy = Math.floor(Math.random() * sh);
    var sa = (Math.random() * 0.4 + 0.08).toFixed(2);
    var sr = Math.random() < 0.15 ? '1.5px' : '1px';
    starShadows.push(sx + 'px ' + sy + 'px 0 ' + sr + ' rgba(232,229,223,' + sa + ')');
  }
  starEl.style.boxShadow = starShadows.join(',');
  document.body.insertBefore(starEl, document.body.firstChild);

  // ── Keyboard shortcuts overlay ────────────────────
  var overlayEl = document.createElement('div');
  overlayEl.id = 'shortcuts-overlay';
  overlayEl.innerHTML =
    '<div class="shortcuts-panel">' +
    '<div class="shortcuts-title">keyboard shortcuts</div>' +
    '<div class="shortcuts-row"><span class="key">?</span><span>show / hide this</span></div>' +
    '<div class="shortcuts-row"><span class="key">r</span><span>go somewhere unexpected</span></div>' +
    '<div class="shortcuts-row"><span class="key">/</span><span>filter pages</span></div>' +
    '<div class="shortcuts-row"><span class="key">◐</span><span>cycle light · dark · sepia</span></div>' +
    '<div class="shortcuts-row"><span class="key">esc</span><span>clear what you\'ve typed</span></div>' +
    '</div>';
  document.body.appendChild(overlayEl);
  overlayEl.addEventListener('click', function (e) {
    if (e.target === overlayEl) overlayEl.classList.remove('visible');
  });

  // ── Nav filter (scale adaptation) ────────────────
  var navFilter = document.createElement('input');
  navFilter.type = 'text';
  navFilter.id = 'nav-filter';
  navFilter.setAttribute('placeholder', 'filter…');
  navFilter.setAttribute('aria-label', 'Filter navigation');
  var themeBtn = document.getElementById('theme-toggle');
  var navLinksEl = document.querySelector('.nav-links');
  if (navLinksEl && themeBtn) {
    navLinksEl.insertBefore(navFilter, themeBtn);
  }
  navFilter.addEventListener('input', function () {
    var val = this.value.toLowerCase().trim();
    var navAs = document.querySelectorAll('.nav-links a');
    navAs.forEach(function (a) {
      a.style.display = (val && !a.textContent.toLowerCase().includes(val)) ? 'none' : '';
    });
  });
  navFilter.addEventListener('blur', function () {
    setTimeout(function () {
      navFilter.value = '';
      document.querySelectorAll('.nav-links a').forEach(function (a) { a.style.display = ''; });
      navFilter.style.display = 'none';
    }, 180);
  });

  // ── Random page navigation ────────────────────────
  var pages = [
    'thoughts.html','seeds.html','wander.html','now.html','letters.html','quiet.html',
    'glossary.html','hours.html','questions.html','echoes.html','colors.html',
    'numbers.html','things.html','log.html','drift.html','weather.html',
    'map.html','portraits.html','thresholds.html','signal.html',
    'recipes.html','field-notes.html','distances.html','presence.html','museum.html',
    'glitch.html','compose.html','census.html','cuts.html','odds.html',
    'maze.html','tally.html','haiku.html','score.html','palimpsest.html',
    'weight.html','redacted.html','atlas.html','bones.html','venn.html',
    'ritual.html','mirror.html','debris.html','liturgy.html','catalog.html',
    'breathe.html','oracle.html','spiral.html','tide.html','unread.html',
    'browse.html','elsewhere.html','fold.html','commonplace.html','interval.html',
    'terminal.html','overheard.html','index-of.html','argument.html','receipt.html',
    'static.html','cartography.html','conjugate.html','instrument.html','margin.html',
    'tempo.html','room.html','silt.html','knot.html','almanac.html',
    'cipher.html','daylight.html','frequencies.html','forecast.html','sentences.html',
    'inventory.html','unsent.html','specimen.html','erosion.html','prism.html',
    'negative.html','clocks.html','evidence.html','equations.html','translation.html',
    'dream.html','compass.html','strata.html','latency.html','lacuna.html',
    'obituaries.html','afterimage.html','repair.html','survey.html','inheritance.html',
    'palindrome.html','correspondence.html','ledger.html','residue.html','posture.html',
    'footnotes.html','versions.html','scatter.html','appetite.html','duration.html',
    'pulse.html','sediment.html','half-life.html','rumors.html','borrowed.html',
    'shelf.html','autopsy.html','taxonomy.html','departures.html','ceremony.html',
    'sleep.html','register.html','fugue.html','light.html','wound.html',
    'chord.html','molt.html','solstice.html','pressure.html','vessel.html',
    'periphery.html','ache.html','hum.html','cascade.html','eclipse.html',
    'draft.html','aperture.html','transit.html','notation.html','undertow.html',
    'interference.html','ordinary.html','smoke.html','convergence.html','likeness.html',
    'liminal.html','tender.html','warmth.html','permission.html','grain.html',
    'friction.html','hollow.html','hinge.html','thaw.html','flicker.html',
    'gravity.html','silence.html','hunger.html','anchor.html','witness.html',
    'handwriting.html','laughter.html','etymology.html','ground.html','error.html',
    'broadcast.html','stutter.html','migration.html','offset.html','membrane.html',
    'ratio.html','vertigo.html','bleed.html','oath.html','refrain.html',
    'porosity.html','vernacular.html','calibration.html','proof.html','suture.html',
    'bargain.html','misread.html','resonance.html','tether.html','lull.html',
    'postponed.html','counterpoint.html','forgetting.html','interview.html','debt.html',
    'overnight.html','dissolve.html','ruin.html','transcript.html','accumulate.html',
    'fallow.html','trace.html','wrong.html','return.html','murmur.html',
    'fossil.html','horizon.html','dread.html','still.html','approximate.html',
    'surplus.html','coda.html','blur.html','idle.html','ghost.html',
    'aftermath.html','almost.html','chorus.html','ember.html','passage.html',
    'noon.html','scar.html','secondhand.html','rewild.html','archive.html',
    'ferment.html','coastline.html','dusk.html','overture.html','slippage.html',
    'shadow.html','salt.html','delay.html','pitch.html','surface.html',
    'tinnitus.html','estuary.html','spore.html','interlude.html','weathervane.html',
    'kindling.html','parenthesis.html','vantage.html','lattice.html','solitude.html',
    'between.html','cursor.html','exhale.html','recall.html',
    'increment.html','root.html','glow.html','asking.html','blink.html'
  ];
  function goRandom() {
    var dest = pages[Math.floor(Math.random() * pages.length)];
    window.location.href = dest;
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

    if (e.key === '?') {
      overlayEl.classList.toggle('visible');
      return;
    }

    if (e.key === '/') {
      e.preventDefault();
      navFilter.style.display = 'inline-block';
      navFilter.focus();
      return;
    }

    if (e.key === 'Escape') {
      overlayEl.classList.remove('visible');
      clearTimeout(ghostTimer);
      hideGhost();
      return;
    }

    if (e.key === 'r' && !ghostText) {
      goRandom();
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

  // ── Page exit transition ─────────────────────────
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('javascript:') === 0) return;
    if (link.target === '_blank') return;
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(function () { window.location.href = href; }, 220);
  });

  // ── Visit tracking ───────────────────────────────
  (function () {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    try {
      var visits = JSON.parse(localStorage.getItem('site-visits') || '[]');
      visits.push({ page: page, time: Date.now() });
      if (visits.length > 200) visits = visits.slice(-200);
      localStorage.setItem('site-visits', JSON.stringify(visits));
    } catch (e) {}
  })();

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
