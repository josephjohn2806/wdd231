# Final Project — finalproject/

This folder contains a complete 3-page final project demonstrating HTML, CSS, and JavaScript requirements for the course. It was scaffolded and committed directly to the `main` branch.

Structure
- index.html — Landing / Home page (required)
- about.html — About page (required)
- projects.html — Projects listing (required)
- contact.html — Contact form page (submits to form-action.html)
- form-action.html — Displays submitted form data (does not count toward the 3 pages)
- attributions.html — Resource attributions page (linked from the footer)
- assets/
  - css/style.css — main stylesheet (green design system)
  - js/*.js — ES modules: main.js, dataLoader.js, renderCards.js, modal.js, storage.js
  - data/data.json — Local JSON data used to generate 15 items
  - images/*.svg — lightweight SVG images and favicon

How the project meets the course requirements
- Files and folders use lowercase, no spaces, and semantic names.
- Semantic HTML elements used: header, nav, main, footer, article, etc.
- Metadata: title, meta description, meta author, and Open Graph tags are present.
- CSS: uses a green design system (primary --green-700: #0b8457) and is responsive down to 320px without horizontal scrolling.
- JavaScript features:
  - Fetch API with try/catch in `assets/js/dataLoader.js` to load `assets/data/data.json`.
  - Dynamically generates 15 items in `renderCards.js` using template literals and array methods.
  - LocalStorage helpers in `storage.js` to persist favorites (key: `finalproject_favorites`).
  - Accessible modal in `modal.js` with focus management and keyboard handling (Escape to close).
  - ES Modules used throughout.
- Images are SVGs, lazy-loaded where used, and include alt text.
- Contact form demonstrates proper labels and submits via GET to `form-action.html` which displays the data.

Preview locally
1. Pull the latest main branch.
2. From the repository root run a static server (Python):
   `python -m http.server 8000`
3. Open http://localhost:8000/finalproject/index.html

Notes and next steps
- Replace placeholder content and SVGs in `assets/images/` with your own assets.
- Update the demo video link in each page footer to point to your uploaded video URL.
- If you want a PR instead of direct commits to main, I can create a feature branch and open a PR.
