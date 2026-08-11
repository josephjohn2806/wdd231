// Entry point: wire up nav, load data and render cards
import {fetchData} from './dataLoader.js';
import {renderCards} from './renderCards.js';
import {openModal, closeModal} from './modal.js';
import {toggleFavorite, getFavorites} from './storage.js';

const cardsContainer = document.getElementById('cards');
const yearEl = document.getElementById('year');

yearEl && (yearEl.textContent = new Date().getFullYear());

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
    const data = await fetchData();
    renderCards(data, cardsContainer, handleItemClick);
  }catch(err){
    cardsContainer && (cardsContainer.innerHTML = `<p class="error">Failed to load items: ${err.message}</p>`);
  }
})();

function handleItemClick(item){
  const html = `
    <h3>${item.title}</h3>
    <img src="${item.image}" alt="${item.title}" loading="lazy" width="600" height="400">
    <p>${item.description}</p>
    <p class="meta">Category: ${item.category} — Price: ${item.price}</p>
    <p><button class="btn" id="fav-btn">${getFavorites().includes(item.id)?'Remove Favorite':'Add Favorite'}</button></p>
  `;
  openModal(html);
  // favorite button handler
  const favBtn = document.getElementById('fav-btn');
  favBtn && favBtn.addEventListener('click', ()=>{
    toggleFavorite(item.id);
    favBtn.textContent = getFavorites().includes(item.id)?'Remove Favorite':'Add Favorite';
  });
}
