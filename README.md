# Developer Portfolio — Vite + React + Tailwind

Modern, minimal, and accessible developer portfolio. SPA with smooth scrolling, routes for /projects and /blog, dark/light theme with persistence, and serverless-friendly contact form.

## Tech Stack
- Vite + React + React Router
- Tailwind CSS
- Framer Motion
- ESLint + Prettier
- Vitest + React Testing Library

## Getting Started
- npm:
  - npm install
  - npm run dev
  - npm run build && npm run preview
- yarn:
  - yarn
  - yarn dev
  - yarn build && yarn preview

Environment variables (optional):
- Create `.env` and set `VITE_FORMSPREE_ID=<your_form_id>` for contact form submission.

## Project Structure
- /public: favicon, social preview, robots.txt, feed.json
- /src/assets: images/icons if you add local files
- /src/components: Header, Footer, Hero, ProjectCard, ContactForm, Skills, Experience
- /src/pages: Home, Projects (filter + search), Blog (static)
- /src/data: projects, skills, experience
- main.jsx, App.jsx, index.css (Tailwind entry)

## Contact Form Integrations
- Formspree:
  - Create a form at formspree.io, copy the form ID.
  - Add to `.env`: `VITE_FORMSPREE_ID=xxxxxx`.
  - The form will POST to `https://formspree.io/f/<id>`.
- Netlify Forms:
  - Ensure `<form name="contact" method="POST" data-netlify="true">` is present (it is).
  - Include hidden `form-name` input (included).
  - Deploy to Netlify. Submissions will show in Forms.
- Advanced: GitHub Actions + SendGrid
  - Create a small serverless endpoint (e.g., Netlify Function or Vercel Function) that sends email via SendGrid.
  - Store API key as encrypted secret (never commit).
  - Trigger on form POST; return 200 on success.

## Accessibility & SEO
- Semantic landmarks: header, main, section, footer, nav.
- Keyboard accessible controls with visible focus rings.
- Color contrast meets WCAG AA with provided palette.
- Update meta tags in `index.html` (title, description, OG/Twitter, canonical).
- robots.txt provided; consider adding sitemap.xml with your host.

## Performance
- Optimized via Vite and code-splitting (lazy routes).
- Example responsive images via `<picture>` and `loading="lazy"`.
- Respect `prefers-reduced-motion`.
- Tips to reach Lighthouse 90+:
  - Use webp images and smaller sizes.
  - Self-host fonts or use `display=swap` (already set).
  - Minimize third-party scripts.
  - Add HTTP caching headers on deploy (Netlify/Vercel defaults are good).

Run Lighthouse locally:
- Chrome DevTools > Lighthouse > Generate report.
- Or `npm i -g lighthouse` then: `lighthouse http://localhost:5173 --view`.

## Testing & Linting
- Lint: `npm run lint`
- Tests: `npm test` (Vitest + RTL)
- Optional Husky:
  - `npx husky init`
  - Add `npm run lint && npm test` to `.husky/pre-commit`

## Deployment
- Vercel:
  - Connect repo. Framework: Vite.
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Env vars: `VITE_FORMSPREE_ID` (optional)
- Netlify:
  - Connect repo or drag-and-drop `dist`.
  - Build Command: `npm run build`
  - Publish Directory: `dist`
  - Env vars: `VITE_FORMSPREE_ID` (optional)
  - Netlify Forms works automatically.

## Customization
- Update name, bio, and links in `Hero.jsx` and `Header.jsx`.
- Update projects in `src/data/projects.js` (title, description, tech, links).
- Change skills in `src/data/skills.js`, experience in `src/data/experience.js`.
- Colors/Theme: adjust Tailwind `tailwind.config.cjs` colors and CSS variables in `src/index.css`.
- Fonts: edit Google Fonts link in `index.html` (use Space Grotesk for headings if preferred).
- Replace `/public/social-card.png` and `/public/favicon.svg`.
- Resume link: replace `/resume.pdf` in `Hero.jsx`.

## Admin: Adding Projects
- Edit `src/data/projects.js`. Each project:
  - slug, title, description (1–2 lines), image URL, alt, tech array, live/code URLs.
- They will auto-appear in Home and Projects pages. Tags are auto-generated.

## Optional Analytics (off by default)
- GA4 or Plausible:
  - Add snippet into `index.html`.
  - Ensure compliance with privacy laws (consent banner if needed).

## SEO Checklist
- Update `title`, `description`, `og:image`, and `canonical` in `index.html`.
- Add `sitemap.xml` at your domain root (use a simple generator).
- Keep `robots.txt` updated with your canonical host.
- Add `feed.json` URL to your social profiles if you publish posts.

---

# Run Locally

- npm
  - npm install
  - npm run dev
  - npm run build && npm run preview

- yarn
  - yarn
  - yarn dev
  - yarn build && yarn preview

---

# Short Customization Guide

- Change your name, role, bio, and social links in `src/components/Hero.jsx` and `src/components/Header.jsx`. Replace the resume link in `Hero.jsx` with your actual file path. Update `src/data/projects.js`, `skills.js`, and `experience.js` to reflect your real work. For project images, swap in your URLs or local assets, preserving alt text for accessibility.

- Adjust the look and feel by editing color tokens in `tailwind.config.cjs` and CSS variables in `src/index.css`. Swap heading font to Space Grotesk by replacing the Google Fonts link in `index.html` and updating `fontFamily.heading` in Tailwind. You can also tweak corner radius and shadows in Tailwind’s `extend` config.

Deployment quick commands:
- Vercel CLI: npx vercel --prod
- Netlify CLI: npx netlify deploy --build --prod --dir=dist
