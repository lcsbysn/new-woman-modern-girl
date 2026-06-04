/* ══════════════════════════════════════════════════════════════════
   netzwerk.js — Bekannt als · Simulierte Suche · Wikipedia-Vergleich
   ══════════════════════════════════════════════════════════════════ */

// ── DATEN: BEKANNT ALS ────────────────────────────────────────────
// Quellen: tatsächliche Einleitungssätze oder typische Formulierungen
// aus Wikipedia, Brockhaus, Meyers und Standardbiografien der Ära.

const bekanntAlsData = [
  /* HIDDEN – im Code erhalten, nicht angezeigt:
  {
    id:           'song-qingling',
    name:         'Song Qingling',
    chinesisch:   '宋庆龄',
    label:        'Witwe Sun Yat-sens',
    quelle:       'Brockhaus Enzyklopädie u.a.',
    tatsaechlich: 'Vizepräsidentin der Volksrepublik China · Gründerin des Chinesischen Roten Kreuzes · eigenständige linke Staatsfrau über sechs Jahrzehnte',
  },
  */
  {
    id:           'qiu-jin',
    name:         'Qiu Jin',
    chinesisch:   '秋瑾',
    label:        'Ehefrau, die ihren Mann verließ',
    label_en:     'Wife who left her husband',
    quelle:       'Zeitgenössische Presse · frühe Biografien der Ära',
    quelle_en:    'Contemporary press · early biographies of the era',
    tatsaechlich: 'Revolutionärin · Märtyrerin (hingerichtet 1907) · Pionierin der Frauenbildung · Dichterin — eine der ersten Feministinnen der chinesischen Moderne',
    tatsaechlich_en: 'Revolutionary · Martyr (executed 1907) · Pioneer of women\'s education · Poet — one of the first feminists of Chinese modernity',
  },
  {
    id:           'he-xiangning',
    name:         'He Xiangning',
    chinesisch:   '何香凝',
    label:        'Ehefrau des KMT-Politikers Liao Zhongkai',
    label_en:     'Wife of KMT politician Liao Zhongkai',
    quelle:       'Meyers Lexikon · mehrere Standardwerke',
    quelle_en:    'Meyers Lexikon · several standard works',
    tatsaechlich: 'Leiterin der KMT-Frauenabteilung · Delegierte des Nationalen Volkskongresses · Malerin — ihr Museum steht in Shenzhen',
    tatsaechlich_en: 'Head of the KMT Women\'s Department · Delegate to the National People\'s Congress · Painter — her museum stands in Shenzhen',
  },
  /* HIDDEN – im Code erhalten, nicht angezeigt:
  {
    id:           'lin-huiyin',
    name:         'Lin Huiyin',
    chinesisch:   '林徽因',
    label:        'Muse des Dichters Xu Zhimo',
    quelle:       'Englische Wikipedia, Einleitungssatz (2023)',
    tatsaechlich: 'Chinas erste Architektin · Mitgestalterin des nationalen Emblems der VR China · Pionierin der Denkmalpflege historischer Bauten',
  },
  */
  {
    id:           'xiang-jingyu',
    name:         'Xiang Jingyu',
    chinesisch:   '向警予',
    label:        'Ehefrau des KPCh-Mitgründers Cai Hesen',
    label_en:     'Wife of CCP co-founder Cai Hesen',
    quelle:       'Mehrere Biografien Cai Hesens',
    quelle_en:    'Several biographies of Cai Hesen',
    tatsaechlich: 'Erste Leiterin der KPCh-Frauenabteilung · Organisatorin von Textilarbeiterinnenstreiks · am 1. Mai 1928 hingerichtet',
    tatsaechlich_en: 'First head of the CCP Women\'s Department · Organiser of textile workers\' strikes · executed 1 May 1928',
  },
  {
    id:           'kang-keqing',
    name:         'Kang Keqing',
    chinesisch:   '康克清',
    label:        'Ehefrau des Roten Armeekommandeurs Zhu De',
    label_en:     'Wife of Red Army commander Zhu De',
    quelle:       'Westliche Standardwerke zur Volksbefreiungsarmee',
    quelle_en:    'Western standard works on the People\'s Liberation Army',
    tatsaechlich: 'Generale der Roten Armee · eine der wenigen Frauen, die den Langen Marsch vollendeten · Präsidentin der Chinesischen Frauenföderation 1978–1988',
    tatsaechlich_en: 'General of the Red Army · one of the few women to complete the Long March · President of the All-China Women\'s Federation 1978–1988',
  },
  {
    id:           'xiao-hong',
    name:         'Xiao Hong',
    chinesisch:   '萧红',
    label:        'Geliebte des Schriftstellers Xiao Jun',
    label_en:     'Lover of writer Xiao Jun',
    quelle:       'Mehrere englischsprachige Literaturgeschichten',
    quelle_en:    'Several English-language literary histories',
    tatsaechlich: 'Eigenständige Schriftstellerin · Autorin von „Feldmark der Lebensdauer" (呼兰河传) — einem der bedeutendsten Werke der modernen chinesischen Literatur · „Weiblicher Lu Xun"',
    tatsaechlich_en: 'Independent author · writer of "Tales of Hulan River" (呼兰河传) — one of the most significant works of modern Chinese literature · "The Female Lu Xun"',
  },
  {
    id:           'ruan-lingyu',
    name:         'Ruan Lingyu',
    chinesisch:   '阮玲玉',
    label:        'Skandalöse Schauspielerin · Selbstmörderin mit 25',
    label_en:     'Scandalous actress · Suicide at 25',
    quelle:       'Zeitgenössische Shanghaier Boulevardpresse, 1935',
    quelle_en:    'Contemporary Shanghai tabloid press, 1935',
    tatsaechlich: 'Pionierin des chinesischen Stummfilms · Hauptdarstellerin in „Die Göttin" (1934) — einem der bedeutendsten Stummfilme Asiens · Ihr Abschiedsbrief: „Die öffentliche Meinung tötet"',
    tatsaechlich_en: 'Pioneer of Chinese silent film · Lead actress in "The Goddess" (1934) — one of Asia\'s greatest silent films · Her farewell letter: "Public opinion kills"',
  },
  /* HIDDEN – im Code erhalten, nicht angezeigt:
  {
    id:           'yang-zhihua',
    name:         'Yang Zhihua',
    chinesisch:   '杨之华',
    label:        'Dritte Ehefrau Qu Qiubais',
    quelle:       'Deutscher Wikipedia-Artikel zu Qu Qiubai',
    tatsaechlich: 'KPCh-Frauenfunktionärin der Gründergeneration · Aktivistin der frühen Arbeiterbewegung · überlebte Kulturrevolution im Gefängnis',
  },
  {
    id:           'zhang-ruoming',
    name:         'Zhang Ruoming',
    chinesisch:   '张若名',
    label:        'Jugendfreundin Zhou Enlais',
    quelle:       'Mehrere Biografien Zhou Enlais',
    tatsaechlich: 'Kommunistin der Gründergeneration · Literaturprofessorin in Yunnan · Widerstandskämpferin gegen die Vichy-Regierung in Frankreich',
  },
  */
];

