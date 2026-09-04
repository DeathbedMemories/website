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

## 2.5 IMPORTANT — before your site is fully live

Two features need one-time free signups to actually work. Until you do
these, the forms and booking widget will show placeholder text.

### Setting up the contact & blog signup forms
Both the contact form and the "notify me" blog signup use **Formspree**
(free plan, no credit card) to email submissions straight to
dbmems@proton.me — GitHub Pages can't run its own backend, so this is
the simplest free way to make a form actually send email.

1. Go to [formspree.io](https://formspree.io) and sign up free.
2. Click **New Form**, name it, and set the email to
   `dbmems@proton.me`.
3. Formspree gives you a form endpoint like
   `https://formspree.io/f/abcdwxyz`.
4. Open `contact.html` and `blog.html` in GitHub (click the file, then
   the pencil/edit icon). Find `YOUR_FORM_ID` in each file's `<form
   action="...">` line and replace it with your real ID (in
   `contact.html` you can also just create a second Formspree form for
   the blog signups, or reuse the same one).
5. Commit the change. Test the form on your live site.

### Setting up free consultation booking
The Services page embeds **Calendly** (free plan) so people can book a
time directly on your calendar.

1. Go to [calendly.com](https://calendly.com) and sign up free.
2. Create an event type called "Free 10-Minute Consultation," set it
   to 10 minutes, and connect it to whatever calendar you use.
3. Click **Share** → copy your event link (looks like
   `https://calendly.com/your-username/free-consultation`).
4. Open `services.html` in GitHub's editor, find
   `data-url="https://calendly.com/your-username/free-consultation"`
   and replace it with your real link. Commit the change.

### Setting up the shop
GitHub Pages can display pages but **cannot process payments** — it's
just free file hosting, not a store. `shop.html` shows your product
grid, but each "Shop this design" button needs to point somewhere that
can actually take payment. Two free-to-start options:

- **Payhip** or **Gumroad** (free to list, they take a small % per
  sale, no monthly fee) — upload your design, set a price, get a
  product link, paste that link into the `buyUrl` field for that
  product in `data/products.json`.
- **Printful + Etsy** (or Printful's own free storefront) if you want
  print-on-demand apparel with no inventory to hold — Printful prints
  and ships when someone orders, Etsy or Printful's storefront handles
  checkout.

Until you set this up, the buttons are placeholders (`"buyUrl": "#"`).

---

## 3. How to update content later (no coding required)

Everything you'll want to change regularly lives in the `data/` folder
as plain, structured text files. You never need to touch the HTML for
these:

| To change... | Edit this file |
|---|---|
| Add a new blog post | `data/posts.json` |
| Add/remove/reprice shop items | `data/products.json` |
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
Open `data/social.json` and replace the placeholder `url` for each
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

```
index.html        → Home (tagline, name concept, values, recent posts)
services.html      → Services, pricing, free consultation booking
shop.html          → Apparel shop
blog.html          → Blog list + email signup
contact.html        → Contact form + direct email
css/style.css        → All colors, fonts, and layout
js/                → Site behavior (menu, blog, shop, social feed)
data/posts.json      → Blog posts — edit this to publish
data/products.json    → Shop items — edit this to update
data/social.json      → Recent social posts — edit this to update
images/blog/          → Blog photos go here
images/shop/          → Product photos go here
```
