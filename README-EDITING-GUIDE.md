# Saurabh Kumar — Portfolio: Editing Guide

## 1. Run it locally

You need Node.js installed (download from nodejs.org if you don't have it).

```
cd saurabh-portfolio
npm install
npm start
```

This opens http://localhost:3000 — the site reloads automatically as you edit.

## 2. Edit your content (the only file you usually need)

Everything you see on the site — headline, bio, skills, jobs, clients, form
labels — lives in **one file**:

```
src/data/content.js
```

It has two blocks: `en: { ... }` and `de: { ... }`, mirrored 1-to-1. If you
change a bullet point in English, change the matching one in German too, or
that language's page will show stale text.

Examples:
- Add a new client → add a line to `clients.list` (and `clients.list` in `de`).
- Add a new skill → add `{ name: "GraphQL", cat: "backend" }` to `skills.items`.
- Fix a job bullet → edit the string inside `experience.jobs[i].bullets`.
- Change your email/LinkedIn/resume link → edit `siteConfig` at the bottom of
  the same file.

You never need to touch the component files (`.js` files in `src/components`)
for text changes — only if you want to change layout or add a new section.

## 3. Set up the contact form (EmailJS)

The contact form uses EmailJS (same service your old site used).

1. Copy `.env.example` to a new file named `.env` in the project root.
2. Log in to https://dashboard.emailjs.com and copy your Service ID,
   Template ID, and Public Key into `.env`:
   ```
   REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
   REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
   ```
3. Restart `npm start` after editing `.env` (env vars only load on startup).
4. In the EmailJS dashboard, restrict the key to your live domain once you've
   deployed, so it can't be reused by anyone who reads your public source.

`.env` is already in `.gitignore` — it will never be committed to GitHub.

## 4. Replace your CV file

Your CV button links to `/resume.pdf`. To update it: replace the file at
`public/resume.pdf` with your latest PDF, keeping the same filename. No code
change needed.

## 5. Replace your photo

Your photo is `src/assets/avatar.jpeg`. Replace the file (same filename) to
swap in a new photo, or update the `import avatar from "../assets/avatar.jpeg"`
line at the top of `src/components/Hero.js` if you rename it.

## 6. Deploy it (GitHub Pages — free)

```
npm install gh-pages --save-dev   # already in package.json, just in case
```

1. Push this project to a GitHub repository.
2. In `package.json`, set `"homepage"` to your GitHub Pages URL, e.g.
   `"https://yourusername.github.io/portfolio"`.
3. Run:
   ```
   npm run deploy
   ```
4. In your repo settings → Pages, set the source branch to `gh-pages`.

Your EmailJS public key will be visible in the deployed JS bundle either way
— that's normal for client-side EmailJS. The domain restriction in step 3
above is what actually protects you, not hiding the key.

## 7. Common errors and fixes

- **"react-scripts: not found"** → run `npm install` again, make sure it
  finishes without red error text.
- **Blank page after `npm start`** → check the browser console (F12) for the
  actual error; almost always a typo in `content.js` (e.g. a missing comma
  or quote).
- **Contact form says "not configured yet"** → you haven't filled in `.env`
  yet, or forgot to restart `npm start` after adding it.
- **Language toggle shows English text on the German side or vice versa** →
  you edited one language block in `content.js` but not the other.

## 8. What's already done for you

- Dark "precision" theme you picked, fully responsive down to mobile.
- EN/DE language toggle (top right of the navbar).
- Interactive filterable skills grid (Frontend / Backend / CMS / Tools).
- Full work history from your Lebenslauf: Quess Corp (Estée Lauder brands),
  Worldex India, Amazon Development Center, and your LaughTale venture.
- Clients section including Estée Lauder, Bobbi Brown (BE/NL), Jo Malone,
  Aveda, plus your earlier India-based clients.
- Certifications, education (with your ZAB-recognised EQF Level 6 note),
  and language proficiency (EN C1, DE A1 → B1).
- Contact form wired for EmailJS, with your keys kept out of source control.
- No Projects section (removed per your request).

## Things I wasn't sure about — check these

1. **LaughTale (cloud kitchen) entry** — I included it as a "Founder /
   entrepreneurial venture" card since it shows real leadership and ops
   experience, but it's not a dev role. If you'd rather keep the page purely
   developer-focused, delete that job object from `experience.jobs` in both
   language blocks.
2. **German level shown as "A1 → B1"** — your official CV lists A1. I added
   "actively progressing toward B1" since that's true and reads well to German
   recruiters, but tell me if you'd rather show just "A1" plainly.
3. **Client logos** — I used text-only client cards instead of real logos
   (including for your old clients like Worldex/CTC) to keep the whole
   section visually consistent and avoid any trademark concerns with using
   Estée Lauder/Aveda/Jo Malone logo images without permission. If you have
   rights to use your old clients' logo files, I can add those back in for
   just that subset.
4. **Amazon Development Center role** — kept as "Customer Support Associate"
   since it's not a dev role either, but it's a recognisable name; let me know
   if you'd rather shorten or remove it.
