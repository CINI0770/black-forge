"use strict";
const selectionKey="blackforge-selection-v4";
const catalog=window.BLACK_FORGE_ITEMS||[];
const validProducts=new Map(catalog.map(p=>[p.id,p]));
const cleanText=x=>typeof x==="string"?x.slice(0,60):"";
function readSelection(){
 try{
  const raw=JSON.parse(localStorage.getItem(selectionKey)||"{}");const valid={};
  for(const p of catalog){const entry=raw[p.id];if(!entry)continue;
   const old=Array.isArray(entry.items)?entry.items:[entry];const items=[];
   for(const x of old){if(!x||!Number.isInteger(x.qty)||x.qty<1)continue;
    const item={qty:Math.min(x.qty,20),size:cleanText(x.size),color:cleanText(x.color),model:cleanText(x.model)};
    const existing=items.find(y=>y.size===item.size&&y.color===item.color&&y.model===item.model);
    if(existing)existing.qty=Math.min(20,existing.qty+item.qty);else items.push(item);
   }if(items.length)valid[p.id]={items};
  }return valid;
 }catch{return {}}
}
function writeSelection(x){try{localStorage.setItem(selectionKey,JSON.stringify(x))}catch{}
 // Avisa o carrinho.js para redesenhar a gaveta e o contador.
 document.dispatchEvent(new CustomEvent("bf:cart-updated"))}
const countEl=document.getElementById("selectionCount");
function updateCount(){if(countEl)countEl.textContent=Object.values(readSelection()).reduce((sum,p)=>sum+p.items.reduce((n,i)=>n+i.qty,0),0)}
function addToSelection(detail){
 const p=validProducts.get(detail.id);if(!p||p.active!==true||p.placeholder||!(Number(p.price)>0))return;
 const fields={size:"sizes",color:"colors",model:"variants"};
 for(const [field,list] of Object.entries(fields)){
  // Variações em objeto ({name,image}) são cores com foto: a cor já foi validada.
  if(Array.isArray(p[list])&&p[list].some(v=>v&&typeof v==="object"))continue;
  const choices=Array.isArray(p[list])?p[list].map(String).map(s=>s.trim()).filter(Boolean):[];
  if(choices.length&&!choices.includes(detail[field]))return;
 }
 const selected=readSelection();const group=selected[p.id]||{items:[]};
 const item={qty:1,size:cleanText(detail.size),color:cleanText(detail.color),model:cleanText(detail.model)};
 const old=group.items.find(x=>x.size===item.size&&x.color===item.color&&x.model===item.model);
 if(old)old.qty=Math.min(20,old.qty+1);else group.items.push(item);
 selected[p.id]=group;writeSelection(selected);updateCount();
document.addEventListener("bf:cart-updated",updateCount);
}
document.addEventListener("bf:add-to-cart",e=>addToSelection(e.detail||{}));
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-select]");if(!b)return;
 const p=validProducts.get(b.dataset.select);if(!p)return;
 if([p.sizes,p.colors,p.variants].some(a=>Array.isArray(a)&&a.length)){
  location.href="produto.html#"+encodeURIComponent(p.id);return;
 }
 addToSelection({id:p.id});b.textContent="ADICIONADO ✓";
 setTimeout(()=>{b.textContent="ADICIONAR AO CARRINHO +"},1300);
});
updateCount();
