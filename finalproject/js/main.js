document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('product-gallery');
  if (gallery) {
    fetchProductCatalog();
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

/**
 * Asynchronously fetches and displays products on the main home page grid
 */
async function fetchProductCatalog() {
  const gallery = document.getElementById('product-gallery');
  const cardOverlays = [
    { type: 'green', text: 'Discover high-quality items curated for daily needs.' },
    { type: 'none', text: '' },
    { type: 'none', text: '' },
    { type: 'dark', text: 'Premium products delivered with exceptional value.' },
    { type: 'green', text: 'Quality guaranteed across every item in stock.' }
  ];

  try {
    const response = await fetch('https://dummyjson.com/products?limit=5');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    gallery.innerHTML = '';

    data.products.forEach((product, index) => {
      const overlay = cardOverlays[index] || { type: 'none', text: '' };
      let overlayHTML = '';

      if (overlay.type === 'green') {
        overlayHTML = `<div class="card-banner green">${overlay.text}</div>`;
      } else if (overlay.type === 'dark') {
        overlayHTML = `<div class="card-banner dark-overlay">${overlay.text}</div>`;
      }

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Product+Image'">
        ${overlayHTML}
        <div class="card-content">
          <div class="card-title">${product.title}</div>
          <div class="card-price">$${product.price}</div>
        </div>
      `;
      gallery.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching product data:', error);
    gallery.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Failed to load products. Please check internet connection.</p>';
  }
}

/**
 * Handles contact form submission
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const feedback = document.getElementById('form-feedback');
  feedback.textContent = 'Thank you for reaching out to JJ Enterprise! We will process your inquiry shortly.';
  event.target.reset();
}
