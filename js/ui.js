// owns: tree rendering, detail panel and selection
// edit for: tree markup, detail fields, selection behavior

let currentId = null;

function childrenOf(id) {
	const out = [];
	for (let i = 0; i < GENRES.length; i++) {
		if (GENRES[i].parent === id) out.push(GENRES[i]);
	}
	return out;
}

function byId(id) {
	for (let i = 0; i < GENRES.length; i++) {
		if (GENRES[i].id === id) return GENRES[i];
	}
	return null;
}

function nodeHtml(g) {
	const kids = childrenOf(g.id);
	let html = '<button data-id="' + g.id + '">' + g.name + '</button>';
	if (!kids.length) return html;
	html += '<ul>';
	for (let i = 0; i < kids.length; i++) html += '<li>' + nodeHtml(kids[i]) + '</li>';
	return html + '</ul>';
}

function renderTree() {
	let html = '<ul>';
	for (let i = 0; i < GENRES.length; i++) {
		if (!GENRES[i].parent) html += '<li>' + nodeHtml(GENRES[i]) + '</li>';
	}
	const treeEl = $('tree');
	treeEl.innerHTML = html + '</ul>';
	treeEl.onclick = onTreeClick;
}

function onTreeClick(e) {
	const id = e.target.dataset && e.target.dataset.id;
	if (id) selectGenre(id);
}

function selectGenre(id) {
	currentId = id;
	const btns = $('tree').querySelectorAll('button');
	for (let i = 0; i < btns.length; i++) btns[i].classList.toggle('sel', btns[i].dataset.id === id);
	renderDetail();
}

function list(items) {
	if (!items || !items.length) return '<span class="dim">-</span>';
	return items.join(', ');
}

function tags(items) {
	if (!items || !items.length) return '<span class="dim">-</span>';
	let html = '';
	for (let i = 0; i < items.length; i++) html += '<span class="tag">' + items[i] + '</span>';
	return html;
}

function named(x) {
	if (!x) return '<span class="dim">-</span>';
	return x.title + ' <span class="dim">- ' + x.artist + '</span>';
}

function patternCell(pattern) {
	if (!pattern || !pattern.length) return '<span class="dim">-</span>';
	let names = '';
	for (let i = 0; i < pattern.length; i++) names += (i ? ' ' : '') + pattern[i][0];
	return '<span class="pat">' + names + '</span><button id="play">play</button>';
}

function field(label, value) {
	return '<div class="row"><div class="k">' + label + '</div><div>' + value + '</div></div>';
}

function renderDetail() {
	const g = byId(currentId);
	if (!g) return;
	const detailEl = $('detail');
	detailEl.innerHTML =
		'<h1>' + g.name + '</h1>' +
		'<div class="era">' + g.era + '</div>' +
		'<div class="diff">' + g.diff + '</div>' +
		field('main', list(g.main)) +
		field('add', list(g.add)) +
		field('technique', list(g.tech)) +
		field('pattern', patternCell(g.pattern)) +
		field('tags', tags(g.tags)) +
		field('notable', named(g.notable)) +
		field('starter', named(g.starter));
	const play = $('play');
	if (play) play.onclick = () => playPattern(g.pattern);
}