// dataFetcher.js — Fetch local JSON with try/catch and return parsed data
export async function fetchProducts(url){
  try{
    const resp = await fetch(url);
    if(!resp.ok) throw new Error(`Network error: ${resp.status}`);
    const data = await resp.json();
    // ensure we return an array
    if (!Array.isArray(data)) throw new Error('Data is not an array');
    return data;
  } catch (err) {
    // rethrow with context for caller
    throw new Error('fetchProducts failed: ' + err.message);
  }
}
