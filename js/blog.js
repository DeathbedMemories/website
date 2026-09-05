// ============================================================
// BLOG.JS
// Reads data/posts.json and builds the blog list on blog.html.
// To publish a new post: edit data/posts.json — you do NOT need
// to touch this file or blog.html.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('blog-list');
  if (!list) return;

  fetch('data/posts.json')
    .then(res => res.json())
    .then(posts => {
      // newest first, based on the "date" field in posts.json
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      if (posts.length === 0) {
        list.innerHTML = '<p>No posts yet — check back soon.</p>';
        return;
      }

      posts.forEach(post => {
        const item = document.createElement('article');
        item.className = 'blog-item';
        item.innerHTML = `
          <h3>${post.title}</h3>
          <p class="blog-meta">${formatDate(post.date)} · ${post.location || ''}</p>
          <p>${post.excerpt || ''}</p>
          <div class="blog-body" id="body-${post.slug}">
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            ${post.content}
          </div>
        `;
        item.addEventListener('click', (e) => {
          // don't toggle if clicking a link inside the post
          if (e.target.tagName === 'A') return;
          document.getElementById(`body-${post.slug}`).classList.toggle('open');
        });
        list.appendChild(item);
      });

      // If the page was opened with a link like blog.html#example-first-post,
      // open that post automatically.
      if (window.location.hash) {
        const slug = window.location.hash.replace('#', '');
        const body = document.getElementById(`body-${slug}`);
        if (body) body.classList.add('open');
      }
    })
    .catch(() => {
      list.innerHTML = '<p>Couldn\'t load posts right now. If you just published this site, make sure data/posts.json was uploaded too.</p>';
    });
});

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
