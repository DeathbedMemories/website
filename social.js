// ============================================================
// SOCIAL.JS
// Reads data/social.json and builds the "recent content" grid.
// To update it: edit data/social.json — paste in the URL of a
// real post/video/reel for each platform. You do NOT need to
// touch this file.
//
// - YouTube, TikTok and Instagram: paste a link to one specific
//   video/post/reel (not just your profile link) and it will
//   embed the actual video on the page.
// - Lemon8 and OnlyFans don't allow public embeds, so those
//   always show as a simple link card instead.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('social-grid');
  if (!grid) return;

  fetch('data/social.json')
    .then(res => res.json())
    .then(data => {
      (data.recent_posts || []).forEach(post => renderCard(post, grid));
      loadEmbedScripts();
    })
    .catch(() => {
      grid.innerHTML = '<p>Couldn\'t load recent posts right now.</p>';
    });
});

function renderCard(post, grid) {
  const card = document.createElement('div');
  card.className = 'social-card';

  const label = document.createElement('div');
  label.className = 'platform-label';
  label.innerHTML = `<span>${capitalize(post.platform)}</span>`;
  card.appendChild(label);

  const body = document.createElement('div');
  body.className = 'embed-wrap';

  const youtubeId = post.platform === 'youtube' ? extractYouTubeId(post.url) : null;
  const tiktokId = post.platform === 'tiktok' ? extractTikTokId(post.url) : null;
  const igId = post.platform === 'instagram' ? extractInstagramId(post.url) : null;

  if (youtubeId) {
    body.innerHTML = `<iframe width="100%" height="360" src="https://www.youtube.com/embed/${youtubeId}"
      title="YouTube video" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>`;
  } else if (tiktokId) {
    body.innerHTML = `<blockquote class="tiktok-embed" cite="${post.url}" data-video-id="${tiktokId}" style="max-width:100%;min-width:280px;"><section></section></blockquote>`;
  } else if (igId) {
    body.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${post.url}" style="width:100%;"></blockquote>`;
  } else {
    // Fallback link card — used for Lemon8, OnlyFans, or any URL
    // that isn't a specific post/video link yet.
    body.innerHTML = `
      <div class="link-card">
        <p>${post.caption || 'View the latest post'}</p>
        <a class="btn btn-primary mt-2" href="${post.url}" target="_blank" rel="noopener">
          View on ${capitalize(post.platform)}
        </a>
      </div>`;
  }

  card.appendChild(body);
  grid.appendChild(card);
}

function extractYouTubeId(url) {
  const match = url.match(/(?:v=|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
  return match ? match[1] : null;
}

function extractTikTokId(url) {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

function extractInstagramId(url) {
  const match = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// TikTok and Instagram need their own official embed scripts loaded
// once per page for the widgets above to render.
function loadEmbedScripts() {
  if (document.querySelector('.tiktok-embed') && !document.getElementById('tiktok-embed-script')) {
    const s = document.createElement('script');
    s.id = 'tiktok-embed-script';
    s.src = 'https://www.tiktok.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
  }
  if (document.querySelector('.instagram-media') && !document.getElementById('instagram-embed-script')) {
    const s = document.createElement('script');
    s.id = 'instagram-embed-script';
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
  }
}
