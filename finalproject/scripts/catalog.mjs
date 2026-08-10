import { initNav } from './main.mjs';

const modal = document.getElementById('item-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalContent = document.getElementById('modal-content');
const catalogGrid = document.getElementById('catalog-grid');

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
    catalogGrid.innerHTML = `<p>Error loading catalog. Please try again later.</p>`;
  }
}

// Render dynamic catalog items (Template Literals & Array Methods)
function renderCatalog(items) {
  catalogGrid.innerHTML = items.map(item => `
    <div class="card">
      <span class="card-index">${item.id} · ${item.category}</span>
      <h3>${item.title}</h3>
      <p><strong>Price:</strong> ${item.price}</p>
      <button class="btn btn-secondary view-details-btn" data-id="${item.id}">View Details</button>
    </div>
  `).join('');

  // Attach event listeners for Modal Dialogs
  document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      openModal(id);
    });
  });
}

// Modal open handler
function openModal(id) {
  const item = itemsData.find(i => i.id === id);
  if (item && modal) {
    modalContent.innerHTML = `
      <h2>${item.title} (${item.id})</h2>
      <p class="eyebrow">Category: ${item.category}</p>
      <p style="font-size: 1.2rem; font-weight: bold;">Cost: ${item.price}</p>
      <p>${item.description}</p>
    `;
    modal.showModal();
  }
}

// Modal close handler
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => modal.close());
}

// Filter Event Listeners using Array filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const cat = e.target.getAttribute('data-category');
    if (cat === 'All') {
      renderCatalog(itemsData);
    } else {
      const filtered = itemsData.filter(item => item.category === cat);
      renderCatalog(filtered);
    }
  });
});

document.addEventListener('DOMContentLoaded', fetchItems);
