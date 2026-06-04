const _q = (window.LANG === 'en' && typeof quizQuestions_en !== 'undefined') ? quizQuestions_en : questions;
const _r = (window.LANG === 'en' && typeof resultLevels_en !== 'undefined') ? resultLevels_en : resultLevels;

const state = {
  current: 0,
  answers: [],
  score: 0
};

function getPoints(question, answer) {
  if (answer === question.awareAnswer) return 2;
  if (answer === 'neutral') return 1;
  return 0;
}

function getResultLevel(score) {
  return _r.find(r => score >= r.min && score <= r.max);
}

function setScreen(show) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(show).classList.add('active');
}

function updateProgress() {
  const pct = (state.current / _q.length) * 100;
  const fill = document.getElementById('progressFill');
  fill.style.width = pct + '%';
  fill.setAttribute('aria-valuenow', state.current + 1);
  const n = String(state.current + 1).padStart(2, '0');
  const total = String(_q.length).padStart(2, '0');
  document.getElementById('questionCounter').textContent = `${n} / ${total}`;
}

function showQuestion(index) {
  const q = _q[index];

  const card = document.getElementById('statementCard');
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = '';

  document.getElementById('statementText').textContent = `„${q.statement}"`;

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.classList.remove('selected');
    btn.disabled = false;
  });

  updateProgress();
}

function buildBreakdown() {
  const container = document.getElementById('breakdown');
  const answerLabels = {
    agree: T('quiz_answer_agree'),
    neutral: T('quiz_answer_neutral'),
    disagree: T('quiz_answer_disagree')
  };

  let html = `<h3 class="breakdown-heading">${T('quiz_breakdown_heading')}</h3>`;

  _q.forEach((q, i) => {
    const userAnswer = state.answers[i];
    const points = getPoints(q, userAnswer);
    let verdictClass, verdictText;

    if (points === 2) {
      verdictClass = 'correct';
      verdictText = T('quiz_verdict_correct');
    } else if (points === 1) {
      verdictClass = 'half';
      verdictText = T('quiz_verdict_neutral');
    } else {
      verdictClass = 'wrong';
      verdictText = T('quiz_verdict_wrong');
    }

    html += `
      <div class="breakdown-item">
        <div class="breakdown-statement">„${q.statement}"</div>
        <div class="breakdown-row">
          <span class="breakdown-verdict ${verdictClass}">${verdictText}</span>
          <span class="breakdown-explanation">${q.explanation}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function showResults() {
  const maxScore = _q.length * 2;
  const pct = Math.round((state.score / maxScore) * 100);
  const level = getResultLevel(state.score);

  document.getElementById('resultScore').textContent = pct + '%';
  document.getElementById('resultScore').style.color = level.color;
  document.getElementById('resultLabel').textContent = level.label;
  document.getElementById('resultText').textContent = level.description;

  setScreen('screenResult');
  document.getElementById('progressTrack').classList.remove('visible');

  buildBreakdown();

  setTimeout(() => {
    const bar = document.getElementById('scoreBarFill');
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', pct);
  }, 150);
}

function handleAnswer(answer) {
  const q = _q[state.current];
  const points = getPoints(q, answer);
  state.answers.push(answer);
  state.score += points;

  document.querySelectorAll('.answer-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.value === answer) btn.classList.add('selected');
  });

  setTimeout(() => {
    state.current++;
    if (state.current < _q.length) {
      showQuestion(state.current);
    } else {
      showResults();
    }
  }, 380);
}

function resetQuiz() {
  state.current = 0;
  state.answers = [];
  state.score = 0;
  const fill = document.getElementById('progressFill');
  fill.style.width = '0%';
  fill.setAttribute('aria-valuenow', '0');
  const bar = document.getElementById('scoreBarFill');
  bar.style.width = '0%';
  bar.setAttribute('aria-valuenow', '0');
  setScreen('screenStart');
  document.getElementById('progressTrack').classList.remove('visible');
}

// ─── Event Listeners ───────────────────────────────────

document.getElementById('btnStart').addEventListener('click', () => {
  setScreen('screenQuestion');
  document.getElementById('progressTrack').classList.add('visible');
  showQuestion(0);
});

document.querySelectorAll('.answer-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.disabled) return;
    handleAnswer(btn.dataset.value);
  });
});

document.getElementById('btnRestart').addEventListener('click', resetQuiz);

document.addEventListener('keydown', (e) => {
  const questionScreen = document.getElementById('screenQuestion');
  if (!questionScreen.classList.contains('active')) return;

  const map = { '1': 'agree', '2': 'neutral', '3': 'disagree' };
  if (map[e.key]) {
    const btn = document.querySelector(`.answer-btn[data-value="${map[e.key]}"]`);
    if (btn && !btn.disabled) btn.click();
  }
});

// ── LANG-SWITCH STATE PRESERVATION ────────────────────────────────

document.addEventListener('beforelangchange', () => {
  const active = [...document.querySelectorAll('.screen')].find(s => s.classList.contains('active'));
  try {
    sessionStorage.setItem('quiz_resume', JSON.stringify({
      screen: active ? active.id : 'screenStart',
      current: state.current,
      answers: state.answers.slice(),
      score: state.score
    }));
  } catch (e) {}
});

(function () {
  var saved;
  try { saved = JSON.parse(sessionStorage.getItem('quiz_resume')); } catch (e) {}
  if (!saved) return;
  sessionStorage.removeItem('quiz_resume');

  if (saved.screen === 'screenQuestion') {
    state.current = saved.current;
    state.answers = saved.answers;
    state.score   = saved.score;
    setScreen('screenQuestion');
    document.getElementById('progressTrack').classList.add('visible');
    showQuestion(state.current);
  } else if (saved.screen === 'screenResult') {
    state.current = saved.current;
    state.answers = saved.answers;
    state.score   = saved.score;
    showResults();
  }
})();
