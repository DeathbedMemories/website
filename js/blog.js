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

  const main = item.querySelector('.blog-main');
  const body = item.querySelector('.blog-body');
  let loaded = false;

  main.style.cursor = 'pointer';
  main.addEventListener('click', (e) => {
    // don't toggle when clicking a link inside the open post
    if (e.target.tagName === 'A') return;
    if (!loaded) {
      const reader = buildReaderBar(post);
      body.appendChild(reader);
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
// (Web Speech API), so there's no cost, no account, and no extra
// files to host. Voice quality depends on the visitor's device/
// browser, but it works everywhere speechSynthesis is supported
// (all modern browsers). Strips HTML tags down to plain text
// before reading, in roughly the order it appears on the page.
// ============================================================
let currentUtterance = null;

function buildReaderBar(post) {
  const bar = document.createElement('div');
  bar.className = 'reader-bar';

  if (!('speechSynthesis' in window)) {
    bar.innerHTML = '<p class="form-note">Audio playback isn\'t supported in this browser.</p>';
    return bar;
  }

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'reader-btn';
  btn.innerHTML = '🔊 Listen to this post';
  bar.appendChild(btn);

  // Voice picker — the list of available voices depends on the
  // visitor's browser/OS, so this fills in once the browser reports
  // them (sometimes that happens async, hence the two load attempts).
  const voiceSelect = document.createElement('select');
  voiceSelect.className = 'reader-voice';
  voiceSelect.setAttribute('aria-label', 'Reading voice');
  bar.appendChild(voiceSelect);

  function populateVoices() {
    const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
    if (!voices.length) return;
    voiceSelect.innerHTML = '';
    voices.forEach((v, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${v.name} (${v.lang})`;
      voiceSelect.appendChild(opt);
    });
  }
  populateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }

  let speaking = false;
  let paused = false;

  btn.addEventListener('click', () => {
    if (!speaking) {
      const text = htmlToSpeechText(post);
      currentUtterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
      const chosen = voices[voiceSelect.value];
      if (chosen) currentUtterance.voice = chosen;
      currentUtterance.rate = 0.98;
      currentUtterance.onend = () => {
        speaking = false; paused = false;
        btn.innerHTML = '🔊 Listen to this post';
      };
      // stop any other post's narration first
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(currentUtterance);
      speaking = true;
      btn.innerHTML = '⏸ Pause';
    } else if (!paused) {
      window.speechSynthesis.pause();
      paused = true;
      btn.innerHTML = '▶ Resume';
    } else {
      window.speechSynthesis.resume();
      paused = false;
      btn.innerHTML = '⏸ Pause';
    }
  });

  return bar;
}

function htmlToSpeechText(post) {
  const temp = document.createElement('div');
  const title = post.subtitle ? `${post.title}. ${post.subtitle}.` : `${post.title}.`;
  temp.innerHTML = post.content || '';
  // skip the comments area if present and strip images (no alt-reading, keeps it natural)
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
