// storage.js
const KEY = 'jjenterprise_favorites';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveFavorites(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {}
}
