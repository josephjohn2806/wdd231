# Final Project — finalproject/

This folder contains the finished 3-page final project demonstrating HTML, CSS, and JavaScript requirements for the course. Changes include:

- Added client-side search and category filter on projects page (assets/js/main.js).
- Fixed data fetch path to use a relative path so the site works when served from /finalproject/.
- Improved content copy across pages and updated demo video link placeholder.

Structure
- index.html — Landing / Home page (required)
- about.html — About page (required)
- projects.html — Projects listing (required) with search and filter
- contact.html — Contact form page (submits to form-action.html)
- form-action.html — Displays submitted form data (does not count toward the 3 pages)
- attributions.html — Resource attributions page (linked from the footer)
- assets/
  - css/style.css — main stylesheet (green design system)
  - js/*.js — ES modules: main.js, dataLoader.js, renderCards.js, modal.js, storage.js
  - data/data.json — Local JSON data used to generate 15 items
  - images/*.svg — lightweight SVG images and favicon

Preview locally
1. Pull the latest main branch.
2. From the repository root run a static server (Python):
   `python -m http.server 8000`
3. Open http://localhost:8000/finalproject/index.html

Notes
- Update the Demo Video links in the footer to your real video URL.
- Replace sample SVGs and placeholder copy with your own content when ready.
