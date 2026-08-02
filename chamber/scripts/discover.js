/* ===========================================================
   JJ ENTERPRISE — Discover Page Script
   Handles: mobile nav drawer, visitor message (Requirement 11),
   points-of-interest cards, footer year/last-modified
   =========================================================== */

// ---------- Mobile nav drawer ----------
// Handled entirely by CSS via the #navToggleCheckbox :checked state in discover.html/discover.css.
// No JS needed here, so the menu still works even if this script fails to load.

// ---------- Footer: current year + last modified ----------
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// ---------- Requirement 11: Visitor message using localStorage ----------
function showVisitMessage() {
  const visitText = document.getElementById('visitText');
  const lastVisit = localStorage.getItem('jjLastVisit');
  const now = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;

  if (!lastVisit) {
    visitText.textContent = "Welcome! Let us know if this is your first time visiting our site.";
  } else {
    const daysBetween = Math.floor((now - Number(lastVisit)) / oneDay);
    if (daysBetween < 1) {
      visitText.textContent = "Back so soon! Awesome to see you again today.";
    } else if (daysBetween === 1) {
      visitText.textContent = "You last visited 1 day ago.";
    } else {
      visitText.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem('jjLastVisit', now);
}

// ---------- Points of Interest data ----------
const pointsOfInterest = [
  {
    name: "Kenyatta International Convention Centre",
    address: "Harambee Ave, Nairobi",
    description: "Iconic conference and event venue hosting regional business summits and exhibitions.",
    image: "images/kicc.webp",
    hours: "Mon–Sat: 8:00 AM – 6:00 PM"
  },
  {
    name: "Two Rivers Tech Park",
    address: "Limuru Rd, Nairobi",
    description: "A growing hub for startups and digital enterprises within the greater Nairobi corridor.",
    image: "images/tworivers.webp",
    hours: "Mon–Fri: 9:00 AM – 5:00 PM"
  },
  {
    name: "Nairobi National Museum",
    address: "Museum Hill Rd, Nairobi",
    description: "Cultural landmark showcasing Kenya's heritage, popular for corporate and tourist visits alike.",
    image: "images/museum.webp",
    hours: "Daily: 8:30 AM – 5:30 PM"
  },
  {
    name: "Karura Forest",
    address: "Kiambu Rd, Nairobi",
    description: "Urban forest reserve offering trails and retreat spaces for team-building events.",
    image: "images/karura.webp",
    hours: "Daily: 6:00 AM – 6:00 PM"
  },
  {
    name: "Nairobi Railway Museum",
    address: "Station Rd, Nairobi",
    description: "Historic site tracing the region's rail and trade history, adjacent to the CBD.",
    image: "images/railway.webp",
    hours: "Mon–Sat: 9:00 AM – 4:30 PM"
  },
  {
    name: "The Hub Karen",
    address: "Karen, Nairobi",
    description: "Retail and lifestyle complex popular for networking events and client meetings.",
    image: "images/hubkaren.webp",
    hours: "Daily: 9:00 AM – 9:00 PM"
  }
];

function buildCards() {
  const container = document.getElementById('cardsContainer');
  const markup = pointsOfInterest.map(place => `
    <article class="poi-card">
      <img src="${place.image}" alt="${place.name}" loading="lazy" width="400" height="200">
      <div class="poi-body">
        <h3>${place.name}</h3>
        <address><i class="fa-solid fa-location-dot"></i> ${place.address}</address>
        <p>${place.description}</p>
        <p class="poi-hours"><i class="fa-solid fa-clock"></i> ${place.hours}</p>
      </div>
    </article>
  `).join('');

  container.innerHTML = markup;
}

// ---------- Init ----------
showVisitMessage();
buildCards();