// ── BEKANNT ALS RENDERN ───────────────────────────────────────────

function buildBekanntAls() {
  const container = document.getElementById('baList');
  if (!container) return;

  const isEn = window.LANG === 'en';
  container.innerHTML = bekanntAlsData.map(frau => `
    <div class="ba-entry">
      <div class="ba-entry-name">
        <a href="frau.html?id=${frau.id}" class="ba-name-link">
          <span>${frau.name}</span>
          <span class="ba-name-zh">${frau.chinesisch}</span>
        </a>
      </div>
      <div class="ba-entry-body">
        <div class="ba-label-wrap">
          <span class="ba-prefix">${T('netzwerk_bekannt_section')}</span>
          <span class="ba-label">${isEn && frau.label_en ? frau.label_en : frau.label}</span>
          <span class="ba-quelle">${isEn && frau.quelle_en ? frau.quelle_en : frau.quelle}</span>
        </div>
        <div class="ba-arrow" aria-hidden="true">↓</div>
        <div class="ba-real">${isEn && frau.tatsaechlich_en ? frau.tatsaechlich_en : frau.tatsaechlich}</div>
      </div>
    </div>
  `).join('');
}

buildBekanntAls();


/* HIDDEN: Simulierte Suche – im Code erhalten, Abschnitt ausgeblendet.
   Zum Wiederherstellen: Kommentar entfernen und buildSuche()-Aufruf am Ende aktivieren.

// ── DATEN: SIMULIERTE SUCHE ───────────────────────────────────────
// Ergebnisse basieren auf Wikipedia-Stand Mai 2026 und approximiertem
// Suchverhalten; als Simulation gekennzeichnet.

const suchePersonen = [
  {
    id:         'xie-caizhen',
    name:       'Xie Caizhen',
    chinesisch: '谢采真',
    stats:      '0 deutschsprachige Treffer',
    ergebnisse: [],
    hinweis:    'Keine deutschsprachigen Quellen auffindbar. In der englischen Wikipedia existiert ein kurzer Stub-Artikel von wenigen Sätzen. Xie Caizhen inszenierte 1925 den ersten bekannten chinesischen Film unter weiblicher Regie — und ist in westlichen Sprachen praktisch inexistent.',
  },
  {
    id:         'zhang-ruoming',
    name:       'Zhang Ruoming',
    chinesisch: '张若名',
    stats:      '1 deutschsprachiger Treffer',
    ergebnisse: [
      {
        typ:     'mann',
        titel:   'Zhou Enlai – Wikipedia',
        url:     'de.wikipedia.org › wiki › Zhou_Enlai',
        auszug:  '… lernte er in Frankreich Zhang Ruoming kennen, eine Kommilitonin, mit der ihn eine kurze romantische Verbindung verband …',
        sprache: 'DE',
      },
    ],
    hinweis:    'Zhang Ruoming taucht auf Deutsch ausschließlich als Fußnote in der Biografie Zhou Enlais auf — als romantische Episode seiner Jugend. Ihr eigenes Leben: Kommunistin der ersten Stunde, Professorin, Widerstandskämpferin gegen die Vichy-Regierung, 1958 in China gestorben. Kein eigener Eintrag.',
  },
  {
    id:         'yang-zhihua',
    name:       'Yang Zhihua',
    chinesisch: '杨之华',
    stats:      '2 deutschsprachige Treffer',
    ergebnisse: [
      {
        typ:     'mann',
        titel:   'Qu Qiubai – Wikipedia',
        url:     'de.wikipedia.org › wiki › Qu_Qiubai',
        auszug:  '… heiratete 1924 Yang Zhihua, die er in Shanghai kennengelernt hatte. Sie war seine dritte Ehefrau …',
        sprache: 'DE',
      },
      {
        typ:     'stub',
        titel:   'Yang Zhihua – Wikipedia',
        url:     'de.wikipedia.org › wiki › Yang_Zhihua',
        auszug:  'Yang Zhihua (1901–1973) war eine chinesische Kommunistin und Politikerin. Sie war die Ehefrau von Qu Qiubai.',
        sprache: 'DE',
      },
    ],
    hinweis:    'Der einzige eigenständige Eintrag auf Deutsch definiert sie im ersten Satz durch ihren Ehemann. Dass sie selbst eine der frühesten KPCh-Frauenfunktionärinnen war und die Kulturrevolution im Gefängnis überlebte — das steht, wenn überhaupt, im zweiten Absatz.',
  },
  {
    id:         'xiang-jingyu',
    name:       'Xiang Jingyu',
    chinesisch: '向警予',
    stats:      'Wenige Treffer, meist englisch',
    ergebnisse: [
      {
        typ:     'mann',
        titel:   'Cai Hesen – Wikipedia',
        url:     'en.wikipedia.org › wiki › Cai_Hesen',
        auszug:  '… married Xiang Jingyu in a symbolic ceremony in France, rejecting traditional marriage contracts …',
        sprache: 'EN',
      },
      {
        typ:     'frau',
        titel:   'Xiang Jingyu – Wikipedia',
        url:     'en.wikipedia.org › wiki › Xiang_Jingyu',
        auszug:  'Xiang Jingyu (1895–1928) was a Chinese Communist revolutionary and the first director of the women\'s department of the Chinese Communist Party …',
        sprache: 'EN',
      },
    ],
    hinweis:    'Auf Englisch existiert ein solider Artikel — auf Deutsch kaum etwas. Der englische Artikel über ihren Mann beschreibt ihre Hochzeit als seinen revolutionären Akt, nicht als ihren.',
  },
  {
    id:         'ding-ling',
    name:       'Ding Ling',
    chinesisch: '丁玲',
    stats:      'Mehrere Treffer, DE + EN',
    ergebnisse: [
      {
        typ:     'frau',
        titel:   'Ding Ling – Wikipedia',
        url:     'de.wikipedia.org › wiki › Ding_Ling',
        auszug:  'Ding Ling (* 12. Oktober 1904 in Linli, Hunan; † 4. März 1986 in Peking) war eine chinesische Schriftstellerin …',
        sprache: 'DE',
      },
      {
        typ:     'frau',
        titel:   'Ding Ling – Wikipedia',
        url:     'en.wikipedia.org › wiki › Ding_Ling_(author)',
        auszug:  '… best known for her short story "Miss Sophie\'s Diary" (1928), which caused controversy for its frank portrayal of female desire …',
        sprache: 'EN',
      },
      {
        typ:     'buch',
        titel:   'Übersetzung: Miss Sophies Tagebuch (1985)',
        url:     'panda-books.com › miss-sophies-tagebuch',
        auszug:  'Deutsch-Übersetzung der Erzählung von W. J. F. Jenner, Panda Books Peking, 1985 — vergriffen.',
        sprache: 'DE',
      },
    ],
    hinweis:    'Ding Ling gehört zu den besser dokumentierten Frauen dieser Gruppe — und doch: die einzige deutsche Übersetzung ist seit Jahrzehnten vergriffen, und ihre Biografie ist im deutschsprachigen Raum kaum bekannt.',
  },
  {
    id:         'eileen-chang',
    name:       'Eileen Chang',
    chinesisch: '张爱玲',
    stats:      'Mehrere Treffer, mehrsprachig',
    ergebnisse: [
      {
        typ:     'frau',
        titel:   'Eileen Chang – Wikipedia',
        url:     'de.wikipedia.org › wiki › Eileen_Chang',
        auszug:  'Zhang Ailing, bekannt als Eileen Chang (* 30. September 1920 in Shanghai; † 8. September 1995 in Los Angeles) war eine chinesisch-amerikanische Schriftstellerin …',
        sprache: 'DE',
      },
      {
        typ:     'film',
        titel:   'Lust, Caution (2007) – Ang Lee',
        url:     'de.wikipedia.org › wiki › Lust,_Caution',
        auszug:  'Lust, Caution ist ein Erotikthriller von Ang Lee aus dem Jahr 2007, basierend auf der gleichnamigen Kurzgeschichte von Eileen Chang …',
        sprache: 'DE',
      },
      {
        typ:     'frau',
        titel:   'Eileen Chang – Britannica',
        url:     'britannica.com › biography › Eileen-Chang',
        auszug:  'Eileen Chang, original name Zhang Ailing, (born September 30, 1920, Shanghai, China …)',
        sprache: 'EN',
      },
    ],
    hinweis:    'Eileen Chang ist die sichtbarste Frau dieser Gruppe — vor allem weil Ang Lees Verfilmung sie international bekannt machte. Ohne den Film wäre sie auf Deutsch vermutlich genauso unsichtbar wie die anderen.',
  },
];

// ── SIMULIERTE SUCHE RENDERN ──────────────────────────────────────

let aktivesSuchePerson = suchePersonen[0];

function buildSuche() {
  const chipsEl     = document.getElementById('sucheChips');
  const queryEl     = document.getElementById('sucheQuery');
  const statsEl     = document.getElementById('sucheStats');
  const ergebnisseEl = document.getElementById('sucheErgebnisse');
  const hinweisEl   = document.getElementById('sucheHinweis');

  if (!chipsEl) return;

  // ── Chips
  chipsEl.innerHTML = suchePersonen.map(p => `
    <button class="suche-chip ${p.id === aktivesSuchePerson.id ? 'active' : ''}"
            data-id="${p.id}">
      ${p.name}
    </button>
  `).join('');

  chipsEl.querySelectorAll('.suche-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      aktivesSuchePerson = suchePersonen.find(p => p.id === chip.dataset.id);
      renderSuche();
      chipsEl.querySelectorAll('.suche-chip').forEach(c =>
        c.classList.toggle('active', c.dataset.id === chip.dataset.id)
      );
    });
  });

  renderSuche();

  function renderSuche() {
    const p = aktivesSuchePerson;

    // Query bar
    queryEl.textContent = `${p.name} ${p.chinesisch}`;

    // Stats
    statsEl.textContent = p.stats;
    statsEl.className = `suche-stats ${p.ergebnisse.length === 0 ? 'suche-stats--none' : ''}`;

    // Results
    if (p.ergebnisse.length === 0) {
      ergebnisseEl.innerHTML = `
        <div class="suche-keine">
          <div class="suche-keine-icon">∅</div>
          <div class="suche-keine-text">Keine deutschsprachigen Ergebnisse gefunden.</div>
        </div>
      `;
    } else {
      ergebnisseEl.innerHTML = p.ergebnisse.map(e => `
        <div class="suche-result suche-result--${e.typ}">
          <div class="suche-result-header">
            <span class="suche-result-lang suche-result-lang--${e.sprache}">${e.sprache}</span>
            <span class="suche-result-url">${e.url}</span>
          </div>
          <div class="suche-result-titel">${e.titel}</div>
          <div class="suche-result-auszug">… ${e.auszug} …</div>
        </div>
      `).join('');
    }

    // Hinweis
    hinweisEl.textContent = p.hinweis;
  }
}

buildSuche();

HIDDEN SECTION END */


