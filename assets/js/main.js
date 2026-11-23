/* Spartamax site interactions — lightweight, no dependencies */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function store(get, key, val) {
    try { if (get) return window.localStorage.getItem(key); window.localStorage.setItem(key, val); } catch (e) { return null; }
    return null;
  }

  /* Mobile navigation */
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn && header) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { header.classList.remove('menu-open'); menuBtn.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Pointer-driven 3D tilt on bottle stages */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.stage').forEach(function (stage) {
      var bottle = stage.querySelector('.bottle-3d');
      var layers = stage.querySelectorAll('.ing');
      if (!bottle) return;
      stage.addEventListener('pointermove', function (ev) {
        var r = stage.getBoundingClientRect();
        var x = (ev.clientX - r.left) / r.width - 0.5;
        var y = (ev.clientY - r.top) / r.height - 0.5;
        bottle.style.transform = 'rotateY(' + (x * 18).toFixed(2) + 'deg) rotateX(' + (-y * 12).toFixed(2) + 'deg)';
        layers.forEach(function (l, i) {
          var d = (i % 3 + 1) * 10;
          l.style.translate = (-x * d).toFixed(1) + 'px ' + (-y * d).toFixed(1) + 'px';
        });
      });
      stage.addEventListener('pointerleave', function () {
        bottle.style.transform = '';
        layers.forEach(function (l) { l.style.translate = ''; });
      });
    });
  }

  /* Sticky best-value bar */
  var bar = document.querySelector('.sticky-bar');
  if (bar) {
    var barClosed = false;
    var onScroll = function () {
      if (barClosed) return;
      bar.classList.toggle('show', window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    var bx = bar.querySelector('.sticky-close');
    if (bx) bx.addEventListener('click', function () { barClosed = true; bar.classList.remove('show'); });
  }

  /* Informational notification (no fabricated purchase data) */
  var toast = document.querySelector('.toast');
  if (toast) {
    var msgs = JSON.parse(toast.getAttribute('data-messages') || '[]');
    var textEl = toast.querySelector('.toast-text');
    var idx = 0, stopped = false, hideT = null, nextT = null;
    var show = function () {
      if (stopped || !msgs.length) return;
      if (document.querySelector('.modal.open')) { nextT = setTimeout(show, 8000); return; }
      textEl.innerHTML = msgs[idx % msgs.length];
      idx++;
      toast.classList.add('show');
      hideT = setTimeout(function () {
        toast.classList.remove('show');
        nextT = setTimeout(show, 18000 + Math.random() * 8000);
      }, 6000);
    };
    toast.querySelector('.toast-x').addEventListener('click', function () {
      stopped = true; clearTimeout(hideT); clearTimeout(nextT); toast.classList.remove('show');
    });
    setTimeout(show, 5000);
  }

  /* Centered promotional modal — 24h cooldown */
  var modal = document.getElementById('promo-modal');
  if (modal) {
    var KEY = 'spartamax_promo_closed';
    var last = parseInt(store(true, KEY) || '0', 10);
    var lastFocus = null;
    var closeModal = function () {
      if (!modal.classList.contains('open')) return;
      store(false, KEY, String(Date.now()));
      modal.classList.add('closing');
      setTimeout(function () {
        modal.classList.remove('open', 'closing');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        if (lastFocus) lastFocus.focus();
      }, reduce ? 0 : 240);
    };
    var openModal = function () {
      lastFocus = document.activeElement;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      var x = modal.querySelector('.modal-x');
      if (x) x.focus();
    };
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    modal.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'Tab') {
        var f = modal.querySelectorAll('a[href],button');
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
      }
    });
    if (!last || Date.now() - last > 24 * 3600 * 1000) {
      var start = function () { setTimeout(openModal, 6000); };
      if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
    }
  }

  /* Order page: highlight the package passed in ?package= */
  var params = new URLSearchParams(window.location.search);
  var pkg = params.get('package');
  if (pkg && /^(1|3|6)$/.test(pkg)) {
    var card = document.querySelector('[data-package="' + pkg + '"]');
    if (card) { card.classList.add('selected'); card.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); }
  }

  /* Outbound click events (no personal data collected) */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-track]');
    if (a && typeof window.gtag === 'function') window.gtag('event', 'outbound_offer', { package: a.getAttribute('data-track') });
  });
})();
