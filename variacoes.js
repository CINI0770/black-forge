"use strict";
// BLACK FORGE — validação centralizada das opções escolhidas.
// A validação e o preço devem ser repetidos NO SERVIDOR antes de abrir uma sessão Stripe.
window.BlackForgeVariants = (() => {
  const text = value => typeof value === "string" ? value.trim().slice(0, 60) : "";
  const names = list => Array.isArray(list) ? list.map(value =>
    text(value && typeof value === "object" ? value.name : value)).filter(Boolean) : [];
  const sameChoices = (a, b) => a.length > 0 && a.length === b.length &&
    a.every((value, i) => value === b[i]);

  // {name,image} é uma opção de COR com foto, não outro seletor de MODELO.
  function variantsAreColors(product) {
    const variants = product && product.variants;
    if (!Array.isArray(variants) || !variants.length ||
        !variants.every(value => value && typeof value === "object" && typeof value.name === "string")) return false;
    const colors = names(product.colors);
    return names(variants).every(name => colors.includes(name));
  }

  // Existem produtos antigos com a MESMA lista tanto em colors quanto em variants.
  // Nesses casos, o campo "model" continua sendo enviado ao backend para compatibilidade.
  function mirroredModel(product) {
    return !variantsAreColors(product) && sameChoices(names(product.colors), names(product.variants));
  }

  function normalize(product, item) {
    const out = {
      qty: Number(item && item.qty),
      size: text(item && item.size),
      color: text(item && item.color),
      model: text(item && item.model)
    };
    if (mirroredModel(product) && out.color && !out.model) out.model = out.color;
    return out;
  }

  function validate(product, item) {
    if (!product || product.active !== true || product.placeholder ||
        !Number.isFinite(Number(product.price)) || Number(product.price) <= 0)
      return {valid:false, reason:"Produto indisponível."};
    const choice = normalize(product, item);
    const fields = [
      ["size", names(product.sizes), "tamanho"],
      ["color", names(product.colors), "cor"],
      ["model", variantsAreColors(product) ? [] : names(product.variants), "modelo"]
    ];
    for (const [field, possible, label] of fields) {
      if (possible.length && !possible.includes(choice[field]))
        return {valid:false, reason:"Escolha novamente o " + label + "."};
      if (!possible.length && choice[field])
        return {valid:false, reason:"Opção de " + label + " não disponível."};
    }
    if (mirroredModel(product) && choice.model !== choice.color)
      return {valid:false, reason:"A cor e o modelo não correspondem."};
    if (!Number.isInteger(choice.qty) || choice.qty < 1 || choice.qty > 20)
      return {valid:false, reason:"Quantidade inválida."};
    let unitPrice = Number(product.price);
    if (Array.isArray(product.variantPrices) && product.variantPrices.length) {
      const variants = names(product.variants);
      if (product.variantPrices.length !== variants.length)
        return {valid:false, reason:"Preços das opções não configurados."};
      const index = variants.indexOf(choice.model);
      if (index < 0) return {valid:false, reason:"Escolha novamente o modelo."};
      unitPrice = Number(product.variantPrices[index]);
      if (!Number.isFinite(unitPrice) || unitPrice <= 0)
        return {valid:false, reason:"Preço de opção indisponível."};
    }
    return {valid:true, choice, unitPrice};
  }
  return {names, variantsAreColors, mirroredModel, normalize, validate};
})();
