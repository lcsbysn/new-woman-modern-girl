/* search.js — site-wide keyword search with live dropdown + hover preview */
(function () {
  'use strict';

  if (typeof SEARCH_INDEX === 'undefined') return;

  // IDs of women actually shown on the site (hidden ones are excluded).
  var VISIBLE_IDS = {
    'qiu-jin': true, 'he-xiangning': true, 'tang-qunying': true,
    'xiang-jingyu': true, 'chen-hengzhe': true, 'ding-ling': true,
    'xiao-hong': true, 'kang-keqing': true, 'xie-caizhen': true,
    'ruan-lingyu': true, 'hu-die': true
  };

  function getLang() {
    return (typeof window.LANG !== 'undefined') ? window.LANG : 'de';
  }

  function addLangParam(url) {
    var lang = getLang();
    var hash = '';
    var hi = url.indexOf('#');
    if (hi >= 0) { hash = url.substring(hi); url = url.substring(0, hi); }
    var sep = url.indexOf('?') >= 0 ? '&' : '?';
    return url + sep + 'lang=' + lang + hash;
  }

  // Build result URL with ?lang= and ?highlight= so the target page can
  // scroll to and mark the matched word regardless of how it is rendered.
  function buildResultUrl(url, terms) {
    var lang = getLang();
    var hash = '';
    var hi = url.indexOf('#');
    if (hi >= 0) { hash = url.substring(hi); url = url.substring(0, hi); }
    var sep = url.indexOf('?') >= 0 ? '&' : '?';
    // Longest term is most specific → fewest false matches
    var term = terms && terms.length
      ? terms.slice().sort(function (a, b) { return b.length - a.length; })[0]
      : '';
    var base = url + sep + 'lang=' + lang + (term ? '&highlight=' + encodeURIComponent(term) : '');
    return base + hash;
  }

  // ── On-page highlight ────────────────────────────────────────────
  // Reads ?highlight= from the current URL and wraps matching text nodes
  // in <mark class="search-hl"> elements, then scrolls to the first hit.
  function applyHighlight() {
    var term;
    try {
      term = new URLSearchParams(location.search).get('highlight');
    } catch (e) { return; }
    if (!term || term.length < 2) return;

    var safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Use word boundaries for plain-ASCII terms so "film" doesn't match inside
    // German compound words like "Stummfilmkino".
    var wb = /^\w+$/.test(term) ? '\\b' : '';
    var re = new RegExp(wb + '(' + safeTerm + ')' + wb, 'gi');
    var skip = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, MARK: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1 };
    var firstMark = null;

    function walk(node) {
      if (node.nodeType === 3) {
        re.lastIndex = 0;
        if (!re.test(node.nodeValue)) return;
        re.lastIndex = 0;
        var frag = document.createDocumentFragment();
        var text = node.nodeValue, last = 0, m;
        while ((m = re.exec(text)) !== null) {
          if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          var mark = document.createElement('mark');
          mark.className = 'search-hl';
          mark.textContent = m[1];
          if (!firstMark) firstMark = mark;
          frag.appendChild(mark);
          last = m.index + m[0].length;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !skip[node.nodeName]) {
        try { if (window.getComputedStyle(node).display === 'none') return; } catch (e) {}
        Array.prototype.slice.call(node.childNodes).forEach(walk);
      }
    }

    // If the URL has a #hash, restrict highlighting to that section only.
    // This prevents marking unrelated sections and fighting the browser's
    // anchor scroll with a second scrollIntoView call.
    var hash = location.hash;
    var container = document.body;
    if (hash && hash.length > 1) {
      var target = document.querySelector(hash);
      if (target) container = target;
    }

    walk(container);

    // Scroll to the first marked word. When a #hash is present the browser
    // also fires its own anchor scroll; a short delay lets it settle first
    // so our scrollIntoView wins and lands on the exact word.
    if (firstMark) {
      setTimeout(function () {
        firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, hash ? 80 : 0);
    }
  }

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function highlight(text, terms) {
    var safe = escHtml(text);
    terms.forEach(function (t) {
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      safe = safe.replace(re, '<mark>$1</mark>');
    });
    return safe;
  }

  function tokenise(query) {
    return query.toLowerCase().split(/\s+/).filter(function (t) { return t.length >= 2; });
  }

  // ── Build index from data.js at runtime ─────────────────────────

  function collectText(f) {
    var parts = [];
    if (f.intro)     parts.push(f.intro);
    if (f.rolle)     parts.push(f.rolle);
    if (f.herkunft)  parts.push(f.herkunft);
    if (Array.isArray(f.biografie))  f.biografie.forEach(function (b) { if (b.text)  parts.push(b.text); });
    if (Array.isArray(f.fakten))     f.fakten.forEach(function (b)    { if (b.wert)  parts.push(b.wert); });
    if (Array.isArray(f.zeitleiste)) f.zeitleiste.forEach(function (b){ if (b.text)  parts.push(b.text); });
    return parts.join(' ');
  }

  function buildIndex() {
    var persons = [];
    var nameList = '';

    if (typeof frauen !== 'undefined') {
      Object.keys(frauen).forEach(function (id) {
        if (!VISIBLE_IDS[id]) return;
        var f  = frauen[id];
        var fe = (typeof frauen_en !== 'undefined') ? frauen_en[id] : null;
        var title = f.name + (f.nameChinesisch ? ' ' + f.nameChinesisch : '');
        var deSub = (f.lebensdaten || '') + (f.rolle ? ' · ' + f.rolle : '');
        var enSub = fe ? ((fe.lebensdaten || f.lebensdaten || '') + (fe.rolle ? ' · ' + fe.rolle : '')) : deSub;
        persons.push({
          de: { title: title, sub: deSub, body: collectText(f) },
          en: { title: title, sub: enSub, body: fe ? collectText(fe) : collectText(f) },
          url: 'frau.html?id=' + id,
          type: 'person',
          icon: f.nameChinesisch ? f.nameChinesisch.charAt(0) : f.name.charAt(0)
        });
        nameList += ' ' + f.name + (f.nameChinesisch ? ' ' + f.nameChinesisch : '');
      });
    }

    // Augment gallery and network pages so searching any woman's name surfaces them too.
    var augmented = SEARCH_INDEX.map(function (entry) {
      if (!nameList) return entry;
      if (entry.url !== 'galerie3d.html' && entry.url !== 'sichtbarkeit.html') return entry;
      return {
        de:   { title: entry.de.title, sub: entry.de.sub, body: entry.de.body + nameList },
        en:   { title: entry.en.title, sub: entry.en.sub, body: entry.en.body + nameList },
        url:  entry.url,
        type: entry.type,
        icon: entry.icon
      };
    });

    return persons.concat(augmented);
  }

  var INDEX = [];

  // ── Search ───────────────────────────────────────────────────────

  function scoreEntry(entry, terms) {
    var lang = getLang();
    var d = entry[lang] || entry.de;
    if (!d) return 0;
    var haystack = (d.title + ' ' + (d.sub || '') + ' ' + (d.body || '')).toLowerCase();
    var score = 0;
    terms.forEach(function (t) {
      var re = new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      var m = haystack.match(re);
      if (m) {
        var titleM = d.title.toLowerCase().match(re);
        score += m.length + (titleM ? titleM.length : 0);
      }
    });
    return score;
  }

  function doSearch(query) {
    var terms = tokenise(query);
    if (!terms.length) return [];
    var results = [];
    INDEX.forEach(function (entry) {
      var s = scoreEntry(entry, terms);
      if (s > 0) results.push({ entry: entry, score: s });
    });
    var typeOrder = { person: 0, quote: 1, page: 2 };
    results.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return (typeOrder[a.entry.type] || 0) - (typeOrder[b.entry.type] || 0);
    });
    return results.slice(0, 9);
  }

  // ── Page / section labels ────────────────────────────────────────

  var PAGE_LABELS = {
    de: { 'frau.html': 'Profil', 'quellen.html': 'Quellen', 'galerie3d.html': 'Galerie', 'quiz.html': 'Quiz', 'sichtbarkeit.html': 'Sichtbarkeit', 'index.html': 'Startseite' },
    en: { 'frau.html': 'Profile', 'quellen.html': 'Sources', 'galerie3d.html': 'Gallery', 'quiz.html': 'Quiz', 'sichtbarkeit.html': 'Visibility', 'index.html': 'Home' }
  };
  var ANCHOR_LABELS = {
    de: { koerper: 'Körper', schreiben: 'Schreiben', revolution: 'Revolution', blick: 'Blick' },
    en: { koerper: 'Body', schreiben: 'Writing', revolution: 'Revolution', blick: 'Gaze' }
  };

  function getPageLabel(url, lang) {
    var map = PAGE_LABELS[lang] || PAGE_LABELS.de;
    for (var key in map) { if (url.indexOf(key) === 0) return map[key]; }
    return '';
  }

  function getAnchorLabel(url, lang) {
    var hi = url.indexOf('#');
    if (hi < 0) return '';
    var map = ANCHOR_LABELS[lang] || ANCHOR_LABELS.de;
    return map[url.substring(hi + 1)] || url.substring(hi + 1);
  }

  function getBodyTags(entry, lang, max) {
    var d = entry[lang] || entry.de;
    if (!d || !d.body) return [];
    return d.body.split(/\s+/).filter(function (w) { return w.length > 3; }).slice(0, max || 6);
  }

  // ── UI state ─────────────────────────────────────────────────────

  var dropdown, previewCard, input, wrap;
  var isOpen = false, activeIdx = -1, currentResults = [];

  function getItems() {
    return dropdown ? Array.prototype.slice.call(dropdown.querySelectorAll('.search-item')) : [];
  }

  function setActive(idx) {
    getItems().forEach(function (it, i) { it.classList.toggle('is-active', i === idx); });
    activeIdx = idx;
  }

  function openSearch() {
    wrap.classList.add('is-open');
    isOpen = true;
    setTimeout(function () { input && input.focus(); }, 50);
  }

  function closeSearch() {
    wrap.classList.remove('is-open');
    if (dropdown) dropdown.classList.remove('visible');
    if (previewCard) previewCard.classList.remove('visible');
    isOpen = false;
    activeIdx = -1;
    if (input) input.value = '';
    currentResults = [];
  }

  function positionDropdown() {
    if (!dropdown || !input) return;
    var r = input.getBoundingClientRect();
    var dropW = 340;
    var left = Math.max(8, r.right - dropW);
    if (left + dropW > window.innerWidth - 8) left = window.innerWidth - dropW - 8;
    dropdown.style.top   = (r.bottom + 6) + 'px';
    dropdown.style.left  = left + 'px';
    dropdown.style.width = dropW + 'px';
  }

  function positionPreview() {
    if (!previewCard || !dropdown) return;
    var dr = dropdown.getBoundingClientRect();
    var pvW = 240;
    var left = dr.right + 10;
    if (left + pvW > window.innerWidth - 8) left = dr.left - pvW - 10;
    if (left < 8) left = 8;
    previewCard.style.top  = dr.top + 'px';
    previewCard.style.left = left + 'px';
  }

  function showPreview(result) {
    if (!previewCard) return;
    var lang = getLang();
    var d = result.entry[lang] || result.entry.de;
    var pageLabel   = getPageLabel(result.entry.url, lang);
    var anchorLabel = getAnchorLabel(result.entry.url, lang);
    var tags = getBodyTags(result.entry, lang, 6);
    var sectionHtml = anchorLabel
      ? ' <span class="spv-sep">›</span> <span class="spv-section">' + escHtml(anchorLabel) + '</span>'
      : '';
    var tagsHtml = tags.length
      ? '<div class="spv-tags">' + tags.map(function (t) {
          return '<span class="spv-tag">' + escHtml(t) + '</span>';
        }).join('') + '</div>'
      : '';
    previewCard.className = 'search-preview visible type-' + (result.entry.type || 'page');
    previewCard.innerHTML =
      '<div class="spv-header">' +
        '<span class="spv-icon">' + escHtml(result.entry.icon || '?') + '</span>' +
        '<span class="spv-dest">' + escHtml(pageLabel) + sectionHtml + '</span>' +
      '</div>' +
      '<div class="spv-title">' + escHtml(d.title) + '</div>' +
      (d.sub ? '<div class="spv-sub">' + escHtml(d.sub) + '</div>' : '') +
      tagsHtml;
    positionPreview();
  }

  function hidePreview() {
    if (previewCard) previewCard.classList.remove('visible');
  }

  function renderResults(query) {
    if (!dropdown) return;
    if (!query.trim()) {
      dropdown.classList.remove('visible');
      hidePreview();
      currentResults = [];
      return;
    }
    var terms = tokenise(query);
    currentResults = doSearch(query);
    var lang = getLang();

    if (!currentResults.length) {
      dropdown.innerHTML = '<div class="search-no-results">' +
        (lang === 'en' ? 'No results.' : 'Keine Ergebnisse.') + '</div>';
      positionDropdown();
      dropdown.classList.add('visible');
      activeIdx = -1;
      hidePreview();
      return;
    }

    var html = '';
    currentResults.forEach(function (r, i) {
      var d = r.entry[lang] || r.entry.de;
      var pageLabel = getPageLabel(r.entry.url, lang);
      html += '<a class="search-item type-' + (r.entry.type || 'page') + '" href="' +
        escHtml(buildResultUrl(r.entry.url, terms)) + '" data-idx="' + i + '">' +
        '<span class="search-item-icon">' + escHtml(r.entry.icon || '?') + '</span>' +
        '<span class="search-item-body">' +
          '<span class="search-item-title-row">' +
            '<span class="search-item-title">' + highlight(d.title, terms) + '</span>' +
            (pageLabel ? '<span class="search-item-page">' + escHtml(pageLabel) + '</span>' : '') +
          '</span>' +
          (d.sub ? '<span class="search-item-sub">' + highlight(d.sub, terms) + '</span>' : '') +
        '</span>' +
        '</a>';
    });

    dropdown.innerHTML = html;
    positionDropdown();
    dropdown.classList.add('visible');
    activeIdx = -1;

    dropdown.querySelectorAll('.search-item').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        var idx = parseInt(el.dataset.idx, 10);
        setActive(idx);
        if (currentResults[idx]) showPreview(currentResults[idx]);
      });
    });
  }

  var debounceTimer;
  function onInput() {
    clearTimeout(debounceTimer);
    var q = input.value;
    debounceTimer = setTimeout(function () { renderResults(q); }, 120);
  }

  function buildUI() {
    var langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    wrap = document.createElement('div');
    wrap.className = 'search-wrap';

    var btn = document.createElement('button');
    btn.className = 'search-btn';
    btn.setAttribute('aria-label', getLang() === 'en' ? 'Search' : 'Suche');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>';

    var inputWrap = document.createElement('span');
    inputWrap.className = 'search-input-wrap';

    input = document.createElement('input');
    input.className = 'search-input';
    input.type = 'search';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-label', getLang() === 'en' ? 'Search site' : 'Seite durchsuchen');
    input.setAttribute('placeholder', getLang() === 'en' ? 'Search…' : 'Suchen…');

    inputWrap.appendChild(input);
    wrap.appendChild(btn);
    wrap.appendChild(inputWrap);

    dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.setAttribute('role', 'listbox');
    document.body.appendChild(dropdown);

    previewCard = document.createElement('div');
    previewCard.className = 'search-preview';
    document.body.appendChild(previewCard);

    langToggle.parentNode.insertBefore(wrap, langToggle);

    btn.addEventListener('click', function () {
      if (!isOpen) openSearch(); else closeSearch();
    });

    input.addEventListener('input', onInput);

    input.addEventListener('keydown', function (e) {
      var items = getItems();
      var newIdx;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        newIdx = Math.min(activeIdx + 1, items.length - 1);
        setActive(newIdx);
        if (currentResults[newIdx]) showPreview(currentResults[newIdx]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        newIdx = Math.max(activeIdx - 1, 0);
        setActive(newIdx);
        if (currentResults[newIdx]) showPreview(currentResults[newIdx]);
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && items[activeIdx]) {
          e.preventDefault();
          window.location.href = items[activeIdx].getAttribute('href');
        }
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    });

    dropdown.addEventListener('mouseleave', hidePreview);

    document.addEventListener('click', function (e) {
      if (!isOpen) return;
      if (!wrap.contains(e.target) && !dropdown.contains(e.target) && !previewCard.contains(e.target)) {
        closeSearch();
      }
    });

    window.addEventListener('resize', function () {
      if (dropdown && dropdown.classList.contains('visible')) {
        positionDropdown();
        if (previewCard && previewCard.classList.contains('visible')) positionPreview();
      }
    });

    window.addEventListener('scroll', function () {
      if (dropdown && dropdown.classList.contains('visible')) {
        positionDropdown();
        if (previewCard && previewCard.classList.contains('visible')) positionPreview();
      }
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    INDEX = buildIndex();
    buildUI();
    applyHighlight();
  });
})();
