// owns: dependency-free checks for the atlas contract
// edit for: graph integrity, offline assets, Wikipedia links, study coverage and transport regressions
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const catalog = require('../js/catalog.js');
const { atlasIcon, atlasDot } = require('../js/marks.js');
const { patternScores, atlasAudio } = require('../js/audio.js');
const map = require('../js/map.js');
const profile = require('../js/profile.js');
const base = path.join(__dirname, '..');
const read = filename => fs.readFileSync(path.join(base, filename), 'utf8');
const validWiki = slug => assert.match(slug, /^[A-Za-z0-9_.,():%-]+$/, `invalid wiki slug: ${slug}`);

test('the page composes classic scripts in one scope, with local assets and matched icon symbols', () => {
	const html = read('index.html');
	const ids = Array.from(html.matchAll(/\sid="([^"]+)"/g), match => match[1]);
	assert.equal(new Set(ids).size, ids.length);
	assert.ok(!html.includes('profile-plate'));
	const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g), match => match[1]);
	assert.equal(scripts.at(-1), 'js/main.js');
	const context = vm.createContext({});
	let scriptText = '';
	for (const name of scripts) {
		const source = read(name);
		scriptText += `\n${source}`;
		for (const [, global] of source.matchAll(/^(?:const|function|class) (\w+)/gm)) assert.ok(!ids.includes(global), global);
		vm.runInContext(source, context, { filename: name });
	}
	for (const [, resource] of html.matchAll(/\s(?:src|href)="(?!#)([^"]+)"/g)) assert.ok(fs.existsSync(path.join(base, resource)), resource);
	for (const sheet of fs.readdirSync(path.join(base, 'styles'))) {
		for (const [, asset] of read(`styles/${sheet}`).matchAll(/url\('([^']+)'\)/g)) assert.ok(fs.existsSync(path.join(base, 'styles', asset)), asset);
	}
	const symbols = new Set(Array.from(html.matchAll(/<symbol id="([^"]+)"/g), match => match[1]));
	const used = new Set(Array.from(html.matchAll(/href="#(i-[^"]+)"/g), match => match[1]));
	for (const [, icon] of scriptText.matchAll(/atlasIcon\('([^']+)'\)/g)) used.add(`i-${icon}`);
	for (const family of Object.values(catalog.families)) used.add(`i-${family.glyph}`);
	for (const id of ['i-play', 'i-stop']) used.add(id);
	for (const id of used) assert.ok(symbols.has(id), `missing symbol ${id}`);
	for (const id of symbols) assert.ok(used.has(id), `unused symbol ${id}`);
});

test('each profile reaches a single origin, separates secondary influences and supplies both pieces', () => {
	const origins = catalog.genres.filter(genre => !genre.parent);
	assert.equal(origins.length, 1);
	assert.equal(new Set(catalog.genres.map(genre => genre.id)).size, catalog.genres.length);
	for (const genre of catalog.genres) {
		const visited = new Set();
		let ancestor = genre;
		while (ancestor.parent) {
			assert.ok(!visited.has(ancestor.id), `cycle at ${ancestor.id}`);
			visited.add(ancestor.id);
			ancestor = catalog.get(ancestor.parent);
			assert.ok(ancestor, `missing parent for ${genre.id}`);
		}
		assert.equal(ancestor, origins[0]);
		assert.ok(catalog.families[genre.family] && !('plate' in catalog.families[genre.family]));
		for (const key of ['date', 'place', 'shift', 'core', 'optional', 'techniques', 'traits']) assert.ok(genre[key].length, `${genre.id}: ${key}`);
		const seenInfluences = new Set();
		for (const [source, note] of genre.influences) {
			assert.ok(catalog.get(source), `${genre.id}: missing influence ${source}`);
			assert.notEqual(source, genre.id);
			assert.notEqual(source, genre.parent);
			assert.ok(!seenInfluences.has(source), `${genre.id}: duplicate influence ${source}`);
			assert.ok(note && note.length > 10, `${genre.id}: missing note for ${source}`);
			seenInfluences.add(source);
		}
		for (const key of ['landmark', 'study']) {
			const piece = genre[key];
			for (const field of ['title', 'artist', 'year', 'note']) assert.ok(piece[field], `${genre.id}.${key}.${field}`);
		}
	}
	assert.ok(catalog.get('rock').influences.some(([source]) => source === 'rhythm'));
	assert.ok(catalog.influencedBy('rhythm').some(genre => genre.id === 'rock'));
});

test('Wikipedia links cover genres, instruments, artists and songs while omitting unavailable entries cleanly', () => {
	const usedInstruments = new Set();
	for (const genre of catalog.genres) {
		if (genre.wiki) validWiki(genre.wiki);
		for (const item of [...genre.core, ...genre.optional]) usedInstruments.add(item);
		for (const piece of [genre.landmark, genre.study]) {
			if (piece.wiki) validWiki(piece.wiki);
			if (piece.artistWiki) validWiki(piece.artistWiki);
			assert.ok(!piece.wiki?.includes("'"));
			assert.ok(!piece.artistWiki?.includes("'"));
		}
	}
	for (const [name, slug] of Object.entries(catalog.instruments)) {
		assert.ok(usedInstruments.has(name), `unused instrument slug: ${name}`);
		validWiki(slug);
	}
	assert.equal(catalog.wikiUrl(''), '');
	assert.equal(catalog.wikiUrl('Swing_music'), 'https://en.wikipedia.org/wiki/Swing_music');

	global.atlasIcon = atlasIcon;
	global.atlasDot = atlasDot;
	const view = Object.create(profile);
	view.catalog = catalog;
	view.genre = catalog.get('metal');
	view.score = patternScores.metal;
	const sound = view.sound();
	assert.match(sound, /href="https:\/\/en\.wikipedia\.org\/wiki\/Keyboard_instrument" target="_blank" rel="noopener noreferrer"/);
	assert.match(sound, /<span class="tag-chip">Second guitar<\/span>/);
	const overview = view.overview();
	assert.match(overview, /data-open="rock"/);
	assert.match(overview, /data-open="blues"/);
	assert.match(overview, /href="https:\/\/en\.wikipedia\.org\/wiki\/Electric_guitar"/);
	const listening = view.listening();
	assert.match(listening, /href="https:\/\/en\.wikipedia\.org\/wiki\/Black_Sabbath_\(song\)"/);
	assert.match(listening, /href="https:\/\/en\.wikipedia\.org\/wiki\/Black_Sabbath"/);

	view.genre = catalog.get('bebop');
	const bebopListening = view.listening();
	assert.match(bebopListening, /<p class="piece-title">Ko-Ko<\/p>/);
	assert.match(bebopListening, /href="https:\/\/en\.wikipedia\.org\/wiki\/Charlie_Parker"/);
	assert.match(bebopListening, /href="https:\/\/en\.wikipedia\.org\/wiki\/Now%27s_the_Time_\(composition\)"/);

	const unlinked = view.piece('Study', { title: 'Untitled Etude', artist: 'Traditional', year: '1920', note: 'Practice slowly.' });
	assert.ok(!unlinked.includes('<a '));
	assert.match(unlinked, /Traditional · 1920/);
	delete global.atlasIcon;
	delete global.atlasDot;
});

test('search composes terms across name, family, instrument, artist, piece, place and era', () => {
	assert.deepEqual(catalog.search('  Trumpet   ORLEANS ').map(genre => genre.id), ['jazz']);
	assert.deepEqual(catalog.search('rock 1970s').map(genre => genre.id), ['punk']);
	assert.ok(catalog.search('R&B').some(genre => genre.id === 'rhythm'));
	assert.ok(catalog.search('rhythm and blues').some(genre => genre.id === 'rhythm'));
	assert.ok(catalog.search('clarinet').some(genre => genre.id === 'jazz'));
	assert.deepEqual(catalog.search('West End Blues').map(genre => genre.id), ['jazz']);
	assert.deepEqual(catalog.search('Hot Five').map(genre => genre.id), ['jazz']);
	assert.deepEqual(catalog.search('Charlie Parker').map(genre => genre.id), ['bebop']);
	assert.equal(catalog.search('').length, catalog.genres.length);
	assert.equal(catalog.search('no such genre').length, 0);
});

test('ancestor rows stay centered over visible leaves and trace ancestry across depths', () => {
	const records = new Map(catalog.genres.map(genre => [genre.id, { genre, visible: true, children: [] }]));
	for (const node of records.values()) {
		node.parent = records.get(node.genre.parent);
		if (node.parent) node.parent.children.push(node);
	}
	const origin = records.get('blues');
	assert.equal(map.measure(origin, 0), 6);
	assert.equal(origin.unit, 3);
	assert.equal(map.isAncestor(origin, records.get('bebop')), true);
	assert.equal(map.isAncestor(records.get('jazz'), records.get('funk')), false);
	for (const node of records.values()) node.visible = node === origin || node.genre.family === 'rock';
	assert.equal(map.measure(origin, 0), 2);
	assert.equal(records.get('rock').unit, origin.unit);
	assert.equal(records.get('metal').unit, .5);
	assert.equal(records.get('punk').unit, 1.5);
});

test('every genre has a complete two-bar pattern with playable pitches and chord lengths', () => {
	assert.deepEqual(Object.keys(patternScores).sort(), catalog.genres.map(genre => genre.id).sort());
	for (const score of Object.values(patternScores)) {
		assert.ok(score.name && score.guide);
		assert.ok(score.bpm >= 60 && score.bpm <= 240);
		assert.ok(['sawtooth', 'sine', 'square', 'triangle'].includes(score.voice));
		for (const line of [score.lead, score.bass]) {
			assert.equal(line.length, 16);
			assert.ok(line.some(Boolean));
			assert.ok(line.every(note => Number.isInteger(note) && (note === 0 || note >= 21 && note <= 108)));
		}
		for (const [offset, length, ...pitches] of score.chords) {
			assert.ok(offset >= 0 && length > 0 && offset + length <= 8);
			assert.ok(pitches.length >= 2 && pitches.every(note => note >= 21 && note <= 108));
		}
	}
});

test('stopping while resuming cancels playback and active buses anchor their fade-out', async () => {
	const player = Object.create(atlasAudio);
	let resume;
	let scheduled = 0;
	const states = [];
	player.context = { state: 'suspended', currentTime: 2, resume: () => new Promise(resolve => { resume = resolve; }) };
	player.schedule = () => { scheduled++; return 1; };
	player.init(state => states.push(state));
	const started = player.toggle('jazz');
	player.stop();
	resume();
	await started;
	assert.equal(scheduled, 0);
	assert.deepEqual(states, ['idle']);
	assert.equal(player.active, false);

	const calls = [];
	player.bus = {
		gain: {
			value: .48,
			setValueAtTime: (v, t) => calls.push(['set', v, t]),
			linearRampToValueAtTime: (v, t) => calls.push(['ramp', v, t])
		},
		disconnect: () => {}
	};
	player.sources = [{ stop: t => calls.push(['stop', t]) }];
	player.stop();
	assert.deepEqual(calls, [['set', .48, 2], ['ramp', 0, 2.02], ['stop', 2.02]]);
});

test('audio errors leave browsing and the transport available for a retry', async () => {
	const player = Object.create(atlasAudio);
	let state;
	player.init(value => { state = value; });
	player.prepare = () => { throw new Error('Audio unavailable'); };
	await player.toggle('jazz');
	assert.equal(state, 'unavailable');
	assert.equal(player.active, false);
});
