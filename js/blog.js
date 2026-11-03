// ============================================================
// BLOG.JS
// Loads data/posts.json and renders the diary list on blog.html.
// Each post shows as a collapsed card (thumbnail + title + subtitle
// + date/location) that expands in place to show the full post
// when tapped. Posts render in the order they appear in the JSON
// file — newest first, so add new posts to the TOP of the array.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('blog-list');
  if (!list) return;

  fetch('data/posts.json')
    .then(res => res.json())
    .then(posts => {
      list.innerHTML = '';
      posts.forEach(post => list.appendChild(renderPost(post)));
    })
    .catch(() => {
      list.innerHTML = '<p>Couldn\'t load posts right now.</p>';
    });
});

function renderPost(post) {
  const item = document.createElement('div');
  item.className = 'blog-item';

  const dateStr = formatDate(post.date);

  item.innerHTML = `
    ${post.image ? `<img class="blog-thumb" src="${post.image}" alt="${escapeAttr(post.title)}">` : ''}
    <div class="blog-main">
      <h3>${post.title}</h3>
      ${post.subtitle ? `<p class="blog-subtitle">${post.subtitle}</p>` : ''}
      <div class="blog-meta">${dateStr}${post.location ? ' · ' + post.location : ''}</div>
      <div class="blog-body"></div>
    </div>
  `;

  const body = item.querySelector('.blog-body');
  let loaded = false;

  // The whole card header (thumbnail, title, subtitle, date) toggles the
  // post open/closed. Clicks INSIDE the open post body (reading, tapping
  // the audio player, comments, links) must never collapse it.
  item.style.cursor = 'pointer';
  body.style.cursor = 'auto';
  item.addEventListener('click', (e) => {
    if (e.target.closest('.blog-body')) return;
    if (!loaded) {
      body.appendChild(buildReaderBar(post));
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = post.content || '';
      body.appendChild(contentDiv);
      loadComments(body, post.slug);
      loaded = true;
    }
    body.classList.toggle('open');
  });

  return item;
}

// ============================================================
// AUDIO READER — uses the browser's built-in text-to-speech
// (Web Speech API): no cost, no account, no files to host. The
// voices on offer depend on the visitor's device/browser.
// ============================================================
let readerSession = 0;          // bumped on every new narration so stale events from an old one are ignored
let resetActiveReader = null;   // resets the UI of whichever post is currently narrating

const ICON_PLAY = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
const ICON_PAUSE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4.5" height="14" rx="1.2"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2"/></svg>';

