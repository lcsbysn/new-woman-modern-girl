/* ══════════════════════════════════════════════════════════════════
   galerie3d.js  —  Van-Gogh-Museum-style card gallery
   Bold background · Tall portrait cards · Horizontal scroll
   ══════════════════════════════════════════════════════════════════ */

// ── DATA ──────────────────────────────────────────────────────────

const FRAUEN = [
  // ── Revolutionärinnen & Suffragistinnen ──
  { id: 'qiu-jin',       name: 'Qiu Jin',       chinesisch: '秋瑾',   lebensdaten: '1875–1907', rolle: 'Revolutionärin · Dichterin · Feministin' },
  { id: 'he-xiangning',  name: 'He Xiangning',  chinesisch: '何香凝', lebensdaten: '1878–1972', rolle: 'KMT-Linke · Malerin · Politikerin' },
  { id: 'tang-qunying',  name: 'Tang Qunying',  chinesisch: '唐群英', lebensdaten: '1871–1937', rolle: 'Suffragistin · Gründerin des Frauenwahlrechtsbundes' },
  { id: 'xiang-jingyu',  name: 'Xiang Jingyu',  chinesisch: '向警予', lebensdaten: '1895–1928', rolle: 'Erste Leiterin KPCh-Frauenabteilung' },
  // ── Intellektuelle & Schriftstellerinnen ──
  { id: 'chen-hengzhe',  name: 'Chen Hengzhe',  chinesisch: '陈衡哲', lebensdaten: '1890–1976', rolle: 'Erste Professorin Chinas · Pionierin der neuen Literatur' },
  { id: 'ding-ling',     name: 'Ding Ling',     chinesisch: '丁玲',   lebensdaten: '1904–1986', rolle: 'Pionierin feministischer Prosa' },
  { id: 'xiao-hong',     name: 'Xiao Hong',     chinesisch: '萧红',   lebensdaten: '1911–1942', rolle: 'Schriftstellerin · "Weiblicher Lu Xun"' },
  // ── Revolutionärinnen & Aktivistinnen ──
  { id: 'kang-keqing',   name: 'Kang Keqing',   chinesisch: '康克清', lebensdaten: '1911–1992', rolle: 'Generale der Roten Armee · Präsidentin der Frauenföderation' },
  // ── Filmemacherinnen & Schauspielerinnen ──
  { id: 'xie-caizhen',   name: 'Xie Caizhen',   chinesisch: '谢采贞', lebensdaten: 'ca. 1900–?', rolle: 'Erste Filmregisseurin Chinas' },
  { id: 'ruan-lingyu',   name: 'Ruan Lingyu',   chinesisch: '阮玲玉', lebensdaten: '1910–1935', rolle: 'Schauspielerin · Ikone des Stummfilms' },
  { id: 'hu-die',        name: 'Hu Die',         chinesisch: '胡蝶',   lebensdaten: '1908–1989', rolle: 'Erste Filmkönigin Chinas' },
  /* HIDDEN – im Code erhalten, nicht angezeigt:
  { id: 'song-qingling', name: 'Song Qingling', chinesisch: '宋庆龄', lebensdaten: '1893–1981', rolle: 'Witwe Sun Yat-sens · Vizepräsidentin' },
  { id: 'bing-xin',      name: 'Bing Xin',      chinesisch: '冰心',   lebensdaten: '1900–1999', rolle: 'Schriftstellerin · Dichterin' },
  { id: 'cai-chang',     name: 'Cai Chang',     chinesisch: '蔡畅',   lebensdaten: '1900–1990', rolle: 'Kommunistin · Präsidentin ACWF' },
  { id: 'yang-zhihua',   name: 'Yang Zhihua',   chinesisch: '杨之华', lebensdaten: '1901–1973', rolle: 'Kommunistin · KPCh-Frauenabteilung' },
  { id: 'zhang-ruoming', name: 'Zhang Ruoming', chinesisch: '张若名', lebensdaten: '1902–1958', rolle: 'Kommunistin · Literaturprofessorin' },
  { id: 'lin-huiyin',    name: 'Lin Huiyin',    chinesisch: '林徽因', lebensdaten: '1904–1955', rolle: 'Architektin · Dichterin · Salonnière' },
  { id: 'eileen-chang',  name: 'Eileen Chang',  chinesisch: '张爱玲', lebensdaten: '1920–1995', rolle: 'Schriftstellerin · Modernistische Prosa' },
  */
];

// ── CARD CANVAS ───────────────────────────────────────────────────
// Creates a high-res artwork-style portrait card: large calligraphic
// character as the main visual, name + dates at the bottom.

