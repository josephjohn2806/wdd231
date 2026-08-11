import {fetchData} from './dataLoader.js';
import {renderCards} from './renderCards.js';
import {openModal, closeModal} from './modal.js';
import {toggleFavorite, getFavorites} from './storage.js';

const cardsContainer = document.getElementById('cards');
const yearEl = document.getElementById('year');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');

yearEl && (yearEl.textContent = new Date().getFullYear());

let allData = [];

// Nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-navigation');
navToggle && navToggle.addEventListener('click', ()=>{
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav && nav.setAttribute('data-open', String(!expanded));
});

// Load data and render
(async function init(){
  try{
    allData = await fetchData();
    // render initial (show first 15 if more)
    renderCurrent();
    // wire up search if present
    if(searchInput){
      searchInput.addEventListener('input', ()=> renderCurrent());
    }
    if(categorySelect){
      categorySelect.addEventListener('change', ()=> renderCurrent());
    }
  }catch(err){
    cardsContainer && (cardsContainer.innerHTML = `<p class="error">Failed to load items: ${err.message}</p>`);
  }
})();

function renderCurrent(){
  if(!Array.isArray(allData)) return;
  const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const cat = categorySelect ? categorySelect.value : '';
  let items = allData.slice();
  if(cat) items = items.filter(it => it.category === cat);
  if(q) items = items.filter(it => (it.title+" "+it.description).toLowerCase().includes(q));
  // ensure at least 15 items show if available
  if(items.length > 15) items = items.slice(0, 50);
  renderCards(items, cardsContainer, handleItemClick);
}

function handleItemClick(item){
  const html = `
    <h3>${item.title}</h3>
    <img src="${item.image}" alt="${item.title}" loading="lazy" width="600" height="400">
    <p>${item.description}</p>
    <p class="meta">Category: ${item.category} — Price: ${item.price}</p>
    <p><button class="btn" id="fav-btn">${getFavorites().includes(item.id)?'Remove Favorite':'Add Favorite'}</button></p>
  `;
  openModal(html);
  const favBtn = document.getElementById('fav-btn');
  favBtn && favBtn.addEventListener('click', ()=>{
    toggleFavorite(item.id);
    favBtn.textContent = getFavorites().includes(item.id)?'Remove Favorite':'Add Favorite';
  });
}
