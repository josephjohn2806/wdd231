// Nav Toggle
export function initNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const yearSpan = document.querySelector('[data-year]');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// LocalStorage User Preference Tracking
export function trackVisit() {
  const visits = Number(localStorage.getItem('pageVisits')) || 0;
  localStorage.setItem('pageVisits', visits + 1);
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  trackVisit();
});
