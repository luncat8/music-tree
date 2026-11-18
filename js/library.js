// owns: atlas navigation, searchable genre index, quick jump and field guide
// edit for: search results, keyboard shortcuts and view switching
const atlasLibrary = {
	page: 'explorer', hits: [], cursor: -1,
	init(catalog, jump, leaveExplorer) {
		this.catalog = catalog;
		this.jump = jump;
		this.leaveExplorer = leaveExplorer;
		this.explorer = $('explorer-view');
		this.index = $('index-view');
		this.entries = $('catalog-entries');
		this.indexQuery = $('index-query');
		this.search = $('search-dialog');
		this.guide = $('guide-dialog');
		this.quickQuery = $('quick-query');
		this.results = $('quick-results');
		$('open-explorer').addEventListener('click', () => this.setPage('explorer'));
		$('home-link').addEventListener('click', () => this.setPage('explorer'));
		$('open-index').addEventListener('click', () => this.setPage('index'));
		$('quick-open').addEventListener('click', () => this.openSearch());
		$('guide-open').addEventListener('click', () => this.guide.showModal());
		for (const dialog of [this.search, this.guide]) this.wireDialog(dialog);
		this.indexQuery.addEventListener('input', () => this.renderIndex());
		this.entries.addEventListener('click', event => {
			const entry = event.target.closest('[data-genre]');
			if (entry) this.jump(entry.dataset.genre);
		});
		this.wireSearch();
		const branches = catalog.genres.filter(genre => genre.parent && !catalog.get(genre.parent).parent);
		$('collection-size').textContent = `${catalog.genres.length} genres  /  ${branches.length} branches`;
	},
	wireDialog(dialog) {
		dialog.querySelector('[data-dismiss]').addEventListener('click', () => dialog.close());
		dialog.addEventListener('click', event => {
			if (event.target !== dialog) return;
			const rect = dialog.getBoundingClientRect();
			if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
		});
	},
	setPage(page) {
		const explorer = page === 'explorer';
		this.page = page;
		this.explorer.hidden = !explorer;
		this.index.hidden = explorer;
		this.setNav($('open-explorer'), explorer);
		this.setNav($('open-index'), !explorer);
		const title = explorer ? 'Genre explorer' : 'Genre index';
		$('page-name').textContent = title;
		document.title = `Music Tree — ${title}`;
		$('page-deck').textContent = explorer ? 'Trace the roots, branches, and defining sounds of modern music.' : 'Browse the archive by genre, instrument, place, or era.';
		if (explorer) return;
		this.leaveExplorer();
		this.indexQuery.value = '';
		this.renderIndex();
	},
	setNav(button, current) {
		button.classList.toggle('is-current', current);
		if (current) button.setAttribute('aria-current', 'page');
		else button.removeAttribute('aria-current');
	},
	renderIndex() {
		const entries = this.catalog.search(this.indexQuery.value).sort((a, b) => a.name.localeCompare(b.name));
		this.entries.innerHTML = entries.length ? entries.map(genre => this.indexRow(genre)).join('') : this.empty();
	},
	indexRow(genre) {
		const family = this.catalog.families[genre.family];
		return `<button class="index-entry" type="button" data-genre="${genre.id}" aria-label="Open ${genre.name} profile"><span class="entry-number">${this.catalog.number(genre)}</span><span class="entry-name">${genre.name}</span><span class="entry-family">${atlasDot(family.color)}${family.label}</span><span class="entry-date">${genre.date}</span>${atlasIcon('arrow')}</button>`;
	},
	empty() {
		return '<p class="empty-results" role="status">No genres found. Try a name, instrument, or place.</p>';
	},
	openSearch() {
		if (this.search.open || this.guide.open) return;
		this.quickQuery.value = '';
		this.search.showModal();
		this.renderSearch();
		this.quickQuery.focus();
	},
	wireSearch() {
		document.addEventListener('keydown', event => {
			if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input, textarea, select, [contenteditable]')) return;
			event.preventDefault();
			this.openSearch();
		});
		this.quickQuery.addEventListener('input', () => this.renderSearch());
		this.quickQuery.addEventListener('keydown', event => {
			if (!this.hits.length) return;
			if (event.key === 'Enter') {
				event.preventDefault();
				this.accept(this.cursor);
				return;
			}
			if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
			event.preventDefault();
			const next = (this.cursor + (event.key === 'ArrowDown' ? 1 : -1) + this.hits.length) % this.hits.length;
			this.highlight(next, true);
		});
		this.results.addEventListener('click', event => {
			const option = event.target.closest('[data-hit]');
			if (option) this.accept(Number(option.dataset.hit));
		});
		this.results.addEventListener('pointermove', event => {
			const option = event.target.closest('[data-hit]');
			if (option && this.cursor !== Number(option.dataset.hit)) this.highlight(Number(option.dataset.hit), false);
		});
	},
	renderSearch() {
		this.hits = this.catalog.search(this.quickQuery.value);
		this.cursor = -1;
		this.quickQuery.removeAttribute('aria-activedescendant');
		$('quick-label').textContent = `GENRES / ${String(this.hits.length).padStart(2, '0')}`;
		this.results.innerHTML = this.hits.length ? this.hits.map((genre, i) => this.searchRow(genre, i)).join('') : this.empty();
		this.results.scrollTop = 0;
		if (this.hits.length) this.highlight(0, false);
	},
	searchRow(genre, i) {
		return `<div class="quick-option" id="hit-${genre.id}" role="option" aria-selected="false" data-hit="${i}">${atlasDot(this.catalog.families[genre.family].color)}<span>${genre.name}</span><span class="entry-date">${genre.date}</span>${atlasIcon('arrow')}</div>`;
	},
	highlight(index, scroll) {
		if (this.cursor >= 0) this.results.children[this.cursor].setAttribute('aria-selected', 'false');
		this.cursor = index;
		const option = this.results.children[index];
		option.setAttribute('aria-selected', 'true');
		this.quickQuery.setAttribute('aria-activedescendant', option.id);
		if (scroll) option.scrollIntoView({ block: 'nearest' });
	},
	accept(index) {
		const genre = this.hits[index];
		if (!genre) return;
		this.search.close();
		this.jump(genre.id);
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = atlasLibrary;
