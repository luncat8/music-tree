// owns: the selected genre file, lineage links, reference links and transport display
// edit for: profile tabs, rhythm diagrams, Wikipedia links and player feedback
const genreProfile = {
	activeTab: 'overview',
	init(catalog, choose, toggle, backToMap) {
		this.catalog = catalog;
		this.panel = $('profile-region');
		this.page = $('profile-page');
		this.wiki = $('genre-wiki');
		this.player = $('pattern-toggle');
		this.tabs = Array.from(this.panel.querySelectorAll('[role="tab"]'));
		this.player.addEventListener('click', toggle);
		$('return-map').addEventListener('click', backToMap);
		this.page.addEventListener('click', event => {
			const target = event.target.closest('[data-open]');
			if (!target) return;
			choose(target.dataset.open, false);
			$('genre-name').focus({ preventScroll: true });
		});
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
		const wiki = this.catalog.wikiUrl(genre.wiki);
		this.panel.style.setProperty('--tone', family.color);
		$('file-number').textContent = `FILE / ${this.catalog.number(genre)}`;
		$('profile-family').textContent = genre.parent ? `${family.label} family` : 'Root genre';
		$('genre-name').textContent = genre.name;
		this.wiki.hidden = !wiki;
		if (wiki) {
			this.wiki.href = wiki;
			this.wiki.setAttribute('aria-label', `${genre.name} on Wikipedia (opens in new tab)`);
		}
		$('genre-date').textContent = genre.date;
		$('genre-place').textContent = genre.place;
		$('play-meta').textContent = `${score.name} · ${score.bpm} BPM`;
		this.makeWave(score);
		this.transport('idle');
		this.openTab(this.activeTab);
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
		this.activeTab = tab;
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
	wikiLink(slug, text, className, label = text) {
		const url = this.catalog.wikiUrl(slug);
		if (!url) return '';
		return `<a class="${className}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label} on Wikipedia (opens in new tab)">${text}${atlasIcon('out')}</a>`;
	},
	genreChip(genre, secondary = false) {
		const color = this.catalog.families[genre.family].color;
		const note = secondary ? ', additional influence' : '';
		return `<button type="button" class="genre-chip${secondary ? ' is-secondary' : ''}" data-open="${genre.id}" aria-label="Open ${genre.name}${note} profile">${atlasDot(color)}${genre.short || genre.name}</button>`;
	},
	tags(items) {
		return `<div class="chip-row">${items.map(item => `<span class="tag-chip">${item}</span>`).join('')}</div>`;
	},
	instruments(items) {
		const chips = items.map(item => this.wikiLink(this.catalog.instruments[item], item, 'tag-chip is-link') || `<span class="tag-chip">${item}</span>`);
		return `<div class="chip-row">${chips.join('')}</div>`;
	},
	influences(entries) {
		if (!entries.length) return '';
		const items = entries.map(([id, note]) => `<div class="influence-item">${this.genreChip(this.catalog.get(id), true)}<p>${note}</p></div>`).join('');
		return this.section('Also shaped by', `<div class="influence-list">${items}</div>`);
	},
	reach(genre) {
		const items = [
			...this.catalog.childrenOf(genre.id).map(child => this.genreChip(child, false)),
			...this.catalog.influencedBy(genre.id).map(target => this.genreChip(target, true))
		];
		return items.length ? this.section('Led to', `<div class="chip-row">${items.join('')}</div>`) : '';
	},
	overview() {
		const genre = this.genre;
		const parent = this.catalog.get(genre.parent);
		const parentLink = parent ? `<button type="button" class="kicker-link" data-open="${parent.id}" aria-label="Open parent genre ${parent.name}">${parent.short || parent.name}</button>` : '';
		const heading = parent ? `The shift from ${parentLink}` : 'At the roots';
		return this.section(heading, `<p>${genre.shift}</p>`, true)
			+ this.influences(genre.influences)
			+ this.section('Core instruments', this.instruments(genre.core))
			+ this.reach(genre);
	},
	rhythmCount(hits, start) {
		const syllables = ['', ' e', ' and', ' a'];
		return hits.filter(beat => beat >= start && beat < start + 4)
			.map(beat => `${Math.floor(beat) - start + 1}${syllables[(beat % 1) * 4]}`).join(', ') || 'rest';
	},
	rhythmTrack(hits, start) {
		let track = '';
		for (let beat = start; beat < start + 4; beat++) {
			track += '<span class="rhythm-beat">';
			for (let step = 0; step < 4; step++) track += hits.includes(beat + step / 4) ? '<i class="is-hit"></i>' : '<i></i>';
			track += '</span>';
		}
		return `<div class="rhythm-track">${track}</div>`;
	},
	rhythm() {
		const { kicks, snares } = patternDrums(this.score);
		const rows = [['Kick', kicks], ['Snare', snares]].map(([label, hits]) => (
			`<span>${label}</span>${this.rhythmTrack(hits, 0)}${this.rhythmTrack(hits, 4)}`
		)).join('');
		const counts = [0, 4].map(start => `Bar ${start / 4 + 1}: kick ${this.rhythmCount(kicks, start)}; snare ${this.rhythmCount(snares, start)}.`).join(' ');
		return `<figure class="rhythm-study"><figcaption>Kick &amp; snare<span>4 steps per beat</span></figcaption><div class="rhythm-grid" role="img" aria-label="${counts}"><span></span><span class="rhythm-bar">Bar 1</span><span class="rhythm-bar">Bar 2</span>${rows}</div></figure>`;
	},
	sound() {
		const genre = this.genre;
		return this.section(this.score.name, `<p>${this.score.guide}</p>${this.rhythm()}`, true)
			+ this.section('Key techniques', this.tags(genre.techniques))
			+ this.section('Additional instruments', this.instruments(genre.optional))
			+ this.section('Characteristics', this.tags(genre.traits));
	},
	piece(heading, record) {
		const title = this.wikiLink(record.wiki, record.title, 'wiki-inline', `${record.title} by ${record.artist}`) || record.title;
		const artist = this.wikiLink(record.artistWiki, record.artist, 'wiki-inline') || record.artist;
		const credit = [artist, record.ensemble].filter(Boolean).join(' ');
		return this.section(heading, `<p class="piece-title">${title}</p><p class="piece-credit">${credit} · ${record.year}</p><p class="piece-note">${record.note}</p>`);
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
