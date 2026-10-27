"use strict";

// 1. Pega o ID que vem depois do # na URL.
//    Ex.: produto.html#BF-001  ->  location.hash = "#BF-001"  ->  id = "BF-001"
function pegarIdDaUrl() {
	return decodeURIComponent(location.hash.slice(1)).trim().toUpperCase();
}

// 2. Procura o produto com esse ID na lista do catalogo.js.
function buscarProduto(id) {
	const produtos = window.BLACK_FORGE_ITEMS || [];
	return produtos.find(p => String(p.id).toUpperCase() === id);
}

const money = n => Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Cria um elemento HTML com classe e texto (textContent evita injetar HTML).
function el(tag, cls, txt) {
	const e = document.createElement(tag);
	if (cls) e.className = cls;
	if (txt !== undefined) e.textContent = txt;
	return e;
}

// Lista de nomes sem repetição. Aceita "Preto" ou { name: "Preto", image: "..." }.
function nomesDasOpcoes(lista) {
	if (!Array.isArray(lista)) return [];
	const nomes = lista.map(v => String(v && typeof v === "object" ? v.name : v).trim()).filter(Boolean);
	return [...new Set(nomes)];
}

// 3. Monta a página com os dados do produto.
function mostrarProduto() {
	const area = document.getElementById("produto");
	area.replaceChildren();
	const id = pegarIdDaUrl();
	const produto = buscarProduto(id);

	if (!produto) {
		document.title = "Produto não encontrado | BLACK FORGE";
		const voltar = el("a", "", "Voltar ao catálogo");
		voltar.href = "produtos.html";
		const caixa = el("div", "produto-nao-encontrado");
		caixa.append(
			el("h1", "", "Produto não encontrado"),
			el("p", "", 'Não existe produto com o código "' + (id || "(vazio)") + '".'),
			voltar
		);
		area.append(caixa);
		return;
	}

	document.title = produto.name + " | BLACK FORGE";
	const trilha = document.getElementById("produtoTrilha");
	if (trilha) trilha.textContent = "PRODUTOS / " + produto.category + " / " + produto.id;

	// ---------- Fotos: uma grande + miniaturas ----------
	const fotos = (Array.isArray(produto.images) ? produto.images : []).filter(Boolean);
	if (!fotos.length && produto.image) fotos.push(produto.image);

	const visual = el("div", "produto-fotos");
	const fotoGrande = el("img", "produto-foto-principal");
	const miniaturas = el("div", "produto-miniaturas");

	function mostrarFoto(i) {
		if (i < 0 || i >= fotos.length) return;
		fotoGrande.src = fotos[i];
		fotoGrande.alt = produto.name + " — foto " + (i + 1);
		[...miniaturas.children].forEach((b, j) => b.classList.toggle("active", j === i));
	}

	fotos.forEach((src, i) => {
		const botao = el("button", "produto-miniatura");
		botao.type = "button";
		botao.setAttribute("aria-label", "Ver foto " + (i + 1));
		const img = el("img");
		img.src = src;
		img.alt = "";
		botao.append(img);
		botao.addEventListener("click", () => mostrarFoto(i));
		miniaturas.append(botao);
	});

	if (fotos.length) {
		visual.append(fotoGrande, miniaturas);
		mostrarFoto(0);
	} else {
		visual.append(el("div", "produto-sem-foto", "FOTO NÃO DISPONÍVEL"));
	}

	// ---------- Informações ----------
	const info = el("div", "produto-info");
	info.append(
		el("p", "produto-categoria", produto.category + " · " + produto.id),
		el("h1", "", produto.name)
	);

	// Bloco de preço: preço atual + preço antigo (promoção) + "pagamento seguro"
	const precos = el("div", "produto-precos");
	const preco = el("strong", "produto-preco", money(produto.price));
	precos.append(preco);
	if (produto.category === "PROMOÇÕES" && Number(produto.originalPrice) > Number(produto.price)) {
		precos.append(el("s", "produto-preco-antigo", money(produto.originalPrice)));
	}
	precos.append(el("span", "produto-parcela", "PAGAMENTO SEGURO"));
	info.append(precos);

	if (produto.description) info.append(el("p", "produto-descricao", produto.description));

	// ---------- Seletores: tamanho, cor e modelo ----------
	const seletores = [];

	function criarSeletor(rotulo, campo, lista) {
		const opcoes = nomesDasOpcoes(lista);
		if (!opcoes.length) return null;

		const label = el("label", "produto-opcao");
		label.append(el("span", "", rotulo));

		const select = el("select");
		select.dataset.field = campo; // "size", "color" ou "model" — é o que o carrinho espera
		const vazio = el("option", "", "Selecione " + rotulo.toLowerCase());
		vazio.value = "";
		select.append(vazio);
		for (const nome of opcoes) {
			const opt = el("option", "", nome);
			opt.value = nome;
			select.append(opt);
		}

		label.append(select);
		info.append(label);
		seletores.push(select);
		return select;
	}

	criarSeletor("TAMANHO", "size", produto.sizes);
	const seletorCor = criarSeletor("COR", "color", produto.colors);

	// Quando "variants" são objetos {name, image}, elas são as próprias cores (com foto).
	// Nesse caso não criamos "MODELO", só usamos a foto ao trocar a cor.
	const variantesSaoCores = window.BlackForgeVariants.variantsAreColors(produto);
	const modelosEspelhados = window.BlackForgeVariants.mirroredModel(produto);
	// Evita dois seletores repetidos no BF-078, mas mantém model=color no pedido.
	const seletorModelo = (variantesSaoCores || modelosEspelhados) ? null : criarSeletor("MODELO", "model", produto.variants);

	// Trocar a cor mostra a foto daquela cor.
	if (seletorCor) {
		seletorCor.addEventListener("change", () => {
			const i = seletorCor.selectedIndex - 1;
			if (i < 0) return;
			const variante = variantesSaoCores
				? produto.variants.find(v => v && v.name === seletorCor.value)
				: null;
			mostrarFoto(variante && variante.image ? fotos.indexOf(variante.image) : i);
		});
	}

	// Trocar o modelo mostra a foto do modelo e, se houver, o preço do modelo.
	if (seletorModelo) {
		seletorModelo.addEventListener("change", () => {
			const i = seletorModelo.selectedIndex - 1;
			if (fotos.length === seletorModelo.options.length - 1 && i >= 0) mostrarFoto(i);
			if (Array.isArray(produto.variantPrices) && produto.variantPrices.length === produto.variants.length) {
				preco.textContent = money(i >= 0 ? produto.variantPrices[i] : produto.price);
			}
		});
	}

	// ---------- Botão adicionar ao carrinho ----------
	const disponivel = produto.active === true && !produto.placeholder && Number(produto.price) > 0;

	if (disponivel) {
		const botao = el("button", "produto-comprar", "ADICIONAR AO CARRINHO +");
		botao.type = "button";
		const aviso = el("p", "produto-aviso", "");
		aviso.setAttribute("role", "status");

		botao.addEventListener("click", () => {
			const faltando = seletores.find(s => !s.value);
			if (faltando) {
				aviso.textContent = "Escolha todas as opções antes de adicionar ao carrinho.";
				faltando.focus();
				return;
			}
			aviso.textContent = "";

			// Monta { id, size, color, model } e avisa o selecao.js, que salva no carrinho.
			const dados = { id: produto.id };
			for (const s of seletores) dados[s.dataset.field] = s.value;
			if (modelosEspelhados) dados.model = dados.color;
			// Só anuncia sucesso quando o item foi realmente aceito pelo carrinho.
			const evento = new CustomEvent("bf:add-to-cart", { detail: dados, cancelable:true });
			if (!document.dispatchEvent(evento)) {
				aviso.textContent = "Não foi possível adicionar. Confira as opções selecionadas.";
				return;
			}

			botao.textContent = "ADICIONADO ✓";
			setTimeout(() => { botao.textContent = "ADICIONAR AO CARRINHO +"; }, 1400);
		});

		const carrinho = el("a", "produto-ver-carrinho", "VER CARRINHO ↗");
		carrinho.href = "pedido.html";
		info.append(botao, aviso, carrinho);
	} else {
		info.append(el("p", "produto-indisponivel", "PRODUTO INDISPONÍVEL"));
	}

	// Vantagens da loja
	const vantagens = el("ul", "produto-vantagens");
	for (const texto of ["Frete grátis durante todo o mês de outubro", "Pagamento seguro ao finalizar o pedido", "Confira as fotos e opções antes de comprar"]) {
		vantagens.append(el("li", "", texto));
	}
	info.append(vantagens);

	area.append(visual, info);
}

mostrarProduto();

// Se o # mudar sem recarregar a página (ex.: link para outro produto), atualiza.
window.addEventListener("hashchange", mostrarProduto);
