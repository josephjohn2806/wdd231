// Services & Product Catalog — loads data/products.json, then supports
// live text search and category filtering, plus a detail modal per item.
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  const searchInput = document.getElementById('catalog-search');
  const chips = document.querySelectorAll('.chip');
  const resultsCount = document.getElementById('results-count');

  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalId = document.getElementById('modal-id');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPricingModel = document.getElementById('modal-pricing-model');
  const modalPricingAmount = document.getElementById('modal-pricing-amount');
  const modalLead = document.getElementById('modal-lead');

  let products = [];
  let activeCategory = 'All';
  let query = '';

  fetch('data/products.json')
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then((data) => {
      products = data;
      render();
    })
    .catch(() => {
      resultsCount.textContent = 'Catalog data could not be loaded. If you opened this file directly, serve the folder from a local web server and reload.';
      grid.innerHTML = '';
    });

  function matches(product) {
    const inCategory = activeCategory === 'All' || product.category === activeCategory;
    const q = query.trim().toLowerCase();
    const inQuery =
      q === '' ||
      product.name.toLowerCase().includes(q) ||
      product.tagline.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q);
    return inCategory && inQuery;
  }

  function render() {
    const filtered = products.filter(matches);
    resultsCount.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'} found`;

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="no-results">No matches. Try a different search term or category.</div>';
      return;
    }

    grid.innerHTML = filtered.map((p) => `
      <button class="product-card" data-id="${p.id}">
        <span class="plate">${p.id}</span>
        <span class="product-cat">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="tagline">${p.tagline}</p>
        <div class="product-price">${p.pricing.amount} · ${p.pricing.unit}</div>
      </button>
    `).join('');

    grid.querySelectorAll('.product-card').forEach((card) => {
      card.addEventListener('click', () => openModal(card.dataset.id));
    });
  }

  function openModal(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    modalId.textContent = product.id;
    modalTitle.textContent = product.name;
    modalDesc.textContent = product.description;
    modalPricingModel.textContent = product.pricing.model;
    modalPricingAmount.textContent = `${product.pricing.amount} ${product.pricing.unit}`;
    modalLead.textContent = product.leadTime;
    modalOverlay.classList.add('open');
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  searchInput.addEventListener('input', (e) => {
    query = e.target.value;
    render();
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      activeCategory = chip.dataset.category;
      render();
    });
  });
});
