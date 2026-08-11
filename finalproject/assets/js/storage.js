const KEY = 'finalproject_favorites';
export function getFavorites(){
  try{ return JSON.parse(localStorage.getItem(KEY) || '[]'); }catch(e){return []}
}
export function toggleFavorite(id){
  const list = getFavorites();
  const idx = list.indexOf(id);
  if(idx>-1) list.splice(idx,1); else list.push(id);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
