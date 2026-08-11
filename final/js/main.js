// main entry: wires up UI and imports modules
import {fetchProducts} from './dataFetcher.js';
import {renderGrid, setupUI} from './ui.js';

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

setupUI();

// Load featured items for the home page and full product list for products page
(async function load() {
  try {
    const products = await fetchProducts('/final/assets/data/products.json');
    // pick first 6 as featured
    const featured = products.slice(0,6);
    const featuredList = document.getElementById('featured-list');
    if (featuredList) renderGrid(featuredList, featured);

    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) renderGrid(productsGrid, products, {showFav:true});

  } catch (err) {
    console.error('Failed to load products', err);
    const msg = document.createElement('p');
    msg.textContent = 'Sorry — we could not load the products at this time.';
    document.querySelector('.container').appendChild(msg);
  }
})();
