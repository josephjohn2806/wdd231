export async function fetchData(){
  try{
    const res = await fetch('finalproject/assets/data/data.json');
    if(!res.ok) throw new Error(`Network response was not ok (${res.status})`);
    const data = await res.json();
    return data;
  }catch(err){
    console.error('fetchData error', err);
    throw err;
  }
}
