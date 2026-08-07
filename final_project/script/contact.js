document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Business hours ---------------- */
  const hoursTable = document.getElementById('hours-table');
  const badgeWrap = document.getElementById('status-badge-wrap');

  function renderHours() {
    const now = new Date();
    const { today, isOpen } = getOpenStatus(now);

    badgeWrap.innerHTML = `
      <div class="status-badge ${isOpen ? 'open' : 'closed'}">
        <span class="dot"></span>
        ${isOpen ? 'Open now' : 'Closed now'} — ${today.day}, ${formatHour(today.open)}${today.open !== null ? ' – ' + formatHour(today.close) : ''}
      </div>
    `;

    hoursTable.innerHTML = BUSINESS_HOURS.map((d) => `
      <tr class="${d.day === today.day ? 'today' : ''}">
        <td>${d.day}</td>
        <td>${d.open === null ? 'Closed' : `${formatHour(d.open)} – ${formatHour(d.close)}`}</td>
      </tr>
    `).join('');
  }
  renderHours();

  /* ---------------- Form validation ---------------- */
  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');

  const validators = {
    name: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => v.trim() === '' || /^[\d\s()+-]{7,20}$/.test(v.trim()),
    topic: (v) => v.trim() !== '',
    message: (v) => v.trim().length >= 20,
  };

  function validateField(field) {
    const el = document.getElementById(field);
    const errorEl = document.getElementById(`${field}-error`);
    const valid = validators[field](el.value);
    el.setAttribute('aria-invalid', String(!valid));
    if (errorEl) errorEl.classList.toggle('show', !valid);
    return valid;
  }

  Object.keys(validators).forEach((field) => {
    const el = document.getElementById(field);
    el.addEventListener('blur', () => validateField(field));
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = Object.keys(validators).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      status.classList.remove('show');
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    status.classList.add('show');
    form.reset();
    Object.keys(validators).forEach((field) => {
      document.getElementById(field).removeAttribute('aria-invalid');
      document.getElementById(`${field}-error`)?.classList.remove('show');
    });
  });

  /* ---------------- Geolocation: nearest service hub ---------------- */
  const HUBS = [
    { name: 'Northeast Hub — Newark, NJ', lat: 40.7357, lng: -74.1724 },
    { name: 'Southeast Hub — Atlanta, GA', lat: 33.749, lng: -84.388 },
    { name: 'Midwest Hub — Chicago, IL', lat: 41.8781, lng: -87.6298 },
    { name: 'South Central Hub — Dallas, TX', lat: 32.7767, lng: -96.797 },
    { name: 'Mountain Hub — Denver, CO', lat: 39.7392, lng: -104.9903 },
    { name: 'Pacific Hub — Sacramento, CA', lat: 38.5816, lng: -121.4944 },
    { name: 'Northwest Hub — Seattle, WA', lat: 47.6062, lng: -122.3321 },
  ];

  function haversineMiles(lat1, lng1, lat2, lng2) {
    const R = 3958.8;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }

  const locateBtn = document.getElementById('locate-btn');
  const locateResult = document.getElementById('locate-result');

  locateBtn?.addEventListener('click', () => {
    if (!('geolocation' in navigator)) {
      locateResult.textContent = 'Geolocation isn\u2019t supported in this browser.';
      locateResult.classList.add('show');
      return;
    }

    locateBtn.disabled = true;
    locateBtn.textContent = 'Locating…';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let nearest = null;
        let nearestDist = Infinity;
        HUBS.forEach((hub) => {
          const dist = haversineMiles(latitude, longitude, hub.lat, hub.lng);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = hub;
          }
        });
        locateResult.innerHTML = `Nearest hub: <strong>${nearest.name}</strong> — approx. ${Math.round(nearestDist)} miles away.`;
        locateResult.classList.add('show');
        locateBtn.disabled = false;
        locateBtn.textContent = 'Use my location';
      },
      (error) => {
        const messages = {
          1: 'Location permission was denied.',
          2: 'Location could not be determined.',
          3: 'Location request timed out.',
        };
        locateResult.textContent = messages[error.code] || 'Location request failed.';
        locateResult.classList.add('show');
        locateBtn.disabled = false;
        locateBtn.textContent = 'Use my location';
      },
      { timeout: 8000 }
    );
  });

  /* ---------------- Browser info panel ---------------- */
  const envList = document.getElementById('env-list');
  const env = [
    ['Browser language', navigator.language || 'Unknown'],
    ['Platform', navigator.platform || 'Unknown'],
    ['Screen size', `${window.screen.width} × ${window.screen.height}`],
    ['Viewport', `${window.innerWidth} × ${window.innerHeight}`],
    ['Cookies enabled', navigator.cookieEnabled ? 'Yes' : 'No'],
    ['Connection status', navigator.onLine ? 'Online' : 'Offline'],
  ];
  envList.innerHTML = env.map(([label, value]) => `<li><span>${label}</span><span>${value}</span></li>`).join('');
});
