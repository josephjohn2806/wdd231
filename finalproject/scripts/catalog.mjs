import { initNav } from './main.js';

let itemsData = [];

async function fetchItems() {
  try {
    const res = await fetch('data/services.json');
    if (!res.ok) throw new Error('Network error');
    itemsData = await res.json();
    // If a featured-grid exists, render first 3 items there
    if (document.getElementById('featured-grid')) renderFeatured(itemsData.slice(0,3));
    if (document.getElementById('catalog-grid')) renderCatalog(itemsData);
  } catch (err) {
    console.error(err);
  }
}

function renderFeatured(items) {
  const container = document.getElementById('featured-grid');
  if (!container) return;
  container.innerHTML = items.map(i => `
    <article class="card" tabindex="0">
      <span class="card-index">${i.id}</span>
      <h3>${i.title}</h3>
      <p class="lead">${i.description}</p>
    </article>
  `).join('');
}

function renderCatalog(items) {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  grid.innerHTML = items.map(i => `
    <article class="card">
      <span class="card-index">${i.id} · ${i.category}</span>
      <h3>${i.title}</h3>
      <p>${i.description}</p>
      <p><strong>Price:</strong> ${i.price}</p>
      <div style="margin-top:12px;"><button class="btn btn-secondary view-details" data-id="${i.id}">View Details</button></div>
    </article>
  `).join('');

  grid.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openModal(id);
    });
  });
}

function openModal(id) {
  const modal = document.getElementById('item-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;
  const item = itemsData.find(x => String(x.id) === String(id));
  if (!item) return;
  modalContent.innerHTML = `
    <h3>${item.title}</h3>
    <p class="eyebrow">Category: ${item.category}</p>
    <p><strong>Price:</strong> ${item.price}</p>
    <p>${item.description}</p>
  `;
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.classList.add('open');
  }
}

function setupModalHandlers() {
  const modal = document.getElementById('item-modal');
  const closeBtn = document.getElementById('close-modal');
  if (!modal || !closeBtn) return;
  closeBtn.addEventListener('click', () => { if (typeof modal.close === 'function') modal.close(); modal.classList.remove('open'); });
  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (typeof modal.close === 'function') modal.close(); modal.classList.remove('open'); }});
}

document.addEventListener('DOMContentLoaded', () => {
  try { initNav(); } catch (e) {}
  fetchItems();
  setupModalHandlers();

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-category');
      if (cat === 'All') renderCatalog(itemsData);
      else renderCatalog(itemsData.filter(x => x.category === cat));
    });
  });
});
