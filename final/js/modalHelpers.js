// small accessible modal helpers
export function openModal(lastFocused=null){
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.setAttribute('aria-hidden','false');

  // Hide background content from assistive tech
  document.querySelectorAll('header, main, footer, .site-header, .site-footer').forEach(el => el.setAttribute('aria-hidden','true'));

  // store last focused element so we can restore focus on close
  modal._lastFocused = lastFocused || document.activeElement;

  // collect focusable elements inside modal
  const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
  modal._focusable = Array.from(focusable);
  modal._firstFocusable = modal._focusable[0] || null;
  modal._lastFocusable = modal._focusable[modal._focusable.length - 1] || null;

  // focus the first focusable element
  if (modal._firstFocusable) modal._firstFocusable.focus();

  // keydown handler for ESC and focus trapping
  modal._keydown = function(e){
    if (e.key === 'Escape'){
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab'){
      if (!modal._focusable || modal._focusable.length === 0){
        e.preventDefault();
        return;
      }
      const {activeElement} = document;
      const first = modal._firstFocusable;
      const last = modal._lastFocusable;
      if (e.shiftKey){
        if (activeElement === first){
          e.preventDefault();
          last && last.focus();
        }
      } else {
        if (activeElement === last){
          e.preventDefault();
          first && first.focus();
        }
      }
    }
  };
  document.addEventListener('keydown', modal._keydown);
}

export function closeModal(){
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.setAttribute('aria-hidden','true');

  // restore background visibility to assistive tech
  document.querySelectorAll('header, main, footer, .site-header, .site-footer').forEach(el => el.removeAttribute('aria-hidden'));

  // remove keydown handler
  if (modal._keydown) document.removeEventListener('keydown', modal._keydown);

  // restore focus to the element that opened the modal
  try{
    const toFocus = modal._lastFocused;
    if (toFocus && typeof toFocus.focus === 'function') toFocus.focus();
  } catch (e){ /* ignore */ }
}
