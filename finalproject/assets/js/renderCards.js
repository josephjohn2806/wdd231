export function renderCards(data, container, onItemClick){
  if(!Array.isArray(data)) return;
  // ensure at least 15 items
  const items = data.slice(0, 15);
  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy" width="400" height="250">
      <h4>${item.title}</h4>
      <p>${item.description}</p>
      <div class="meta"><span>${item.category}</span><span>${item.price}</span></div>
      <p><button class="btn" data-id="${item.id}">Details</button> <button class="btn secondary" data-fav="${item.id}">❤</button></p>
    `;
    const detailBtn = card.querySelector('button[data-id]');
    detailBtn && detailBtn.addEventListener('click', ()=> onItemClick(item));
    const favBtn = card.querySelector('button[data-fav]');
    favBtn && favBtn.addEventListener('click', ()=>{
      const id = favBtn.getAttribute('data-fav');
      // dispatch event to toggle favorite via storage module by importing dynamically
      import('./storage.js').then(mod=>{mod.toggleFavorite(id); favBtn.textContent = mod.getFavorites().includes(id)?'❤':'♡'});
    });
    container.appendChild(card);
  });
}
