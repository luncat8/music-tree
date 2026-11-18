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
const depthOf = genre => {
	let depth = 0;
	for (let step = genre; step.parent; step = catalog.get(step.parent)) depth++;
	return depth;
};

function withMarks(t) {
	global.atlasIcon = atlasIcon;
	global.atlasDot = atlasDot;
	t.after(() => {
		delete global.atlasIcon;
		delete global.atlasDot;
	});
}

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
	assert.equal(catalog.get('hiphop').parent, 'funk');
	assert.ok(catalog.get('hiphop').influences.some(([source]) => source === 'disco'));
	assert.ok(catalog.influencedBy('disco').some(genre => genre.id === 'hiphop'));
	assert.ok(catalog.influencedBy('rock').some(genre => genre.id === 'fusion'));
	assert.ok(catalog.influencedBy('funk').some(genre => genre.id === 'fusion'));
});

test('the fourth-generation offshoots lead to four new records in the fifth column', () => {
	const offshoots = catalog.genres.filter(genre => depthOf(genre) === 3);
	assert.deepEqual(offshoots.map(genre => genre.id).sort(), ['altrock', 'disco', 'fusion', 'hiphop']);
	assert.deepEqual([...new Set(offshoots.map(genre => genre.family))].sort(), ['jazz', 'rhythm', 'rock']);
	const deepest = Math.max(...catalog.genres.map(depthOf));
	assert.equal(deepest, 4);
	assert.equal(catalog.generations.length, deepest + 1);
	assert.equal(catalog.genres.length, 18);
	const scenes = catalog.genres.filter(genre => depthOf(genre) === deepest);
	assert.deepEqual(Object.fromEntries(scenes.map(genre => [genre.id, genre.parent])), {
		house: 'disco', techno: 'disco', dnb: 'hiphop', grunge: 'altrock'
	});
	for (const genre of scenes) {
		assert.equal(genre.family, catalog.get(genre.parent).family, `${genre.id} stays in its map branch`);
		assert.ok(genre.wiki);
		assert.ok(genre.influences.length, `${genre.id} credits additional influences`);
	}
	const crossingBranches = catalog.genres.flatMap(genre => genre.influences
		.filter(([source]) => catalog.get(source).family !== genre.family)
		.map(([source]) => `${genre.id}<-${source}`));
	for (const arc of ['hiphop<-jazz', 'fusion<-rock', 'fusion<-funk', 'rock<-rhythm', 'funk<-jazz']) assert.ok(crossingBranches.includes(arc), arc);
	assert.ok(catalog.get('altrock').influences.some(([source]) => source === 'metal'));
});

test('Wikipedia links cover genres, instruments, artists and songs while omitting unavailable entries cleanly', t => {
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

	withMarks(t);
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
});

test('Led to includes primary offshoots and influence-only paths without inventing successors', t => {
	withMarks(t);
	const view = Object.assign(Object.create(profile), { catalog });
	assert.match(view.reach(catalog.get('disco')), /class="genre-chip" data-open="house"/);
	assert.deepEqual(catalog.childrenOf('house'), []);
	view.genre = catalog.get('house');
	assert.match(view.overview(), /Led to<\/h4><div class="chip-row"><button type="button" class="genre-chip is-secondary" data-open="techno"/);
	view.genre = catalog.get('techno');
	assert.match(view.overview(), /Also shaped by[\s\S]*data-open="house"/);
	assert.equal(view.reach(catalog.get('grunge')), '');
});

test('search composes terms across name, family, instrument, artist, piece, place and era', () => {
	assert.deepEqual(catalog.search('  Trumpet   ORLEANS ').map(genre => genre.id), ['jazz']);
	assert.deepEqual(catalog.search('punk 1970s').map(genre => genre.id), ['punk']);
	assert.deepEqual(catalog.search('planet rock').map(genre => genre.id), ['hiphop']);
	assert.ok(catalog.search('fusion').some(genre => genre.id === 'fusion'));
	assert.ok(catalog.search('chic').some(genre => genre.id === 'disco'));
	assert.ok(catalog.search('R&B').some(genre => genre.id === 'rhythm'));
	assert.ok(catalog.search('rhythm and blues').some(genre => genre.id === 'rhythm'));
	assert.ok(catalog.search('clarinet').some(genre => genre.id === 'jazz'));
	assert.deepEqual(catalog.search('West End Blues').map(genre => genre.id), ['jazz']);
	assert.deepEqual(catalog.search('Hot Five').map(genre => genre.id), ['jazz']);
	assert.deepEqual(catalog.search('Charlie Parker').map(genre => genre.id), ['bebop']);
	for (const [query, id] of [['chicago house', 'house'], ['detroit techno', 'techno'], [' DRUM   AND BASS ', 'dnb'], ['D&B', 'dnb'], ['Seattle sound', 'grunge']]) {
		assert.equal(catalog.search(query)[0]?.id, id, `first hit for ${query}`);
	}
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
	assert.equal(map.measure(origin, 0), 8);
	assert.equal(origin.unit, 4);
	assert.equal(map.isAncestor(origin, records.get('dnb')), true);
	assert.equal(map.isAncestor(records.get('jazz'), records.get('funk')), false);
	assert.equal(records.get('disco').unit, (records.get('house').unit + records.get('techno').unit) / 2);
	assert.equal(records.get('hiphop').unit, records.get('dnb').unit);
	assert.equal(records.get('punk').unit, records.get('grunge').unit);
});

test('column geometry and guide headings follow the maximum depth in the catalog', t => {
	const guides = [];
	global.$ = () => ({ append: guide => guides.push(guide.innerHTML) });
	global.document = { createElement: () => ({}) };
	t.after(() => { delete global.$; delete global.document; });
	const view = Object.assign(Object.create(map), { catalog, depth: Math.max(...catalog.genres.map(depthOf)) });
	view.makeGuides();
	assert.deepEqual(guides, catalog.generations.map((label, i) => `<b>0${i + 1}</b>${label}`));
	for (const compact of [false, true]) {
		view.compact = compact;
		const columns = view.computeColumns();
		assert.equal(columns.length, guides.length);
		assert.ok(columns[0] > 0 && columns.at(-1) < 1);
		const gaps = columns.slice(1).map((value, i) => value - columns[i]);
		assert.ok(gaps.every(gap => gap > 0));
		assert.ok(Math.max(...gaps) - Math.min(...gaps) < 1e-9, 'columns stay evenly spaced');
	}
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

test('the scheduler plays a four-beat kick for club patterns and syncopates the break for drum and bass', () => {
	const floor = [0, 1, 2, 3, 4, 5, 6, 7];
	const backbeat = [1, 3, 5, 7];
	for (const [id, kicks, snares] of [
		['jazz', [0, 2, 4, 6], backbeat], ['disco', floor, backbeat], ['house', floor, backbeat],
		['techno', floor, [3, 7]], ['dnb', [0, 2.5, 4, 5.75, 6.5], backbeat]
	]) {
		const player = Object.create(atlasAudio);
		const score = patternScores[id];
		const beat = 60 / score.bpm;
		const hits = [[], []];
		player.context = { currentTime: 0, createGain: () => ({ gain: {}, connect() {} }) };
		player.tone = player.rattle = () => {};
		player.drum = (time, snare) => hits[Number(snare)].push(Math.round((time - .035) / beat * 100) / 100);
		assert.equal(player.schedule(score), 8 * beat + .1);
		assert.deepEqual(hits, [kicks, snares], id);
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
