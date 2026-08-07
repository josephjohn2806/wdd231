// Shared behavior across all pages: mobile nav toggle + footer year.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Business hours, shared by the home-page status strip and the
 * contact page's hours table. Times are in the facility's local time.
 */
const BUSINESS_HOURS = [
  { day: 'Sunday', open: null, close: null },
  { day: 'Monday', open: 8, close: 18 },
  { day: 'Tuesday', open: 8, close: 18 },
  { day: 'Wednesday', open: 8, close: 18 },
  { day: 'Thursday', open: 8, close: 18 },
  { day: 'Friday', open: 8, close: 17 },
  { day: 'Saturday', open: 9, close: 13 },
];

function getOpenStatus(date = new Date()) {
  const today = BUSINESS_HOURS[date.getDay()];
  const hour = date.getHours() + date.getMinutes() / 60;
  const isOpen = today.open !== null && hour >= today.open && hour < today.close;
  return { today, isOpen };
}

function formatHour(h) {
  if (h === null) return 'Closed';
  const period = h >= 12 ? 'PM' : 'AM';
  let hr = h % 12;
  if (hr === 0) hr = 12;
  return `${hr}:00 ${period}`;
}

