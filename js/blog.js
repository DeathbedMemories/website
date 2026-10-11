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
// COMMENTS — powered by Giscus (free, uses GitHub Discussions,
// no tracking/ads). Each post gets its own comment thread, matched
// by its slug, even though every post lives on this one page.
//
// ONE-TIME SETUP before this works (details in README):
//   1. Turn on Discussions for your repo (Settings → General →
//      Features → Discussions).
//   2. Install the giscus app: github.com/apps/giscus — authorize
//      it for this repo only.
//   3. Go to giscus.app, fill in your repo name, pick a Discussion
//      category (e.g. "Comments"), and copy the data-repo-id and
//      data-category-id values it gives you.
//   4. Paste those two values into the REPO_ID and CATEGORY_ID
//      constants below, replacing the placeholders.
// Until that's done, a "comments not sent" message will quietly
// show instead of a comment box — nothing breaks.
// ============================================================
const GISCUS_REPO = 'DeathbedMemories/website';
const GISCUS_REPO_ID = 'PLACEHOLDER_REPO_ID';
const GISCUS_CATEGORY = 'Comments';
const GISCUS_CATEGORY_ID = 'PLACEHOLDER_CATEGORY_ID';

function loadComments(body, slug) {
  if (GISCUS_REPO_ID.startsWith('PLACEHOLDER')) {
    const note = document.createElement('p');
    note.className = 'form-note';
    note.style.marginTop = '2rem';
    note.textContent = 'Comments aren\'t set up yet — see README for the one-time Giscus setup steps.';
    body.appendChild(note);
    return;
  }
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
  script.setAttribute('data-input-position', 'top');
  script.setAttribute('data-theme', 'light');
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
