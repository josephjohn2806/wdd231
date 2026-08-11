// app.js - toggles hamburger nav and small enhancements
document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.nav-toggle');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.getElementById('primary-navigation');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  });
});
