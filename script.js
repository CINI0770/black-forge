/* BLACK FORGE — demo front-end. Não há pagamento, estoque nem pedidos reais. */
"use strict";
const products = [
  {id:"bf-001",name:"Anel Eclipse",category:"aneis",label:"ANÉIS",price:59.90,tag:"EXEMPLO",symbol:"◇",art:"ring"},
  {id:"bf-002",name:"Corrente Revenant",category:"correntes",label:"CORRENTES",price:89.90,tag:"EXEMPLO",symbol:"⛓",art:"chain"},
  {id:"bf-003",name:"Colar Nocturne",category:"colares",label:"COLARES",price:69.90,tag:"EXEMPLO",symbol:"✦",art:"necklace"},
  {id:"bf-004",name:"Pulseira Obsidian",category:"pulseiras",label:"PULSEIRAS",price:49.90,tag:"EXEMPLO",symbol:"◈",art:"bracelet"}
];
const art = {
 ring:'<svg viewBox="0 0 200 200" aria-hidden="true"><ellipse cx="100" cy="112" rx="58" ry="57" stroke-width="17"/><ellipse cx="100" cy="112" rx="44" ry="43" stroke="#746e66" stroke-width="3"/><path d="M100 24 131 55 100 85 69 55Z" fill="#827b71" stroke="#e6dfd2" stroke-width="3"/><path d="M100 30v48M74 55h52" stroke="#eee6d7" stroke-width="1"/></svg>',
 chain:'<svg viewBox="0 0 200 200" aria-hidden="true"><g transform="rotate(-27 100 100)"><rect x="76" y="10" width="48" height="68" rx="24" stroke-width="11"/><rect x="76" y="57" width="48" height="68" rx="24" stroke-width="11"/><rect x="76" y="104" width="48" height="68" rx="24" stroke-width="11"/><path d="M100 16v48M100 63v48M100 110v48" stroke="#77716a" stroke-width="2"/></g></svg>',
 necklace:'<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M35 25Q30 117 100 145Q170 117 165 25" stroke-width="4"/><path d="M100 94 125 127 100 171 75 127Z" fill="#625d57" stroke="#ded6c9" stroke-width="4"/><path d="m100 105 13 22-13 29-13-29Z" stroke="#dcd3c6" stroke-width="2"/><path d="M85 127h30M100 105v51" stroke="#dcd3c6" stroke-width="1.5"/></svg>',
 bracelet:'<svg viewBox="0 0 200 200" aria-hidden="true"><g transform="rotate(-20 100 100)"><ellipse cx="100" cy="104" rx="72" ry="42" stroke-width="12"/><ellipse cx="100" cy="104" rx="61" ry="32" stroke="#7c766e" stroke-width="3"/><path d="M34 89v30M49 76v56M67 67v73M87 63v80M111 63v80M133 67v73M151 76v56M166 89v30" stroke="#eee6d7" stroke-width="2"/></g></svg>'
};
const money = n => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n);
const $ = s => document.querySelector(s);
const grid=$("#productGrid");
const cartKey="blackforge-demo-cart-v2";
let cart={};
try { const saved=JSON.parse(localStorage.getItem(cartKey)||"{}"); if(saved && typeof saved==="object" && !Array.isArray(saved)) for(const p of products) {const q=Number(saved[p.id]);if(Number.isInteger(q)&&q>0)cart[p.id]=Math.min(q,99);} }catch{}
let currentFilter="todos", searchText="", toastTimer;
function save(){try{localStorage.setItem(cartKey,JSON.stringify(cart))}catch{}}
function renderProducts(){
 const items=products.filter(p=>(currentFilter==="todos"||p.category===currentFilter)&&(`${p.name} ${p.label}`.toLocaleLowerCase("pt-BR").includes(searchText)));
 grid.innerHTML=items.length?items.map(p=>`<article class="product"><div class="product-media"><span class="product-tag">${p.tag}</span><div class="illustration">${art[p.art]}</div></div><div class="product-info"><p>${p.label} / BLACK FORGE</p><h3>${p.name}</h3><strong>${money(p.price)}</strong><button class="product-add" type="button" data-add="${p.id}" aria-label="Adicionar ${p.name} ao carrinho de demonstração">ADICIONAR AO CARRINHO <span aria-hidden="true">↗</span></button></div></article>`).join(""):'<p class="empty-results">Nenhuma peça encontrada. Tente outra busca ou categoria.</p>';
 $("#resultCount").textContent=String(items.length).padStart(2,"0")+" PEÇAS";
}
function renderCart(){
 const count=Object.values(cart).reduce((a,b)=>a+b,0);
 $("#cartCount").textContent=count;
 $("#drawerCount").textContent=`(${count})`;
 $("#cartSubtotal").textContent=money(products.reduce((sum,p)=>sum+(cart[p.id]||0)*p.price,0));
 const entries=products.filter(p=>cart[p.id]);
 $("#cartItems").innerHTML=entries.length?entries.map(p=>`<div class="cart-item"><div class="cart-thumb" aria-hidden="true">${p.symbol}</div><div><h3>${p.name}</h3><p>${money(p.price)}</p><div class="qty"><button data-dec="${p.id}" aria-label="Diminuir quantidade de ${p.name}">−</button><span>${cart[p.id]}</span><button data-inc="${p.id}" aria-label="Aumentar quantidade de ${p.name}">+</button></div></div><button class="remove" data-remove="${p.id}" aria-label="Remover ${p.name}">REMOVER</button></div>`).join(""):'<div class="cart-empty"><span class="symbol">✦</span><p>SEU CARRINHO ESTÁ VAZIO.</p><p>Escolha uma peça da coleção.</p></div>';
}
function notify(msg){const el=$("#toast");el.textContent=msg;el.classList.add("visible");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("visible"),2300)}
function setQuantity(id,quantity){if(!products.some(p=>p.id===id))return;if(quantity<=0)delete cart[id];else cart[id]=Math.min(99,quantity);save();renderCart()}
function openCart(){ $("#overlay").hidden=false;$("#cartDrawer").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false");document.body.classList.add("drawer-open");$("#cartClose").focus()}
function closeCart(){ $("#overlay").hidden=true;$("#cartDrawer").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true");document.body.classList.remove("drawer-open");$("#cartToggle").focus()}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add){const id=add.dataset.add;setQuantity(id,(cart[id]||0)+1);notify("PEÇA ADICIONADA AO CARRINHO");return}
 const inc=e.target.closest("[data-inc]");if(inc){const id=inc.dataset.inc;setQuantity(id,(cart[id]||0)+1);return}
 const dec=e.target.closest("[data-dec]");if(dec){const id=dec.dataset.dec;setQuantity(id,(cart[id]||0)-1);return}
 const remove=e.target.closest("[data-remove]");if(remove){setQuantity(remove.dataset.remove,0);return}
 const filter=e.target.closest("[data-filter]");if(filter){currentFilter=filter.dataset.filter;document.querySelectorAll(".filter").forEach(b=>{const active=b===filter;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active))});renderProducts()}
});
$("#cartToggle").addEventListener("click",openCart);
$("#cartClose").addEventListener("click",closeCart);
$("#continueShopping").addEventListener("click",closeCart);
$("#overlay").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#cartDrawer").classList.contains("open"))closeCart();if(e.key==="Escape"&&!$("#searchPanel").hidden)toggleSearch(false)});
function toggleSearch(show){$("#searchPanel").hidden=!show;$("#searchToggle").setAttribute("aria-expanded",String(show));if(show)$("#searchInput").focus()}
$("#searchToggle").addEventListener("click",()=>toggleSearch($("#searchPanel").hidden));
$("#searchClose").addEventListener("click",()=>{searchText="";$("#searchInput").value="";renderProducts();toggleSearch(false)});
$("#searchInput").addEventListener("input",e=>{searchText=e.target.value.trim().toLocaleLowerCase("pt-BR");renderProducts()});
$("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();
