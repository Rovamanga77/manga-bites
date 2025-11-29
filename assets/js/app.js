(async()=>{
const db = await fetch('data/database.json').then(r=>r.json()).catch(e=>({manga:[]}))
const listEl = document.getElementById('list')
const search = document.getElementById('search')
const themeBtn = document.getElementById('theme-toggle')
function renderCards(items,where){where.innerHTML='';items.forEach(m=>{const div=document.createElement('div');div.className='card';div.innerHTML=`<a href="manga.html?id=${m.id}"><img loading="lazy" src="${m.thumb||'assets/img/placeholder.jpg'}" alt="${m.title}"></a><h4><a href="manga.html?id=${m.id}">${m.title}</a></h4><p>${m.summary||''}</p>`;where.appendChild(div)})}
if(listEl){const recent=db.manga.sort((a,b)=>new Date(b.updated)-new Date(a.updated)).slice(0,24);renderCards(recent,listEl)}
if(search){search.addEventListener('input',e=>{const q=e.target.value.toLowerCase();const res=db.manga.filter(m=>m.title.toLowerCase().includes(q)||(m.tags||[]).join(' ').toLowerCase().includes(q));renderCards(res,listEl)})}
themeBtn?.addEventListener('click',()=>{const cur=document.documentElement.getAttribute('data-theme');document.documentElement.setAttribute('data-theme',cur==='dark'?'':'dark')})
})()
