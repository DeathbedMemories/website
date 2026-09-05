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

### Adding a new blog post, step by step
1. Add your photo to the `images/blog/` folder in GitHub (there's an
   "Add file" → "Upload files" button in any folder).
2. Open `data/posts.json`, copy one post's `{ ... }` block, paste it
   at the top of the list, and edit: `slug` (short, unique, no
   spaces — used internally), `title`, `date` (YYYY-MM-DD), `location`,
   `excerpt` (one sentence teaser), `image` (the path to your photo),
   and `content` (your full post, each paragraph wrapped in
   `<p>...</p>`).
3. Commit. Done — no HTML page to create.

### Updating "recent posts" (Section 6)
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

## 5. Site structure, for reference

