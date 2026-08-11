// modal.js
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

export function openModal(html) {
  modalBody.innerHTML = html;
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  modalClose.focus();
  document.addEventListener('keydown', handleKey);
}

export function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  modalBody.innerHTML = '';
  document.removeEventListener('keydown', handleKey);
}

function handleKey(e) {
  if (e.key === 'Escape') closeModal();
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