// Long speech gets cut off after ~15 seconds in Chrome with some voices,
// so we read the post in sentence-sized pieces queued back to back.
function chunkText(text, max = 220) {
  const sentences = text.match(/[^.!?…]+[.!?…]+["')\]]*\s*|[^.!?…]+$/g) || [text];
  const chunks = [];
  let cur = '';
  sentences.forEach(s => {
    if ((cur + s).length > max && cur) { chunks.push(cur.trim()); cur = ''; }
    cur += s;
    while (cur.length > max * 1.6) {
      let cut = cur.lastIndexOf(' ', max);
      if (cut < 50) cut = max;
      chunks.push(cur.slice(0, cut).trim());
      cur = cur.slice(cut);
    }
  });
  if (cur.trim()) chunks.push(cur.trim());
  return chunks.filter(Boolean);
}

function buildReaderBar(post) {
  const bar = document.createElement('div');
  bar.className = 'reader-bar';

  if (!('speechSynthesis' in window)) {
    bar.innerHTML = '<p class="form-note">Audio playback isn\'t supported in this browser.</p>';
    return bar;
  }

  let speaking = false;
  let paused = false;
  let rate = 1;

  bar.innerHTML = `
    <button type="button" class="reader-play" aria-label="Listen to this post">${ICON_PLAY}</button>
    <div class="reader-info">
      <span class="reader-title">Listen to this post</span>
      <span class="reader-status">
        <span class="reader-eq" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="reader-status-text">Read aloud</span>
      </span>
    </div>
    <div class="reader-controls">
      <div class="reader-speeds" role="group" aria-label="Playback speed"></div>
      <label class="reader-voice-wrap">
        <span class="reader-voice-label">Voice</span>
        <select class="reader-voice" aria-label="Reading voice"></select>
      </label>
    </div>
  `;

  const playBtn = bar.querySelector('.reader-play');
  const statusText = bar.querySelector('.reader-status-text');
  const speedsWrap = bar.querySelector('.reader-speeds');
  const voiceSelect = bar.querySelector('.reader-voice');
  const voiceWrap = bar.querySelector('.reader-voice-wrap');

  function setUI(state) {
    bar.classList.toggle('is-playing', state === 'playing');
    bar.classList.toggle('is-paused', state === 'paused');
    playBtn.innerHTML = state === 'playing' ? ICON_PAUSE : ICON_PLAY;
    playBtn.setAttribute('aria-label', state === 'playing' ? 'Pause' : (state === 'paused' ? 'Resume' : 'Listen to this post'));
    statusText.textContent = state === 'playing' ? 'Now playing' : (state === 'paused' ? 'Paused' : 'Read aloud');
  }

  function reset() {
    speaking = false; paused = false;
    setUI('idle');
  }

  // Speed pills
  [0.75, 1, 1.25, 1.5, 2].forEach(r => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'reader-speed' + (r === 1 ? ' active' : '');
    b.textContent = r + '×';
    b.addEventListener('click', () => {
      rate = r;
      speedsWrap.querySelectorAll('.reader-speed').forEach(x => x.classList.toggle('active', x === b));
      // The Web Speech API can't change speed mid-sentence, so if it's
      // playing we restart from the top at the new speed.
      if (speaking) startSpeaking();
    });
    speedsWrap.appendChild(b);
  });

  // Voice picker — list depends on the visitor's browser/device
  function prettyVoice(v) {
    const region = (v.lang.split(/[-_]/)[1] || '').toUpperCase();
    return region ? `${v.name} · ${region}` : v.name;
  }
  function getEnglishVoices() {
    return window.speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('en'));
  }
  function populateVoices() {
    const voices = getEnglishVoices();
    if (!voices.length) { voiceWrap.style.display = 'none'; return; }
    voiceWrap.style.display = '';
    const keep = voiceSelect.value;
    voiceSelect.innerHTML = '';
    voices.forEach((v, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = prettyVoice(v);
      voiceSelect.appendChild(opt);
    });
    if (keep && voiceSelect.querySelector(`option[value="${keep}"]`)) voiceSelect.value = keep;
  }
  populateVoices();
  window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voiceSelect.addEventListener('change', () => { if (speaking) startSpeaking(); });

  function startSpeaking() {
    // stop whichever narration was going (this post or another) and reset the other post's UI
    window.speechSynthesis.cancel();
    if (resetActiveReader && resetActiveReader !== reset) resetActiveReader();
    resetActiveReader = reset;

    const session = ++readerSession;
    const chunks = chunkText(htmlToSpeechText(post));
    const chosen = getEnglishVoices()[voiceSelect.value];

    chunks.forEach((piece, i) => {
      const u = new SpeechSynthesisUtterance(piece);
      if (chosen) u.voice = chosen;
      u.rate = rate;
      if (i === chunks.length - 1) {
        u.onend = () => { if (session === readerSession) reset(); };
      }
      u.onerror = (ev) => {
        if (session === readerSession && ev.error !== 'interrupted' && ev.error !== 'canceled') reset();
      };
      window.speechSynthesis.speak(u);
    });

    speaking = true; paused = false;
    setUI('playing');
  }

  playBtn.addEventListener('click', () => {
    if (!speaking) {
      startSpeaking();
    } else if (!paused) {
      window.speechSynthesis.pause();
      paused = true;
      setUI('paused');
    } else {
      window.speechSynthesis.resume();
      paused = false;
      setUI('playing');
    }
  });

  return bar;
}

function htmlToSpeechText(post) {
  const temp = document.createElement('div');
  const title = post.subtitle ? `${post.title}. ${post.subtitle}.` : `${post.title}.`;
  temp.innerHTML = post.content || '';
  // skip images and the comments area so they aren't read aloud
  temp.querySelectorAll('img, .comments-wrap').forEach(el => el.remove());
  const body = temp.textContent.replace(/\s+/g, ' ').trim();
  return `${title} ${body}`;
}

// ============================================================
// COMMENTS — powered by Giscus (free, uses GitHub Discussions, no
// tracking/ads). Configured with the real repo/category IDs from
// giscus.app, with a separate thread per post (matched by each
// post's slug). Nothing more to set up here — just make sure every
// new post you add has a unique "slug" in data/posts.json.
// ============================================================
const GISCUS_REPO = 'deathbedmemories/website';
const GISCUS_REPO_ID = 'R_kgDOUOnDxw';
const GISCUS_CATEGORY = 'Q&A';
const GISCUS_CATEGORY_ID = 'DIC_kwDOUOnDx84DHkm6';

function loadComments(body, slug) {
  const wrap = document.createElement('div');
  wrap.className = 'comments-wrap';
  body.appendChild(wrap);

  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', GISCUS_REPO);
  script.setAttribute('data-repo-id', GISCUS_REPO_ID);
  script.setAttribute('data-category', GISCUS_CATEGORY);
  script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
  script.setAttribute('data-mapping', 'specific');
  script.setAttribute('data-term', slug);
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'bottom');
  script.setAttribute('data-theme', 'preferred_color_scheme');
  script.setAttribute('data-lang', 'en');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  wrap.appendChild(script);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function escapeAttr(str) {
  return (str || '').replace(/"/g, '&quot;');
}
