async function loadFeatured() {
  try {
    const response = await fetch('data/services.json');
    const data = await response.json();
    const featured = data.slice(0, 3); // Get first 3 items

    const container = document.getElementById('featured-grid');
    if (container) {
      container.innerHTML = featured.map(item => `
        <div class="card">
          <span class="card-index">${item.id}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadFeatured);

