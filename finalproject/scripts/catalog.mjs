import { initNav } from './main.js';

let itemsData = [];

// Fetch data asynchronously using try...catch block
async function fetchItems() {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) throw new Error('Failed to fetch services data');
    itemsData = await response.json();
    renderCatalog(itemsData);
  } catch (error) {
    console.error('Data loading error:', error);
    const catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) catalogGrid.innerHTML = `<p>Error loading catalog. Please try again later.</p>`;
  }
}

// Render dynamic catalog items (Template Literals & Array Methods)
function renderCatalog(items) {
  const catalogGrid = document.getElementById('catalog-grid');
  if (!catalogGrid) return;

  catalogGrid.innerHTML = items.map(item => `
    <div class="card">
      <span class="card-index">${item.id} · ${item.category}</span>
      <h3>${item.title}</h3>
      <p><strong>Price:</strong> ${item.price}</p>
      <button class="btn btn-secondary view-details-btn" data-id="${item.id}">View Details</button>
    </div>
  `).join('');

  // Attach event listeners for Modal Dialogs (added after DOM update)
  document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openModal(id);
    });
  });
}

// Modal open handler
function openModal(id) {
  const item = itemsData.find(i => String(i.id) === String(id));
  const modal = document.getElementById('item-modal');
  const modalContent = document.getElementById('modal-content');
  if (item && modal && modalContent) {
    modalContent.innerHTML = `
      <h2>${item.title} (${item.id})</h2>
      <p class="eyebrow">Category: ${item.category}</p>
      <p style="font-size: 1.2rem; font-weight: bold;">Cost: ${item.price}</p>
      <p>${item.description}</p>
    `;
    // Use dialog API if available, otherwise fallback to toggling a class
    if (typeof modal.showModal === 'function') {
      try { modal.showModal(); } catch (e) { modal.classList.add('open'); }
    } else {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }
}

// Modal close handler will be attached on DOMContentLoaded (safe guard below)

// Filter Event Listeners using Array filter (attached on DOMContentLoaded)

document.addEventListener('DOMContentLoaded', () => {
  initNav();

  // Modal close button setup
  const modal = document.getElementById('item-modal');
  const closeModalBtn = document.getElementById('close-modal');
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') modal.close();
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  // Escape key closes modal
  if (modal) {
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (typeof modal.close === 'function') modal.close();
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-category');
      if (cat === 'All') {
        renderCatalog(itemsData);
      } else {
        const filtered = itemsData.filter(item => item.category === cat);
        renderCatalog(filtered);
      }
    });
  });

  // Kick off data load
  fetchItems();
});
