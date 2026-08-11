// catalog.js
import { openModal, closeModal } from './modal.js';
import { saveFavorites, loadFavorites } from './storage.js';

const dataUrl = './data/products.json';

export async function initCatalog() {
  try {
    const res = await fetch(dataUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const products = await res.json();

    // render categories into select
    const categorySelect = document.getElementById('category');
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categorySelect.appendChild(option);
    });

    // initialize search and filters
    const searchInput = document.getElementById('search');
    const clearBtn = document.getElementById('clear-filters');
    const catalogEl = document.getElementById('catalog');

    let favorites = loadFavorites(); // object keyed by id

    function render(list) {
      catalogEl.innerHTML = '';
      list.forEach(p => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}" loading="lazy" width="320" height="180">
          <h3>${p.name}</h3>
          <p class="category">${p.category}</p>
          <p class="price">$${p.price}</p>
          <p class="desc">${p.description}</p>
          <div class="card-actions">
            <button data-id="${p.id}" class="view-btn">View</button>
            <button data-id="${p.id}" class="fav-btn">${favorites[p.id] ? '★' : '☆'} Favorite</button>
          </div>
        `;
        catalogEl.appendChild(card);
      });

      // attach handlers
      catalogEl.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = Number(e.currentTarget.dataset.id);
          const item = products.find(x => x.id === id);
          openModal(`<h2 id="modal-title">${item.name}</h2>
                     <img src="${item.image}" alt="${item.name}" loading="lazy" width="480">
                     <p>${item.description}</p>
                     <p><strong>Price:</strong> $${item.price}</p>
                     <p><strong>Category:</strong> ${item.category}</p>`);
        });
      });

      catalogEl.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = Number(e.currentTarget.dataset.id);
          favorites[id] = !favorites[id];
          saveFavorites(favorites);
          btn.textContent = `${favorites[id] ? '★' : '☆'} Favorite`;
        });
      });
    }

    // initial render — ensure at least 15 items show (data includes 15)
    render(products);

    function applyFilters() {
      const q = searchInput.value.toLowerCase();
      const cat = categorySelect.value;
      let results = products.filter(p => {
        const matchQ = !q || (p.name + ' ' + p.description).toLowerCase().includes(q);
        const matchCat = !cat || p.category === cat;
        return matchQ && matchCat;
      });
      render(results);
    }

    searchInput.addEventListener('input', applyFilters);
    categorySelect.addEventListener('change', applyFilters);
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      categorySelect.value = '';
      applyFilters();
    });

  } catch (err) {
    console.error('Failed to load products', err);
    const catalogEl = document.getElementById('catalog');
    catalogEl.innerHTML = '<p class="error">Sorry — product data could not be loaded. Please try again later.</p>';
  }
}
