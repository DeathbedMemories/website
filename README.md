# Deathbed Memories — Website

Live site: https://deathbedmemories.github.io/website/
Repo: github.com/DeathbedMemories/website

A static HTML/CSS/JS site (no build step, no backend) built for editing
directly on GitHub's web interface — every file can be opened, edited,
and committed from an iPad in Safari. No local dev environment needed.

---

## Page inventory

| Page | Linked from nav? | Purpose |
|---|---|---|
| `index.html` | Yes | Homepage |
| `services.html` | Yes | Itinerary planning tiers, booking add-on, travel host, consult form |
| `shop.html` | Yes | "No Gracias" cap, color swatches, purchase-request form |
| `blog.html` | Yes | "Diary" — personal travel posts |
| `contact.html` | Yes | General contact form, with `?topic=` prefill support |
| `process.html` | Footer only | Process & Terms (payment, cancellation, legal) |
| `about.html` | **Not linked** | Hidden About/CV/portfolio page for job applications |
| `photography.html` | **Not linked yet** | Print sales gallery — add to nav when ready to launch |
| `tours.html` | **Not linked** | Cannabis walking tours (hidden/future) |
| `marketing.html` | **Not linked** | Digital marketing services (hidden/future) |
| `css-editor.html`, `editor.html` | N/A | Your own design/content editing tools, not for visitors |

To make a hidden page live, add a `<li><a href="page.html">Label</a></li>`
to the `.nav-links` list on every page's header, and usually to the
footer's "Site" list too.

---

## The Diary (blog system)

**Files involved:** `blog.html`, `js/blog.js`, `data/posts.json`, plus
whatever images each post uses (usually in `images/blog/`).

### Adding a new post
Add a new object to the **top** of the array in `data/posts.json`
(newest-first order). Each post needs:

```json
{
  "slug": "unique-url-safe-id",
  "title": "Main title",
  "subtitle": "Second line / tagline",
  "date": "YYYY-MM-DD",
  "location": "City, Country",
  "image": "images/blog/thumbnail.jpg",
  "content": "<p>Full HTML for the post body...</p>"
}
