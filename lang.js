/* lang.js — language state, T() helper, toggle button */

function readLang() {
  // 1) URL ?lang= — only mechanism that reliably crosses file:// boundaries.
  try {
    var lp = new URLSearchParams(location.search).get('lang');
    if (lp === 'en' || lp === 'de') return lp;
  } catch (e) {}
  // 2) localStorage — for first visit / cross-session restore.
  try {
    var ls = localStorage.getItem('site-lang');
    if (ls === 'en' || ls === 'de') return ls;
  } catch (e) {}
  return 'de';
}

// Rewrite every internal <a href> on the page so it carries ?lang=<current>.
// This is what makes the language survive navigation between pages on file://.
function updateLinksWithLang() {
  var lang = window.LANG;
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || /^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return;
    var hashIdx = href.indexOf('#');
    var hash = hashIdx >= 0 ? href.substring(hashIdx) : '';
    var pathQuery = hashIdx >= 0 ? href.substring(0, hashIdx) : href;
    var qIdx = pathQuery.indexOf('?');
    var path = qIdx >= 0 ? pathQuery.substring(0, qIdx) : pathQuery;
    var query = qIdx >= 0 ? pathQuery.substring(qIdx + 1) : '';
    var params = new URLSearchParams(query);
    params.set('lang', lang);
    a.setAttribute('href', path + '?' + params.toString() + hash);
  });
}
window.updateLinksWithLang = updateLinksWithLang;

window.LANG = readLang();

function T(key) {
  if (typeof UI === 'undefined') return key;
  return (UI[LANG] && UI[LANG][key]) || (UI.de && UI.de[key]) || key;
}

function setLang(lang) {
  window.LANG = lang;
  try { localStorage.setItem('site-lang', lang); } catch (e) {}
  // Let page-specific scripts save their state before the reload.
  try { document.dispatchEvent(new Event('beforelangchange')); } catch (e) {}
  // Reload current page with ?lang=<new> in URL — replace, don't push,
  // so the back button doesn't see the language toggle as a separate step.
  try {
    var url = new URL(location.href);
    url.searchParams.set('lang', lang);
    location.replace(url.toString());
    return;
  } catch (e) {}
  location.reload();
}

function applyTranslations() {
  if (LANG === 'de') return;  // DE — original HTML is canonical, leave it alone
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var val = T(key);
    if (val && val !== key) el.innerHTML = val;
  });
}

function syncLangButtons(lang) {
  document.querySelectorAll('#lang-toggle .lang-btn').forEach(function (btn) {
    var btnLang = btn.dataset.lang || btn.textContent.trim().toLowerCase();
    var active = btnLang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Propagate ?lang=<current> to every internal link on the page.
  updateLinksWithLang();

  // Verhindert Dopplung: Falls der Button schon da ist, nichts tun
  if (document.getElementById('lang-toggle')) {
    syncLangButtons(LANG);
    applyTranslations();
    return;
  }

  var div = document.createElement('div');
  div.id = 'lang-toggle';
  div.innerHTML =
    '<button onclick="setLang(\'de\')" class="lang-btn' + (LANG === 'de' ? ' active' : '') + '" data-lang="de" aria-pressed="' + (LANG === 'de' ? 'true' : 'false') + '">DE</button>' +
    '<span aria-hidden="true" style="opacity:0.3; margin:0 2px;">|</span>' +
    '<button onclick="setLang(\'en\')" class="lang-btn' + (LANG === 'en' ? ' active' : '') + '" data-lang="en" aria-pressed="' + (LANG === 'en' ? 'true' : 'false') + '">EN</button>';

  var navbar = document.querySelector('.frau-nav');

  if (navbar) {
    // In Navbar: Vor den letzten Link schieben
    var galleryLink = navbar.querySelector('a:last-child');
    if (galleryLink) {
      navbar.insertBefore(div, galleryLink);
    } else {
      navbar.appendChild(div);
    }
  } else {
    // Falls keine Nav da ist (Index): Oben rechts fixieren
    div.style.position = 'absolute';
    div.style.top = '1.5rem';
    div.style.right = '2rem';
    div.style.zIndex = '9999';
    document.body.appendChild(div);
  }

  applyTranslations();
});

// bfcache-Wiederherstellung: Browser stellt Seite ohne Script-Neuausführung wieder her.
// pageshow (e.persisted=true) feuert — Sprache aus window.name neu lesen und anwenden.
window.addEventListener('pageshow', function (e) {
  if (!e.persisted) return;
  window.LANG = readLang();
  syncLangButtons(window.LANG);
  applyTranslations();
});