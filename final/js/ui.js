// ui.js — rendering and interaction helpers
import { openModal, closeModal } from './modalHelpers.js';

export function setupUI(){
  // nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  // modal close
  document.addEventListener('click', (e) => {
    if (e.target.matches('.modal-close')) closeModal();
  });

  // favorites in localStorage
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.documentElement.classList.add('dark');
}

// render a grid of items into container
export function renderGrid(container, items, opts={}){
  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = item.name + ' image';
    img.src = item.image; // small SVG or data URL

    const h3 = document.createElement('h3');
    h3.textContent = item.name;

    const p = document.createElement('p');
    p.textContent = item.short;

    const meta = document.createElement('p');
    meta.innerHTML = `<strong>Price:</strong> ${item.price} • <strong>Category:</strong> ${item.category}`;

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Details';
    btn.addEventListener('click', () => showDetails(item));

    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(meta);
    card.appendChild(btn);

    if (opts.showFav){
      const fav = document.createElement('button');
      fav.textContent = isFavorite(item.id) ? '★' : '☆';
      fav.setAttribute('aria-pressed', String(isFavorite(item.id)));
      fav.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(item.id, fav); });
      card.appendChild(fav);
    }

    container.appendChild(card);
  });
}

// modal behavior
function showDetails(item){
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  modalTitle.textContent = item.name;
  modalBody.innerHTML = `
    <p>${item.long}</p>
    <ul>
      <li><strong>Price:</strong> ${item.price}</li>
      <li><strong>Category:</strong> ${item.category}</li>
      <li><strong>Stock:</strong> ${item.stock}</li>
    </ul>
  `;
  openModal();
}

// favorites using localStorage
function favorites(){
  try{ return JSON.parse(localStorage.getItem('jj_favs') || '[]'); } catch { return []; }
}
function isFavorite(id){ return favorites().includes(id); }
function toggleFavorite(id, btn){
  const list = favorites();
  const idx = list.indexOf(id);
  if (idx >= 0) list.splice(idx,1); else list.push(id);
  localStorage.setItem('jj_favs', JSON.stringify(list));
  if (btn) { btn.textContent = isFavorite(id) ? '★' : '☆'; btn.setAttribute('aria-pressed', String(isFavorite(id))); }
}
