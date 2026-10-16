// ============================================================
// BLOG.JS
// Loads data/posts.json and renders the diary list on blog.html.
// Each post shows as a collapsed card (thumbnail + title + date/
// location + excerpt) that expands in place to show the full post
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
      <div class="blog-meta">${dateStr}${post.location ? ' · ' + post.location : ''}</div>
      <p class="blog-excerpt">${post.excerpt || ''}</p>
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
      body.innerHTML = post.content || '';
      loadComments(body, post.slug);
      loaded = true;
    }
    body.classList.toggle('open');
  });

  return item;
}

// ============================================================
// COMMENTS — powered by Giscus (free, uses GitHub Discussions, no
// tracking/ads). Already configured below with your real repo/
// category IDs from giscus.app, with per-post threads (matched by
// each post's slug). Nothing more to set up — as long as Discussions
// is turned on for your repo and the giscus app is installed on it
// (both one-time GitHub settings, not something in this file), new
// posts automatically get their own comment thread with no extra
// steps — just make sure each post has a unique "slug" in
// data/posts.json, same as the existing ones.
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
  // "specific" + data-term (the post's slug) gives every post its
  // own comment thread, even though they all live on blog.html.
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
