/* BLACK FORGE — BLACK5. Previsão visual; o backend é a autoridade no checkout. */
(() => {
  "use strict";
  const STORAGE = "blackforge-coupon-v1";
  const API = "https://black-forge-pagamentos.onrender.com";
  const PROMO = { code: "BLACK5", percent: 5, startsAt: "2026-11-05T00:00:00-03:00", endsAt: null };
  const money = value => Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const cents = n => Math.round(Number(n) * 100);
  const active = () => Date.now() >= Date.parse(PROMO.startsAt) && (!PROMO.endsAt || Date.now() <= Date.parse(PROMO.endsAt));
  function get() { try { return String(localStorage.getItem(STORAGE) || "").trim().toUpperCase(); } catch { return ""; } }
  function set(value) {
    const code = String(value || "").trim().toUpperCase();
    try { if (code) localStorage.setItem(STORAGE, code); else localStorage.removeItem(STORAGE); } catch { }
    document.dispatchEvent(new CustomEvent("bf:coupon-updated", { detail: { code } }));
  }
  function preview(price) {
    const base = cents(price);
    return (base - Math.round(base * PROMO.percent / 100)) / 100;
  }
  function node(tag, cls, txt) { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }
  function decorate(parent, price, options = {}) {
    if (!active() || !(Number(price) > 0)) return null;
    const block = node("div", "bf-black5-price");
    const old = node("span", "bf-black5-base", "Preço sem cupom: " + money(price));
    const badge = node("span", "bf-black5-badge", "5% OFF COM CUPOM");
    const discounted = node("strong", "bf-black5-offer", "Com BLACK5: " + money(preview(price)));
    const shipping = node("span", "bf-black5-shipping", "Use BLACK5 e ganhe frete grátis");
    block.append(old, badge, discounted, shipping);
    if (options.variable) block.append(node("small", "bf-black5-variable", "Valores podem variar conforme o modelo selecionado."));
    parent.append(block);
    return { block, update(n) { old.textContent = "Preço sem cupom: " + money(n); discounted.textContent = "Com BLACK5: " + money(preview(n)); } };
  }
  function extractCart(cart) { return Object.entries(cart).flatMap(([id,group]) => (group.items || []).map(item => ({ id, qty:item.qty, size:item.size||"", color:item.color||"", model:item.model||"" }))); }
  async function quote(items, code = get(), signal) {
    const response = await fetch(API + "/api/checkout/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({items, coupon:code}), signal });
    let data;
    try { data = await response.json(); } catch { throw new Error("Servidor de pagamentos sem resposta válida."); }
    if (!response.ok) throw new Error(data.error || "Não foi possível validar o cupom.");
    return data;
  }
  // Preços finais sem cupom permanecem os preços do catálogo; a oferta só vale com BLACK5.
  window.BFPromo = Object.freeze({ money, cents, active, get, set, preview, decorate, quote, extractCart, API, code: PROMO.code });
})();
