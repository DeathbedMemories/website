# Deathbed Memories — website

This is a plain HTML/CSS/JavaScript website. No build tools, no npm,
nothing to install — just files. That makes it free to host on
**GitHub Pages** and easy to edit directly in your browser once it's
uploaded.

---

## 1. Put this on GitHub (one-time setup)

1. Go to [github.com](https://github.com) and log into the account you
   already created.
2. Click the **+** icon top-right → **New repository**.
3. Name it `deathbed-memories-website` (or anything you like — no spaces).
4. Set it to **Public**. Don't check any of the "initialize with" boxes.
5. Click **Create repository**.
6. You'll land on an empty repo page. Click the link that says
   **"uploading an existing file"**.
7. On your computer, open the `dbm-website` folder you downloaded from
   this chat. Select **everything inside it** (all the files and
   folders: `index.html`, `services.html`, `css`, `js`, `data`,
   `images`, etc.) and drag them into the GitHub upload box.
   - Important: upload the *contents* of the folder, not the folder
     itself — `index.html` should end up at the top level of the repo,
     not inside a `dbm-website/index.html` subfolder.
8. Scroll down, add a commit message like "First upload," and click
   **Commit changes**.

## 2. Turn on GitHub Pages (makes it a live website — free)

1. In your repo, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment" → "Source," choose **Deploy from a
   branch**.
4. Under "Branch," choose **main** and folder **/ (root)**, then **Save**.
5. Wait 1–2 minutes, then refresh the page. GitHub will show you your
   live URL — something like:
   `https://your-username.github.io/deathbed-memories-website/`
6. That URL is your real, live website. Share it anywhere.

*(Optional: you can point a custom domain like `deathbedmemories.com` at
this later, in that same Pages settings screen — that part usually
costs a few dollars a year for the domain name itself, but GitHub
Pages hosting stays free either way.)*

---

## 2.5 Forms & booking — already connected

Your Formspree form (`https://formspree.io/f/mgaezpkg`) is already wired
into the contact form, the blog "notify me" signup, the shop request
form, and several others added since. You don't need to do anything
else for it to work — this section just explains how it works, in case
you ever want to change or replace it.

### Contact & blog signup forms
Both the contact form and the "notify me" blog signup use **Formspree**
(free plan, no credit card) to email submissions straight to
dbmems@proton.me — GitHub Pages can't run its own backend, so this is
the simplest free way to make a form actually send email.

If you ever want to swap in a different Formspree form (e.g. to split
shop requests into their own inbox thread):
1. Go to [formspree.io](https://formspree.io), sign in, create a new
   form, and set the notification email to `dbmems@proton.me`.
2. Formspree gives you a new form endpoint like
   `https://formspree.io/f/abcdwxyz`.
3. Open the relevant file in GitHub, find the existing
   `action="https://formspree.io/f/mgaezpkg"` line, and replace the ID
   with your new one. This same line appears on `contact.html`,
   `blog.html`, `shop.html`, `services.html`, `tours.html`,
   `photography.html`, and `marketing.html` — each one's independent,
   so you can mix and match which ones share a form.
4. Commit the change. Test the form on your live site.

### Free consultation — now email/form-based, not a live call
The Services page's free consultation is an **async form** — name,
email, a checklist of what matters to you (low sensory, family-friendly,
close to water, adventure, etc.), and an open text field — submitted
through the same Formspree connection. There's no Calendly widget on
this page anymore; live calls are intentionally reserved for after a
paid planning package, per your request.

If you ever want to bring a public "book a call" option back:
1. Set up a free event at [calendly.com](https://calendly.com) if you
   haven't already, and copy your event link.
2. The old embed code is saved in an HTML comment near the bottom of
   `process.html` (search for "SAVED FOR LATER") — copy that whole
   block onto whichever page you want it on, and update the
   `data-url="..."` with your real Calendly link.

### Setting up the shop
The shop sells one item — the "No Gracias" cap, now with three real
product photos (khaki/navy/black) and clickable color swatches.

- To change the price, product name, or description, edit the text
  directly in `shop.html` inside the `<div class="card reveal">` block
  — search for `$40 CAD`.
- **Lesson learned the hard way:** file extensions matter exactly.
  `hat-khaki.jpg` and `hat-khaki.jpeg` are different filenames as far
  as the website is concerned — if a photo won't load, this is the
  first thing to check (see Section 3's "Building the image path"
  notes for the full explanation).
- To add a 4th color: add another swatch button in `shop.html` (copy
  an existing `<button class="hat-swatch"...>` line), upload the
  matching photo to `images/shop/`, and add a matching `<option>` to
  the Color dropdown in the request form. `js/hat-swatches.js` handles
  the rest automatically — you don't need to touch that file.
- To add a second product entirely, copy the whole `.shop-layout`
  block (both the product card and its form) and edit the copy.
- If you'd rather shop requests land in a separate inbox thread from
  general inquiries, create a second free form at formspree.io and
  swap its ID into `shop.html`'s `action="..."` line.

---

## 3. How to update content later (no coding required)

Everything you'll want to change regularly lives in the `data/` folder
as plain, structured text files. You never need to touch the HTML for
these:

| To change... | Edit this file |
|---|---|
| Add a new blog post | `data/posts.json` |
| Change the hat's price/description, or add a 2nd product | `shop.html` directly (it's just one product, no data file) |
| Update the "recent posts" feed (TikTok/IG/YouTube/Lemon8/OnlyFans) | `data/social.json` |

**How to edit a file on GitHub (from your phone or laptop, no software
needed):**
1. Open your repo on github.com.
2. Click into the file (e.g. `data/posts.json`).
3. Click the pencil icon (top-right of the file view) to edit.
4. Make your change — for a new blog post, copy one existing entry
   (the part between `{` and `}`) and paste it above the others,
   then edit the text inside. Keep the commas and quotation marks in
   the same places.
5. Scroll down, click **Commit changes**. Your live site updates
   within a minute or two.

### Editing content that isn't the blog
Nearly everything on the site — headlines, cards, pricing, form labels —
lives directly inside each page's HTML. The good news: **`editor.html`
now has a fill-in section with a live preview for almost every piece of
text on every page** (see below), so you rarely need to hunt through
raw HTML anymore. This table is here for reference / for anything you'd
rather edit by hand:

| Content | File |
|---|---|
| Hero headline/tagline, "How every trip is built" cards | `index.html` |
| "How to plan" heading + 4 steps, Tip Downloads block, "Follow the trip" heading | `index.html` |
| Trail-nav labels (the numbered row under the homepage hero) | `index.html` — see note below |
| Service pricing & descriptions, consultation form | `services.html` |
| Hat name/price/description/colors, request form labels | `shop.html` |
| Diary hero text, post list, signup form | `blog.html` + `data/posts.json` |
| Contact page text, dropdown options, form labels | `contact.html` |
| Process, payment, cancellation & disclaimer text | `process.html` |
| Tour hero/pricing/cards/form text | `tours.html` (not linked from navigation yet — see Section 5) |
| Photography hero/pricing/gallery/form text | `photography.html` + `data/photos.json` (not linked yet — see Section 5) |
| Marketing offerings, portfolio download, inquiry form | `marketing.html` (not linked yet — see Section 5) |
| Email, social links, tagline, "this site is free" line in the footer | **Repeated in every HTML page** — see note below |

**Trail-nav label note:** on the homepage, right under the hero, there's
a row of numbered buttons (currently: Do it yourself, Tips, Follow
along, Services, Shop, Blog). To rename any of them, open `index.html`,
find `<nav class="trail-nav"...>`, and edit the words right after each
`</span>` — e.g. in `<span class="num">1</span> Do it yourself`, just
change the words after the number. The number and the link target
(`href="#concept"` etc.) don't need to change unless you're also moving
what that button scrolls to. `editor.html` also has a dedicated "Trail
nav labels" section if you'd rather use the fill-in-and-copy approach.

**Footer note:** the footer (email, social links, copyright line) is
pasted separately into the bottom of every page — there's no shared
template file, so changing your email or a social handle means editing
it in each file, not just one. `editor.html`'s Footer section generates
one block you paste into all of them.

### The Content Editor tool (editor.html)
To make hand-editing safer, there's a helper page — `editor.html` —
that isn't part of the public site (it's not linked from your
navigation) but lives in your repo and opens right from your browser.
It's a big set of simple fill-in forms covering **every heading, card,
pricing tier, and form label on every page** (Home, Services, Shop,
Blog, Contact, Tours, Photography, plus the shared Footer). Nothing you
type in it gets sent anywhere — it just turns your answers into
ready-to-paste HTML, most with a live preview that updates as you type.

**To use it:**
1. Visit `https://your-username.github.io/deathbed-memories-website/editor.html`
   (same URL as your live site, with `/editor.html` added on the end).
2. Tap open the section you want — they're organized roughly in page
   order (Home first, then Services, Shop, Blog, Contact, Tours,
   Photography, Footer last).
3. Edit the fields — they're pre-filled with your current site copy.
4. Tap **Generate code**, then **Copy**.
5. Go to the actual page file on GitHub (noted at the top of each
   section, e.g. "Goes in: index.html"), tap edit, find the matching
   block of code, select just that chunk, delete it, and paste in the
   new version. Commit changes.

**Sections with two (or more) Generate buttons** — like "How to plan"
or "Tours — Pricing" — paste into two different spots in the file
(usually a heading block and a separate cards/tiers block below it).
Generate and paste each one separately; the "Goes in" note at the top
of each section tells you exactly which block goes where.

**Form-label sections work a little differently.** For the four request
forms (Shop, Contact, Tours, Photography), the Generate button produces
several individual lines rather than one block — each line replaces
the *one matching line* in the real file (matched by its `for="..."` or
`id="..."` attribute, which never changes). This is intentionally more
granular than the rest of the tool, because forms have technical bits
(field names, required flags, the Formspree connection) that must stay
exactly as they are for submissions to keep working — regenerating a
whole form risked accidentally undoing that. Find each line by its
attribute and swap in the new text; everything else on that line stays
put.

It won't ever break your file's overall structure as long as you paste
over the *same block or line* it tells you to — it's not a live
preview or an auto-publish tool, just a safer way to produce the HTML.

### Setting up the blog images folder
The `images/blog/` folder doesn't exist until you create it — GitHub's
plain "Upload files" button can't create a new nested folder by itself
on some browsers (including iPad Safari), so create it with the same
"type a path" trick used for `css/`, `js/`, and `data/`:

1. In your repo, tap **Add file → Create new file**.
2. In the filename box, type: `images/blog/README.txt`
3. In the content box, type anything, e.g. `Blog photos go here.`
4. Tap **Commit changes** — this creates the `images` folder and the
   `blog` folder inside it, together, in one step.
5. Go back to your file list, tap into `images`, then into `blog` —
   you're now inside that folder.
6. Tap **Add file → Upload files** (not "Create new file" this time —
   photos are binary, not text).
7. Choose your photo(s) from your iPad's photo library and upload.
8. Tap **Commit changes**.

After that, the folder already exists — adding more photos later is
just steps 5–8.

### Building the image path for a blog post
Once a photo is uploaded into `images/blog/`, you need to tell
`data/posts.json` exactly where to find it — this is the "path." It's
just three pieces stuck together: the folder, a slash, and the exact
filename (including the file extension like `.jpg`, `.jpeg`, `.png`,
or `.heic`).

**Worked example:** say you upload a photo from your iPad's library and
it's named `Personal Item.jpg`.

1. **Check the exact filename first.** On GitHub, tap into
   `images/blog/` and look at the filename exactly as it's listed —
   spelling, capitalization, and spacing all matter (`Personal
   Item.jpg` is not the same file as `personal item.jpg` or
   `personal-item.jpg` as far as the website is concerned).
2. **Two options for that filename:**
   - **Use it exactly as uploaded**, spaces and capitals included:
     `"image": "images/blog/Personal Item.jpg"`
     This works fine — browsers handle spaces in file paths okay.
   - **Or rename it first** (tap the file on GitHub → pencil icon →
     there's a rename option, or delete and re-upload with a new
     name) to something with no spaces or capitals, which is the
     more common convention and slightly tidier:
     `"image": "images/blog/personal-item.jpg"`
     Either approach works — pick whichever feels easier. Consistency
     matters more than which style you choose.
3. **Paste that exact string into the post's `image` field** in
   `data/posts.json`:
   ```json
   "image": "images/blog/Personal Item.jpg",
   ```
4. Double-check the file extension matches exactly — if the real file
   is `Personal Item.jpeg` (four letters) but you type `.jpg` (three)
   in the path, the image won't load. When in doubt, tap the file in
   GitHub and copy the extension exactly as shown there.

**If a photo doesn't show up on the blog:** it's almost always one of
these — a typo in the filename, a mismatched extension (`.jpg` vs.
`.jpeg`), wrong capitalization, or forgetting the `images/blog/` prefix
entirely.

### Adding a new blog post, step by step
1. Upload your photo into `images/blog/` (see folder setup above if
   it doesn't exist yet).
2. Open `data/posts.json`, copy one post's `{ ... }` block, paste it
   at the top of the list, and edit: `slug` (short, unique, no
   spaces — used internally), `title`, `date` (YYYY-MM-DD), `location`,
   `excerpt` (one sentence teaser), `image` (the path to your photo),
   and `content` (your full post, each paragraph wrapped in
   `<p>...</p>`).
3. Commit. Done — no HTML page to create.

### Updating "recent posts"
**Does this update automatically? No — you paste in new links by hand.**
None of the five platforms let a free static site pull new posts on its
own without either a paid developer account or a fragile third-party
workaround, so the reliable free approach is: whenever you post
something you want featured, open `data/social.json` and swap in that
post's link. It takes under a minute per platform. Open `data/social.json` and replace the placeholder `url` for each
platform with a link to one specific video/post/reel:
- **YouTube:** a link like `https://www.youtube.com/watch?v=XXXXXXX`
- **TikTok:** a link like `https://www.tiktok.com/@deathbed.memories/video/XXXXXXXXXXXXX`
- **Instagram:** a link like `https://www.instagram.com/p/XXXXXXXXX/` or `/reel/XXXXXXXXX/`
- **Lemon8 / OnlyFans:** these platforms don't allow public embeds, so
  they'll always show as a simple "View on [platform]" card — just
  keep the `url` pointed at your profile or the specific post.

---

## 4. Changing colors, fonts, and design

Open `css/style.css`. The very top of the file (`:root { ... }`) has
every brand color and font size defined once, with comments. Change a
value there and it updates across all five pages automatically. Each
section of the CSS file below that is labeled (COLORS, BUTTONS, FORMS,
etc.) if you want to adjust something more specific.

### The Design Editor tool (css-editor.html)
Same idea as `editor.html`, but for colors, fonts, and sizes instead of
text — with a **live preview** that updates as you move sliders or pick
colors, so you can see the change before committing anything.

**To use it:**
1. Visit `https://your-username.github.io/deathbed-memories-website/css-editor.html`.
2. Adjust colors (with a color picker or by typing a hex code), pick a
   header/body font from the dropdowns, and adjust the size sliders —
   watch the little preview card at the top update live.
3. Tap **Generate code**, then **Copy**.
4. Open `css/style.css` on GitHub, tap edit, select the whole
   `:root { ... }` block (from `:root {` down to its closing `}`),
   delete it, and paste in the new version. Commit changes.
5. **If you changed a font away from the defaults** (Georgia / Inter),
   a second box appears with a `<link>` snippet — paste that over the
   existing Google Fonts `<link>` lines in the `<head>` of **every**
   HTML page (index, services, shop, blog, contact), or that font won't
   actually load on the live site.

The color pickers only cover the 6 main brand colors (the ones you're
most likely to want to change). A few more technical variables — hover
shadow color, focus outline color, hairline colors — stay untouched by
this tool; edit those directly in `css/style.css` if you ever need to.

### Background photos on any section
`css-editor.html` also has a **"Background Photos"** section: pick a
photo from your device to preview it locally (it never uploads
anywhere from that tool — it's just a preview), and it shows you what
the automatic dark-overlay treatment will look like so text stays
readable over it. It then generates the exact class + inline style to
add to any section's opening tag. The actual photo still needs to be
uploaded to GitHub yourself (into an `images/backgrounds/` folder,
created the same "type a path" way as `images/blog/`) — this tool just
helps you decide if a photo will look good and hands you the code for
it.

**Ready-to-use snippets for the two homepage sections you asked about:**
- The "How every trip is built" section: change
  `<section id="concept">` in `index.html` to
  `<section id="concept" class="has-bg-photo" style="background-image:url('images/backgrounds/your-photo.jpg')">`
- The "Follow the trip" section: change
  `<section id="follow">` to
  `<section id="follow" class="has-bg-photo" style="background-image:url('images/backgrounds/your-photo.jpg')">`

(The green Tip Downloads box stays as a solid color — you asked to
keep that one as-is.)

### Preparing Nikon photos for use as backgrounds
DSLR photos are usually far bigger than a website needs — a single
shot can be 5–25MB at full resolution. Uploading them straight to
GitHub will work, but the page will load noticeably slower, especially
on mobile data. Before uploading a background photo:

1. **Resize it.** Background images never need to be larger than about
   **1920px on the longest side** — that's already sharp on any
   screen, including large desktop monitors. Anything bigger just adds
   file size with no visible benefit.
2. **Compress it.** Aim for roughly **200–500KB per photo** once
   resized. A free tool like [squoosh.app](https://squoosh.app) (works
   right in Safari, no app needed) lets you resize and compress a
   photo in one pass — upload the original, set the width to 1920px,
   choose JPEG at around 80% quality, and download the result.
3. **Rename it** to something simple before uploading — lowercase, no
   spaces, e.g. `mountain-sunset.jpg` — see Section 3's "Building the
   image path" notes for why this matters.
4. **Double-check the extension** matches exactly what you type in the
   code (`.jpg` vs `.jpeg` are genuinely different filenames to a
   website, as the shop photos found out).

If resizing/compressing feels like a hassle, you're also welcome to
upload the original photos here in a chat with me and ask me to
process them the same way I did for the hat photos — I'll hand back
web-ready versions with clean filenames, ready to upload.

GitHub itself won't accept any single file over 100MB, but that's not
really the limit that matters here — page speed is the real
consideration, and the 200–500KB target above is what keeps things
feeling fast.

## 5. Hidden pages — Tours, Photography &amp; Marketing

Three pages exist in your repo but aren't linked from your site's
navigation yet: `tours.html` (seasonal cannabis walking tours),
`photography.html` (landscape/nature print sales), and `marketing.html`
(your digital marketing services, with 10 placeholder offerings and a
downloadable portfolio sample). All three are fully built and
functional — visiting their exact URL works right now — they just
won't show up in your menu until you turn them on.

### Turning a hidden page on
Add one line to the `<ul class="nav-links">` list in **every** other
HTML page you want it discoverable from — for example, to launch the
marketing page:
```html
<li><a href="marketing.html">Marketing</a></li>
```
(swap in `tours.html`/`Tours` or `photography.html`/`Photography` the
same way for those). You'll usually also want to add the same line to
each page's footer `<ul class="footer-links">` list so it shows up
there too. To take a page offline again later, just delete those same
lines — the page itself stays in your repo, untouched, ready to switch
back on whenever.

### Setting up the photography gallery
The gallery on `photography.html` works exactly like the blog: photos
live in `images/photography/` and are listed in `data/photos.json`.

1. Create the folder: **Add file → Create new file** → type
   `images/photography/README.txt` → commit.
2. Upload your real photo(s) into that folder.
3. Open `data/photos.json`, copy one of the two example `{ ... }`
   blocks, and edit: `id` (short, unique, no spaces), `title`,
   `location`, and `image` (the path, e.g.
   `images/photography/mountain-ridge.jpg`) — same filename rules as
   the blog (see Section 3's "Building the image path" notes).
4. Commit. The photo appears in the gallery grid AND becomes an option
   in the print order form's "Which photo?" dropdown automatically.

### Editing tour or print pricing
Both pages follow the same pattern as `services.html` — pricing lives
directly in the HTML as `<div class="card">` blocks with a
`<p class="price">` line. You can edit this text directly in
`tours.html` or `photography.html` on GitHub, **or** use the dedicated
"Tours — Pricing" and "Photography — Pricing" sections in
`editor.html`, which cover the heading and all pricing tiers with a
live preview.

### Both pages' order/inquiry forms
Both use the same Formspree form as the rest of the site
(`https://formspree.io/f/mgaezpkg`), so tour requests and print orders
will land in the same inbox thread as your other inquiries, each
labeled with its own subject line so you can tell them apart. If you'd
rather keep them separate, create additional free forms at
formspree.io and swap the ID into each page's `<form action="...">`
line.

## 5.5 The homepage "Tip Downloads" block

The green color block on the homepage (under "How to plan") offers two
free downloadable guides instead of plain text — currently "5 Tips for
Travel Booking" and "5 Packing Tips," both PDFs living in a `files/`
folder at the root of your repo.

**Adding or swapping a guide:**
1. Upload the new PDF into `files/` (create the folder the same "type a
   path" way as `images/blog/`, if it isn't there yet:
   **Add file → Create new file** → type `files/README.txt` → commit —
   then go back and use **Add file → Upload files** for the actual PDF).
2. Open `index.html`, find the `<div class="who-actions">` block inside
   the green box, and update the button's `href="files/..."` to match
   your new filename, plus the visible button text.
3. Or use `editor.html`'s "Tip Downloads color block" section, which
   covers both buttons' labels and filenames with a live preview.

The exact same "the file needs to actually exist at that path" rule
from Section 3's blog-image notes applies here — a typo in the filename
or a missing upload means the download button 404s.

## 5.6 "Blog" is now "Diary" — and the footer's free-site CTA

**The Diary rename:** every visible mention of "Blog" across the site
(nav menus, footer links, the homepage's Follow card) now reads
"Diary." The underlying filename is still `blog.html` — renaming the
actual file would change your live URL and could break any links
you've already shared, so only the *visible word* changed. If you ever
want the URL itself to say `diary.html` too, that's a bigger step
(creating a new file and updating every link site-wide to match) —
worth asking for specifically if you want it.

**The footer's "this site is free" line:** every page's footer now
includes a short line under the copyright notice, explaining the site
costs nothing to run and linking to a CTA. That link
(`contact.html?topic=website`) uses a small trick: a bit of JavaScript
at the bottom of `contact.html` checks the URL for `?topic=website`
and, if it's there, auto-selects "Website design" in the dropdown and
pre-fills a starter message — so someone clicking that footer link
lands on a contact form that's already primed for the right
conversation. To change the wording of that footer line, search any
page for `footer-free` and edit the text inside that `<p>` tag (same
line, every page).

## 6. Design notes — the night-sky motif, and a css-editor limitation

The header background (on the homepage hero) and the top of every
footer now share a hand-drawn "night sky" scene — a dark gradient,
scattered stars, and a layered forest silhouette with a few thin
abstract branch lines, replacing the earlier flat contour-line pattern
and the solid triangle treeline. The hero version also adds two faint
aurora ribbons (the footer's version leaves those out — a full-height
scene reads well there, but a short strip repeated across the page
looked busier than intended, so it's the simpler variant). Both live as
raw SVG: the hero's version is inline in `index.html` (inside
`.topo-bg`), and the footer's version is a CSS `background-image` data
URL in `css/style.css` (`.site-footer::before`), built as a small
seamlessly-repeating tile so it looks correct at any screen width
rather than stretching. There's also a small matching accent (a soft
pastel rainbow squiggle plus a thin abstract-branch icon) inside the
homepage's green Tip Downloads block.

**Important limitation:** these decorative colors (the aurora teal/
purple/navy tones, the star color, the forest greens) are hand-picked
and hardcoded directly into the SVG markup — they are **not** wired to
the 6 main brand color variables in `css/style.css`. That means if you
use `css-editor.html` to change your brand colors, the night-sky scene
and pride-gradient strip will stay exactly as they are; they won't
automatically retint. This was a deliberate simplification — turning
every decorative color into its own slider would clutter the tool for
something you're unlikely to change often. If you ever do want to
recolor these, they need to be edited directly: search `css/style.css`
for `.site-footer::before` (footer scene) or open `index.html` and
search for `skyGrad`/`auroraGrad` (hero scene).

## 7. Site structure, for reference

```
index.html        → Home (tagline, approach cards, how-to-plan steps, tip downloads, follow-the-trip)
services.html      → Services, pricing, free async consultation form
shop.html          → Shop — the "No Gracias" cap (3 colors) + request form
blog.html          → Diary — post list + email signup (URL still says blog.html)
contact.html        → Contact form + direct email (supports ?topic=website prefill)
process.html         → Process & Terms — steps, payment, cancellation, disclaimers
tours.html          → Cannabis walking tours — NOT in nav yet (Section 5)
photography.html     → Landscape/nature print sales — NOT in nav yet (Section 5)
marketing.html        → Digital marketing services — NOT in nav yet (Section 5)
editor.html         → Private helper tool — every section, every page (Section 3)
css-editor.html      → Private helper tool — colors/fonts/sizes/backgrounds (Section 4)
css/style.css        → All colors, fonts, and layout
js/                → Site behavior (menu, scroll reveal, blog, social feed, photo gallery, hat swatches)
data/posts.json      → Diary posts — edit this to publish
data/social.json      → Recent social posts — edit this to update
data/photos.json      → Photography gallery — edit this to add prints for sale
files/              → Downloadable PDFs (2 free guides + marketing portfolio sample)
images/blog/          → Diary photos go here
images/shop/          → Hat color photos (hat-khaki.jpg, hat-navy.jpg, hat-black.jpg)
images/photography/    → Photography print images go here (create when ready)
images/backgrounds/    → Background photos for any section (create when ready)
```
