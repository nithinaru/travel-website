/* ---------------------------------------------------------------------------
   Three levels, one machine.

     timeline  every trip on one horizontal line, newest at the left, older
               and smaller to the right. Sideways moves through time; pulling
               downward opens whichever trip is under the focus line.
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

  // The stylesheet's three breakpoints, asked of the browser rather than
  // worked out again here, so the script and the CSS can never disagree about
  // which one is in force. A phone held sideways matches the tablet width as
  // well, so phone is asked first and wins.
  var mqPhone = window.matchMedia(
    '(max-width: 600px) and (orientation: portrait),' +
    '(max-height: 500px) and (orientation: landscape)');
  var mqTablet = window.matchMedia('(min-width: 601px) and (max-width: 1024px)');
  var mqPortrait = window.matchMedia('(orientation: portrait)');

  function layoutMode() {
    if (mqPhone.matches) return 'phone';
    if (mqTablet.matches) return 'tablet';
    return 'desktop';
  }

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
    aboutInner: $('aboutInner')
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
    yearCells: null
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

    var start = { transformOrigin: 'top left', transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')' };
    var end = { transformOrigin: 'top left', transform: 'none' };

    // hold it at the source for one frame so it is painted before it moves,
    // otherwise the first frames of the flight can drop
    node.style.transformOrigin = 'top left';
    node.style.transform = start.transform;

    var launch = function () {
      var anim = node.animate([start, end], {
        duration: reduceMotion ? 1 : duration, easing: ZOOM, fill: 'both'
      });
      after(anim, duration, function () {
        if (node.parentNode) node.parentNode.removeChild(node);
        if (onLand) onLand();
      });
    };

    // whichever comes first — a starved frame loop must not strand the flight
    var begin = once(launch);
    if (reduceMotion) begin();
    else { window.requestAnimationFrame(begin); window.setTimeout(begin, 60); }
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

  // The year is kept as a row of digit cells so a change can roll only the
  // digits that actually differ; matching leading digits are never touched.
  function yearCells(count) {
    var cells = state.yearCells;
    var gone;
    var cell;
    if (!cells) {
      cells = state.yearCells = [];
      el.year.textContent = '';
    }
    while (cells.length > count) {
      gone = cells.pop();
      stopRoll(gone);
      el.year.removeChild(gone);
    }
    while (cells.length < count) {
      cell = document.createElement('span');
      cell.className = 'year-digit';
      cells.push(cell);
      el.year.appendChild(cell);
    }
    return cells;
  }

  function stopRoll(cell) {
    if (cell.rollTimer) {
      window.clearTimeout(cell.rollTimer);
      cell.rollTimer = 0;
    }
  }

  function setDigit(cell, digit) {
    stopRoll(cell);
    // Guarded so an unchanged digit is not re-rendered for nothing.
    if (cell.textContent !== digit) cell.textContent = digit;
  }

  // The digit rolls over rather than swapping.
  function rollDigit(cell, previous, next) {
    stopRoll(cell);
    cell.textContent = '';
    var out = document.createElement('span');
    out.className = 'year-out';
    out.textContent = previous;
    var into = document.createElement('span');
    into.className = 'year-in';
    into.textContent = next;
    cell.appendChild(out);
    cell.appendChild(into);
    // Each cell owns its own settle timer and clears it before starting the
    // next roll, so a year arriving mid-animation can never strand a digit.
    cell.rollTimer = window.setTimeout(function () {
      cell.rollTimer = 0;
      cell.textContent = next;
    }, 460);
  }

  function setYear(value, immediate) {
    if (state.shownYear === value) return;
    var previous = state.shownYear;
    state.shownYear = value;

    var next = String(value);
    var old = previous === null ? '' : String(previous);
    var cells = yearCells(next.length);
    // A differing length has no digit-to-digit mapping, so it just snaps.
    var snap = immediate || previous === null || reduceMotion || old.length !== next.length;
    var i;

    for (i = 0; i < next.length; i++) {
      if (snap) setDigit(cells[i], next.charAt(i));
      // An unchanged digit is left completely untouched, so it cannot flicker
      // or re-render. A roll still in flight on it targets this same digit.
      else if (old.charAt(i) !== next.charAt(i)) rollDigit(cells[i], old.charAt(i), next.charAt(i));
    }
  }

  /* ------------------------------------------------------------------ layout */

  function measure() {
    // Height drives the scale, as on the reference site, but a wide-and-short
    // window (a phone on its side) would otherwise pick a size the width
    // cannot carry, so the narrower dimension caps it.
    var fs = clamp(Math.min(window.innerHeight / 50, window.innerWidth / 26), 11, 20);
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

  // Which trip the focus line is sitting on at this instant, read straight off
  // the position on screen. state.index is only ever a record of the last time
  // this ran, and the glide keeps rewriting it, so anything that has to act on
  // what the eye is looking at asks here instead.
  function focusedIndex() {
    var line = focusLine() + state.scrollNow;
    var best = 0;
    var bestDist = Infinity;

    state.items.forEach(function (it, i) {
      var centre = it.x + it.w / 2;
      var d = Math.abs(centre - line);
      if (it.x <= line && it.x + it.w >= line) d = 0;
      if (d < bestDist) { bestDist = d; best = i; }
    });

    return best;
  }

  function updateFocus() {
    if (state.level !== 'timeline') return;
    var best = focusedIndex();
    state.index = best;
    state.items.forEach(function (it, i) {
      it.node.classList.toggle('is-focused', i === best);
    });
    setYear(TRIPS[best].year);
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

  // A trip is either a photograph with a story behind it or just a photograph.
  function hasPost(trip) {
    return !!(trip.body && trip.body.length);
  }

  function buildTrips() {
    TRIPS.forEach(function (trip, i) {
      var node = document.createElement('div');
      node.className = 'trip';

      var meta = document.createElement('div');
      meta.className = 'trip-meta';
      meta.innerHTML =
        '<div class="trip-col trip-col--name"><h2 class="trip-title"></h2></div>' +
        '<div class="trip-col trip-col--date"><span class="trip-date"></span></div>';

      meta.querySelector('.trip-title').textContent = trip.title;
      meta.querySelector('.trip-date').textContent = trip.date;

      // Only a trip that has something written about it offers a way in.
      if (hasPost(trip)) {
        var read = document.createElement('button');
        read.className = 'trip-read';
        read.setAttribute('data-clickable', '');
        read.setAttribute('aria-label', 'Read the story');
        read.innerHTML = ARROW;
        read.addEventListener('click', function (e) {
          e.stopPropagation();
          openPost();
        });
        meta.querySelector('.trip-col--name').appendChild(read);
      }

      var shot = document.createElement('div');
      shot.className = 'trip-shot';
      shot.style.backgroundImage = 'url("' + trip.image + '")';
      shot.setAttribute('data-clickable', '');
      shot.addEventListener('click', function () { if (!dragMoved) openPost(); });   // no-op without an article

      var inner = document.createElement('div');
      inner.className = 'trip-inner';
      inner.appendChild(meta);
      inner.appendChild(shot);
      node.appendChild(inner);
      el.tripRail.appendChild(node);
      state.trips.push({ node: node, meta: meta, shot: shot, trip: trip });
    });
  }

  function layoutTrip(i) {
    var t = state.trips[i];
    if (!t) return;
    var aspect = t.trip.width / t.trip.height;
    var availW, availH;

    var mode = layoutMode();

    // Upright, there is never enough width to put text beside the photo and
    // leave the photo worth looking at, so the stylesheet stacks them and the
    // photo takes the full column. An iPad on its side has room and does not.
    if (mqPortrait.matches && (mode === 'phone' || mode === 'tablet')) {
      availW = state.band.width;
      availH = state.band.timelineHeight * (mode === 'tablet' ? 0.8 : 0.72);
    } else {
      // side by side. The gap has to match .trip-meta's margin-right at this
      // breakpoint or the photo is sized against space it does not have.
      var gapEm = mode === 'tablet' ? 4 : mode === 'phone' ? 3 : 7.5;
      var metaW = t.meta.offsetWidth + gapEm * state.fs;
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

  // Exactly one gap in the line at a time: the trip that is currently open.
  // Paging sideways moves the gap, so nothing is left hidden behind.
  function markTimelineGap(i) {
    state.items.forEach(function (it, k) {
      it.node.style.visibility = k === i ? 'hidden' : '';
    });
  }

  function activate(i) {
    state.trips.forEach(function (t, k) { t.node.classList.toggle('is-active', k === i); });
  }

  /* ------------------------------------------------------------ open a trip */

  // The one way a gesture or a key is allowed to open a trip. A gesture takes
  // long enough that the line is nearly always still gliding when it finishes,
  // so by then state.index has drifted off the photo the eye was on — the old
  // swipe used it and opened a different trip. Stopping the line first and
  // choosing from where it actually stands makes that impossible.
  function openFocused() {
    if (state.busy || state.level !== 'timeline') return;
    state.scrollTarget = state.scrollNow;
    keyIndex = null;
    updateFocus();                             // the highlight follows the stop
    openTrip(focusedIndex());
  }

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
    markTimelineGap(i);
    t.shot.style.visibility = 'hidden';

    fly(t.trip.image, from, to, 760, 'center', function () {
      t.shot.style.visibility = '';
      state.busy = false;
    });

    // once it has faded, take the line out of the paint entirely
    window.setTimeout(function () {
      if (state.level !== 'timeline') el.timeline.style.visibility = 'hidden';
    }, 480);

    // the text on the left arrives once the photo has settled
    showMeta(t, true, 560);
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
    el.timeline.style.visibility = '';
    snapScroll();
    el.timeline.classList.remove('is-out');

    var from = t.shot.getBoundingClientRect();
    var to = item.shot.getBoundingClientRect();
    t.shot.style.visibility = 'hidden';

    fly(t.trip.image, from, to, 720, 'bottom center', function () {
      markTimelineGap(-1);
      el.tripLayer.hidden = true;
      t.shot.style.visibility = '';
      activate(-1);
      el.timelineLayer.classList.remove('is-inert');
      state.busy = false;
      updateFocus();
    });

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
    markTimelineGap(next);                     // the gap follows the open trip
    scrollToIndex(next);                       // keep the line in step underneath
    setYear(TRIPS[next].year);

    after(anim, 620, function () {
      state.trips.forEach(function (t, k) { if (k !== state.index) hideMeta(t, false); });
      state.busy = false;
    });
  }

  /* -------------------------------------------------------------- post level */

  // How much of the screen the article's lead photo may fill. A phone held
  // upright needs the headline visible under it; sideways there is so little
  // height that a small share would leave the photo unreadable.
  function heroShare() {
    var mode = layoutMode();
    if (mode === 'phone') return mqPortrait.matches ? 0.52 : 0.72;
    if (mode === 'tablet') return 0.66;
    return 0.74;
  }

  function layoutHero(trip) {
    var aspect = trip.width / trip.height;
    el.postHero.style.width = '100%';
    el.postHero.style.height = '0';
    var colW = el.postHero.offsetWidth;
    var maxH = window.innerHeight * heroShare();

    var w = colW;
    var h = w / aspect;
    if (h > maxH) { h = maxH; w = h * aspect; }
    el.postHero.style.width = w + 'px';
    el.postHero.style.height = h + 'px';
  }

  function renderPost(i) {
    var trip = TRIPS[i];
    el.postText.innerHTML =
      '<div class="post-kicker"></div>' +
      '<h1 class="post-title"></h1>' +
      '<p class="post-standfirst"></p>' +
      '<div class="post-body"></div>';

    el.postText.querySelector('.post-kicker').textContent = trip.place + ' · ' + trip.date;
    el.postText.querySelector('.post-title').textContent = trip.title;
    el.postText.querySelector('.post-standfirst').textContent = trip.blurb;

    var body = el.postText.querySelector('.post-body');
    (trip.body || []).forEach(function (block) {
      var node;
      // img is tested first: a picture block also carries h, its pixel height
      if (block.img) {
        node = document.createElement('figure');
        var pic = document.createElement('div');
        pic.style.backgroundImage = 'url("' + block.img + '")';
        // the photo's own shape, so nothing is cropped or letterboxed
        if (block.w && block.h) pic.style.aspectRatio = block.w + ' / ' + block.h;
        node.appendChild(pic);
        if (block.caption) {
          var cap = document.createElement('figcaption');
          cap.textContent = block.caption;
          node.appendChild(cap);
        }
      } else if (block.h) {
        node = document.createElement('h3');
        node.textContent = block.h;
      } else if (block.quote) {
        node = document.createElement('blockquote');
        node.textContent = block.quote;
      } else {
        node = document.createElement('p');
        node.textContent = block.p || '';
      }
      body.appendChild(node);
    });
  }

  function openPost() {
    if (state.busy || state.level !== 'trip') return;
    if (!hasPost(TRIPS[state.index])) return;      // nothing written about this one
    state.busy = true;

    var t = state.trips[state.index];
    var index = state.index;

    el.postText.innerHTML = '';
    el.postHero.style.backgroundImage = 'url("' + t.trip.image + '")';
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

    animateTo(el.post, { opacity: 0 }, { opacity: '1' }, { duration: 420, easing: 'ease' });

    // the photo travels up to the top of the page and grows into the hero
    fly(t.trip.image, from, to, 820, 'center', function () {
      el.postHero.style.visibility = '';
      state.busy = false;
    });

    window.setTimeout(function () {
      if (state.level !== 'post') return;
      renderPost(index);
      animateTo(el.postText,
        { opacity: 0, transform: 'translateY(30px)' },
        { opacity: '1', transform: 'none' },
        { duration: 620, delay: 160, easing: SOFT });
    }, 80);
  }

  function closePost() {
    if (state.busy || state.level !== 'post') return;
    state.busy = true;

    var t = state.trips[state.index];
    var scrolled = el.postScroll.scrollTop > 40;

    setLevel('trip');

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

  // A click opens the photo it landed on and no other: the element comes off
  // the event itself, so it is the right one even mid-glide. Gestures cannot
  // name an element that way and go through openFocused instead.
  el.timelineLayer.addEventListener('click', function (e) {
    if (state.level !== 'timeline' || dragMoved) return;
    var item = e.target.closest ? e.target.closest('.tl-item') : null;
    if (item) openTrip(+item.dataset.index);
  });

  /* ---------------------------------------------------------------- gestures */

  var vertical = 0;
  var verticalDecay = null;
  var verticalLocked = false;

  // One level per pull. Trackpad momentum keeps arriving long after the
  // fingers have lifted, so once a pull has fired the rest of it is dropped
  // until the wheel has actually gone quiet — otherwise a single flick on the
  // timeline lands in the post rather than in the trip.
  function bumpVertical(amount) {
    window.clearTimeout(verticalDecay);
    verticalDecay = window.setTimeout(function () {
      vertical = 0;
      verticalLocked = false;
    }, 220);
    if (verticalLocked) return;

    vertical += amount;

    if (state.level === 'timeline') {
      // top of the stack: upward has nowhere to go, so it is dropped rather
      // than banked up as a debt the next downward pull has to pay off first
      if (vertical < 0) vertical = 0;
      if (vertical > 150) { vertical = 0; verticalLocked = true; openFocused(); }
      return;
    }

    if (vertical > 150) { vertical = 0; verticalLocked = true; openPost(); }
    else if (vertical < -150) { vertical = 0; verticalLocked = true; closeTrip(); }
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
      // sideways still walks the line; downward is read as going a level in,
      // the same pull that opens a post from a trip
      if (horizontal) {
        scrollBy(e.deltaX);
        settleScroll();
      } else {
        bumpVertical(e.deltaY);
      }
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

  // A finger is blunter than a trackpad: it wanders on the way down and never
  // holds a straight line, so every threshold is looser on a touch screen.
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var AXIS_LOCK = coarse ? 10 : 6;      // travel before a gesture picks a direction
  var MOVED = coarse ? 8 : 4;           // travel before a press stops being a tap
  var PAGE_BY = coarse ? 70 : 60;       // sideways travel that turns to the next trip
  var PULL_BY = coarse ? 95 : 80;       // vertical travel that changes level

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

    if (!drag.axis && (Math.abs(totalX) > AXIS_LOCK || Math.abs(totalY) > AXIS_LOCK)) {
      drag.axis = Math.abs(totalX) > Math.abs(totalY) ? 'x' : 'y';
    }
    if (Math.abs(totalX) > MOVED || Math.abs(totalY) > MOVED) dragMoved = true;

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
    var quick = Date.now() - drag.time < (coarse ? 700 : 500);

    if (state.level === 'timeline') {
      if (drag.axis === 'x') {
        var fling = clamp(-drag.vx * 11, -900, 900);
        state.scrollTarget = clamp(state.scrollTarget + fling, 0, state.maxScroll);
      } else if (drag.axis === 'y' && quick && totalY < -80) {
        openFocused();                    // same pull as trip → post, one level up
      }
    } else if (state.level === 'trip') {
      if (drag.axis === 'x' && Math.abs(totalX) > PAGE_BY) {
        pageTrip(totalX < 0 ? 1 : -1);
      } else if (drag.axis === 'y' && quick && Math.abs(totalY) > PULL_BY) {
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
      if (k === 'ArrowDown' || k === 'Enter' || k === ' ') { e.preventDefault(); openFocused(); }
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


    if (reduceMotion) return;

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

  }

  /* ------------------------------------------------------------------- boot */

  function relayout() {
    measure();
    layoutTimeline();
    layoutAllTrips();
    applyScroll();
    if (state.level === 'trip' || state.level === 'post') setTrack(state.index, false);
    if (state.level === 'post') layoutHero(TRIPS[state.index]);
    updateFocus();
  }

  // Safari resizes the viewport on every scroll as its toolbar collapses.
  // Relayout measures the whole line, so it waits for the run to settle.
  var relayoutTimer = null;

  function queueRelayout() {
    window.clearTimeout(relayoutTimer);
    relayoutTimer = window.setTimeout(relayout, 120);
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
    window.addEventListener('resize', queueRelayout);
    // iOS reports stale dimensions right after the event, so re-measure late too
    window.addEventListener('orientationchange', function () {
      queueRelayout();
      window.setTimeout(relayout, 250);
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', queueRelayout);
    }
    window.setTimeout(intro, 80);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
