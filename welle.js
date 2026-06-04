/* ══════════════════════════════════════════════════════════════════
   welle.js  —  "Deine Ausstellung" canvas visualization
   ══════════════════════════════════════════════════════════════════ */

(function () {

  // ── DATA ────────────────────────────────────────────────────────

  const FRAUEN = [
    { id: 'qiu-jin',       name: 'Qiu Jin',       chinesisch: '秋瑾'   },
    { id: 'he-xiangning',  name: 'He Xiangning',  chinesisch: '何香凝' },
    { id: 'xiang-jingyu',  name: 'Xiang Jingyu',  chinesisch: '向警予' },
    { id: 'tang-qunying',  name: 'Tang Qunying',  chinesisch: '唐群英' },
    { id: 'ding-ling',     name: 'Ding Ling',     chinesisch: '丁玲'   },
    { id: 'chen-hengzhe',  name: 'Chen Hengzhe',  chinesisch: '陈衡哲' },
    { id: 'xiao-hong',     name: 'Xiao Hong',     chinesisch: '萧红'   },
    { id: 'kang-keqing',   name: 'Kang Keqing',   chinesisch: '康克清' },
    { id: 'xie-caizhen',   name: 'Xie Caizhen',   chinesisch: '谢采真' },
    { id: 'ruan-lingyu',   name: 'Ruan Lingyu',   chinesisch: '阮玲玉' },
    { id: 'hu-die',        name: 'Hu Die',        chinesisch: '胡蝶'   },
    /* HIDDEN – im Code erhalten, nicht angezeigt:
    { id: 'song-qingling', name: 'Song Qingling', chinesisch: '宋庆龄' },
    { id: 'bing-xin',      name: 'Bing Xin',      chinesisch: '冰心'   },
    { id: 'cai-chang',     name: 'Cai Chang',     chinesisch: '蔡畅'   },
    { id: 'yang-zhihua',   name: 'Yang Zhihua',   chinesisch: '杨之华' },
    { id: 'zhang-ruoming', name: 'Zhang Ruoming', chinesisch: '张若名' },
    { id: 'lin-huiyin',    name: 'Lin Huiyin',    chinesisch: '林徽因' },
    { id: 'eileen-chang',  name: 'Eileen Chang',  chinesisch: '张爱玲' },
    */
  ];

  // Characters for the "countless unknowns" flood shown after all 15 are found
  const FLOOD_CHARS = '女性历史记忆政治作家革命者书写自由解放思想文学艺术精神力量时代改变声音沉默抗争荣耀痛苦希望梦想平等权利战斗勇气坚持信念牺牲理想民主光明未来铭记永恒无名遗忘尘埃岁月';

  // ── CANVAS SETUP ────────────────────────────────────────────────

  const canvas  = document.getElementById('welleCanvas');
  const counter = document.getElementById('welleCounter');
  const hinweis = document.getElementById('welleHinweis');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;

  // ── HERO STATE ───────────────────────────────────────────────────

  const heroes = FRAUEN.map(f => ({
    frau:    f,
    x: 0, y: 0,
    visible: false,
    fadeIn:  0,
  }));

  function layout() {
    const cols = 4;
    const rows = Math.ceil(heroes.length / cols);
    const hdr     = canvas.parentElement && canvas.parentElement.querySelector('.welle-header');
    const areaTop = hdr
      ? hdr.offsetTop + hdr.offsetHeight + 32
      : H * 0.32;
    const areaH   = Math.max(300, Math.min(460, W * 0.42));
    const padX    = W * 0.10;
    const padY    = areaH * 0.12;
    const cellW   = (W - padX * 2) / (cols - 1);
    const cellH   = (areaH - padY * 2) / Math.max(1, rows - 1);
    const lastRowCount = heroes.length % cols || cols;
    heroes.forEach((h, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const isLastRow = row === rows - 1;
      const rowOffsetX = (isLastRow && lastRowCount < cols)
        ? (cols - lastRowCount) * cellW / 2 : 0;
      h.x = padX + rowOffsetX + col * cellW;
      h.y = areaTop + padY + row * cellH;
    });
  }

  // ── BACKGROUND PARTICLES ─────────────────────────────────────────
  //
  // The background contains ONLY the name characters of undiscovered women.
  // Each character appears COPIES_PER_CHAR times. Every particle carries a
  // frauId tag. When a quiz is passed, ONLY that woman's tagged characters
  // fly to their display positions; all others keep drifting.

  const COPIES_PER_CHAR = 3;

  let bgParticles  = [];
  let floodStarted = false;

  function buildBgParticles() {
    const flood = bgParticles.filter(p => p.frauId === '__unknown__');
    bgParticles = [...flood];
    if (flood.length > 0) return; // already in flood mode

    FRAUEN.forEach(frau => {
      // Include undiscovered women, PLUS the pending-animation woman even if
      // technically already passed — her characters must exist in the
      // background so they can fly to form her name.
      if (isPassed(frau.id) && frau.id !== pendingRippleId) return;
      [...frau.chinesisch].forEach(char => {
        for (let k = 0; k < COPIES_PER_CHAR; k++) {
          bgParticles.push({
            x:      Math.random() * W,
            y:      Math.random() * H,
            char,
            frauId: frau.id,
            size:   13 + Math.random() * 9,
            alpha:  0.06 + Math.random() * 0.07,
            drift:  (Math.random() - 0.5) * 0.18,
            // swarm fields added by startSwarm():
            // origX, origY, tx, ty, origSize, targetSize,
            // swarmDelay, origAlpha, isSwarming
          });
        }
      });
    });
  }

  function buildUnknownFlood() {
    const count = Math.max(90, Math.floor((W * H) / 1600));
    bgParticles = Array.from({ length: count }, () => ({
      x:           Math.random() * W,
      y:           Math.random() * H,
      char:        FLOOD_CHARS[Math.floor(Math.random() * FLOOD_CHARS.length)],
      frauId:      '__unknown__',
      size:        10 + Math.random() * 13,
      alpha:       0,
      targetAlpha: 0.04 + Math.random() * 0.09,
      drift:       (Math.random() - 0.5) * 0.18,
      fadeDelay:   Math.floor(Math.random() * 320),
    }));
  }

  // ── SWARM ────────────────────────────────────────────────────────
  //
  // The woman's own characters fly as legible glyphs from their current
  // scattered positions to the exact display coordinates of her name.
  // They grow from their background size to the hero font size, brighten
  // from pale cream to crimson, and land perfectly at their final position.
  // At swarm end the hero snaps to full opacity — seamless handoff.

  let swarm = null;
  // { heroId: string, t: 0→1 }

  const SWARM_FRAMES = 260; // ≈ 4.3 s at 60 fps — unhurried, deliberate

  function startSwarm(heroId) {
    if (swarm) return;
    const hero = heroes.find(h => h.frau.id === heroId);
    if (!hero) return;

    const namePx  = Math.round(W / 34);
    const nameY   = hero.y - 4;         // matches hero rendering (y - 4 offset)
    const chars   = [...hero.frau.chinesisch];
    const spacing = namePx * 1.05;
    const totalW  = spacing * (chars.length - 1);

    // One target position per distinct character in the name
    const charTarget = {};
    chars.forEach((ch, ci) => {
      charTarget[ch] = {
        x: hero.x - totalW * 0.5 + ci * spacing,
        y: nameY,
      };
    });

    // Tag exactly ONE particle per distinct character to swarm; extras stay as background
    const charAssigned = {};
    bgParticles.forEach(p => {
      if (p.frauId !== heroId) return;
      const tgt = charTarget[p.char];
      if (!tgt || charAssigned[p.char]) return;
      charAssigned[p.char] = true;
      p.origX      = p.x;
      p.origY      = p.y;
      p.tx         = tgt.x;
      p.ty         = tgt.y;
      p.origSize   = p.size;
      p.targetSize = namePx;
      p.origAlpha  = p.alpha;
      p.swarmDelay = Math.random() * 0.12;
      p.isSwarming = true;
    });

    swarm = { heroId, t: 0 };
  }

  // ── RESIZE ───────────────────────────────────────────────────────

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = canvas.clientWidth  || 600;
    H = canvas.clientHeight || 400;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout();
    if (!swarm) buildBgParticles();
  }

  window.addEventListener('resize', () => { resize(); }, { passive: true });

  // ── COUNTER ───────────────────────────────────────────────────────

  let lastCounterN = -1;

  function updateCounter(n) {
    if (n === lastCounterN) return;
    lastCounterN = n;
    counter.textContent = T('welle_counter').replace('{n}', n);
    if (n === 0) {
      hinweis.textContent = T('welle_hint_zero');
      hinweis.classList.remove('welle-hinweis--done');
    } else if (n < 11) {
      hinweis.textContent = '';
      hinweis.classList.remove('welle-hinweis--done');
    } else {
      hinweis.textContent = T('welle_hint_all');
      hinweis.classList.add('welle-hinweis--done');
    }
  }

  // ── STORAGE ──────────────────────────────────────────────────────

  function isPassed(id) {
    const key = `quiz_passed_${id}`;
    try { if (localStorage.getItem(key) === 'true') return true; } catch(e) {}
    try {
      const store = window.name ? JSON.parse(window.name) : {};
      return store[key] === true;
    } catch(e) { return false; }
  }

  // ── DRAW LOOP ─────────────────────────────────────────────────────

  let waveT       = 0;
  let loopStarted = false;

  function draw() {
    waveT += 0.018;

    // ── Sync hero visibility ──
    let passedCount = 0;
    const isFirstDraw = waveT <= 0.018;
    heroes.forEach(h => {
      const passed = isPassed(h.frau.id);

      if (passed && !h.visible) {
        h.fadeIn = 0;
        if (!isFirstDraw && !swarm) {
          startSwarm(h.frau.id);
          if (pendingRippleId === h.frau.id) pendingRippleId = null;
        } else if (isFirstDraw && h.frau.id !== pendingRippleId) {
          h.fadeIn = 1; // already passed on a previous visit: instant
        }
        // isFirstDraw && frau.id === pendingRippleId:
        //   keep fadeIn=0; startLoop()'s 800ms timeout calls startSwarm()
      }

      h.visible = passed;
      if (passed) passedCount++;

      // ── Advance fade-in ──
      // During an active swarm the swarming characters ARE the visual name,
      // so the hero stays hidden (rate=0) and snaps to full at swarm end.
      if (h.visible && h.fadeIn < 1) {
        const rate =
          (pendingRippleId === h.frau.id)          ? 0 :     // waiting
          (swarm && swarm.heroId === h.frau.id)    ? 0 :     // swarm is showing it
                                                     0.022;  // normal ~0.75 s
        h.fadeIn = Math.min(1, h.fadeIn + rate);
      }
    });

    updateCounter(passedCount);
    const allDone = passedCount === 11;

    // ── Advance swarm ──
    if (swarm) {
      swarm.t += 1 / SWARM_FRAMES;
      if (swarm.t >= 1) {
        const h = heroes.find(hh => hh.frau.id === swarm.heroId);
        if (h) h.fadeIn = 1;
        const finishedId = swarm.heroId;
        bgParticles = bgParticles.filter(p => p.frauId !== finishedId);
        swarm = null;
      }
    }

    // ── Trigger flood once all 15 are revealed and background is empty ──
    if (allDone && !swarm && bgParticles.length === 0 && !floodStarted) {
      floodStarted = true;
      setTimeout(buildUnknownFlood, 2500);
    }

    // ── Fade in flood particles ──
    bgParticles.forEach(p => {
      if (p.frauId === '__unknown__' && p.alpha < p.targetAlpha) {
        if (p.fadeDelay > 0) { p.fadeDelay--; }
        else                 { p.alpha = Math.min(p.targetAlpha, p.alpha + 0.0007); }
      }
    });

    // ── Clear ──
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, W, H);

    // ── Background + swarming particles ──
    // All particles use textAlign='center' so (x,y) is always the glyph centre,
    // matching the hero rendering and allowing a seamless size/position handoff.
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    bgParticles.forEach(p => {

      if (p.isSwarming && swarm) {
        // ── Swarm: character flies to its name position ──
        const lt = Math.max(0, (swarm.t - p.swarmDelay) / (1 - p.swarmDelay + 0.001));
        const t  = Math.min(1, lt);

        if (t <= 0) {
          // Not yet launched: keep drifting; update origX so launch is seamless
          p.x += p.drift;
          if (p.x > W + 20) p.x = -20;
          if (p.x < -20)    p.x = W + 20;
          p.origX = p.x; // track current position as launch origin
          ctx.globalAlpha = p.origAlpha;
          ctx.font        = `${Math.round(p.size)}px "Microsoft YaHei","Noto Sans SC",serif`;
          ctx.fillStyle   = '#f0e8d8';

        } else {
          // Ease-in-out cubic: slow start, sweeping middle, gentle landing
          const e = t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;

          p.x = p.origX + (p.tx - p.origX) * e;
          p.y = p.origY + (p.ty - p.origY) * e;

          // Size: grow from background size to hero display size
          const sz = p.origSize + (p.targetSize - p.origSize) * e;

          // Alpha: quickly ramp from dim background opacity to fully visible
          const a = p.origAlpha + (1.0 - p.origAlpha) * Math.min(1, t * 4);

          // Colour: cream #f0e8d8 → crimson #C41E3A
          const cp = Math.min(1, t * 1.5);
          const r  = Math.round(240 + (196 - 240) * cp);
          const g  = Math.round(232 + ( 30 - 232) * cp);
          const b  = Math.round(216 + ( 58 - 216) * cp);

          ctx.globalAlpha = Math.min(1, a);
          ctx.font        = `bold ${Math.round(sz)}px "Microsoft YaHei","Noto Sans SC",serif`;
          ctx.fillStyle   = `rgb(${r},${g},${b})`;
        }

      } else {
        // ── Normal drift ──
        p.x += p.drift;
        if (p.x > W + 20) p.x = -20;
        if (p.x < -20)    p.x = W + 20;

        const base = (allDone && p.frauId === '__unknown__')
          ? p.alpha * (1 + 0.45 * Math.sin(waveT * 2.1 + p.x * 0.022))
          : p.alpha;
        ctx.globalAlpha = Math.max(0, base);
        ctx.font        = `${Math.round(p.size)}px "Microsoft YaHei","Noto Sans SC",serif`;
        ctx.fillStyle   = '#f0e8d8';
      }

      ctx.fillText(p.char, p.x, p.y);
    });

    ctx.globalAlpha = 1;

    // ── Hero nodes ──
    const namePx  = Math.round(W / 34);
    const latinPx = Math.round(W / 68);

    heroes.forEach((h, idx) => {
      const { x, y, visible, frau } = h;

      if (visible) {
        const fade = h.fadeIn;

        ctx.save();
        ctx.globalAlpha  = fade;
        ctx.font         = `bold ${namePx}px "Microsoft YaHei","Noto Sans SC",serif`;
        ctx.fillStyle    = '#C41E3A';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(frau.chinesisch, x, y - 4);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha  = fade * 0.82;
        ctx.font         = `500 ${latinPx}px "Inter","Arial",sans-serif`;
        ctx.fillStyle    = '#f0e8d8';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(frau.name, x, y + namePx * 0.62);
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = fade;
        ctx.fillStyle   = '#C41E3A';
        ctx.beginPath();
        ctx.arc(x, y - namePx * 0.95, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

      } else {
        ctx.save();
        ctx.globalAlpha  = 0.10;
        ctx.font         = `bold ${namePx}px "Microsoft YaHei","Noto Sans SC",serif`;
        ctx.fillStyle    = '#f0e8d8';
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', x, y);
        ctx.restore();
      }
    });

    // ── Wave overlay when all 15 done ──
    if (allDone) {
      for (let lane = 0; lane < 4; lane++) {
        const yBase = H * (0.2 + lane * 0.2);
        ctx.save();
        ctx.globalAlpha = 0.07 + 0.03 * Math.sin(waveT + lane);
        ctx.strokeStyle = '#C41E3A';
        ctx.lineWidth   = 1;
        ctx.beginPath();
        for (let px = 0; px <= W; px += 3) {
          const py = yBase + Math.sin((px / W) * Math.PI * 6 + waveT * 2.5 + lane * 1.2) * 14;
          px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    requestAnimationFrame(draw);
  }

  function startLoop() {
    if (loopStarted) return;
    loopStarted = true;
    if (pendingRippleId) {
      setTimeout(() => {
        startSwarm(pendingRippleId);
        pendingRippleId = null;
      }, 800);
    }
    draw();
  }

  // ── URL PARAMETER / STORAGE ──────────────────────────────────────

  let pendingRippleId = null;

  function readUrlParam() {
    try {
      const params = new URLSearchParams(location.search);
      const qp = params.get('qp');
      if (qp) {
        const key = `quiz_passed_${qp}`;
        try { localStorage.setItem(key, 'true'); } catch(e) {}
        try {
          const store = window.name ? JSON.parse(window.name) : {};
          store[key] = true;
          delete store['__pending_anim__'];
          window.name = JSON.stringify(store);
        } catch(e) {}
        try { localStorage.removeItem('__pending_anim__'); } catch(e) {}
        pendingRippleId = qp;
        console.log('[welle] URL-Parameter gespeichert:', key);
        try {
          const u = new URL(location.href);
          u.searchParams.delete('qp');
          history.replaceState(null, '', u.pathname + (u.search || '') + '#welle');
        } catch(e) {
          history.replaceState(null, '', location.pathname + '#welle');
        }
        return;
      }

      let pending = null;
      try {
        const store = window.name ? JSON.parse(window.name) : {};
        if (store['__pending_anim__']) {
          pending = store['__pending_anim__'];
          delete store['__pending_anim__'];
          window.name = JSON.stringify(store);
        }
      } catch(e) {}
      if (!pending) {
        try {
          pending = localStorage.getItem('__pending_anim__');
          if (pending) localStorage.removeItem('__pending_anim__');
        } catch(e) {}
      }
      if (pending) {
        pendingRippleId = pending;
        console.log('[welle] Pending-Animation aus Fallback-Store:', pending);
        setTimeout(() => {
          const el = document.getElementById('welle');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 900);
      }
    } catch(e) {}
  }

  // ── INIT ─────────────────────────────────────────────────────────

  readUrlParam();

  requestAnimationFrame(() => {
    console.log('[welle] Init. window.name =', window.name);
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('quiz_passed_')) keys.push(k);
      }
      console.log('[welle] localStorage quiz-Keys:', keys);
    } catch(e) {
      console.warn('[welle] localStorage nicht lesbar:', e.message);
    }
    resize();

    // If all 15 were already discovered on a PREVIOUS visit (no pending swarm), show flood immediately
    if (FRAUEN.every(f => isPassed(f.id)) && !floodStarted && !pendingRippleId) {
      floodStarted = true;
      buildUnknownFlood();
    }

    startLoop();
  });

  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      readUrlParam();
      resize();
    }
  });

  window.addEventListener('storage', e => {
    if (e.key && e.key.startsWith('quiz_passed_')) updateCounter(lastCounterN);
  });

})();
