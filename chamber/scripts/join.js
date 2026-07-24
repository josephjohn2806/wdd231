/* ===========================================================
   JJ Company Enterprise — Join Page
   scripts/join.js
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavDrawer();
  initTierModals();
  initTimestamp();
});

/* -----------------------------------------------------------
   Mobile nav drawer (menu icon opens/closes the slide-out nav)
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

  // Close drawer when a nav link inside it is clicked
  navDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
    });
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      navDrawer.classList.remove('open');
    }
  });
}

/* -----------------------------------------------------------
   Membership tier modals (native <dialog> elements)
   Each "Learn more" button has data-modal="modal-<tier>"
   matching the id of its <dialog>.
   ----------------------------------------------------------- */
function initTierModals() {
  const openButtons = document.querySelectorAll('[data-modal]');

  openButtons.forEach((button) => {
    const modalId = button.getAttribute('data-modal');
    const dialog = document.getElementById(modalId);
    if (!dialog) return;

    button.addEventListener('click', () => {
      dialog.showModal();
    });
  });

  const allDialogs = document.querySelectorAll('dialog.tier-modal');

  allDialogs.forEach((dialog) => {
    // Close button inside the modal
    const closeButton = dialog.querySelector('[data-close]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        dialog.close();
      });
    }

    // Click on the backdrop (outside modal-inner) closes it
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
}

/* -----------------------------------------------------------
   Hidden timestamp field — records when the form was submitted
   ----------------------------------------------------------- */
function initTimestamp() {
  const form = document.querySelector('.join-form');
  const timestampField = document.getElementById('timestamp');
  if (!form || !timestampField) return;

  form.addEventListener('submit', () => {
    timestampField.value = new Date().toISOString();
  });
}
