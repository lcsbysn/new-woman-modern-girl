document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const deData = frauen[id];
  const enData = (window.LANG === 'en' && typeof frauen_en !== 'undefined') ? frauen_en[id] : null;
  const person = deData ? Object.assign({}, deData, enData || {}) : null;

  if (!person) {
    showFrauenListe();
    return;
  }

  document.title = `${person.name} – ${T('nav_title')}`;

  // Make the gallery back-link scroll to this woman's card
  const galLink = document.querySelector('a[href="galerie3d.html"]');
  if (galLink && id) galLink.href = `galerie3d.html?frau=${id}`;

  renderHero(person);
  setupTabs();
  renderBiografie(person);
  renderZeitleiste(person);
  renderGalerie(person);
  renderQuiz(person);
});

/* ── FRAUENLISTE (Fallback wenn keine ID) ──────── */

function showFrauenListe() {
  document.title = T('frau_title_fallback');
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div class="hero-accent-line"></div>
    <div class="hero-container">
      <h1 class="hero-name" style="margin-bottom:1rem">${T('frau_title_fallback')}</h1>
      <p class="hero-intro" style="margin-bottom:2rem">${T('frau_profile_list_prompt')}</p>
      <div style="display:flex;flex-direction:column;gap:0.75rem;max-width:400px">
        ${Object.values(frauen).map(f => `
          <a href="frau.html?id=${f.id}" style="display:block;background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:1rem 1.25rem;text-decoration:none;color:var(--text);box-shadow:var(--shadow);transition:box-shadow 0.15s">
            <strong>${f.name}</strong> <span style="color:var(--accent);margin-left:0.4rem">${f.nameChinesisch}</span>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.2rem">${f.lebensdaten} · ${f.rolle}</div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
  document.getElementById('tabNav').style.display = 'none';
  document.querySelector('.tab-content-wrapper').style.display = 'none';
  document.getElementById('lightbox').style.display = 'none';
}

/* ── HERO ──────────────────────────────────────── */

function renderHero(person) {
  document.getElementById('hero-name').textContent = person.name;
  document.getElementById('hero-chinesisch').textContent = person.nameChinesisch;
  document.getElementById('hero-lebensdaten').textContent = person.lebensdaten;
  document.getElementById('hero-rolle').textContent = person.rolle;
  document.getElementById('hero-intro').textContent = person.intro;
}

/* ── TABS ──────────────────────────────────────── */

function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  function activateTab(tabId) {
    tabs.forEach(t => {
      const active = t.dataset.tab === tabId;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    contents.forEach(c => {
      const active = c.id === `tab-${tabId}`;
      c.classList.toggle('active', active);
      c.hidden = !active;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  activateTab('biografie');
}

/* ── BIOGRAFIE ─────────────────────────────────── */

function renderBiografie(person) {
  const container = document.getElementById('tab-biografie');

  const sectionsHtml = person.biografie.map(s => `
    <div class="bio-section">
      <h3>${s.titel}</h3>
      <p>${s.text}</p>
    </div>
  `).join('');

  const faktenHtml = person.fakten.map(f => `
    <div class="faktum">
      <div class="faktum-label">${f.label}</div>
      <div class="faktum-wert">${f.wert}</div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="bio-grid">
      <div class="bio-sections">${sectionsHtml}</div>
      <aside>
        <div class="fakten-card">
          <div class="fakten-card-title">${T('steckbrief_title')}</div>
          <div class="fakten-list">${faktenHtml}</div>
        </div>
      </aside>
    </div>
  `;
}

/* ── ZEITLEISTE ────────────────────────────────── */

function renderZeitleiste(person) {
  const container = document.getElementById('tab-zeitleiste');

  const sorted = [...person.zeitleiste].sort((a, b) => a.jahr - b.jahr);

  const itemsHtml = sorted.map(e => `
    <div class="tl-item tl-item--${e.typ}">
      <div class="tl-dot"></div>
      <span class="tl-jahr">${e.jahr}</span>
      <div class="tl-titel">${e.titel}</div>
      <p class="tl-text">${e.text}</p>
    </div>
  `).join('');

  container.innerHTML = `<div class="timeline">${itemsHtml}</div>`;
}

/* ── GALERIE ───────────────────────────────────── */

function renderGalerie(person) {
  const container = document.getElementById('tab-galerie');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxInfo = document.getElementById('lightbox-info');

  const cardsHtml = person.galerie.map((item, i) => {
    const imgHtml = item.bild
      ? `<img src="${item.bild}" alt="${item.titel}">`
      : `<div class="galerie-placeholder">
           <div class="galerie-placeholder-icon">🖼</div>
           <div class="galerie-placeholder-text">${T('img_not_available')}</div>
         </div>`;

    return `
      <div class="galerie-card" data-index="${i}" role="button" tabindex="0" aria-label="${item.titel}">
        <div class="galerie-img-container">${imgHtml}</div>
        <div class="galerie-info">
          <div class="galerie-titel">${item.titel}</div>
          <div class="galerie-beschreibung">${item.beschreibung}</div>
          <div class="galerie-quelle">${item.quelle}</div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `<div class="galerie-grid">${cardsHtml}</div>`;

  let lastFocusedElement = null;

  function openLightbox(index) {
    const item = person.galerie[index];
    lightboxImg.innerHTML = item.bild
      ? `<img src="${item.bild}" alt="${item.titel}">`
      : `<div class="lightbox-placeholder">
           <div class="lightbox-placeholder-icon">🖼</div>
           <div class="lightbox-placeholder-text">${T('img_not_available')}</div>
         </div>`;
    lightboxInfo.innerHTML = `
      <div class="lightbox-info-titel">${item.titel}</div>
      <div class="lightbox-info-beschreibung">${item.beschreibung}</div>
      <div class="lightbox-info-quelle">${item.quelle}</div>
    `;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lastFocusedElement = document.activeElement;
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  container.querySelectorAll('.galerie-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(+card.dataset.index));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(+card.dataset.index);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ── QUIZ ──────────────────────────────────────── */

/* ── QUIZ STORAGE HELPERS ──────────────────────────
   Saves to localStorage AND window.name.
   window.name survives same-tab navigation on all
   browsers including file:// with strict isolation. */

function quizSave(key) {
  // 1) localStorage (might be isolated on file://)
  try { localStorage.setItem(key, 'true'); } catch(e) {}
  // 2) window.name — always works across file:// pages in same tab
  try {
    const store = window.name ? JSON.parse(window.name) : {};
    store[key] = true;
    window.name = JSON.stringify(store);
  } catch(e) {
    try { window.name = JSON.stringify({ [key]: true }); } catch(e2) {}
  }
}

function quizIsPassed(key) {
  try { if (localStorage.getItem(key) === 'true') return true; } catch(e) {}
  try {
    const store = window.name ? JSON.parse(window.name) : {};
    return store[key] === true;
  } catch(e) { return false; }
}

/* Marks a pending animation in window.name + localStorage so that
   ANY navigation back to index.html (including browser back button)
   can pick it up and trigger the ripple + scroll. */
function quizMarkAnimPending(id) {
  try {
    const store = window.name ? JSON.parse(window.name) : {};
    store['__pending_anim__'] = id;
    window.name = JSON.stringify(store);
  } catch(e) {}
  try { localStorage.setItem('__pending_anim__', id); } catch(e) {}
}

/* Rewrites every link to index.html on the page so it carries ?qp=<id>#welle,
   ensuring the "← Übersicht" nav link and any other back-link also triggers
   the gallery animation. */
function updateIndexLinks(id) {
  const lang = window.LANG;
  const langPart = (lang === 'en' || lang === 'de') ? `&lang=${lang}` : '';
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href === 'index.html' ||
        href.startsWith('index.html?') ||
        href.startsWith('index.html#')) {
      a.href = `index.html?qp=${id}${langPart}#welle`;
    }
  });
}

function renderQuiz(person) {
  const container = document.getElementById('tab-quiz');
  const deQuiz = (typeof frauenQuiz !== 'undefined') ? frauenQuiz[person.id] : null;
  const enQuiz = (typeof frauenQuiz_en !== 'undefined') ? frauenQuiz_en[person.id] : null;
  const fragen = (window.LANG === 'en' && enQuiz && enQuiz.length) ? enQuiz : deQuiz;

  if (!fragen || fragen.length === 0) {
    container.innerHTML = `<p class="quiz-empty">${T('quiz_no_questions')}</p>`;
    return;
  }

  const storageKey = `quiz_passed_${person.id}`;

  // State — lives across buildQuiz() re-renders
  let antworten = new Array(fragen.length).fill(null);
  let submitted  = false;

  function buildQuiz() {
    const alreadyPassed = quizIsPassed(storageKey);

    const fragenHtml = fragen.map((q, qi) => {
      const optionen = q.antworten.map((a, ai) => {
        let cls = 'quiz-option';
        if (submitted) {
          if (ai === q.richtig)                          cls += ' quiz-option--correct';
          else if (ai === antworten[qi] && ai !== q.richtig) cls += ' quiz-option--wrong';
        } else if (antworten[qi] === ai) {
          cls += ' quiz-option--selected';
        }
        return `<button class="${cls}" data-qi="${qi}" data-ai="${ai}" ${submitted ? 'disabled' : ''}>${a}</button>`;
      }).join('');

      return `
        <div class="quiz-frage" data-qi="${qi}">
          <div class="quiz-frage-nr">${T('quiz_question_counter').replace('{n}', qi + 1).replace('{total}', fragen.length)}</div>
          <p class="quiz-frage-text">${q.frage}</p>
          <div class="quiz-optionen">${optionen}</div>
        </div>`;
    }).join('');

    const richtigAnzahl = submitted
      ? antworten.filter((a, i) => a === fragen[i].richtig).length
      : 0;
    const bestanden = richtigAnzahl >= 2;

    let ergebnisHtml = '';
    if (submitted) {
      if (bestanden) {
        ergebnisHtml = `
          <div class="quiz-ergebnis quiz-ergebnis--pass">
            <div class="quiz-ergebnis-icon">✓</div>
            <div class="quiz-ergebnis-text">
              <strong>${T('quiz_passed_result').replace('{richtig}', richtigAnzahl).replace('{total}', fragen.length)}</strong>
              <span class="quiz-ergebnis-sub">${T('quiz_part_of_exhibition').replace('{name}', person.name)}</span>
              <a href="index.html?qp=${person.id}#welle" class="quiz-ausstellung-link">${T('quiz_to_exhibition')}</a>
            </div>
          </div>`;
      } else {
        ergebnisHtml = `
          <div class="quiz-ergebnis quiz-ergebnis--fail">
            <div class="quiz-ergebnis-icon">✗</div>
            <div class="quiz-ergebnis-text">
              <strong>${T('quiz_failed_result').replace('{richtig}', richtigAnzahl).replace('{total}', fragen.length)}</strong>
              <span class="quiz-ergebnis-sub">${T('quiz_pass_requirement')}</span>
            </div>
          </div>`;
      }
    }

    const alleBeantwortet = antworten.every(a => a !== null);
    const btnHtml = !submitted
      ? `<button class="quiz-submit" data-action="submit" ${alleBeantwortet ? '' : 'disabled'}>${T('quiz_submit')}</button>`
      : (!bestanden
          ? `<button class="quiz-retry" data-action="retry">${T('quiz_retry')}</button>`
          : '');

    container.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-intro">
          <p class="quiz-intro-text">${T('quiz_intro_text').replace('{name}', person.name)}</p>
          ${alreadyPassed && !submitted ? `<div class="quiz-already-passed">${T('quiz_already_passed')}</div>` : ''}
        </div>
        <div class="quiz-fragen">${fragenHtml}</div>
        ${ergebnisHtml}
        <div class="quiz-actions">${btnHtml}</div>
      </div>`;
  }

  // ── Single delegated listener on the stable container ──
  // Survives every buildQuiz() re-render.
  container.addEventListener('click', function handler(e) {
    // Answer option
    const opt = e.target.closest('.quiz-option');
    if (opt && !submitted) {
      antworten[+opt.dataset.qi] = +opt.dataset.ai;
      buildQuiz();
      return;
    }
    // Submit
    if (e.target.closest('[data-action="submit"]') && !submitted) {
      submitted = true;
      const richtig = antworten.filter((a, i) => a === fragen[i].richtig).length;
      if (richtig >= 2) {
        quizSave(storageKey);
        // Mark animation as pending so ANY navigation back to index.html triggers it
        quizMarkAnimPending(person.id);
        // Update every link back to index.html on this page
        updateIndexLinks(person.id);
      }
      buildQuiz();
      return;
    }
    // Retry
    if (e.target.closest('[data-action="retry"]')) {
      submitted  = false;
      antworten  = new Array(fragen.length).fill(null);
      buildQuiz();
    }
  });

  buildQuiz();
}

/* ── NETZWERK (entfernt) ──────────────────────── */

function renderNetzwerk(person) {
  const container = document.getElementById('tab-netzwerk');
  const tooltip = document.getElementById('netzwerkTooltip');

  const W = 700;
  const H = 460;
  const CX = 350;
  const CY = 230;

  const knotenFarben = {
    hauptperson: '#C41E3A',
    person:      '#1E3A8A',
    organisation:'#166534',
    bewegung:    '#92400E',
    verweis:     '#4B5563'
  };

  const knoten = person.netzwerk.knoten;
  const verbindungen = person.netzwerk.verbindungen;

  // Positionen berechnen
  const hauptknoten = knoten.find(k => k.typ === 'hauptperson');
  const anderen = knoten.filter(k => k.typ !== 'hauptperson');
  const anzahl = anderen.length;
  const radius = 155;

  const positionen = {};
  positionen[hauptknoten.id] = { x: CX, y: CY };

  anderen.forEach((k, i) => {
    const winkel = (2 * Math.PI * i) / anzahl - Math.PI / 2;
    positionen[k.id] = {
      x: CX + radius * Math.cos(winkel),
      y: CY + radius * Math.sin(winkel)
    };
  });

  // SVG aufbauen
  let svgContent = '';

  // Verbindungslinien
  verbindungen.forEach(v => {
    const von = positionen[v.von];
    const nach = positionen[v.nach];
    if (!von || !nach) return;
    svgContent += `<line x1="${von.x}" y1="${von.y}" x2="${nach.x}" y2="${nach.y}" stroke="#CBD5E1" stroke-width="1.5"/>`;
  });

  // Nodes
  knoten.forEach(k => {
    const pos = positionen[k.id];
    if (!pos) return;
    const isHaupt = k.typ === 'hauptperson';
    const r = isHaupt ? 38 : 24;
    const farbe = knotenFarben[k.typ] || '#4B5563';
    const istVerweis = k.typ === 'verweis';

    const strokeDash = istVerweis ? 'stroke-dasharray="5,3"' : '';
    const strokeExtra = istVerweis ? `stroke="#4B5563" stroke-width="2"` : '';

    svgContent += `<g class="netz-node" data-id="${k.id}" data-typ="${k.typ}" style="cursor:${istVerweis ? 'pointer' : 'default'}">`;

    if (istVerweis) {
      svgContent += `<circle cx="${pos.x}" cy="${pos.y}" r="${r}" fill="${farbe}" fill-opacity="0.15" stroke="#4B5563" stroke-width="2" stroke-dasharray="5,3"/>`;
    } else {
      svgContent += `<circle cx="${pos.x}" cy="${pos.y}" r="${r}" fill="${farbe}" ${isHaupt ? '' : 'fill-opacity="0.9"'}/>`;
    }

    // Name-Label
    const labelY = pos.y + r + 14;
    const nameShort = k.name.length > 14 ? k.name.split(' ').slice(-1)[0] : k.name;
    svgContent += `<text x="${pos.x}" y="${labelY}" text-anchor="middle" font-family="Inter, sans-serif" font-size="${isHaupt ? 11 : 9.5}" font-weight="600" fill="${istVerweis ? '#4B5563' : '#1A1A1A'}">${nameShort}</text>`;
    svgContent += `<text x="${pos.x}" y="${labelY + 12}" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" fill="${istVerweis ? '#6B7280' : '#6B7280'}">${k.chinesisch}</text>`;

    svgContent += `</g>`;
  });

  const svgMarkup = `
    <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      ${svgContent}
    </svg>
  `;

  const legendeItems = [
    { farbe: '#C41E3A', label: T('netz_legend_main') },
    { farbe: '#1E3A8A', label: T('netz_legend_person') },
    { farbe: '#166534', label: T('netz_legend_org') },
    { farbe: '#92400E', label: T('netz_legend_movement') },
    { farbe: '#4B5563', label: T('netz_legend_ref') }
  ].map(l => `
    <div class="netzwerk-legende-item">
      <div class="netzwerk-dot" style="background:${l.farbe}"></div>
      <span>${l.label}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="netzwerk-wrap">
      <div class="netzwerk-svg-container">${svgMarkup}</div>
      <div class="netzwerk-legende">${legendeItems}</div>
    </div>
  `;

  // Tooltip + Klick-Events
  const svgEl = container.querySelector('svg');
  // Touch devices have no hover: a tap must reveal the tooltip instead of
  // navigating instantly, otherwise the connection text is never seen.
  const isTouch = window.matchMedia('(hover: none)').matches;

  function showTooltip(knotenData, istVerweis) {
    tooltip.innerHTML = `
      <div class="netzwerk-tooltip-name">${knotenData.name} ${knotenData.chinesisch}</div>
      <div class="netzwerk-tooltip-info">${knotenData.verbindung || ''}</div>
      ${istVerweis ? `<a class="netzwerk-tooltip-link" href="frau.html?id=${knotenData.id}">${T('galerie_lb_to_profile')} →</a>` : ''}
    `;
    tooltip.classList.add('visible');
  }
  function hideTooltip() { tooltip.classList.remove('visible'); }

  svgEl.querySelectorAll('.netz-node').forEach(nodeEl => {
    const nodeId = nodeEl.dataset.id;
    const knotenData = knoten.find(k => k.id === nodeId);
    if (!knotenData) return;
    const istVerweis = nodeEl.dataset.typ === 'verweis';

    if (isTouch) {
      // Tap shows the tooltip near the node; reference nodes carry a link
      // inside the tooltip so navigation stays a deliberate second tap.
      nodeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!knotenData.verbindung && !istVerweis) { hideTooltip(); return; }
        tooltip.classList.add('netzwerk-tooltip--touch');
        showTooltip(knotenData, istVerweis);
        positionTooltipAtNode(nodeEl);
      });
    } else {
      nodeEl.addEventListener('mouseenter', (e) => {
        if (!knotenData.verbindung) return;
        showTooltip(knotenData, false);
        positionTooltip(e);
      });
      nodeEl.addEventListener('mousemove', positionTooltip);
      nodeEl.addEventListener('mouseleave', hideTooltip);
      if (istVerweis) {
        nodeEl.addEventListener('click', () => {
          window.location.href = `frau.html?id=${nodeId}`;
        });
      }
    }
  });

  // On touch, a tap anywhere outside a node/tooltip dismisses the tooltip.
  if (isTouch) {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.netz-node') && !e.target.closest('.netzwerk-tooltip')) hideTooltip();
    });
  }

  function positionTooltip(e) {
    const x = e.clientX + 14;
    const y = e.clientY - 10;
    const tw = tooltip.offsetWidth || 220;
    const th = tooltip.offsetHeight || 60;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    tooltip.style.left = (x + tw > vw - 10 ? x - tw - 28 : x) + 'px';
    tooltip.style.top  = (y + th > vh - 10 ? y - th : y) + 'px';
  }

  function positionTooltipAtNode(nodeEl) {
    const r  = nodeEl.getBoundingClientRect();
    const tw = tooltip.offsetWidth || 220;
    const th = tooltip.offsetHeight || 60;
    const vw = window.innerWidth, vh = window.innerHeight;
    let x = r.left + r.width / 2 - tw / 2;
    let y = r.bottom + 10;
    x = Math.max(10, Math.min(x, vw - tw - 10));
    if (y + th > vh - 10) y = r.top - th - 10;
    tooltip.style.left = x + 'px';
    tooltip.style.top  = y + 'px';
  }
}
