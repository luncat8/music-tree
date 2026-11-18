// owns: the selected genre file, detail tabs and pattern transport display
// edit for: profile content, listening recommendations and player feedback
const genreProfile = {
	init(catalog, toggle, backToMap) {
		this.catalog = catalog;
		this.panel = $('profile-region');
		this.page = $('profile-page');
		this.image = $('profile-plate');
		this.player = $('pattern-toggle');
		this.tabs = Array.from(this.panel.querySelectorAll('[role="tab"]'));
		this.player.addEventListener('click', toggle);
		$('return-map').addEventListener('click', backToMap);
		this.tabs.forEach((button, i) => {
			button.addEventListener('click', () => this.openTab(button.dataset.tab));
			button.addEventListener('keydown', event => this.tabKey(event, i));
		});
	},
	tabKey(event, index) {
		const last = this.tabs.length - 1;
		const next = { ArrowLeft: (index + last) % this.tabs.length, ArrowRight: (index + 1) % this.tabs.length, Home: 0, End: last }[event.key];
		if (next === undefined) return;
		event.preventDefault();
		this.tabs[next].focus();
		this.openTab(this.tabs[next].dataset.tab);
	},
	show(genre, score) {
		this.genre = genre;
		this.score = score;
		const family = this.catalog.families[genre.family];
		this.panel.style.setProperty('--tone', family.color);
		$('file-number').textContent = `FILE / ${this.catalog.number(genre)}`;
		this.image.src = `assets/plates/${family.plate}.webp`;
		this.image.alt = family.alt;
		$('profile-family').textContent = genre.parent ? `${family.label} family` : 'Root genre';
		$('genre-name').textContent = genre.name;
		$('genre-date').textContent = genre.date;
		$('genre-place').textContent = genre.place;
		$('play-meta').textContent = `${score.name} · ${score.bpm} BPM`;
		this.makeWave(score);
		this.transport('idle');
		this.openTab('overview');
	},
	makeWave(score) {
		let path = '';
		for (let i = 0; i < 33; i++) {
			const pitch = score.lead[i % 16] || score.bass[i % 16];
			const amplitude = 1.5 + Math.abs(Math.sin(i * 1.71 + pitch)) * (2 + 9 * Math.sin(Math.PI * i / 33));
			path += `M${1 + 2.5 * i} ${14 - amplitude}v${amplitude * 2}`;
		}
		$('player-wave').innerHTML = `<path d="${path}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`;
	},
	transport(state) {
		const playing = state === 'playing';
		this.player.setAttribute('aria-pressed', String(playing));
		$('play-label').textContent = state === 'unavailable' ? 'Audio unavailable' : playing ? 'Stop pattern' : 'Play pattern';
		$('play-symbol').setAttribute('href', playing ? '#i-stop' : '#i-play');
	},
	openTab(tab) {
		for (const button of this.tabs) {
			const active = button.dataset.tab === tab;
			button.setAttribute('aria-selected', String(active));
			button.tabIndex = active ? 0 : -1;
		}
		this.page.setAttribute('aria-labelledby', `tab-${tab}`);
		this.page.innerHTML = this[tab]();
		this.page.scrollTop = 0;
	},
	section(title, content, shift = false) {
		return `<section class="file-section"><h4 class="section-kicker${shift ? ' is-shift' : ''}">${shift ? atlasIcon('shift') : ''}${title}</h4>${content}</section>`;
	},
	tags(items) {
		return `<div class="chip-row">${items.map(item => `<span class="tag-chip">${item}</span>`).join('')}</div>`;
	},
	overview() {
		const genre = this.genre;
		const parent = this.catalog.get(genre.parent);
		const heading = parent ? `The shift from ${parent.short || parent.name}` : 'At the roots';
		return this.section(heading, `<p>${genre.shift}</p>`, true) + this.section('Core instruments', this.tags(genre.core));
	},
	sound() {
		const genre = this.genre;
		return this.section(this.score.name, `<p>${this.score.guide}</p>`, true)
			+ this.section('Key techniques', this.tags(genre.techniques))
			+ this.section('Additional instruments', this.tags(genre.optional))
			+ this.section('Characteristics', this.tags(genre.traits));
	},
	piece(heading, record) {
		return this.section(heading, `<p class="piece-title">${record[0]}</p><p class="piece-credit">${record[1]}</p><p class="piece-note">${record[2]}</p>`);
	},
	listening() {
		return this.piece('Landmark recording', this.genre.landmark) + this.piece('A piece to learn', this.genre.study);
	},
	reveal() {
		if (!window.matchMedia('(max-width: 840px)').matches) return;
		$('genre-name').focus({ preventScroll: true });
		this.panel.scrollIntoView({ block: 'start' });
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = genreProfile;