function makeCardCanvas(frau) {
  const W = 504, H = 750;   // 2× rendered, displayed at 252×375 px
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  // ── Background ──
  ctx.fillStyle = '#FDFAF5';
  ctx.fillRect(0, 0, W, H);

  // Thin red top bar
  ctx.fillStyle = '#C41E3A';
  ctx.fillRect(0, 0, W, 7);

  // ── Large Chinese character (the "artwork") ──
  ctx.save();
  ctx.font = '290px "Microsoft YaHei","Noto Sans SC","PingFang SC",serif';
  ctx.fillStyle = '#1a140e';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Position character in the upper ~60% of card
  ctx.fillText(frau.chinesisch[0], W / 2, H * 0.40);
  ctx.restore();

  // ── Given name: all characters after family name, horizontal ──
  const givenName = frau.chinesisch.slice(1);
  if (givenName.length > 0) {
    ctx.save();
    // Scale font slightly smaller for 2-char given names so they fit comfortably
    const givenPx = givenName.length > 1 ? 118 : 130;
    ctx.font = `${givenPx}px "Microsoft YaHei","Noto Sans SC","PingFang SC",serif`;
    ctx.fillStyle = 'rgba(26,20,14,0.18)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(givenName, W / 2, H * 0.66);
    ctx.restore();
  }

  // ── Bottom fade zone ──
  const grad = ctx.createLinearGradient(0, H - 200, 0, H);
  grad.addColorStop(0, 'rgba(253,250,245,0)');
  grad.addColorStop(0.6, 'rgba(253,250,245,0.97)');
  grad.addColorStop(1,   'rgba(253,250,245,1)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, H - 200, W, 200);

  // ── Name ──
  ctx.font = 'bold 36px "Arial","Helvetica Neue",sans-serif';
  ctx.fillStyle = '#1a140e';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(frau.name, 28, H - 66);

  // ── Dates ──
  ctx.font = '500 26px "Arial",sans-serif';
  ctx.fillStyle = 'rgba(26,20,14,0.42)';
  ctx.fillText(frau.lebensdaten, 28, H - 34);

  // Thin red left accent at bottom
  ctx.fillStyle = '#C41E3A';
  ctx.fillRect(0, H - 100, 3, 100);

  return cv;
}

// ── XIANG JINGYU — MUSEUM POSTER CARD ────────────────────────────
// Ported from the design canvas (poster-museal.jsx, oxblood palette).
// Accepts a scale parameter so the lightbox can render it larger.

function makeXiangJingyuPoster(scale) {
  scale = scale || 0.36;
  const W = Math.round(700 * scale);
  const H = Math.round(990 * scale);

  const wrap = document.createElement('div');
  wrap.style.cssText = `width:${W}px;height:${H}px;overflow:hidden;background:#f1ede4;position:relative;flex-shrink:0`;

  const P = { paper:'#f1ede4', ink:'#171311', accent:'#9c2a2a', muted:'#6b5d4f' };

  const inner = document.createElement('div');
  inner.style.cssText = `
    width:700px;height:990px;
    transform:scale(${scale});transform-origin:0 0;
    background:${P.paper};color:${P.ink};
    font-family:'Spectral',Georgia,serif;
    position:relative;overflow:hidden;
  `;

  inner.innerHTML = `
    <!-- hairline frame -->
    <div style="position:absolute;inset:18px;border:0.5px solid ${P.ink};opacity:.32;pointer-events:none"></div>

    <!-- 1. Masthead overline -->
    <div style="position:absolute;top:30px;left:34px;right:34px;display:flex;justify-content:space-between;font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;color:${P.muted}">
      <span>Modern Women · Republican China 1911 – 1949</span>
      <span>Folio № 04 / 11</span>
    </div>

    <!-- Chinese name + right meta -->
    <div style="position:absolute;top:56px;left:34px;right:34px;display:flex;align-items:stretch;justify-content:space-between">
      <div style="font-family:'Noto Serif SC',serif;font-size:80px;line-height:.92;font-weight:600;color:${P.accent};letter-spacing:-.03em">向警予</div>
      <div style="text-align:right;display:flex;flex-direction:column;justify-content:space-between;padding:4px 0">
        <div style="font-size:10px;letter-spacing:.2em;color:${P.muted};text-transform:uppercase">Xiāng Jǐngyǔ</div>
        <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:${P.muted};line-height:1">"to warn and admonish"</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1">1895 — 1928</div>
      </div>
    </div>

    <!-- 2. Title block -->
    <div style="position:absolute;top:158px;left:34px;right:34px">
      <div style="margin-bottom:6px;font-size:9.2px;letter-spacing:.2em;text-transform:uppercase;color:${P.muted}">
        Founding Head · Women's Department · Communist Party of China · 1922
      </div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:500;line-height:1.04;letter-spacing:-.015em;color:${P.ink}">
        The Comrade Who&#160;<span style="font-style:italic;color:${P.accent}">Wrote Herself</span><br>Into the Revolution
      </div>
    </div>

    <!-- 3. Portrait -->
    <div style="position:absolute;top:272px;left:34px;width:196px;height:236px;background:${P.ink};overflow:hidden">
      <img src="images/xiang-portrait.jpg" alt="Xiang Jingyu, c. 1920"
           style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 22%;filter:grayscale(1) contrast(1.05)">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.4) 0%,transparent 25%,transparent 55%,rgba(0,0,0,.78) 100%)"></div>
      <div style="position:absolute;top:10px;left:12px;font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;opacity:.92;color:${P.paper}">Plate I</div>
      <div style="position:absolute;bottom:10px;left:12px;right:12px;font-size:9px;line-height:1.38;font-family:'Cormorant Garamond',serif;font-style:italic;color:${P.paper}">
        Xiang Jingyu, studio portrait, c.&nbsp;1920.<sup style="color:rgba(255,255,255,0.7)">1</sup>
      </div>
    </div>

    <!-- Essay column -->
    <div style="position:absolute;top:272px;left:248px;right:34px;font-size:9.8px;line-height:1.45;text-align:justify;hyphens:auto;color:${P.ink};height:236px;overflow:hidden">
      <p style="margin:0;text-indent:0">
        <span style="font-family:'Cormorant Garamond',serif;font-size:40px;line-height:.82;float:left;margin-right:6px;margin-top:3px;color:${P.accent};font-weight:500">R</span>epublican
        China between 1911 and 1928 produced the philosophical conditions for a Chinese feminism — and lost most of its theorists in the white terror of 1928. Xiang Jingyu is the one whose disappearance hurts the most.<sup style="color:${P.accent}">1</sup>
      </p>
      <p style="margin:.45em 0 0;text-indent:1.4em">
        Born in Xupu, Hunan, she chooses her own name at sixteen — 警予, a verb meaning <em>to warn and admonish</em>. The naming is the first act of the life that follows.<sup style="color:${P.accent}">11</sup> She sails for France in 1919 with the work-study students; in Montargis the next summer she marries Cai Hesen, refusing ceremony, photographed with an open volume of <em>Capital</em> between them.<sup style="color:${P.accent}">12</sup>
      </p>
      <p style="margin:.35em 0 0;text-indent:1.4em">
        She returns in 1922 the first woman in the Central Committee, founding head of the Women's Department — building it from a single desk into the apparatus that gives a million silk-filature, cotton-mill and tobacco workers a strike fund, a literacy class, and <em>Funü zhoubao</em>, the country's most-read women's weekly.<sup style="color:${P.accent}">1,7</sup> She leads the women's contingent of May Thirtieth, 1925.
      </p>
      <p style="margin:.45em 0 0;text-indent:1.4em">
        Refusing both the Confucian daughter-wife-mother and the imported liberal suffragist,<sup style="color:${P.accent}">10</sup> she writes a third position the language did not yet hold: the woman as subject of her own emancipation, and as cadre.<sup style="color:${P.accent}">3</sup> The Kuomintang shoot her at Yuji-wan on May Day 1928, age thirty-three.<sup style="color:${P.accent}">8</sup>
      </p>
    </div>

    <!-- 4. Curatorial note -->
    <div style="position:absolute;top:524px;left:34px;right:34px;display:grid;grid-template-columns:.4fr 1fr;gap:14px;align-items:start;border-top:1.5px solid ${P.accent};border-bottom:.5px solid ${P.ink};padding:8px 0">
      <div>
        <div style="font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:${P.accent};font-weight:600;margin-bottom:3px">Curatorial Note</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;line-height:1.1">Why this gallery,<br>why this woman.</div>
      </div>
      <div style="font-size:8.6px;line-height:1.45;column-count:2;column-gap:14px;text-align:justify">
        The standard syllabus of the Chinese Republic is a syllabus of men — Sun Yat-sen, Lu Xun, Mao, Cai Hesen.<sup style="color:${P.accent}">2</sup> Xiang was their peer and their critic. She <em>theorised</em> rather than only organised; she <em>wrote</em> the founding programme of Marxist feminism in Chinese;<sup style="color:${P.accent}">7</sup> she <em>built</em> the Women's Department from a single desk into the institution that gave a million working women a public voice.<sup style="color:${P.accent}">1</sup> In standing for her, this gallery stands for every woman whose praxis became the footnote to a husband's name.<sup style="color:${P.accent}">9</sup>
      </div>
    </div>

    <!-- 5. Theory rail -->
    <div style="position:absolute;top:632px;left:34px;right:34px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px">
      <div style="border-top:1.5px solid ${P.accent};padding-top:6px">
        <div style="font-size:9.2px;font-weight:600;margin-bottom:1px">Female Subjectivity<sup style="color:${P.accent};margin-left:2px">³</sup></div>
        <div style="font-size:7px;font-family:'Cormorant Garamond',serif;font-style:italic;color:${P.muted};margin-bottom:4px">de Beauvoir, 1949</div>
        <div style="font-size:7.4px;line-height:1.34">Xiang refuses to be the "Other" of the male revolutionary. She writes herself into history first as a name (向警予, self-chosen), then as an editor, then as a strategist.</div>
      </div>
      <div style="border-top:1.5px solid ${P.accent};padding-top:6px">
        <div style="font-size:9.2px;font-weight:600;margin-bottom:1px">Gender Performativity<sup style="color:${P.accent};margin-left:2px">⁴</sup></div>
        <div style="font-size:7px;font-family:'Cormorant Garamond',serif;font-style:italic;color:${P.muted};margin-bottom:4px">Butler, 1990</div>
        <div style="font-size:7.4px;line-height:1.34">The Xiang–Cai "Alliance" subverts marriage: no banquet, no kowtow, a photograph holding Marx instead of a bride-price. Marriage is performed as comradeship.</div>
      </div>
      <div style="border-top:1.5px solid ${P.accent};padding-top:6px">
        <div style="font-size:9.2px;font-weight:600;margin-bottom:1px">Subaltern Voice<sup style="color:${P.accent};margin-left:2px">⁵</sup></div>
        <div style="font-size:7px;font-family:'Cormorant Garamond',serif;font-style:italic;color:${P.muted};margin-bottom:4px">Spivak, 1988</div>
        <div style="font-size:7.4px;line-height:1.34">Funü zhoubao gives illiterate silk-workers a vocabulary for their condition. The Women's Department is built as an apparatus of voicing.</div>
      </div>
      <div style="border-top:1.5px solid ${P.accent};padding-top:6px">
        <div style="font-size:9.2px;font-weight:600;margin-bottom:1px">Class–Gender Synthesis<sup style="color:${P.accent};margin-left:2px">¹</sup></div>
        <div style="font-size:7px;font-family:'Cormorant Garamond',serif;font-style:italic;color:${P.muted};margin-bottom:4px">Gilmartin, 1995</div>
        <div style="font-size:7.4px;line-height:1.34">Against bourgeois suffragism, Xiang argues women's liberation cannot be detached from the labour question — her 1923 essay is the first Marxist–feminist manifesto inside the CCP.</div>
      </div>
    </div>

    <!-- 6. Chronology -->
    <div style="position:absolute;top:738px;left:34px;right:34px">
      <div style="font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;color:${P.muted};margin-bottom:6px">Chronology</div>
      <div style="display:grid;grid-template-columns:repeat(9,1fr);gap:5px">
        ${[
          ['1895','Born Xiang Junxian in Xupu, Hunan.'],
          ['1911','Renames herself Jingyu ("to admonish").'],
          ['1919','Sails for France via Work-Study programme.'],
          ['1920','Marries Cai Hesen in Montargis.'],
          ['1922','First head of CCP Women\'s Department.'],
          ['1923','Founds and edits Funü zhoubao.'],
          ['1925','Leads women\'s contingent, May Thirtieth.'],
          ['1927','Goes underground in Wuhan after KMT split.'],
          ['1928','Executed 1 May, Yuji-wan, Hankou. Age 33.'],
        ].map(([y,e]) => `
          <div style="border-top:1px solid ${P.accent};padding-top:4px">
            <div style="font-family:'Cormorant Garamond',serif;font-size:12px;color:${P.accent};line-height:1;margin-bottom:3px">${y}</div>
            <div style="font-size:6.4px;line-height:1.32">${e}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 7. Sources + wordmark -->
    <div style="position:absolute;top:832px;left:34px;right:34px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;padding-bottom:3px;border-bottom:.5px solid ${P.ink}">
        <div style="font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;color:${P.muted}">Sources</div>
        <div style="font-size:8px;letter-spacing:.2em;text-transform:uppercase;font-weight:600">Gallery of Modern Women</div>
      </div>
      <div style="line-height:1.32;column-count:4;column-gap:10px;font-size:6.5px">
        ${[
          [1,'Gilmartin, C. K. (1995). Engendering the Chinese Revolution. Berkeley: UC Press.'],
          [2,'Wang Zheng (1999). Women in the Chinese Enlightenment. Berkeley: UC Press.'],
          [3,'de Beauvoir, S. (1949). Le Deuxième Sexe. Paris: Gallimard.'],
          [4,'Butler, J. (1990). Gender Trouble. New York: Routledge.'],
          [5,'Spivak, G. C. (1988). "Can the Subaltern Speak?" Urbana: U. of Illinois Press.'],
          [6,'Croll, E. (1978). Feminism and Socialism in China. London: Routledge.'],
          [7,'Xiang Jingyu (1923). Funü zhoubao 婦女週報. Shanghai.'],
          [8,'Smedley, A. (1976). Chinese Destinies. New York: Vanguard Press.'],
          [9,'Hershatter, G. (2007). Women in China\'s Long Twentieth Century. Berkeley.'],
          [10,'Edwards, L. (2008). Gender, Politics, and Democracy. Stanford UP.'],
          [11,'Xiang Jingyu wenji 向警予文集. Changsha: Hunan renmin chubanshe, 1980.'],
          [12,'Cai Hesen wenji 蔡和森文集, vol. 1. Beijing: Renmin chubanshe, 1980.'],
          [13,'Witke, R. (1967). "Mao Tse-tung, Women and Suicide." China Quarterly, 31.'],
          [14,'Lin Chun (2013). The Transformation of Chinese Socialism. Duke UP.'],
        ].map(([n,ref]) => `
          <div style="break-inside:avoid;margin-bottom:1.2px">
            <span style="color:${P.accent};font-weight:700">${n}.</span> ${ref}
          </div>`).join('')}
      </div>
    </div>
  `;

  wrap.appendChild(inner);
  return wrap;
}

// ── XIE CAIZHEN — LETTERBOXD POSTER CARD ─────────────────────────
// Ported from the design canvas (poster-xie.jsx + poster-xie-data.jsx).
// A "director profile" in the visual language of a film-logging site:
// dark UI, green/orange/blue accent dots, star ratings, ghost tiles for
// the lost film. Accepts a scale parameter so the lightbox can enlarge it.

function makeXieCaizhenPoster(scale) {
  scale = scale || 0.36;
  const W = Math.round(700 * scale);
  const H = Math.round(990 * scale);

  const wrap = document.createElement('div');
  wrap.style.cssText = `width:${W}px;height:${H}px;overflow:hidden;background:#14181c;position:relative;flex-shrink:0`;

  const L = {
    bg: '#14181c', surface: '#1b2128', card: '#2c3440',
    line: 'rgba(255,255,255,0.085)', white: '#e9eef2', body: '#9bb0c0',
    muted: '#697b89', green: '#00e054', orange: '#ff8000', blue: '#40bcf4',
  };
  const sans  = "'Hanken Grotesk',system-ui,sans-serif";
  const serif = "'Newsreader',Georgia,serif";
  const mono  = "'JetBrains Mono',monospace";
  const sc    = "'Noto Serif SC',serif";

  // Footnote marker — small raised green superscript.
  const N = (n) => `<sup style="color:${L.green};font-weight:700;font-size:.62em;margin-left:1px;line-height:0;font-family:${sans}">${n}</sup>`;

  // Signature three-dot mark (green · orange · blue).
  const dots = (size, gap) => `
    <span style="display:inline-flex;gap:${gap}px;align-items:center;vertical-align:middle">
      <span style="width:${size}px;height:${size}px;border-radius:50%;background:${L.green};display:inline-block"></span>
      <span style="width:${size}px;height:${size}px;border-radius:50%;background:${L.orange};display:inline-block"></span>
      <span style="width:${size}px;height:${size}px;border-radius:50%;background:${L.blue};display:inline-block"></span>
    </span>`;

  const stars = (size) => `<span style="color:${L.green};font-size:${size}px;letter-spacing:1px;line-height:1">★★★★★</span>`;

  // Role chip — DIR/WRI/LEAD filled, ACT outlined.
  const ROLE_COLORS = { DIR: L.green, WRI: L.orange, LEAD: L.blue, ACT: L.muted };
  const roleChip = (r) => `
    <span style="font-family:${sans};font-size:6.5px;font-weight:700;letter-spacing:.12em;
      color:${r === 'ACT' ? L.body : '#0d1014'};
      background:${r === 'ACT' ? 'transparent' : ROLE_COLORS[r]};
      border:${r === 'ACT' ? `0.5px solid ${L.muted}` : 'none'};
      border-radius:2px;padding:1.5px 3px;line-height:1;display:inline-block">${r}</span>`;

  const sectionLabel = (text, color) =>
    `<div style="font-family:${sans};font-size:8.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${color || L.muted}">${text}</div>`;

  const STATS = [
    { k: '01',     l: 'Film Directed',    c: L.green  },
    { k: '05',     l: 'Films Acted',      c: L.white  },
    { k: '01',     l: 'Screenplay',       c: L.white  },
    { k: '8 days', l: 'Theatre Run',      c: L.white  },
    { k: '00',     l: 'Surviving Prints', c: L.orange },
  ];

  const FILMS = [
    { zh: '弟弟',       en: 'Little Brother',           year: '1924', roles: ['ACT'] },
    { zh: '苦学生',     en: 'The Student’s Hard Life',  year: '1925', roles: ['ACT'] },
    { zh: '孝女复仇记', en: 'Filial Girl Takes Revenge', year: '1925', roles: ['ACT'] },
    { zh: '重返故乡',   en: 'Return to the Hometown',   year: '1925', roles: ['ACT'] },
    { zh: '小公子',     en: 'Little Master',            year: '1925', roles: ['ACT'] },
    { zh: '孤雏悲声',   en: 'An Orphan’s Cry',          year: '1925', roles: ['DIR', 'WRI', 'LEAD'], hero: true },
  ];

  const TL = [
    { y: 'c.1900s', e: 'Born in Hankou; a sister, a father who backs her.' },
    { y: '1920',    e: 'Acts at the Shanghai Shadow Play Company.' },
    { y: '1924',    e: 'First screen credit, Little Brother.' },
    { y: '1925',    e: 'Writes, directs & stars in An Orphan’s Cry.' },
    { y: '1925',    e: 'Premieres 20 Dec at the Victory Theatre.' },
    { y: '1926',    e: 'Vanishes from the press.' },
    { y: '1944',    e: 'A last newspaper notice, then silence.' },
    { y: 'unknown', e: 'Date and place of death unrecorded.' },
  ];

  const LENS = [
    { label: 'Can the Subaltern Speak?', by: 'Spivak, 1988', cite: 8,
      body: 'Xie speaks once, in 1925, and the archive loses the tape. The film is gone, her birth and death dates are gone; what is left is other people’s newspaper paragraphs. The question stays open on purpose.' },
    { label: 'Becoming a Director', by: 'de Beauvoir, 1949', cite: 6,
      body: '“One is not born, but becomes, a woman.” In a single year Xie becomes actress, writer and director — authoring herself into a role the industry had reserved for men, and signing it.' },
    { label: 'Authorship as Performance', by: 'Butler, 1990', cite: 7,
      body: 'Gender is a thing you do until it looks like a thing you are. Xie performs womanhood on screen for hire, then steps behind the camera and performs “the director” — a part no Chinese woman had been cast in.' },
    { label: 'The New Woman on Screen', by: 'Stevens, 2003', cite: 9,
      body: 'Republican cinema kept two women in stock: the New Woman it admired, the Modern Girl it feared. Xie did not only play the type — she got to frame it, deciding for once where the camera stood.' },
  ];

  const SOURCES = [
    [1, 'Women Film Pioneers Project, “Xie Caizhen.” New York: Columbia University Libraries, 2018.'],
    [2, 'Ye, Tan & Zhu, Yun (2012). Historical Dictionary of Chinese Cinema. Plymouth: Scarecrow Press.'],
    [3, 'Shenbao 申報 (Shanghai). Production reports & notices on An Orphan’s Cry, Sept.–Dec. 1925.'],
    [4, 'Hu, Lidan (2018). “A Brief History of Women’s Film-making in Mainland China.” MCLC Resource Center.'],
    [5, 'Da Gong Wan Bao 大公晚報 (1944). Brief notice on Xie Caizhen.'],
    [6, 'de Beauvoir, S. (1949). Le Deuxième Sexe. Paris: Gallimard.'],
    [7, 'Butler, J. (1990). Gender Trouble: Feminism and the Subversion of Identity. New York: Routledge.'],
    [8, 'Spivak, G. C. (1988). “Can the Subaltern Speak?”, in Marxism and the Interpretation of Culture. Urbana: U. of Illinois Press.'],
    [9, 'Stevens, S. E. (2003). “Figuring Modernity: The New Woman and the Modern Girl in Republican China.” NWSA Journal 15(3).'],
  ];

  const inner = document.createElement('div');
  inner.style.cssText = `
    width:700px;height:990px;
    transform:scale(${scale});transform-origin:0 0;
    background:${L.bg};color:${L.body};
    font-family:${sans};
    position:relative;overflow:hidden;
  `;

  inner.innerHTML = `
    <!-- hairline frame -->
    <div style="position:absolute;inset:16px;border:0.5px solid ${L.line};pointer-events:none;border-radius:2px"></div>

    <!-- 1. Masthead -->
    <div style="position:absolute;top:28px;left:34px;right:34px;display:flex;justify-content:space-between;align-items:center;font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:${L.muted}">
      <span>Modern Women · Republican China 1911 – 1949</span>
      <span style="display:flex;align-items:center;gap:10px">${dots(5, 3)} Folio № 09 / 11</span>
    </div>
    <div style="position:absolute;top:50px;left:34px;right:34px;height:0.5px;background:${L.line}"></div>

    <!-- 2. Identity header -->
    <div style="position:absolute;top:64px;left:34px;right:34px;display:flex;gap:18px;align-items:flex-start">
      <div style="width:78px;height:78px;border-radius:50%;flex-shrink:0;overflow:hidden;background:${L.card};border:0.5px solid ${L.line}">
        <img src="images/xie-portrait.png" alt="Xie Caizhen" style="width:100%;height:100%;object-fit:cover;object-position:center 16%">
      </div>
      <div style="flex:1;padding-top:2px">
        <div style="font-size:8px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:${L.green};margin-bottom:5px">Director · Actress · Writer</div>
        <div style="font-family:${serif};font-size:44px;font-weight:500;line-height:.96;color:${L.white};letter-spacing:-.01em">Xie Caizhen</div>
        <div style="font-size:9.5px;color:${L.body};margin-top:7px;letter-spacing:.04em">Xiè Cǎizhēn · <span style="color:${L.muted}">b. Hankou, c.1900s — d. unknown</span></div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-family:${sc};font-size:56px;font-weight:600;line-height:.9;color:${L.green};letter-spacing:.02em">谢采贞</div>
        <div style="font-size:8px;color:${L.muted};letter-spacing:.16em;text-transform:uppercase;margin-top:6px">First woman to direct in China</div>
      </div>
    </div>

    <!-- 3. Stats strip -->
    <div style="position:absolute;top:162px;left:34px;right:34px;display:flex;border-top:0.5px solid ${L.line};border-bottom:0.5px solid ${L.line}">
      ${STATS.map((s, i) => `
        <div style="flex:1;padding:9px 0 8px;text-align:center;border-left:${i ? `0.5px solid ${L.line}` : 'none'}">
          <div style="font-family:${serif};font-size:22px;line-height:1;color:${s.c}">${s.k}</div>
          <div style="font-size:7px;letter-spacing:.14em;text-transform:uppercase;color:${L.muted};margin-top:4px">${s.l}</div>
        </div>`).join('')}
    </div>

    <!-- 4. Hero: the film -->
    <div style="position:absolute;top:222px;left:34px;right:34px;display:flex;gap:18px">
      <div style="width:132px;height:188px;position:relative;overflow:hidden;border:0.5px solid ${L.line};border-radius:3px;flex-shrink:0;background:${L.card}">
        <img src="images/orphans-cry-still.png" alt="Still from An Orphan’s Cry, 1925" style="width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(1.12) contrast(1.04)">
        <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35) 0%,transparent 22%,transparent 52%,rgba(0,0,0,.82) 100%)"></div>
        <div style="position:absolute;top:6px;left:6px;font-size:6.5px;font-weight:700;letter-spacing:.1em;color:#0d1014;background:${L.orange};border-radius:2px;padding:2px 4px">PRINT LOST</div>
        <div style="position:absolute;bottom:7px;left:8px;right:8px;font-family:${mono};font-size:6px;letter-spacing:.06em;color:${L.white};line-height:1.4">Production still · 孤雏悲声 · 1925</div>
      </div>
      <div style="flex:1">
        ${sectionLabel('The Film')}
        <div style="font-family:${serif};font-size:30px;font-weight:500;color:${L.white};line-height:1;margin-top:7px">
          An Orphan’s Cry <span style="font-family:${sc};font-size:20px;color:${L.body}">孤雏悲声</span> <span style="color:${L.muted};font-weight:400;font-size:22px">1925</span>
        </div>
        <div style="font-size:10px;margin-top:8px;color:${L.body}">Directed by <span style="color:${L.blue};font-weight:600">Xie Caizhen</span> · Southern Star Film Co.</div>
        <div style="display:flex;align-items:center;gap:10px;margin-top:9px">
          ${stars(18)}
          <span style="font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:${L.green};font-weight:700">First of its kind</span>
          <span style="display:inline-flex;align-items:flex-end;gap:1.5px;height:16px;margin-left:2px">
            ${[4, 6, 5, 9, 14, 16].map((h) => `<span style="width:3px;height:${h}px;background:${L.green};opacity:.55;display:inline-block"></span>`).join('')}
          </span>
        </div>
        <div style="font-size:9.5px;line-height:1.45;color:${L.body};margin-top:10px;max-width:360px">
          Two orphans, a dead father framed by a stepmother, an estranged fortune — a family melodrama in the key of 1925, and the only film its studio would ever make.${N(2)}
        </div>
        <div style="display:flex;gap:6px;margin-top:11px;flex-wrap:wrap">
          ${['Silent', 'Melodrama', 'Family', 'Shanghai'].map((t) => `<span style="font-size:7.5px;letter-spacing:.06em;color:${L.body};background:${L.card};border:0.5px solid ${L.line};border-radius:3px;padding:3px 7px">${t}</span>`).join('')}
          <span style="font-size:7.5px;font-weight:700;letter-spacing:.1em;color:#0d1014;background:${L.orange};border-radius:3px;padding:3px 7px">LOST FILM</span>
        </div>
        <div style="font-size:8px;color:${L.muted};margin-top:10px;letter-spacing:.04em">Premiered 20 Dec 1925 · Victory Theatre, Shanghai · held eight days when three was the norm.${N(1)}</div>
      </div>
    </div>

    <!-- 5. The review (biography) -->
    <div style="position:absolute;top:430px;left:34px;right:34px">
      <div style="display:flex;align-items:center;gap:10px;padding-bottom:7px;border-bottom:0.5px solid ${L.line}">
        ${stars(12)}
        <span style="font-size:9px;color:${L.body}">Review by <span style="color:${L.white};font-weight:700">Gallery of Modern Women</span></span>
        <span style="font-size:8px;color:${L.muted};letter-spacing:.1em;text-transform:uppercase">· Watched 20 Dec 1925</span>
        <span style="margin-left:auto;font-size:9px;color:${L.orange}">♥ <span style="color:${L.body}">1,925 likes</span></span>
      </div>
      <div style="margin-top:9px;column-count:2;column-gap:22px;font-size:9.1px;line-height:1.5;color:${L.body};text-align:justify;hyphens:auto">
        <p style="margin:0">
          <span style="font-family:${serif};font-size:40px;line-height:.8;float:left;margin-right:6px;margin-top:3px;color:${L.green};font-weight:500">H</span>ere is a film you will never see. <em>An Orphan’s Cry</em> screens once, in the winter of 1925, and then the only print walks out of history and does not come back.${N(4)} What survives is a director and a fact: Xie Caizhen is the first woman in China to sit in the chair.${N(1)}
        </p>
        <p style="margin:.5em 0 0">
          She arrives the usual way — as a face. She acts for Dan Duyu at the Shanghai Shadow Play Company: the daughter, the sister, the filial girl who takes revenge, the parts a young actress is handed.${N(1)} Then, in a single astonishing year, she writes a melodrama, casts herself as the lead, and directs it for a company that will make exactly one film and fold.${N(2)}
        </p>
        <p style="margin:.5em 0 0">
          By every account it is a hit. It plays eight days when three is the norm; a fifth of the house is foreign; people come, the papers say, because the director is a woman and the story is complicated.${N(3)} For a few weeks in Shanghai, “directed by” and a woman’s name share a poster, and the city cannot get over it.
        </p>
        <p style="margin:.5em 0 0">
          And then nothing. After 1926 her name drops out of the press; it surfaces once in 1944 and is gone.${N(5)} We do not know when she was born or when she died. The film is lost, which means the thing she made can’t be graded — only the act of making it. Five stars for the act. The rest is an empty frame, and that is the review.
        </p>
      </div>
    </div>

    <!-- 6. Through the lens (critical cards) -->
    <div style="position:absolute;top:612px;left:34px;right:34px">
      ${sectionLabel('Through the Lens')}
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:8px">
        ${LENS.map((t) => `
          <div style="border-top:1.5px solid ${L.green};padding-top:6px">
            <div style="font-size:8.6px;font-weight:700;color:${L.white};line-height:1.2;margin-bottom:2px">${t.label}${N(t.cite)}</div>
            <div style="font-family:${serif};font-style:italic;font-size:8px;color:${L.muted};margin-bottom:5px">${t.by}</div>
            <div style="font-size:7.2px;line-height:1.42;color:${L.body};text-align:justify;hyphens:auto">${t.body}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 7. Filmography -->
    <div style="position:absolute;top:738px;left:34px;right:34px">
      ${sectionLabel('Filmography · 1924 – 1925')}
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-top:7px">
        ${FILMS.map((f) => `
          <div>
            <div style="position:relative;height:50px;border-radius:3px;overflow:hidden;border:${f.hero ? `1px solid ${L.green}` : `0.5px solid ${L.line}`};background:repeating-linear-gradient(135deg,${L.surface} 0 7px,${L.card} 7px 14px);display:flex;align-items:center;justify-content:center">
              <span style="font-family:${sc};font-size:${f.hero ? 15 : 13}px;color:${f.hero ? L.green : L.body};text-align:center;line-height:1.05;padding:4px">${f.zh}</span>
            </div>
            <div style="font-size:7px;color:${L.muted};margin-top:4px;letter-spacing:.04em">${f.year}</div>
            <div style="font-size:7.3px;color:${L.body};line-height:1.12;margin-top:1px;min-height:14px">${f.en}</div>
            <div style="display:flex;gap:3px;margin-top:3px;flex-wrap:wrap">${f.roles.map((r) => roleChip(r)).join('')}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 8. Life timeline -->
    <div style="position:absolute;top:852px;left:34px;right:34px">
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:6px;border-top:0.5px solid ${L.line};padding-top:7px">
        ${TL.map((t) => `
          <div>
            <div style="font-family:${serif};font-size:11px;color:${L.green};line-height:1;margin-bottom:3px">${t.y}</div>
            <div style="font-size:6.3px;line-height:1.3;color:${L.body}">${t.e}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- 9. Sources + wordmark -->
    <div style="position:absolute;top:896px;left:34px;right:34px">
      <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:4px;border-bottom:0.5px solid ${L.line}">
        ${sectionLabel('Sources')}
        <span style="display:flex;align-items:center;gap:8px">
          ${dots(5, 3)}
          <span style="font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:${L.white};font-weight:700">Gallery of Modern Women</span>
        </span>
      </div>
      <div style="column-count:4;column-gap:12px;margin-top:4px;font-size:6px;line-height:1.28;color:${L.muted}">
        ${SOURCES.map(([n, ref]) => `
          <div style="break-inside:avoid;margin-bottom:1px">
            <span style="color:${L.green};font-weight:700">${n}.</span> ${ref}
          </div>`).join('')}
      </div>
    </div>
  `;

  wrap.appendChild(inner);
  return wrap;
}

// ── BUILD SECTIONS ────────────────────────────────────────────────
// Groups the 12 women into themed sections, each with its own
// bold background color — the core Van Gogh Museum design pattern.

// FRAUEN-Reihenfolge: [0]qiu-jin, [1]he-xiangning, [2]xiang-jingyu, [3]tang-qunying,
//                    [4]ding-ling, [5]chen-hengzhe, [6]xiao-hong, [7]kang-keqing,
//                    [8]xie-caizhen, [9]ruan-lingyu, [10]hu-die

const SECTIONS = [
  {
    eyebrow:   () => T('galerie_eyebrow_rev'),
    title:     () => T('galerie_title_rev'),
    desc:      () => T('galerie_desc_rev'),
    link:      { href: 'sichtbarkeit.html', label: () => T('galerie_link_memory') },
    bg:        '#C41E3A',
    indices:   [0, 1, 2, 3, 7], // Qiu Jin, He Xiangning, Xiang Jingyu, Tang Qunying, Kang Keqing
  },
  {
    eyebrow:   () => T('galerie_eyebrow_intel'),
    title:     () => T('galerie_title_intel'),
    desc:      () => T('galerie_desc_intel'),
    link:      { href: 'quiz.html', label: () => T('galerie_link_quiz') },
    bg:        '#1A3020',
    indices:   [4, 5, 6], // Ding Ling, Chen Hengzhe, Xiao Hong
  },
  {
    eyebrow:   () => T('galerie_eyebrow_film'),
    title:     () => T('galerie_title_film'),
    desc:      () => T('galerie_desc_film'),
    link:      { href: 'index.html#entdecken', label: () => T('galerie_link_overview') },
    bg:        '#1A0D2E',
    indices:   [8, 9, 10], // Xie Caizhen, Ruan Lingyu, Hu Die
  },
];

function buildGallery() {
  const main = document.getElementById('gMain');

  SECTIONS.forEach(sec => {
    // ── Section wrapper ──
    const section = document.createElement('section');
    section.className = 'g-section';
    section.dataset.bg = sec.bg;

    // ── Left text panel ──
    const left = document.createElement('div');
    left.className = 'g-section-left';
    left.innerHTML = `
      <p class="g-section-eyebrow">${sec.eyebrow()}</p>
      <h2 class="g-section-title">${sec.title()}</h2>
      <p class="g-section-desc">${sec.desc()}</p>
      <a href="${sec.link.href}" class="g-section-link">${sec.link.label()} →</a>
    `;

    // ── Cards scroll area ──
    const cards = document.createElement('div');
    cards.className = 'g-cards';

    sec.indices.forEach(idx => {
      const frau = FRAUEN[idx];

      // Slot wraps card + label below
      const slot = document.createElement('div');
      slot.className = 'g-card-slot';

      const card  = document.createElement('div');
      card.className = 'g-card';
      card.id    = `g-card-${frau.id}`;
      card.title = frau.name;

      if (frau.id === 'xiang-jingyu') {
        card.style.overflow = 'hidden';
        card.style.height   = 'auto';   // poster is 356 px tall, not 375
        card.appendChild(makeXiangJingyuPoster());
      } else if (frau.id === 'xie-caizhen') {
        card.style.overflow = 'hidden';
        card.style.height   = 'auto';
        card.appendChild(makeXieCaizhenPoster());
      } else {
        const canvas = makeCardCanvas(frau);
        canvas.style.display = 'block';

        const overlay = document.createElement('div');
        overlay.className = 'g-card-overlay';
        overlay.innerHTML = `
          <p class="g-card-overlay-chinese">${frau.chinesisch}</p>
          <p class="g-card-overlay-name">${frau.name}</p>
          <p class="g-card-overlay-cta">${T('galerie_card_cta')}</p>
        `;

        card.appendChild(canvas);
        card.appendChild(overlay);
      }

      // Label below the card tile
      const label = document.createElement('div');
      label.className = 'g-card-label';
      label.innerHTML = `
        <span class="g-card-label-name">${frau.name}</span>
        <span class="g-card-label-dates">${frau.lebensdaten}</span>
      `;

      slot.appendChild(card);
      slot.appendChild(label);

      slot.addEventListener('click', () => {
        // Ignore if the user was dragging the card row
        const cardsEl = slot.closest('.g-cards');
        if (cardsEl && cardsEl._didDrag) return;
        openLightbox(frau);
      });

      cards.appendChild(slot);
    });

    // Scroll hint on first section only
    if (sec === SECTIONS[0]) {
      const hint = document.createElement('div');
      hint.className = 'g-scroll-hint';
      hint.innerHTML = T('galerie_scroll_hint');
      section.style.position = 'relative';
      section.appendChild(hint);
    }

    section.appendChild(left);
    section.appendChild(cards);
    main.appendChild(section);
  });

  // ── Outro ──
  const outro = document.createElement('section');
  outro.className = 'g-outro';
  outro.dataset.bg = '#C41E3A';
  outro.innerHTML = `
    <p class="g-outro-eyebrow">${T('galerie_outro_eyebrow')}</p>
    <h2 class="g-outro-title">${T('galerie_outro_title')}</h2>
    <div class="g-outro-links">
      <a href="index.html" class="g-outro-link">${T('galerie_outro_back')}</a>
      <a href="sichtbarkeit.html" class="g-outro-link">${T('galerie_link_memory')}</a>
      <a href="quiz.html" class="g-outro-link">${T('galerie_link_quiz')}</a>
      <a href="impressum.html" class="g-outro-link">${T('impressum_link')}</a>
    </div>
  `;
  main.appendChild(outro);
}

// ── INTRO ─────────────────────────────────────────────────────────

function setupIntro() {
  const intro = document.getElementById('gIntro');
  const btn   = document.getElementById('gIntroBtn');
  if (!intro || !btn) return;

  btn.addEventListener('click', () => {
    try { sessionStorage.setItem('galerie_skip_intro', '1'); } catch (e) {}
    intro.classList.add('hidden');
    setTimeout(() => intro.remove(), 950);
  });
}

// ── SCROLL COUNTER ────────────────────────────────────────────────
// Updates "1 / 3" section counter as you scroll between sections.

function setupCounter() {
  const count    = document.getElementById('gCount');
  const sections = document.querySelectorAll('.g-section');
  if (!count || !sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = [...sections].indexOf(e.target) + 1;
        count.textContent = `${idx} / ${sections.length}`;
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => obs.observe(s));
}

// ── DRAG-TO-SCROLL (desktop UX) ───────────────────────────────────
// Lets users click-drag the card row left/right, like a slider.
// Tracks _didDrag so a drag doesn't accidentally open the lightbox.

function setupDrag() {
  document.querySelectorAll('.g-cards').forEach(el => {
    let isDown = false, startX = 0, scrollLeft = 0;

    el.addEventListener('mousedown', e => {
      isDown      = true;
      el._didDrag = false;
      startX      = e.pageX - el.offsetLeft;
      scrollLeft  = el.scrollLeft;
      el.style.cursor = 'grabbing';
    });
    el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = ''; });
    el.addEventListener('mouseup',    () => { isDown = false; el.style.cursor = ''; });
    el.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.4;
      if (Math.abs(walk) > 5) el._didDrag = true;
      el.scrollLeft = scrollLeft - walk;
    });
  });
}

// ── SMOOTH BACKGROUND COLOR TRANSITION ───────────────────────────
// As the user scrolls between sections the body background color
// continuously interpolates between each section's brand color.

function setupColorTransition() {
  // Collect sections in DOM order (includes g-outro)
  const els = [...document.querySelectorAll('[data-bg]')];

  // Parse hex → [r,g,b]
  function toRgb(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }

  // Linear interpolate between two hex colors
  function lerpColor(c1, c2, t) {
    const [r1,g1,b1] = toRgb(c1);
    const [r2,g2,b2] = toRgb(c2);
    return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`;
  }

  const colors = els.map(el => el.dataset.bg);

  // Pre-compute document-relative top positions after layout
  let tops = [];
  function recalc() {
    tops = els.map(el => el.getBoundingClientRect().top + window.scrollY);
  }
  setTimeout(recalc, 80);
  window.addEventListener('resize', recalc, { passive: true });

  let ticking = false;

  function update() {
    const sy = window.scrollY;
    for (let i = 0; i < tops.length; i++) {
      const secTop    = tops[i];
      const secBottom = i + 1 < tops.length ? tops[i + 1] : secTop + els[i].offsetHeight;
      const secH      = secBottom - secTop;

      if (sy >= secTop && sy < secBottom) {
        const progress = (sy - secTop) / secH;
        // Begin blending in the last 40 % of each section
        const t  = Math.max(0, Math.min(1, (progress - 0.60) / 0.40));
        const c1 = colors[i];
        const c2 = colors[Math.min(i + 1, colors.length - 1)];
        document.body.style.background = lerpColor(c1, c2, t);
        return;
      }
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  update();
}

// ── LIGHTBOX ──────────────────────────────────────────────────────

let lbScale = 1, lbTargetScale = 1, lbPanX = 0, lbPanY = 0;
let lbIsPanning = false, lbPanStart = {x:0,y:0}, lbPanOrigin = {x:0,y:0};
let lbLastTouchDist = 0, lbTouchStart = null;
let lbImageInner = null;  // the element that receives transform
let lbZoomRaf = null;

function applyLbZoom() {
  if (!lbImageInner) return;
  lbImageInner.style.transform = `translate(${lbPanX}px,${lbPanY}px) scale(${lbScale})`;
}

function startLbZoomAnim() {
  if (lbZoomRaf) return;
  function step() {
    const diff = lbTargetScale - lbScale;
    const atMin = lbTargetScale <= 1;
    const panSettled = Math.abs(lbPanX) < 0.5 && Math.abs(lbPanY) < 0.5;
    if (Math.abs(diff) > 0.0005 || (atMin && !panSettled)) {
      lbScale += diff * 0.2;
      if (atMin) {
        lbPanX += (0 - lbPanX) * 0.2;
        lbPanY += (0 - lbPanY) * 0.2;
      }
      applyLbZoom();
      lbZoomRaf = requestAnimationFrame(step);
    } else {
      lbScale = lbTargetScale;
      if (atMin) { lbPanX = 0; lbPanY = 0; }
      applyLbZoom();
      lbZoomRaf = null;
    }
  }
  lbZoomRaf = requestAnimationFrame(step);
}

function setupLightbox() {
  const lb = document.createElement('div');
  lb.id = 'g-lightbox';
  lb.innerHTML = `
    <div class="g-lb-backdrop"></div>
    <div class="g-lb-panel">
      <button class="g-lb-close" aria-label="${T('lb_close')}">✕</button>
      <div class="g-lb-image-wrap">
        <!-- canvas / poster injected per open() call -->
      </div>
      <div class="g-lb-side">
        <div class="g-lb-info">
          <p class="g-lb-bekannt">${T('galerie_lb_bekannt')}</p>
          <p class="g-lb-chinese"></p>
          <h2 class="g-lb-name"></h2>
          <p class="g-lb-dates"></p>
        </div>
        <div class="g-lb-actions">
          <a class="g-lb-btn-profile" href="#">${T('galerie_lb_to_profile')}</a>
          <button class="g-lb-btn-back">${T('galerie_lb_back')}</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(lb);

  const backdrop  = lb.querySelector('.g-lb-backdrop');
  const closeBtn  = lb.querySelector('.g-lb-close');
  const backBtn   = lb.querySelector('.g-lb-btn-back');
  const imageWrap = lb.querySelector('.g-lb-image-wrap');

  backdrop.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  backBtn.addEventListener('click',  closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Scroll-to-zoom / two-finger pan ──
  imageWrap.addEventListener('wheel', e => {
    e.preventDefault();
    if (e.ctrlKey) {
      // Pinch-to-zoom (trackpad pinch or Ctrl+scroll) — zoom toward cursor
      let d = e.deltaY;
      if (e.deltaMode === 1) d *= 16;
      if (e.deltaMode === 2) d *= 300;
      const factor = d > 0 ? 0.009 : 0.005;
      const newTarget = Math.max(1, Math.min(8, lbTargetScale * Math.exp(-d * factor)));
      const ratio = newTarget / lbTargetScale;
      if (newTarget > 1) {
        const rect = imageWrap.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const ox = imageWrap.offsetWidth  / 2;
        const oy = imageWrap.offsetHeight / 2;
        lbPanX = (cx - ox) * (1 - ratio) + lbPanX * ratio;
        lbPanY = (cy - oy) * (1 - ratio) + lbPanY * ratio;
      }
      lbTargetScale = newTarget;
      startLbZoomAnim();
    } else {
      // Two-finger pan (trackpad scroll)
      let dx = e.deltaX, dy = e.deltaY;
      if (e.deltaMode === 1) { dx *= 16; dy *= 16; }
      if (e.deltaMode === 2) { dx *= 300; dy *= 300; }
      lbPanX -= dx;
      lbPanY -= dy;
      applyLbZoom();
    }
  }, { passive: false });

  // ── Mouse pan ──
  imageWrap.addEventListener('mousedown', e => {
    e.stopPropagation();
    lbIsPanning = true;
    lbPanStart  = { x: e.clientX, y: e.clientY };
    lbPanOrigin = { x: lbPanX,    y: lbPanY };
    imageWrap.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', e => {
    if (!lbIsPanning) return;
    lbPanX = lbPanOrigin.x + (e.clientX - lbPanStart.x);
    lbPanY = lbPanOrigin.y + (e.clientY - lbPanStart.y);
    applyLbZoom();
  });
  document.addEventListener('mouseup', () => {
    if (!lbIsPanning) return;
    lbIsPanning = false;
    imageWrap.style.cursor = 'grab';
  });

  // ── Touch: pinch-to-zoom + single-finger pan ──
  imageWrap.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      lbLastTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lbTouchStart = null;
    } else if (e.touches.length === 1) {
      lbTouchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, px: lbPanX, py: lbPanY };
    }
  }, { passive: true });

  imageWrap.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lbScale = Math.max(1, Math.min(8, lbScale * (dist / lbLastTouchDist)));
      lbLastTouchDist = dist;
      applyLbZoom();
    } else if (e.touches.length === 1 && lbTouchStart) {
      lbPanX = lbTouchStart.px + (e.touches[0].clientX - lbTouchStart.x);
      lbPanY = lbTouchStart.py + (e.touches[0].clientY - lbTouchStart.y);
      applyLbZoom();
    }
  }, { passive: false });
}

function openLightbox(frau) {
  const lb        = document.getElementById('g-lightbox');
  const imageWrap = lb.querySelector('.g-lb-image-wrap');

  // Reset zoom / pan state
  if (lbZoomRaf) { cancelAnimationFrame(lbZoomRaf); lbZoomRaf = null; }
  lbScale = 1; lbTargetScale = 1; lbPanX = 0; lbPanY = 0;
  imageWrap.innerHTML = '';
  imageWrap.style.cursor = 'grab';

  // Inner element that receives the zoom/pan transform
  const inner = document.createElement('div');
  inner.className = 'g-lb-image-inner';
  lbImageInner = inner;

  // Mobile: image fills nearly full width; leave ~120px for the compact info strip below
  const isMobile = window.innerWidth <= 700;
  const avW = Math.floor(window.innerWidth  * (isMobile ? 0.94 : 0.55));
  const avH = isMobile
    ? Math.max(200, window.innerHeight - 120)
    : Math.floor(window.innerHeight * 0.88);

  if (frau.id === 'xiang-jingyu' || frau.id === 'xie-caizhen') {
    // Fit the 700×990 poster into avW × avH (whichever axis is the bottleneck)
    const scaleByH  = avH / 990;
    const scaleByW  = avW / 700;
    const dynScale  = parseFloat(Math.min(scaleByH, scaleByW).toFixed(3));
    const poster    = frau.id === 'xiang-jingyu'
      ? makeXiangJingyuPoster(dynScale)
      : makeXieCaizhenPoster(dynScale);
    inner.appendChild(poster);
    imageWrap.style.width  = Math.round(700 * dynScale) + 'px';
    imageWrap.style.height = Math.round(990 * dynScale) + 'px';
  } else {
    // Fit the 504×750 canvas into avW × avH
    const byH  = avH / 750;
    const byW  = avW / 504;
    const ratio = Math.min(byH, byW, 1);        // never upscale beyond native
    const maxH  = Math.round(750 * ratio);
    const maxW  = Math.round(504 * ratio);
    const cv    = makeCardCanvas(frau);
    cv.style.cssText = `display:block;width:${maxW}px;height:${maxH}px;border-radius:14px;pointer-events:none`;
    inner.appendChild(cv);
    imageWrap.style.width  = maxW + 'px';
    imageWrap.style.height = maxH + 'px';
  }

  imageWrap.appendChild(inner);
  applyLbZoom();

  // Populate info panel
  lb.querySelector('.g-lb-chinese').textContent = frau.chinesisch;
  lb.querySelector('.g-lb-name').textContent    = frau.name;
  lb.querySelector('.g-lb-dates').textContent   = frau.lebensdaten;
  lb.querySelector('.g-lb-btn-profile').href    = `frau.html?id=${frau.id}`;

  lb.classList.add('open');
  document.body.classList.add('g-lb-open');
}

function closeLightbox() {
  const lb = document.getElementById('g-lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (lbZoomRaf) { cancelAnimationFrame(lbZoomRaf); lbZoomRaf = null; }
  lb.classList.remove('open');
  document.body.classList.remove('g-lb-open');
  lbImageInner = null;
}

// ── DEEP LINK ─────────────────────────────────────────────────────
// If the page is opened with ?frau=<id> (e.g. from frau.html's nav),
// skip the intro entirely and scroll directly to that woman's card.

function handleDeepLink() {
  const params = new URLSearchParams(location.search);
  const frauId = params.get('frau');
  if (!frauId) return;

  // Remove intro without animation so the gallery is immediately visible
  const intro = document.getElementById('gIntro');
  if (intro) intro.remove();

  // Scroll to the card after a brief paint delay
  setTimeout(() => {
    const card = document.getElementById(`g-card-${frauId}`);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 150);
}

// ── LANG-SWITCH STATE PRESERVATION ───────────────────────────────
// When the user switches language, save whether the intro was already
// dismissed so the reload restores the gallery view, not the intro screen.

document.addEventListener('beforelangchange', function () {
  var intro = document.getElementById('gIntro');
  if (!intro || intro.classList.contains('hidden')) {
    try { sessionStorage.setItem('galerie_skip_intro', '1'); } catch (e) {}
  } else {
    try { sessionStorage.removeItem('galerie_skip_intro'); } catch (e) {}
  }
});

// ── INIT ──────────────────────────────────────────────────────────

// Skip intro if we're reloading due to a language switch and the
// user had already dismissed it.
if (sessionStorage.getItem('galerie_skip_intro')) {
  sessionStorage.removeItem('galerie_skip_intro');
  var _introEl = document.getElementById('gIntro');
  if (_introEl) _introEl.remove();
}

buildGallery();
setupIntro();
setupLightbox();
handleDeepLink();
setupCounter();
setupDrag();
setupColorTransition();