// ── WIKIPEDIA-SEITENAUFRUFE ───────────────────────────────────────

const wikiIntroText = {
  en: () => T('netzwerk_chart_intro_en'),
  zh: () => T('netzwerk_chart_intro_zh'),
};

const wikiNoteText = {
  en: () => T('netzwerk_source_en'),
  zh: () => T('netzwerk_source_zh'),
};

const colorMap = { frau: '#C41E3A', mann: '#1E3A8A' };

function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}
function subMonths(n) {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  return d;
}
function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' Mio.';
  if (n >= 1_000)     return Math.round(n / 1000) + 'k';
  return n.toLocaleString('de-DE');
}

const wikiCache = { en: null, zh: null };

async function ladeWikipediaData(lang) {
  if (wikiCache[lang]) return wikiCache[lang];
  const endDate   = formatDate(new Date());
  const startDate = formatDate(subMonths(6));
  const wiki      = lang === 'zh' ? 'zh.wikipedia' : 'en.wikipedia';

  const ergebnisse = await Promise.allSettled(
    wikipediaVergleich.map(async person => {
      const article = lang === 'zh' ? person.wikiZh : person.wikiEn;
      if (!article) return { ...person, views: null };
      const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/${wiki}/all-access/all-agents/${encodeURIComponent(article)}/monthly/${startDate}/${endDate}`;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        if (!res.ok) return { ...person, views: null };
        const data = await res.json();
        const items = data.items || [];
        if (!items.length) return { ...person, views: null };
        const total = items.reduce((sum, item) => sum + (item.views || 0), 0);
        return { ...person, views: Math.round(total / items.length) };
      } catch {
        clearTimeout(timer);
        return { ...person, views: null };
      }
    })
  );

  const result = ergebnisse
    .filter(r => r.status === 'fulfilled' && r.value.views !== null)
    .map(r => r.value)
    .sort((a, b) => (b.views || 0) - (a.views || 0));

  wikiCache[lang] = result;
  return result;
}

function renderWikiChart(data) {
  const chart = document.getElementById('wikiChart');
  if (!data.length) {
    chart.innerHTML = `<div class="wiki-error">${T('netzwerk_error')}</div>`;
    return;
  }
  const max = data[0].views || 1;

  chart.innerHTML = data.map(person => {
    const pct   = Math.round((person.views / max) * 100);
    const color = colorMap[person.typ] || '#6B7280';
    return `
      <div class="wiki-bar-row ${person.typ === 'mann' ? 'wiki-bar-row--mann' : ''}">
        <div class="wiki-bar-label">
          <span class="dot" style="background:${color}"></span>
          <span class="wiki-bar-name">${person.name}</span>
        </div>
        <div class="wiki-bar-track">
          <div class="wiki-bar-fill typ-${person.typ}" style="width:0%" data-target="${pct}%"></div>
        </div>
        <div class="wiki-bar-value">${formatNumber(person.views)}/Mo.</div>
      </div>
    `;
  }).join('');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    chart.querySelectorAll('.wiki-bar-fill').forEach(el => {
      el.style.width = el.dataset.target;
    });
  }));

  const table = document.createElement('table');
  table.className = 'sr-only';
  table.setAttribute('aria-label', T('netzwerk_chart_title'));
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th scope="col">Name</th><th scope="col">Typ</th><th scope="col">Seitenaufrufe/Monat</th></tr>';
  const tbody = document.createElement('tbody');
  data.forEach(person => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${person.name}</td><td>${person.typ === 'mann' ? 'Mann' : 'Frau'}</td><td>${formatNumber(person.views)}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(thead);
  table.appendChild(tbody);
  chart.appendChild(table);
}

function setWikiLang(lang) {
  document.getElementById('wikiIntro').textContent = wikiIntroText[lang]();
  document.getElementById('wikiNote').innerHTML =
    `${wikiNoteText[lang]()} · Abruf: ${new Date().toLocaleDateString('de-DE', {
      day: '2-digit', month: 'long', year: 'numeric' })}`;

  const chart = document.getElementById('wikiChart');
  if (wikiCache[lang]) { renderWikiChart(wikiCache[lang]); return; }
  chart.innerHTML = `<div class="wiki-loading">${T('netzwerk_loading')}</div>`;
  ladeWikipediaData(lang)
    .then(data => renderWikiChart(data))
    .catch(() => {
      chart.innerHTML = `<div class="wiki-error">${T('netzwerk_fetch_error')}</div>`;
    });
}

document.querySelectorAll('.wiki-lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.wiki-lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setWikiLang(btn.dataset.lang);
  });
});

setWikiLang('en');
