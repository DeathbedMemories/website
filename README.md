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
into the contact form, the blog "notify me" signup, and the shop request
form. Your Calendly link
(`https://calendly.com/dbmems-proton/30min`) is already embedded on the
Services page. You don't need to do anything else for these to work —
this section just explains how they work, in case you ever want to
change or replace them.

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
3. Open the relevant file in GitHub (`contact.html`, `blog.html`, or
   `shop.html`), find the existing `action="https://formspree.io/f/mgaezpkg"`
   line, and replace the ID with your new one.
4. Commit the change. Test the form on your live site.

### Free consultation booking
The Services page embeds **Calendly** (free plan) so people can book a
time directly on your calendar. If you ever want to point it at a
different event type or account:
1. In [calendly.com](https://calendly.com), create/open the event type,
   click **Share**, and copy the event link.
2. Open `services.html` in GitHub's editor, find
   `data-url="https://calendly.com/dbmems-proton/30min"`, and replace
   the link. Commit the change.

### Setting up the shop
The shop currently sells one item — the "No Gracias" cap — and instead of
an instant checkout, `shop.html` has a **request form** (already
connected to the same Formspree form as the contact form): the buyer
enters their name, email, quantity, and shipping address, it lands in
your inbox, and you follow up with a payment link (Wise, PayPal, or
e-transfer) yourself.

- To change the price, product name, or description, edit the text
  directly in `shop.html` inside the `<div class="card reveal">` block
  — search for `$40 CAD`.
- To add a second product later, copy the whole `.shop-layout` block
  (both the product card and its form) and edit the copy.
- The hat graphic on the page right now is a placeholder built with
  code (no photo needed to look finished). Once you have a real
  product photo, replace the `<div class="hat-mockup">...</div>` block
  with `<img class="product-image" src="images/shop/hat.jpg" alt="...">`
  — create an `images/shop/` folder and upload your photo there first.
- If you'd rather shop requests land in a separate inbox thread from
  general inquiries, create a second free form at formspree.io and
  swap its ID into `shop.html`'s `action="https://formspree.io/f/mgaezpkg"` line.

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
Homepage headlines, service pricing, the shop description, and the
contact form's dropdown all live directly inside their page's HTML —
there's no data file for these. Here's where each thing lives:

| Content | File |
|---|---|
| Hero headline/tagline, "how I build every trip" cards | `index.html` |
| "How I plan" heading + 4 values, "Who this is for" block, "Follow the trip" heading | `index.html` |
| Trail-nav labels (the numbered row under the homepage hero) | `index.html` — see note below |
| Service pricing & descriptions, consultation heading | `services.html` |
| Hat name/price/description | `shop.html` |
| Contact page text, dropdown options | `contact.html` |
| Tour pricing & inquiry form text | `tours.html` (not linked from navigation yet — see Section 6) |
| Photography pricing & gallery | `photography.html` + `data/photos.json` (not linked yet — see Section 6) |
| Email, social links, tagline in the footer | **Repeated in every HTML page** — see note below |

**Trail-nav label note:** on the homepage, right under the hero, there's
a row of numbered buttons (Home, About, Follow along, Services, Shop,
Blog). To rename any of them, open `index.html`, find
`<nav class="trail-nav"...>`, and edit the words right after each
`</span>` — e.g. in `<span class="num">1</span> Home`, just change
"Home" to whatever you want. The number and the link target
(`href="#concept"` etc.) don't need to change unless you're also moving
what that button scrolls to.

**Footer note:** the footer (email, social links, copyright line) is
pasted separately into the bottom of every page — there's no shared
template file, so changing your email or a social handle means editing
it in each file, not just one.

### The Content Editor tool (editor.html)
To make hand-editing these safer, there's a small helper page —
`editor.html` — that isn't part of the public site (it's not linked
from your navigation) but lives in your repo and opens right from your
browser. It's a set of simple fill-in forms; nothing you type in it
gets sent anywhere, it just turns your answers into ready-to-paste
HTML.

**To use it:**
1. Visit `https://your-username.github.io/deathbed-memories-website/editor.html`
   (same URL as your live site, with `/editor.html` added on the end).
2. Tap open the section you want: Hero, "How I build every trip" cards,
   "How I plan" heading + 4 values, "Who this is for" block, "Follow the
   trip" heading, Services pricing, Shop, Contact dropdown, or Footer.
3. Edit the fields — they're pre-filled with your current site copy, and
   most sections show a live preview that updates as you type.
4. Tap **Generate code**, then **Copy**.
5. Go to the actual page file on GitHub (noted at the top of each
   section, e.g. "Goes in: index.html"), tap edit, find the matching
   block of code, select just that chunk, delete it, and paste in the
   new version. Commit changes.

Note: the "How I plan" section has two separate Generate buttons — one
for the heading text, one for the 4 values — since they paste into two
different spots in the file. Generate and paste each one separately.

It won't ever break your file's overall structure as long as you paste
over the *same block* it tells you to — it's not a live preview or an
auto-publish tool, just a safer way to produce the HTML snippet.

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

# Site structure for reference
index.html        → Home (tagline, approach cards, values, follow-the-trip)
services.html      → Services, pricing, free consultation booking
shop.html          → Shop — the "No Gracias" cap + purchase request form
blog.html          → Blog list + email signup
contact.html        → Contact form + direct email
tours.html          → Cannabis walking tours — NOT in nav yet (Section 6)
photography.html     → Landscape/nature print sales — NOT in nav yet (Section 6)
editor.html         → Private helper tool — generates paste-ready code (Section 3)
css-editor.html      → Private helper tool — colors/fonts/sizes/backgrounds (Section 4)
css/style.css        → All colors, fonts, and layout
js/                → Site behavior (menu, scroll reveal, blog, social feed, photo gallery)
data/posts.json      → Blog posts — edit this to publish
data/social.json      → Recent social posts — edit this to update
data/photos.json      → Photography gallery — edit this to add prints for sale
images/blog/          → Blog photos go here
images/photography/    → Photography print images go here (create when ready)
