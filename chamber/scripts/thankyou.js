/* ===========================================================
   JJ Company Enterprise — Thank You Page
   scripts/thankyou.js
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavDrawer();
  renderSummary();
});

/* -----------------------------------------------------------
   Mobile nav drawer (same behavior as join.html)
   ----------------------------------------------------------- */
function initNavDrawer() {
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('navDrawer');
  const closeDrawer = document.getElementById('closeDrawer');

  if (!menuToggle || !navDrawer || !closeDrawer) return;

  menuToggle.addEventListener('click', () => {
    navDrawer.classList.add('open');
  });

  closeDrawer.addEventListener('click', () => {
    navDrawer.classList.remove('open');
  });

  navDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navDrawer.classList.remove('open');
    }
  });
}

/* -----------------------------------------------------------
   Read the submitted form data from the query string and
   display it as a definition list.
   ----------------------------------------------------------- */
const FIELD_LABELS = {
  firstName: 'First name',
  lastName: 'Last name',
  orgTitle: 'Title at organization',
  email: 'Email address',
  mobile: 'Mobile phone',
  businessName: 'Business/organization',
  membership: 'Membership level',
  description: 'About the organization',
  timestamp: 'Submitted'
};

const MEMBERSHIP_LABELS = {
  np: 'NP Membership',
  bronze: 'Bronze Membership',
  silver: 'Silver Membership',
  gold: 'Gold Membership'
};

function renderSummary() {
  const summaryList = document.getElementById('summaryList');
  if (!summaryList) return;

  const params = new URLSearchParams(window.location.search);

  // Preserve the order fields appear in the form
  const fieldOrder = [
    'firstName',
    'lastName',
    'orgTitle',
    'email',
    'mobile',
    'businessName',
    'membership',
    'description',
    'timestamp'
  ];

  let hasAnyData = false;

  fieldOrder.forEach((field) => {
    const rawValue = params.get(field);
    if (!rawValue) return;

    hasAnyData = true;
    const label = FIELD_LABELS[field] || field;
    const value = formatValue(field, rawValue);

    const row = document.createElement('div');
    row.className = 'summary-row';

    const dt = document.createElement('dt');
    dt.className = 'label';
    dt.textContent = label;

    const dd = document.createElement('dd');
    dd.className = 'value';
    dd.textContent = value;

    row.appendChild(dt);
    row.appendChild(dd);
    summaryList.appendChild(row);
  });

  if (!hasAnyData) {
    const row = document.createElement('div');
    row.className = 'summary-row';
    row.textContent = 'No application details were found.';
    summaryList.appendChild(row);
  }
}

function formatValue(field, rawValue) {
  if (field === 'membership') {
    return MEMBERSHIP_LABELS[rawValue] || rawValue;
  }
  if (field === 'timestamp') {
    const date = new Date(rawValue);
    return isNaN(date) ? rawValue : date.toLocaleString();
  }
  return rawValue;
}
