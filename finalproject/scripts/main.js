document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  // Toggle Hamburger Menu
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  const gallery = document.getElementById('product-gallery');
  if (gallery) {
    fetchProductCatalog();
  }
});

async function fetchProductCatalog() {
  const gallery = document.getElementById('product-gallery');
  try {
    const response = await fetch('https://dummyjson.com/products?limit=5');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    gallery.innerHTML = '';

    data.products.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
        <div class="card-content">
          <div class="card-title">${product.title}</div>
          <div class="card-price">$${product.price}</div>
        </div>
      `;
      gallery.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
