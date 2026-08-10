// site-wide utilities
export function initNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Close nav when a link is selected on small screens
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

export function initSite() {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Reduce motion preference respect
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) document.documentElement.classList.add('reduce-motion');
}

// auto-initialize when script loaded as module
document.addEventListener('DOMContentLoaded', () => {
  try { initNav(); } catch (e) { /* no-op */ }
  try { initSite(); } catch (e) { /* no-op */ }
});
