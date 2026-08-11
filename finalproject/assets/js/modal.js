let lastFocused = null;
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

export function openModal(html){
  if(!modal) return;
  lastFocused = document.activeElement;
  modalBody.innerHTML = html;
  modal.setAttribute('aria-hidden','false');
  modal.style.display = 'flex';
  modalClose && modalClose.focus();
  document.addEventListener('keydown', handleKey);
}
export function closeModal(){
  if(!modal) return;
  modal.setAttribute('aria-hidden','true');
  modal.style.display = 'none';
  modalBody.innerHTML = '';
  document.removeEventListener('keydown', handleKey);
  lastFocused && lastFocused.focus();
}

function handleKey(e){
  if(e.key === 'Escape') closeModal();
}

modalClose && modalClose.addEventListener('click', closeModal);
modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
