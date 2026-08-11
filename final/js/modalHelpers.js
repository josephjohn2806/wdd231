// small accessible modal helpers
export function openModal(){
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.setAttribute('aria-hidden','false');
  // trap focus minimally
  const close = modal.querySelector('.modal-close');
  close && close.focus();
}
export function closeModal(){
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.setAttribute('aria-hidden','true');
}
