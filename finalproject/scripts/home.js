document.addEventListener('DOMContentLoaded', () => {
  const announcements = [
    "New line of high-efficiency backup power units available now.",
    "Emergency response teams currently on 24/7 active stand-by.",
    "Scheduled floor maintenance slots open for Q3 consulting."
  ];

  let currentIndex = 0;
  const tickerText = document.getElementById('ticker-text');
  const prevBtn = document.getElementById('ticker-prev');
  const nextBtn = document.getElementById('ticker-next');

  function updateTicker() {
    if (tickerText) {
      tickerText.textContent = announcements[currentIndex];
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + announcements.length) % announcements.length;
      updateTicker();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % announcements.length;
      updateTicker();
    });

    updateTicker();
  }
});
