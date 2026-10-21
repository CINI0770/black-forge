"use strict";
// COLEÇÃO DE OUTUBRO: adicione aqui os IDs dos produtos NOVOS que quiser destacar.
// Exemplo futuro: const OCTOBER_IDS = ["BF-138", "BF-139"];
// Não adicione produtos que ainda não foram cadastrados no catalogo.js.
const OCTOBER_IDS = [];
(() => {
 const root = document.getElementById("octoberProducts");
 const catalog = Array.isArray(window.BLACK_FORGE_ITEMS) ? window.BLACK_FORGE_ITEMS : [];
 if (!root) return;
 const entries = OCTOBER_IDS.map(id => catalog.find(p=>p && p.id===id && p.active!==false && !p.placeholder && Number(p.price)>0)).filter(Boolean);
 if (!entries.length) return; // Mantém o lançamento 'em breve', sem inventar itens.
 root.replaceChildren();
 const money = n=>Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
 for(const p of entries){
  const card=document.createElement("a");card.className="product-card";card.href="produto.html#"+encodeURIComponent(p.id);
  const media=document.createElement("div");media.className="product-media";
  const img=document.createElement("img");img.loading="lazy";img.alt=p.name||"Produto Black Forge";
  img.src=(Array.isArray(p.images)&&p.images.find(Boolean))||p.image||"";if(img.src)media.append(img);
  const id=document.createElement("span");id.className="product-id";id.textContent=p.id;media.append(id);
  const detail=document.createElement("div");detail.className="product-info";
  const label=document.createElement("span");label.textContent="BLACK FORGE / OCTOBER DROP";
  const name=document.createElement("h3");name.textContent=p.name;
  const price=document.createElement("strong");price.textContent=money(p.price);
  const action=document.createElement("span");action.className="product-action";action.textContent="VER PRODUTO ↗";
  detail.append(label,name,price,action);card.append(media,detail);root.append(card);
 }
})();
