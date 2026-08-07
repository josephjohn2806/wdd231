// Dynamic customer announcements — rotates through a list on a timer,
// with manual prev/next controls. Content stands in for a live feed.
document.addEventListener('DOMContentLoaded', () => {
  const announcements = [
    'Preventive Maintenance Program now includes quarterly thermal imaging at no extra cost.',
    'Emergency Response coverage expanded to two new regions this quarter.',
    'Torque-Line Conveyor Kit lead time reduced from 8 weeks to 6.',
    'New: bundle any two Services items and waive the setup fee.',
  ];

  const textEl = document.getElementById('ticker-text');
  const prevBtn = document.getElementById('ticker-prev');
  const nextBtn = document.getElementById('ticker-next');
  if (!textEl) return;

  let index = 0;
  let timer;

  function render() {
    textEl.textContent = announcements[index];
  }

  function next() {
    index = (index + 1) % announcements.length;
    render();
  }

  function prev() {
    index = (index - 1 + announcements.length) % announcements.length;
    render();
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  nextBtn?.addEventListener('click', () => { next(); restartTimer(); });
  prevBtn?.addEventListener('click', () => { prev(); restartTimer(); });

  render();
  restartTimer();
});
