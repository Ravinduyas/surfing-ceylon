/* Surfing Ceylon — shared site chrome + behaviour.
   The header, side rail, menu, footer and SVG artwork live here once,
   so all five pages stay in step. Edit PAGES to change the navigation. */
(function () {
  'use strict';

  var PAGES = [
    { id: 'home', href: 'index.html', label: 'Home' },
    { id: 'camp', href: 'camp.html', label: 'The Camp' },
    { id: 'spots', href: 'spots.html', label: 'Surf Spots' },
    { id: 'packages', href: 'packages.html', label: 'Packages' },
    { id: 'contact', href: 'contact.html', label: 'Contact' }
  ];
  var current = document.body.getAttribute('data-page');

  function links() {
    return PAGES.map(function (p) {
      return '<a href="' + p.href + '"' + (p.id === current ? ' aria-current="page"' : '') + '>' + p.label + '</a>';
    }).join('');
  }

  var BOARD_PATH = 'M110 6 C166 70 198 210 196 345 C194 480 168 596 142 626 Q110 640 78 626 C52 596 26 480 24 345 C22 210 54 70 110 6Z';
  var SIDE_PATH = 'M90 8 C107 60 122 170 123 330 C123 480 120 580 113 632 L105 632 C103 560 99 470 99 330 C99 190 99 70 90 8Z';
  var ANTON = 'font-family="Anton, Impact, sans-serif"';

  var DEFS = `
<svg class="defs" width="0" height="0" aria-hidden="true" focusable="false">
  <defs>
    <filter id="rough" x="-5%" y="-12%" width="110%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.75 0.9" numOctaves="2" seed="4" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -10 7.1" result="m"/>
      <feComposite in="SourceGraphic" in2="m" operator="in"/>
    </filter>
    <filter id="blob" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/>
      <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="g"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" seed="11" result="w"/>
      <feDisplacementMap in="g" in2="w" scale="34" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -10 7.1" result="m"/>
      <feComposite in="d" in2="m" operator="in"/>
    </filter>
    <linearGradient id="resin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5d0b12"/><stop offset=".42" stop-color="#b3201f"/>
      <stop offset=".78" stop-color="#d9601f"/><stop offset="1" stop-color="#e9952f"/>
    </linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#fff" stop-opacity=".34"/>
      <stop offset=".36" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".32"/>
    </linearGradient>
    <radialGradient id="husk" cx=".36" cy=".3" r=".8">
      <stop offset="0" stop-color="#ffb347"/><stop offset=".5" stop-color="#ee7d16"/><stop offset="1" stop-color="#a8440c"/>
    </radialGradient>
    <clipPath id="boardClip"><path d="${BOARD_PATH}"/></clipPath>

    <symbol id="board" viewBox="0 0 220 640">
      <path d="${BOARD_PATH}" fill="url(#resin)"/>
      <g clip-path="url(#boardClip)">
        <path d="M0 0H220V96 Q165 120 110 100 T0 104Z" fill="#f4eedf"/>
        <rect x="0" y="262" width="220" height="196" fill="#f4eedf"/>
        <rect x="0" y="270" width="220" height="3" fill="#b3122b"/>
        <rect x="0" y="447" width="220" height="3" fill="#b3122b"/>
        <text x="110" y="398" text-anchor="middle" ${ANTON} font-size="92" fill="#141210" textLength="152" lengthAdjust="spacingAndGlyphs" filter="url(#rough)">CEYLON</text>
        <text x="110" y="300" text-anchor="middle" ${ANTON} font-size="21" letter-spacing="6" fill="#b3122b">SURFING</text>
        <text x="110" y="436" text-anchor="middle" ${ANTON} font-size="13" textLength="150" lengthAdjust="spacing" fill="#b3122b">SURF CAMP · SRI LANKA</text>
        <rect x="0" y="556" width="220" height="9" fill="#141210"/>
        <rect x="0" y="572" width="220" height="4" fill="#141210"/>
        <rect x="109" y="0" width="2" height="640" fill="#2a0a08" opacity=".45"/>
        <rect x="0" y="0" width="220" height="640" fill="url(#gloss)"/>
      </g>
      <circle cx="110" cy="604" r="5" fill="#141210"/>
      <circle cx="110" cy="52" r="15" fill="none" stroke="#b3122b" stroke-width="2.5"/>
      <path d="M100 55 q5 -9 10 0 t10 0" fill="none" stroke="#b3122b" stroke-width="2.5" stroke-linecap="round"/>
    </symbol>

    <!-- the same board seen from the side: thin, nose kicked up, fins under the tail -->
    <clipPath id="sideClip"><path d="${SIDE_PATH}"/></clipPath>
    <symbol id="board-side" viewBox="0 0 220 640">
      <path d="M120 508 C150 524 168 566 166 608 C152 588 136 574 119 568Z" fill="#141210"/>
      <path d="M121 452 C138 462 148 484 147 506 C139 494 130 487 120 484Z" fill="#141210"/>
      <path d="${SIDE_PATH}" fill="url(#resin)"/>
      <g clip-path="url(#sideClip)">
        <rect x="0" y="0" width="220" height="100" fill="#f4eedf"/>
        <rect x="0" y="262" width="220" height="196" fill="#f4eedf"/>
        <rect x="0" y="270" width="220" height="3" fill="#b3122b"/>
        <rect x="0" y="447" width="220" height="3" fill="#b3122b"/>
        <rect x="0" y="556" width="220" height="9" fill="#141210"/>
        <rect x="0" y="572" width="220" height="4" fill="#141210"/>
        <rect x="100" y="0" width="5" height="640" fill="#fff" opacity=".3"/>
        <rect x="116" y="0" width="8" height="640" fill="#000" opacity=".22"/>
      </g>
    </symbol>

    <symbol id="foamie" viewBox="0 0 220 600">
      <path d="M110 8 C176 26 200 170 198 320 C196 470 176 572 154 590 H66 C44 572 24 470 22 320 C20 170 44 26 110 8Z" fill="#f4eedf" stroke="#141210" stroke-width="5"/>
      <path d="M40 150 H180 M32 200 H188" stroke="#b3122b" stroke-width="16"/>
      <path d="M110 12 V588" stroke="#141210" stroke-width="2" opacity=".5"/>
    </symbol>
    <symbol id="minimal" viewBox="0 0 200 600">
      <path d="M100 6 C150 60 180 200 178 330 C176 460 152 570 132 590 Q100 600 68 590 C48 570 24 460 22 330 C20 200 50 60 100 6Z" fill="#141210"/>
      <path d="M100 10 V594" stroke="#f4eedf" stroke-width="3"/>
      <circle cx="100" cy="210" r="26" fill="none" stroke="#f4eedf" stroke-width="4"/>
    </symbol>
    <symbol id="fish" viewBox="0 0 220 480">
      <path d="M110 6 C170 60 200 170 198 270 C196 370 184 440 172 474 L110 432 L48 474 C36 440 24 370 22 270 C20 170 50 60 110 6Z" fill="#b3122b"/>
      <path d="M110 10 V430" stroke="#f4eedf" stroke-width="2.5" opacity=".8"/>
      <path d="M36 300 H184" stroke="#f4eedf" stroke-width="10"/>
    </symbol>
    <symbol id="shortboard" viewBox="0 0 180 560">
      <path d="M90 4 C130 90 160 210 158 320 C156 430 140 520 124 548 Q90 558 56 548 C40 520 24 430 22 320 C20 210 50 90 90 4Z" fill="#f4eedf" stroke="#141210" stroke-width="5"/>
      <path d="M26 380 L156 300 V350 L30 430Z" fill="#141210"/>
      <path d="M90 10 V552" stroke="#141210" stroke-width="2" opacity=".5"/>
    </symbol>

    <symbol id="splat" viewBox="0 0 400 400">
      <g filter="url(#blob)">
        <circle cx="232" cy="168" r="122"/>
        <g transform="rotate(38 232 168)">
          <rect x="150" y="250" width="22" height="118" rx="11"/><rect x="194" y="262" width="16" height="88" rx="8"/>
          <rect x="234" y="262" width="26" height="140" rx="13"/><rect x="282" y="252" width="14" height="72" rx="7"/>
          <rect x="116" y="226" width="14" height="78" rx="7"/><circle cx="203" cy="376" r="7"/><circle cx="291" cy="346" r="5"/>
        </g>
        <g transform="rotate(118 232 168)">
          <rect x="200" y="268" width="14" height="52" rx="7"/><rect x="246" y="270" width="18" height="66" rx="9"/><circle cx="255" cy="356" r="5"/>
        </g>
        <g transform="rotate(-22 232 168)"><rect x="210" y="270" width="12" height="44" rx="6"/></g>
      </g>
    </symbol>

    <symbol id="coconut" viewBox="0 0 300 380">
      <path d="M186 96 L236 4" stroke="#f4eedf" stroke-width="13" stroke-linecap="round"/>
      <path d="M186 96 L236 4" stroke="#b3122b" stroke-width="13" stroke-dasharray="11 13"/>
      <path d="M150 62 C232 62 280 128 276 218 C272 310 220 372 150 372 C80 372 28 310 24 218 C20 128 68 62 150 62Z" fill="url(#husk)"/>
      <ellipse cx="150" cy="96" rx="74" ry="26" fill="#f6efdc"/>
      <ellipse cx="150" cy="99" rx="56" ry="17" fill="#d9ccae"/>
      <ellipse cx="150" cy="101" rx="44" ry="11" fill="#bfd9d2" opacity=".85"/>
      <path d="M62 190 C56 250 76 310 112 344" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="10" stroke-linecap="round"/>
    </symbol>

    <symbol id="linocut" viewBox="0 0 400 250">
      <rect width="400" height="250" fill="#141210"/>
      <g filter="url(#rough)">
        <circle cx="286" cy="96" r="52" fill="#b3122b"/>
        <path d="M0 150 C60 118 110 118 150 146 C182 168 214 164 232 138 C222 180 176 196 132 180 C92 166 46 168 0 190Z" fill="#f4eedf"/>
        <path d="M0 206 C80 184 150 214 220 200 S340 178 400 196" fill="none" stroke="#f4eedf" stroke-width="5"/>
        <path d="M0 226 C90 208 170 236 250 220 S350 206 400 218" fill="none" stroke="#f4eedf" stroke-width="3"/>
        <path d="M250 150 H400 M266 164 H400 M300 178 H400" stroke="#b3122b" stroke-width="4"/>
        <path d="M52 120 C50 84 56 56 70 30 M70 30 C52 30 38 38 30 52 M70 30 C84 26 100 32 110 46 M70 30 C60 16 46 12 32 16 M70 30 C80 14 96 10 110 16" fill="none" stroke="#f4eedf" stroke-width="5" stroke-linecap="round"/>
      </g>
    </symbol>
  </defs>
</svg>`;

  var CHROME = `
<aside class="rail">
  <button class="rail-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
  </button>
  <nav class="rail-nav" aria-label="Pages">${links()}</nav>
</aside>
<header class="top">
  <a class="logo" href="index.html" aria-label="Surfing Ceylon, home">
    <span class="logo-name">Surfing Ceylon</span>
    <span class="logo-sub">Surf Camp · Sri Lanka</span>
  </a>
  <a class="btn btn-red" href="contact.html">Get in touch</a>
</header>
<nav class="menu" id="menu" aria-label="Menu">
  <button class="menu-close" id="menuClose" aria-label="Close menu">Close ✕</button>
  ${links()}
  <p class="script">Weligama Bay, south coast</p>
</nav>`;

  var FOOTER = `
<footer class="foot">
  <span class="logo-name">Surfing Ceylon</span>
  <nav class="foot-nav" aria-label="Footer">${links()}</nav>
  <span>Weligama Bay · Sri Lanka · © 2026</span>
</footer>`;

  document.body.insertAdjacentHTML('afterbegin', DEFS + CHROME);
  document.body.insertAdjacentHTML('beforeend', FOOTER);

  /* ---------- motion: reveal blocks as they scroll into view ---------- */
  var root = document.documentElement;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* page slide: the old page pans out, the next one pans in (styles under "page slide" in style.css) */
  var here = PAGES.map(function (p) { return p.id; }).indexOf(current);
  var from = -1;
  try {
    from = parseInt(sessionStorage.getItem('sc_from'), 10);
    sessionStorage.removeItem('sc_from');
    sessionStorage.removeItem('sc_dir');
  } catch (err) { /* storage unavailable: pages still slide in from the right */ }
  if (isNaN(from)) from = -1;

  function two(n) { return (n < 10 ? '0' : '') + n; }
  var back = from > here;
  var nums = [two(from + 1), two(here + 1)];           // "00" on a first visit
  if (back) nums.reverse();
  document.body.insertAdjacentHTML('beforeend',
    '<div class="pager" aria-hidden="true">*<span class="pager-roll' + (back ? ' down' : '') + '"><i>' + nums[0] + '</i><i>' + nums[1] + '</i></span></div>');

  if (!calm) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || a.target || a.hasAttribute('download')) return;
      var href = a.getAttribute('href');
      var to = PAGES.map(function (p) { return p.href; }).indexOf(href);
      if (to < 0) return;                                 // only the site's own pages
      e.preventDefault();
      if (to === here) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      var goingBack = to < here;
      try {
        sessionStorage.setItem('sc_from', here);
        sessionStorage.setItem('sc_dir', goingBack ? 'left' : 'right');
      } catch (err) { /* ignore */ }
      root.classList.remove('enter', 'from-left');
      root.classList.add('leaving');
      if (goingBack) root.classList.add('to-right');
      setTimeout(function () { window.location.href = href; }, 560);
    });
    // coming back with the browser's Back button restores the page as it was left
    window.addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('leaving', 'to-right'); });
  }

  if (!calm && 'IntersectionObserver' in window) {
    root.classList.add('js-anim');
    var targets = document.querySelectorAll(
      'main .mega, main .display, main .script, main .spec, main .print, main .spot-row, main .splat, ' +
      'main .lineup li, main .faq, main .prose, main .copy > p, main .lead, main .ticks, main .price-list, ' +
      'main .contact-list, main .day, main .book-copy, main .book-actions, main .quiver-note, main .fine, main .spots-more');
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); seen.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    [].forEach.call(targets, function (el) {
      if (el.closest('.hero, .page-hero') || el.parentElement.closest('.reveal')) return;  // heroes animate on load; no nesting
      el.classList.add('reveal');
      var i = [].filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); }).length - 1;
      el.style.setProperty('--d', Math.min(i, 5) * 90 + 'ms');   // siblings arrive one after another
      seen.observe(el);
    });
  }

  /* ---------- menu ---------- */
  var menu = document.getElementById('menu');
  var menuBtn = document.getElementById('menuBtn');
  var menuClose = document.getElementById('menuClose');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    if (open) menuClose.focus();
  }
  menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menuClose.addEventListener('click', function () { setMenu(false); menuBtn.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- contact form: opens the visitor's email app, no server needed ---------- */
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var body = [
        'Name: ' + f.name.value,
        'Dates: ' + f.dates.value,
        'Surf level: ' + f.level.value,
        '',
        f.message.value
      ].join('\n');
      window.location.href = 'mailto:' + form.getAttribute('data-email') +
        '?subject=' + encodeURIComponent('Enquiry from ' + f.name.value) +
        '&body=' + encodeURIComponent(body);
    });
  }

  /* ---------- fully-booked popup: opens when any package card is clicked ---------- */
  var packs = [].filter.call(document.querySelectorAll('.pack'), function (c) { return c.querySelector('.price'); });
  if (packs.length) {
    document.body.insertAdjacentHTML('beforeend', `
<dialog class="full" id="fullDialog" aria-labelledby="fullTitle">
  <button class="full-x" type="button" data-close aria-label="Close">✕</button>
  <p class="script">Sorry, the line-up is full</p>
  <h2 class="display red rough" id="fullTitle">We are<br>fully booked</h2>
  <p class="full-copy"><b id="fullPack"></b> has no places left right now. Leave us a message and we will tell you as soon as one opens up.</p>
  <div class="book-actions">
    <a class="btn btn-red" href="contact.html">Get in touch</a>
    <button class="btn btn-black" type="button" data-close>Close</button>
  </div>
</dialog>`);
    var dialog = document.getElementById('fullDialog');
    var packName = document.getElementById('fullPack');

    packs.forEach(function (card) {
      card.classList.add('bookable');
      card.addEventListener('click', function (e) {
        e.preventDefault();
        packName.textContent = card.querySelector('h3').textContent;
        if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
      });
    });
    dialog.addEventListener('click', function (e) {
      // close buttons, or a click on the dimmed backdrop outside the box
      if (e.target.hasAttribute('data-close') || e.target === dialog) dialog.close();
    });
  }

  /* ---------- path board (every page except Home) ----------
     A board rides a curved line down the page as you scroll. It starts in the hero,
     weaves through the page's sections (passing behind any section marked
     "over-board"), comes down the right-hand side, then sweeps left, rolls onto
     its side, grows, and settles level over the closing headline.
     Each page's line is listed in ROUTES; points are tied to that page's own
     sections, so the route holds at any screen size. */
  (function () {
    var pb = document.getElementById('pathBoard');
    if (!pb) return;
    var mainEl = document.querySelector('main');
    var secs = mainEl.querySelectorAll(':scope > section');
    var topView = pb.querySelector('.view-top'), sideView = pb.querySelector('.view-side');
    var wide = window.matchMedia('(min-width: 901px)');
    var busy = false;
    var m;                                                    // <main>'s box, refreshed every frame

    // box(i): section i of the page; box(i, sel): something inside it
    function box(i, sel) {
      var el = sel ? secs[i].querySelector(sel) : secs[i];
      var r = el.getBoundingClientRect();
      return { t: r.top - m.top, h: r.height };
    }
    function on(b, x, k, px) { return [x, b.t + b.h * k + (px || 0)]; }   // x across the page, k down the box

    // diagonal, left to right, behind a row of cards
    function acrossCards(g) {
      return [on(g, .205, 0, -60), on(g, .27, .15), on(g, .37, .37), on(g, .50, .63),
              on(g, .63, .77), on(g, .72, .83), on(g, .81, 1), on(g, .855, 1, 50)];
    }
    // down the right-hand side of a section
    function downRight(b) { return [on(b, .882, .22), on(b, .90, .8)]; }
    // the finish: down the right of the last section, bend, sweep left, end centred
    function finish(b) {
      return [on(b, .905, .16), on(b, .903, .52), on(b, .891, .68), on(b, .864, .84),
              on(b, .81, .91), on(b, .70, .98), on(b, .59, 1), on(b, .50, 1)];
    }

    var ROUTES = {
      // hero left > behind the package cards > past the extras > questions
      packages: { start: .153, line: function () {
        return acrossCards(box(1, '.pack-grid')).concat(downRight(box(2)), finish(box(3)));
      } },
      // hero left > behind the picture > behind the room cards > behind the stats box > food
      camp: { start: .153, line: function () {
        var a = box(1);
        return [on(a, .14, .3), on(a, .17, .85)].concat(acrossCards(box(2, '.pack-grid')), downRight(box(3)), finish(box(4)));
      } },
      // hero right > an S through the list of breaks > the season
      spots: { start: .86, line: function () {
        var l = box(1);
        return [on(l, .80, .05), on(l, .55, .2), on(l, .2, .38), on(l, .12, .5),
                on(l, .2, .62), on(l, .55, .8), on(l, .84, .97)].concat(finish(box(2)));
      } },
      // hero right > swings left into the gap beside the message form > back right underneath it >
      // down behind the "by bus" card > sweeps left under the travel cards
      contact: { start: .84, line: function () {
        var h = box(0), a = box(1), g = box(2), c = box(2, '.pack-grid');
        return [on(h, .75, .89),
                on(a, .628, .15), on(a, .582, .40), on(a, .576, .63), on(a, .621, .85), on(a, .681, .98), on(a, .76, 1, 20),
                on(c, .846, 0, -135), on(c, .905, 0, -30),
                on(c, .892, .32), on(c, .846, 1), on(c, .793, 1, 45),          // the last bend
                on(g, .694, 1, -8), on(g, .59, 1), on(g, .50, 1)];
      } }
    };
    var plan = ROUTES[current];
    if (!plan) return;

    function route() {
      m = mainEl.getBoundingClientRect();
      var W = m.width;
      var raw = [[plan.start, window.innerHeight * .07 + pb.offsetHeight / 2]].concat(plan.line());
      var pts = [], len = 0;
      raw.forEach(function (p, i) {
        var pt = { x: p[0] * W, y: p[1], u: 0 };
        if (i) {
          var q = pts[i - 1], dx = (pt.x - q.x) * .5, dy = pt.y - q.y;   // sideways counts half, so the board keeps pace with the scroll
          len += Math.sqrt(dx * dx + dy * dy);
          pt.u = len;
        }
        pts.push(pt);
      });
      return { pts: pts, len: len };
    }

    function at(r, u) {
      var p = r.pts;
      if (u <= 0) return p[0];
      if (u >= r.len) return p[p.length - 1];
      for (var i = 1; i < p.length; i++) {
        if (u <= p[i].u) {
          var k = (u - p[i - 1].u) / (p[i].u - p[i - 1].u || 1);
          return { x: p[i - 1].x + (p[i].x - p[i - 1].x) * k, y: p[i - 1].y + (p[i].y - p[i - 1].y) * k };
        }
      }
      return p[p.length - 1];
    }
    function unit(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function smooth(v) { v = unit(v); return v * v * (3 - 2 * v); }

    function place() {
      busy = false;
      if (!wide.matches) { pb.style.transform = topView.style.cssText = sideView.style.cssText = ''; return; }   // phones keep a small static board
      var r = route(), p = r.pts, n = p.length;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var u = (max > 0 ? unit(window.scrollY / max) : 0) * r.len;
      var c = at(r, u), a = at(r, u - 90), b = at(r, u + 90);
      var turn = -Math.atan2(b.x - a.x, b.y - a.y) * 180 / Math.PI;   // tail-first, following the line

      // from the last bend to the end of the line the board grows steadily,
      // finishing 65% of the page width long (END_LENGTH), level and centred
      var END_LENGTH = .65;
      var bend = p[n - 6].u;
      var grow = unit((u - bend) / (r.len - bend));
      var biggest = Math.max(1, mainEl.offsetWidth * END_LENGTH / pb.offsetHeight);
      var size = 1 + (biggest - 1) * smooth(grow);
      turn += (90 - turn) * smooth((grow - .5) / .5);

      pb.style.transform = 'translate3d(' + (c.x - pb.offsetWidth / 2) + 'px,' + (c.y - pb.offsetHeight / 2) + 'px,0) rotate(' + turn + 'deg) scale(' + size + ')';

      // after the last bend the board rolls onto its rail: the top view narrows away
      // while the side view (thin profile, fins down) comes in
      var roll = smooth((u - bend) / (p[n - 2].u - bend));
      topView.style.transform = 'scaleX(' + (1 - .86 * roll) + ')';
      topView.style.opacity = 1 - unit((roll - .55) / .4);
      sideView.style.transform = 'scaleX(' + (2.4 - 1.4 * roll) + ')';
      sideView.style.opacity = unit((roll - .3) / .55);
    }
    function ask() { if (!busy) { busy = true; requestAnimationFrame(place); } }

    window.addEventListener('scroll', ask, { passive: true });
    window.addEventListener('resize', ask);
    window.addEventListener('load', ask);
    document.addEventListener('toggle', ask, true);               // opening a question changes the page height
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ask);
    place();
  })();

  /* ---------- travelling board (home page only) ----------
     Stateless: every frame derives the board's place from the scroll position.
     1. Hero: tilted over the headline.
     2. Straightens and holds the centre lane while sections pass.
     3. Docks into its slot in the quiver line-up, then scrolls away with it. */
  var board = document.getElementById('rider');
  var slot = document.getElementById('slot');
  if (!board || !slot) return;

  var main = document.querySelector('main');
  var coconut = document.getElementById('coconut');
  var desktop = window.matchMedia('(min-width: 901px)');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)');
  var queued = false;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return t * t * (3 - 2 * t); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function update() {
    queued = false;
    if (!desktop.matches) { board.style.transform = ''; return; }

    var vh = window.innerHeight;
    var m = main.getBoundingClientRect();
    var bw = board.offsetWidth, bh = board.offsetHeight;

    var t = ease(clamp(window.scrollY / (vh * 0.72)));
    var x = m.left + m.width / 2;
    var y = lerp(vh * 0.47, vh * 0.53, t);
    var rot = still.matches ? 0 : lerp(17, 0, t);

    var s = slot.getBoundingClientRect();
    var sy = s.top + s.height / 2;
    var p = ease(clamp((vh * 1.1 - sy) / (vh * 0.6)));
    x = lerp(x, s.left + s.width / 2, p);
    y = lerp(y, sy, p);
    var scale = lerp(1, s.height / bh, p);

    board.style.transform =
      'translate3d(' + (x - bw / 2) + 'px,' + (y - bh / 2) + 'px,0) rotate(' + rot + 'deg) scale(' + scale + ')';
    board.classList.add('ready');

    if (coconut && !still.matches) {
      var c = coconut.parentNode.getBoundingClientRect();
      var k = clamp((vh - c.top) / (vh + c.height));
      coconut.style.transform = 'translateY(' + lerp(90, -60, k) + 'px) rotate(' + lerp(-26, -8, k) + 'deg)';
    }
  }

  function request() {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  window.addEventListener('load', request);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(request);
  update();
})();
