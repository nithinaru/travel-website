/* ---------------------------------------------------------------------------
   Three levels, one machine.

     timeline  every trip on one horizontal line, newest at the left, older
               and smaller to the right. Sideways moves through time.
     trip      one trip opened up. Clicking a photo zooms it out of the line;
               left and right slide the whole track to the next trip.
     post      the writing. The photo travels up to the top of the page and
               grows; scrolling back up sends it home again.

   Every photo that moves between levels is carried by a single throwaway
   element (see fly), so the source and destination never both show at once
   and nothing can be left half-animated.
--------------------------------------------------------------------------- */

(function () {
  'use strict';

  var TRIPS = window.TRIPS || [];
  var SITE = window.SITE || { name: 'Travels', nav: [] };

  var $ = function (id) { return document.getElementById(id); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isNarrow = function () { return window.innerWidth <= 700; };

  var ZOOM = 'cubic-bezier(.55,.05,.15,1)';
  var SLIDE = 'cubic-bezier(.5,0,.1,1)';
  var SOFT = 'cubic-bezier(.22,1,.36,1)';

  var el = {
    body: document.body,
    chrome: $('chrome'),
    siteName: $('siteName'),
    year: $('headerYear'),
    nav: $('headerNav'),
    back: $('backButton'),
    timelineLayer: $('timelineLayer'),
    timeline: $('timeline'),
    tripLayer: $('tripLayer'),
    tripRail: $('tripRail'),
    post: $('post'),
    postScroll: $('postScroll'),
    postHero: $('postHero'),
    postText: $('postText'),
    about: $('about'),
    aboutInner: $('aboutInner'),
    hint: $('hint')
  };

  var state = {
    level: 'timeline',      // timeline | trip | post
    index: 0,
    busy: false,
    scrollNow: 0,
    scrollTarget: 0,
    maxScroll: 0,
    band: { left: 0, width: 0, height: 0, bottom: 0, timelineHeight: 0 },
    fs: 20,
    items: [],
    trips: [],
    shownYear: null,
    rule: null
  };

  /* ------------------------------------------------------------- utilities */

  // Animations can be throttled (hidden tab, background window) and their
  // finished promise may never settle. Anything that unlocks the UI goes
  // through here, so a stalled animation can never leave the site stuck.
  function once(fn) {
    var done = false;
    return function () { if (!done) { done = true; fn(); } };
  }

  function after(anim, ms, fn) {
    var run = once(fn);
    if (anim && anim.finished) anim.finished.then(run, run);
    window.setTimeout(run, (reduceMotion ? 0 : ms) + 260);
  }

  // Animate to a state that is also written to the element's own style, so
  // nothing is left depending on a filled animation.
  function animateTo(node, from, to, options) {
    Object.keys(to).forEach(function (key) { node.style[key] = to[key]; });
    if (reduceMotion) return null;
    return node.animate([from, to], {
      duration: options.duration,
      delay: options.delay || 0,
      easing: options.easing || SOFT,
      fill: 'backwards'
    });
  }

  /* --------------------------------------------------------------- the fly */

  // Carries one photo from where it is to where it is going. Both the source
  // and the destination stay hidden while it is in the air.
  function fly(url, from, to, duration, bgPosition, onLand) {
    var node = document.createElement('div');
    node.className = 'flyer';
    node.style.backgroundImage = 'url("' + url + '")';
    node.style.backgroundPosition = bgPosition || 'center';
    node.style.left = to.left + 'px';
    node.style.top = to.top + 'px';
    node.style.width = to.width + 'px';
    node.style.height = to.height + 'px';
    document.body.appendChild(node);

    var dx = from.left - to.left;
    var dy = from.top - to.top;
    var sx = to.width ? from.width / to.width : 1;
    var sy = to.height ? from.height / to.height : 1;

    var anim = node.animate([
      { transformOrigin: 'top left', transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')' },
      { transformOrigin: 'top left', transform: 'none' }
    ], { duration: reduceMotion ? 1 : duration, easing: ZOOM, fill: 'both' });

    after(anim, duration, function () {
      if (node.parentNode) node.parentNode.removeChild(node);
      if (onLand) onLand();
    });
  }

  /* ------------------------------------------------------------------ chrome */

  function setLevel(level) {
    state.level = level;
    el.body.classList.remove('level-timeline', 'level-trip', 'level-post');
    el.body.classList.add('level-' + level);
  }

  function buildChrome() {
    el.siteName.textContent = SITE.name;
    SITE.nav.forEach(function (item) {
      var a = document.createElement('a');
      a.textContent = item.label;
      a.href = item.href;
      a.setAttribute('data-clickable', '');
      if (item.href === '#about') {
        a.addEventListener('click', function (e) { e.preventDefault(); openAbout(); });
      }
      el.nav.appendChild(a);
    });
    setYear(TRIPS.length ? TRIPS[0].year : new Date().getFullYear(), true);
    el.back.addEventListener('click', goBack);
  }

  // The year rolls over rather than swapping.
  function setYear(value, immediate) {
    if (state.shownYear === value) return;
    var previous = state.shownYear;
    state.shownYear = value;

    if (immediate || previous === null || reduceMotion) {
      el.year.textContent = value;
      return;
    }

    el.year.textContent = '';
    var out = document.createElement('span');
    out.className = 'year-out';
    out.textContent = previous;
    var into = document.createElement('span');
    into.className = 'year-in';
    into.textContent = value;
    el.year.appendChild(out);
    el.year.appendChild(into);
    window.setTimeout(function () {
      if (state.shownYear === value) el.year.textContent = value;
    }, 460);
  }

  var hintTimer = null;

  function showHint(text) {
    window.clearTimeout(hintTimer);
    if (!text) { el.hint.classList.remove('is-visible'); return; }
    el.hint.textContent = text;
    el.hint.classList.add('is-visible');
    hintTimer = window.setTimeout(function () {
      el.hint.classList.remove('is-visible');
    }, 6000);
  }

  var HINT_TIMELINE = isNarrow()
    ? 'Swipe sideways · tap a trip'
    : 'Drag or scroll sideways · click a trip';
  var HINT_TRIP = isNarrow()
    ? 'Swipe left and right · tap the photo to read'
    : 'Left and right for other trips · scroll down for the story';

  /* ------------------------------------------------------------------ layout */

  function measure() {
    var fs = clamp(window.innerHeight / 50, 11, 20);
    document.documentElement.style.setProperty('--fs', fs + 'px');

    var band = el.timeline.parentNode.getBoundingClientRect();
    var headerH = el.chrome.offsetHeight || 114;
    document.documentElement.style.setProperty('--header-h', headerH + 'px');

    state.fs = fs;
    state.band = {
      left: band.left,
      width: band.width,
      height: band.height,
      bottom: band.bottom,
      // the tallest trip stops short of the header rather than running under it
      timelineHeight: Math.max(band.height - headerH - 0.9 * fs, band.height * 0.4)
    };
  }

  /* ---------------------------------------------------------------- timeline */

  function buildTimeline() {
    TRIPS.forEach(function (trip, i) {
      var item = document.createElement('div');
      item.className = 'tl-item';
      item.dataset.index = i;
      item.setAttribute('data-clickable', '');
      item.setAttribute('data-label', trip.title + ' · ' + trip.date);

      var shot = document.createElement('div');
      shot.className = 'tl-shot';
      shot.style.backgroundImage = 'url("' + trip.image + '")';
      item.appendChild(shot);

      el.timeline.appendChild(item);
      state.items.push({ node: item, shot: shot, trip: trip, x: 0, w: 0, h: 0 });
    });
  }

  function layoutTimeline() {
    var bandH = state.band.timelineHeight;
    var fs = state.fs;
    var x = 0;

    state.items.forEach(function (it, i) {
      var aspect = it.trip.width / it.trip.height;
      var h = bandH * (it.trip.scale != null ? it.trip.scale : 1);
      var w = h * aspect;

      var wCap = state.band.width * 1.15;
      if (w > wCap) { w = wCap; h = w / aspect; }

      it.x = x;
      it.w = w;
      it.h = h;
      it.node.style.left = x + 'px';
      it.node.style.width = w + 'px';
      it.node.style.height = h + 'px';

      var gapEm = 1.375;
      if (state.items[i + 1]) {
        gapEm = 1.375 + Math.min(Math.abs(it.trip.year - TRIPS[i + 1].year), 6) * 0.5;
      }
      x += w + gapEm * fs;
    });

    // scroll far enough that the oldest trip can still reach the focus line
    var last = state.items[state.items.length - 1];
    var fits = !last || x <= state.band.width;
    state.maxScroll = fits ? 0 : Math.max(0, last.x + last.w / 2 - focusLine());
    state.scrollTarget = clamp(state.scrollTarget, 0, state.maxScroll);
  }

  function focusLine() { return state.band.width * 0.3; }

  function updateFocus() {
    var line = focusLine() + state.scrollNow;
    var best = 0;
    var bestDist = Infinity;

    state.items.forEach(function (it, i) {
      var centre = it.x + it.w / 2;
      var d = Math.abs(centre - line);
      if (it.x <= line && it.x + it.w >= line) d = 0;
      if (d < bestDist) { bestDist = d; best = i; }
    });

    if (state.level === 'timeline') {
      state.index = best;
      state.items.forEach(function (it, i) {
        it.node.classList.toggle('is-focused', i === best);
      });
      setYear(TRIPS[best].year);
    }
  }

  function applyScroll() {
    el.timeline.style.transform = 'translate3d(' + (-state.scrollNow) + 'px,0,0)';
  }

  function snapScroll() {
    state.scrollNow = state.scrollTarget;
    applyScroll();
  }

  var lastFrame = 0;

  function frame(now) {
    // frame-rate independent easing, so a slow device eases at the same speed
    var dt = lastFrame ? Math.min(now - lastFrame, 64) : 16.7;
    lastFrame = now;

    var d = state.scrollTarget - state.scrollNow;
    if (Math.abs(d) > 0.05) {
      var k = reduceMotion ? 1 : 1 - Math.pow(1 - 0.14, dt / 16.7);
      state.scrollNow = lerp(state.scrollNow, state.scrollTarget, k);
      applyScroll();
      updateFocus();
    }
    window.requestAnimationFrame(frame);
  }

  var keyIndex = null;

  function scrollBy(dx) {
    keyIndex = null;
    var next = state.scrollTarget + dx;
    if (next < 0) next = next * 0.35;                                     // resistance
    if (next > state.maxScroll) next = state.maxScroll + (next - state.maxScroll) * 0.35;
    state.scrollTarget = next;
  }

  function settleScroll() {
    state.scrollTarget = clamp(state.scrollTarget, 0, state.maxScroll);
  }

  function scrollToIndex(i) {
    var it = state.items[i];
    if (!it) return;
    state.scrollTarget = clamp(it.x + it.w / 2 - focusLine(), 0, state.maxScroll);
  }

  // Arrow keys walk trip to trip and need their own cursor, otherwise a second
  // press before the scroll settles just repeats the first one.
  function stepTo(delta) {
    var base = keyIndex === null ? state.index : keyIndex;
    keyIndex = clamp(base + delta, 0, TRIPS.length - 1);
    scrollToIndex(keyIndex);
  }

  /* -------------------------------------------------------------- trip level */

  var ARROW = '<svg viewBox="0 0 68 68"><g fill-rule="evenodd">' +
    '<circle class="trip-read-circle" cx="34" cy="34" r="32.8"></circle>' +
    '<polygon transform="translate(34 34) rotate(180) translate(-8.5 -11)" points="8.5 2.5 19.5 19.5 -2.5 19.5"></polygon>' +
    '</g></svg>';

  function buildTrips() {
    TRIPS.forEach(function (trip, i) {
      var node = document.createElement('div');
      node.className = 'trip';

      var meta = document.createElement('div');
      meta.className = 'trip-meta';
      meta.innerHTML =
        '<div class="trip-col">' +
          '<h2 class="trip-title"></h2>' +
          '<h3 class="trip-sub"><span class="trip-place"></span><span class="trip-blurb"></span>' +
          '<span class="trip-date"></span></h3>' +
          '<button class="trip-read" data-clickable aria-label="Read the post">' + ARROW + '</button>' +
        '</div>' +
        '<div class="trip-col">' +
          '<h4 class="trip-people-label">With</h4>' +
          '<div class="trip-people"></div>' +
        '</div>';

      meta.querySelector('.trip-title').textContent = trip.title;
      meta.querySelector('.trip-place').textContent = trip.place;
      meta.querySelector('.trip-blurb').textContent = trip.blurb;
      meta.querySelector('.trip-date').textContent = trip.date;
      var people = meta.querySelector('.trip-people');
      (trip.with || []).forEach(function (person) {
        var span = document.createElement('span');
        span.textContent = person;
        people.appendChild(span);
      });
      meta.querySelector('.trip-read').addEventListener('click', function (e) {
        e.stopPropagation();
        openPost();
      });

      var shot = document.createElement('div');
      shot.className = 'trip-shot';
      shot.style.backgroundImage = 'url("' + trip.image + '")';
      shot.setAttribute('data-clickable', '');
      shot.addEventListener('click', function () { if (!dragMoved) openPost(); });

      node.appendChild(meta);
      node.appendChild(shot);
      el.tripRail.appendChild(node);
      state.trips.push({ node: node, meta: meta, shot: shot, trip: trip });
    });
  }

  function layoutTrip(i) {
    var t = state.trips[i];
    if (!t) return;
    var aspect = t.trip.width / t.trip.height;
    var availW, availH;

    if (isNarrow()) {
      availW = state.band.width;
      availH = state.band.timelineHeight * 0.62;
    } else {
      var metaW = t.meta.offsetWidth + 7.5 * state.fs;
      availW = Math.max(state.band.width - metaW, state.band.width * 0.32);
      availH = state.band.timelineHeight;
    }

    var h = availH;
    var w = h * aspect;
    if (w > availW) { w = availW; h = w / aspect; }
    t.shot.style.width = w + 'px';
    t.shot.style.height = h + 'px';
  }

  function layoutAllTrips() { state.trips.forEach(function (_, i) { layoutTrip(i); }); }

  function setTrack(i, animate) {
    var to = 'translate3d(' + (-i * 100) + '%,0,0)';
    var from = el.tripRail.style.transform || 'translate3d(0,0,0)';
    el.tripRail.style.transform = to;
    if (!animate || reduceMotion) return null;
    return el.tripRail.animate(
      [{ transform: from }, { transform: to }],
      { duration: 620, easing: SLIDE, fill: 'backwards' }
    );
  }

  function showMeta(t, animate, delay) {
    t.meta.getAnimations().forEach(function (a) { a.cancel(); });
    if (!animate) { t.meta.style.opacity = '1'; return; }
    animateTo(t.meta,
      { opacity: 0, transform: 'translateY(14px)' },
      { opacity: '1', transform: 'none' },
      { duration: 520, delay: delay || 0, easing: SOFT });
  }

  function hideMeta(t, animate) {
    t.meta.getAnimations().forEach(function (a) { a.cancel(); });
    if (!animate) { t.meta.style.opacity = '0'; return; }
    animateTo(t.meta,
      { opacity: 1, transform: 'none' },
      { opacity: '0', transform: 'translateY(8px)' },
      { duration: 240, easing: 'ease' });
  }

  function activate(i) {
    state.trips.forEach(function (t, k) { t.node.classList.toggle('is-active', k === i); });
  }

  /* ------------------------------------------------------------ open a trip */

  function openTrip(i) {
    if (state.busy || state.level !== 'timeline' || !state.items[i]) return;
    state.busy = true;
    state.index = i;
    keyIndex = null;
    state.scrollTarget = state.scrollNow;      // stop any glide under the zoom

    var item = state.items[i];
    var t = state.trips[i];
    var from = item.shot.getBoundingClientRect();

    // put the trip layer in position before measuring where the photo lands
    el.timelineLayer.classList.add('is-inert');
    el.tripLayer.hidden = false;
    setTrack(i, false);
    layoutAllTrips();
    activate(i);
    hideMeta(t, false);

    var to = t.shot.getBoundingClientRect();

    // the name, the year and the nav clear out; the chevron takes their place
    setLevel('trip');
    setYear(TRIPS[i].year);

    // the line fades away, and the trip being opened leaves with the flyer
    el.timeline.classList.add('is-out');
    item.node.style.visibility = 'hidden';
    t.shot.style.visibility = 'hidden';

    fly(t.trip.image, from, to, 760, 'center', function () {
      t.shot.style.visibility = '';
      state.busy = false;
    });

    // the text on the left arrives once the photo has settled
    showMeta(t, true, 560);
    showHint(HINT_TRIP);
  }

  function closeTrip() {
    if (state.busy || state.level !== 'trip') return;
    state.busy = true;

    var i = state.index;
    var t = state.trips[i];
    var item = state.items[i];

    hideMeta(t, true);
    setLevel('timeline');

    // the line has to be where it will finally sit before we aim at it
    snapScroll();
    el.timeline.classList.remove('is-out');

    var from = t.shot.getBoundingClientRect();
    var to = item.shot.getBoundingClientRect();
    t.shot.style.visibility = 'hidden';

    fly(t.trip.image, from, to, 720, 'bottom center', function () {
      item.node.style.visibility = '';
      el.tripLayer.hidden = true;
      t.shot.style.visibility = '';
      activate(-1);
      el.timelineLayer.classList.remove('is-inert');
      state.busy = false;
      updateFocus();
    });

    showHint(HINT_TIMELINE);
  }

  // Sideways while zoomed in: the whole track slides, nothing fades.
  function pageTrip(dir) {
    var next = state.index + dir;
    if (state.busy || state.level !== 'trip' || next < 0 || next >= TRIPS.length) return;
    state.busy = true;
    keyIndex = null;

    var into = state.trips[next];
    showMeta(into, false);                     // already lit, so it just slides in
    activate(next);
    layoutTrip(next);

    var anim = setTrack(next, true);
    state.index = next;
    scrollToIndex(next);                       // keep the line in step underneath
    setYear(TRIPS[next].year);

    after(anim, 620, function () {
      state.trips.forEach(function (t, k) { if (k !== state.index) hideMeta(t, false); });
      state.busy = false;
    });
  }

  /* -------------------------------------------------------------- post level */

  function layoutHero(trip) {
    var aspect = trip.width / trip.height;
    el.postHero.style.width = '100%';
    el.postHero.style.height = '0';
    var colW = el.postHero.offsetWidth;
    var maxH = window.innerHeight * (isNarrow() ? 0.6 : 0.74);

    var w = colW;
    var h = w / aspect;
    if (h > maxH) { h = maxH; w = h * aspect; }
    el.postHero.style.width = w + 'px';
    el.postHero.style.height = h + 'px';
  }

  function renderPost(i) {
    var trip = TRIPS[i];
    el.postHero.style.backgroundImage = 'url("' + trip.image + '")';

    el.postText.innerHTML =
      '<div class="post-kicker"></div>' +
      '<h1 class="post-title"></h1>' +
      '<p class="post-standfirst"></p>' +
      '<div class="post-body"></div>' +
      '<div class="post-end">' +
        '<span data-clickable data-post-prev>Earlier trip</span>' +
        '<span data-clickable data-post-close>Close</span>' +
        '<span data-clickable data-post-next>Later trip</span>' +
      '</div>';

    el.postText.querySelector('.post-kicker').textContent = trip.place + ' · ' + trip.date;
    el.postText.querySelector('.post-title').textContent = trip.title;
    el.postText.querySelector('.post-standfirst').textContent = trip.blurb;

    var body = el.postText.querySelector('.post-body');
    (trip.body || []).forEach(function (block) {
      var node;
      if (block.h) {
        node = document.createElement('h3');
        node.textContent = block.h;
      } else if (block.quote) {
        node = document.createElement('blockquote');
        node.textContent = block.quote;
      } else if (block.img) {
        node = document.createElement('figure');
        var pic = document.createElement('div');
        pic.style.backgroundImage = 'url("' + block.img + '")';
        node.appendChild(pic);
        if (block.caption) {
          var cap = document.createElement('figcaption');
          cap.textContent = block.caption;
          node.appendChild(cap);
        }
      } else {
        node = document.createElement('p');
        node.textContent = block.p || '';
      }
      body.appendChild(node);
    });

    var prev = el.postText.querySelector('[data-post-prev]');
    var next = el.postText.querySelector('[data-post-next]');
    if (i >= TRIPS.length - 1) prev.style.visibility = 'hidden';
    if (i <= 0) next.style.visibility = 'hidden';
    prev.addEventListener('click', function () { swapPost(i + 1); });
    next.addEventListener('click', function () { swapPost(i - 1); });
    el.postText.querySelector('[data-post-close]').addEventListener('click', closePost);
  }

  function openPost() {
    if (state.busy || state.level !== 'trip') return;
    state.busy = true;

    var t = state.trips[state.index];
    renderPost(state.index);

    el.post.hidden = false;
    el.post.style.opacity = '0';
    layoutHero(t.trip);
    el.postScroll.scrollTop = 0;

    var from = t.shot.getBoundingClientRect();
    var to = el.postHero.getBoundingClientRect();

    t.shot.style.visibility = 'hidden';
    el.postHero.style.visibility = 'hidden';
    hideMeta(t, true);

    setLevel('post');
    showHint('');

    animateTo(el.post, { opacity: 0 }, { opacity: '1' }, { duration: 420, easing: 'ease' });
    animateTo(el.postText,
      { opacity: 0, transform: 'translateY(30px)' },
      { opacity: '1', transform: 'none' },
      { duration: 620, delay: 300, easing: SOFT });

    // the photo travels up to the top of the page and grows into the hero
    fly(t.trip.image, from, to, 820, 'center', function () {
      el.postHero.style.visibility = '';
      state.busy = false;
    });
  }

  function closePost() {
    if (state.busy || state.level !== 'post') return;
    state.busy = true;

    var t = state.trips[state.index];
    var scrolled = el.postScroll.scrollTop > 40;

    setLevel('trip');
    showHint(HINT_TRIP);

    var finish = function () {
      el.post.hidden = true;
      el.postHero.style.visibility = '';
      t.shot.style.visibility = '';
      state.busy = false;
    };

    if (scrolled) {
      // too far down for the photo to fly home; just hand the trip back
      showMeta(t, true, 120);
      t.shot.style.visibility = '';
      var fade = animateTo(el.post, { opacity: 1 }, { opacity: '0' }, { duration: 420, easing: 'ease' });
      after(fade, 420, finish);
      return;
    }

    var from = el.postHero.getBoundingClientRect();
    var to = t.shot.getBoundingClientRect();
    el.postHero.style.visibility = 'hidden';

    animateTo(el.postText, { opacity: 1 }, { opacity: '0' }, { duration: 240, easing: 'ease' });
    animateTo(el.post, { opacity: 1 }, { opacity: '0' }, { duration: 380, delay: 300, easing: 'ease' });
    showMeta(t, true, 480);

    fly(t.trip.image, from, to, 720, 'center', finish);
  }

  function swapPost(i) {
    if (state.busy || i < 0 || i >= TRIPS.length) return;
    state.index = i;
    activate(i);
    layoutTrip(i);
    setTrack(i, false);
    scrollToIndex(i);
    setYear(TRIPS[i].year);
    state.trips.forEach(function (t, k) { if (k !== i) hideMeta(t, false); });

    var fade = animateTo(el.postText, { opacity: 1 }, { opacity: '0' }, { duration: 200, easing: 'ease' });
    after(fade, 200, function () {
      renderPost(i);
      layoutHero(TRIPS[i]);
      el.postScroll.scrollTop = 0;
      animateTo(el.postText, { opacity: 0 }, { opacity: '1' }, { duration: 340, easing: 'ease' });
    });
  }

  function goBack() {
    if (state.level === 'post') closePost();
    else if (state.level === 'trip') closeTrip();
  }

  /* ------------------------------------------------------------------- about */

  function openAbout() {
    el.aboutInner.innerHTML = '';
    SITE.about.text.forEach(function (line) {
      var p = document.createElement('p');
      p.textContent = line;
      el.aboutInner.appendChild(p);
    });
    var close = document.createElement('div');
    close.className = 'about-close';
    close.setAttribute('data-clickable', '');
    close.textContent = 'Close';
    close.addEventListener('click', closeAbout);
    el.aboutInner.appendChild(close);

    el.about.hidden = false;
    void el.about.offsetHeight;          // force a reflow so the fade actually runs
    el.about.classList.add('is-open');
  }

  function closeAbout() {
    el.about.classList.remove('is-open');
    window.setTimeout(function () { el.about.hidden = true; }, 500);
  }

  el.about.addEventListener('click', function (e) {
    if (e.target === el.about) closeAbout();
  });

  /* ---------------------------------------------------------------- opening */

  // Opening a trip is a click on that trip, and nothing else. Reading the
  // element under the pointer means the photo that opens is always the photo
  // that was clicked, even mid-glide.
  el.timelineLayer.addEventListener('click', function (e) {
    if (state.level !== 'timeline' || dragMoved) return;
    var item = e.target.closest ? e.target.closest('.tl-item') : null;
    if (item) openTrip(+item.dataset.index);
  });

  /* ---------------------------------------------------------------- gestures */

  var vertical = 0;
  var verticalDecay = null;

  function bumpVertical(amount) {
    vertical += amount;
    window.clearTimeout(verticalDecay);
    verticalDecay = window.setTimeout(function () { vertical = 0; }, 220);

    if (vertical > 150) { vertical = 0; openPost(); }
    else if (vertical < -150) { vertical = 0; closeTrip(); }
  }

  window.addEventListener('wheel', function (e) {
    if (!el.about.hidden) return;

    if (state.level === 'post') {
      // the article scrolls; pulling past the top sends the photo home
      if (el.postScroll.scrollTop <= 0 && e.deltaY < -30) {
        vertical = 0;
        closePost();
      }
      return;
    }

    e.preventDefault();
    if (state.busy) return;

    var horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

    if (state.level === 'timeline') {
      // the line only ever moves sideways — nothing here opens a trip
      scrollBy(horizontal ? e.deltaX : e.deltaY);
      settleScroll();
      return;
    }

    if (state.level === 'trip') {
      if (horizontal) {
        if (Math.abs(e.deltaX) > 8) pageTrip(e.deltaX > 0 ? 1 : -1);
      } else {
        bumpVertical(e.deltaY);
      }
    }
  }, { passive: false });

  /* pointer drag — the same gesture on trackpad, mouse and touch */

  var drag = null;
  var dragMoved = false;

  window.addEventListener('pointerdown', function (e) {
    if (state.level === 'post' || !el.about.hidden) return;
    if (e.target.closest && e.target.closest('a, button')) return;
    drag = {
      x: e.clientX, y: e.clientY,
      startX: e.clientX, startY: e.clientY,
      time: Date.now(),
      vx: 0,
      axis: null
    };
    dragMoved = false;
  });

  window.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    var totalX = e.clientX - drag.startX;
    var totalY = e.clientY - drag.startY;

    if (!drag.axis && (Math.abs(totalX) > 6 || Math.abs(totalY) > 6)) {
      drag.axis = Math.abs(totalX) > Math.abs(totalY) ? 'x' : 'y';
    }
    if (Math.abs(totalX) > 4 || Math.abs(totalY) > 4) dragMoved = true;

    if (drag.axis === 'x' && state.level === 'timeline') {
      scrollBy(-dx);
      snapScroll();                       // 1:1 while the finger is down
      updateFocus();
      drag.vx = drag.vx * 0.65 + dx * 0.35;
    }
    drag.x = e.clientX;
    drag.y = e.clientY;
  });

  window.addEventListener('pointerup', function (e) {
    if (!drag) return;
    var totalX = e.clientX - drag.startX;
    var totalY = e.clientY - drag.startY;
    var quick = Date.now() - drag.time < 500;

    if (state.level === 'timeline') {
      if (drag.axis === 'x') {
        var fling = clamp(-drag.vx * 11, -900, 900);
        state.scrollTarget = clamp(state.scrollTarget + fling, 0, state.maxScroll);
      }
    } else if (state.level === 'trip') {
      if (drag.axis === 'x' && Math.abs(totalX) > 60) {
        pageTrip(totalX < 0 ? 1 : -1);
      } else if (drag.axis === 'y' && quick && Math.abs(totalY) > 80) {
        if (totalY < 0) openPost(); else closeTrip();
      }
    }
    drag = null;
  });

  window.addEventListener('pointercancel', function () { drag = null; });

  // touch: the post keeps its native scrolling, and a pull at the top closes it
  var touchStart = null;

  window.addEventListener('touchstart', function (e) {
    if (state.level === 'post') touchStart = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (state.level !== 'post' || touchStart === null) return;
    if (el.postScroll.scrollTop <= 0 && e.touches[0].clientY - touchStart > 90) {
      touchStart = null;
      closePost();
    }
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (state.level !== 'post' && el.about.hidden) e.preventDefault();
  }, { passive: false });

  /* -------------------------------------------------------------- keyboard */

  window.addEventListener('keydown', function (e) {
    if (!el.about.hidden) {
      if (e.key === 'Escape') closeAbout();
      return;
    }
    var k = e.key;
    if (k === 'Escape') { goBack(); return; }

    if (state.level === 'timeline') {
      if (k === 'ArrowRight') { e.preventDefault(); stepTo(1); }
      if (k === 'ArrowLeft') { e.preventDefault(); stepTo(-1); }
      if (k === 'ArrowDown' || k === 'Enter' || k === ' ') { e.preventDefault(); openTrip(state.index); }
    } else if (state.level === 'trip') {
      if (k === 'ArrowRight') { e.preventDefault(); pageTrip(1); }
      if (k === 'ArrowLeft') { e.preventDefault(); pageTrip(-1); }
      if (k === 'ArrowDown' || k === 'Enter' || k === ' ') { e.preventDefault(); openPost(); }
      if (k === 'ArrowUp') { e.preventDefault(); closeTrip(); }
    } else if (state.level === 'post') {
      if (k === 'ArrowUp' && el.postScroll.scrollTop <= 0) { e.preventDefault(); closePost(); }
    }
  });

  /* ------------------------------------------------------------------ intro */

  function intro() {
    el.body.classList.remove('is-loading');

    var rule = document.createElement('div');
    rule.className = 'timeline-rule';
    document.body.appendChild(rule);
    rule.style.top = Math.round(state.band.bottom) + 'px';
    state.rule = rule;

    if (reduceMotion) {
      rule.classList.add('is-visible');
      showHint(HINT_TIMELINE);
      return;
    }

    el.chrome.animate([
      { opacity: 0, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'none' }
    ], { duration: 900, delay: 120, easing: SOFT, fill: 'backwards' });

    state.items.forEach(function (it, i) {
      it.node.animate([
        { opacity: 0, transform: 'translateY(40px) scale(.94)' },
        { opacity: 1, transform: 'none' }
      ], { duration: 1000, delay: 220 + i * 70, easing: SOFT, fill: 'backwards' });
    });

    window.setTimeout(function () { rule.classList.add('is-visible'); }, 500);
    window.setTimeout(function () { showHint(HINT_TIMELINE); }, 1600);
  }

  /* ------------------------------------------------------------------- boot */

  function relayout() {
    measure();
    layoutTimeline();
    layoutAllTrips();
    applyScroll();
    if (state.level === 'trip' || state.level === 'post') setTrack(state.index, false);
    if (state.level === 'post') layoutHero(TRIPS[state.index]);
    if (state.rule) state.rule.style.top = Math.round(state.band.bottom) + 'px';
    updateFocus();
  }

  function boot() {
    buildChrome();
    buildTimeline();
    buildTrips();
    measure();
    layoutTimeline();
    layoutAllTrips();
    updateFocus();
    setYear(TRIPS.length ? TRIPS[0].year : 2025, true);
    window.requestAnimationFrame(frame);
    window.addEventListener('resize', relayout);
    window.addEventListener('orientationchange', function () { window.setTimeout(relayout, 200); });
    window.setTimeout(intro, 80);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
