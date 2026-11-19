// owns: dependency-free checks for the atlas contract
// edit for: graph integrity, offline assets, Wikipedia links, study coverage and transport regressions
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const catalog = require('../js/catalog.js');
const { atlasIcon, atlasDot } = require('../js/marks.js');
const { patternScores, patternDrums, atlasAudio } = require('../js/audio.js');
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

function withProfileDeps(t) {
	global.patternDrums = patternDrums;
	global.atlasIcon = atlasIcon;
	global.atlasDot = atlasDot;
	t.after(() => {
		delete global.atlasIcon;
		delete global.atlasDot;
		delete global.patternDrums;
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

test('each profile reaches one of the atlas roots, separates secondary influences and supplies both pieces', () => {
	const origins = catalog.genres.filter(genre => !genre.parent);
	assert.deepEqual(origins.map(genre => genre.id), ['blues', 'jazz', 'mento', 'country', 'son']);
	assert.equal(catalog.get('bluegrass').parent, 'country');
	assert.equal(catalog.get('salsa').parent, 'son');
	assert.ok(catalog.influencedBy('blues').includes(catalog.get('jazz')));
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
		assert.ok(origins.includes(ancestor));
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

test('the atlas keeps its offshoots and traces the UK rave route as primary lineage', () => {
	for (const id of ['altrock', 'disco', 'hiphop']) assert.equal(depthOf(catalog.get(id)), 3, id);
	assert.equal(depthOf(catalog.get('fusion')), 2);
	const deepest = Math.max(...catalog.genres.map(depthOf));
	assert.equal(depthOf(catalog.get('dnb')), 7);
	assert.equal(deepest, 8);
	assert.equal(depthOf(catalog.get('motown')), 3);
	for (const id of ['milrock', 'triphop']) assert.equal(depthOf(catalog.get(id)), 4, id);
	assert.equal(depthOf(catalog.get('dancehall')), 4);
	assert.equal(depthOf(catalog.get('dnb_pop')), 8);
	assert.ok(catalog.generations.length >= deepest + 1, 'headings repeat the last label past the named list');
	for (const [id, parent] of [['house', 'disco'], ['techno', 'disco'], ['grunge', 'altrock']]) {
		assert.equal(catalog.get(id).parent, parent);
		assert.equal(depthOf(catalog.get(id)), 4);
	}
	const rave = ['hardcore', 'jungle', 'dnb'].map(id => catalog.get(id));
	assert.deepEqual(rave.map(genre => genre.parent), ['house', 'hardcore', 'jungle']);
	assert.deepEqual(rave.map(depthOf), [5, 6, 7]);
	for (const genre of rave) {
		assert.equal(genre.family, 'rhythm');
		assert.ok(genre.wiki);
	}
	assert.deepEqual(rave[0].influences.map(([source]) => source).sort(), ['hiphop', 'techno']);
	assert.ok(catalog.influencedBy('funk').includes(rave[1]));
	const crossingBranches = catalog.genres.flatMap(genre => genre.influences
		.filter(([source]) => catalog.get(source).family !== genre.family)
		.map(([source]) => `${genre.id}<-${source}`));
	for (const arc of ['hiphop<-jazz', 'fusion<-rock', 'fusion<-funk', 'rock<-rhythm', 'funk<-jazz']) assert.ok(crossingBranches.includes(arc), arc);
	assert.ok(catalog.get('altrock').influences.some(([source]) => source === 'metal'));
});

test('the Kingston files trace the mento route to dub and connect it to jungle', () => {
	const ids = ['ska', 'rocksteady', 'reggae', 'dub'];
	const route = ids.map(id => catalog.get(id));
	assert.equal(catalog.genres.length, 40);
	assert.deepEqual(route.map(genre => genre.parent), ['mento', 'ska', 'rocksteady', 'reggae']);
	assert.ok(route.every(genre => genre.family === 'mento'));
	assert.deepEqual(route.map(genre => catalog.number(genre)), ['021', '022', '023', '024']);
	assert.ok(catalog.influencedBy('rhythm').includes(route[0]));
	assert.ok(catalog.influencedBy('jazz').includes(route[0]));
	assert.ok(catalog.influencedBy('soul').includes(route[1]));
	assert.ok(catalog.influencedBy('dub').includes(catalog.get('jungle')));
	assert.deepEqual(catalog.search('Kingston').map(genre => genre.id), [...ids, 'dancehall']);
	assert.equal(catalog.get('dancehall').parent, 'reggae');
	for (const genre of route) {
		assert.equal(catalog.search(genre.landmark.title)[0], genre);
		assert.equal(catalog.search(genre.study.artist)[0], genre);
	}
	assert.equal(catalog.search('rock steady')[0], route[1]);
	assert.equal(catalog.search('dub reggae')[0], route[3]);
});

test('the Country files expand from honky-tonk into outlaw and country-rock lineages', () => {
	const ids = ['honkytonk', 'outlaw', 'countryrock', 'altcountry'];
	const files = ids.map(id => catalog.get(id));
	assert.deepEqual(files.map(genre => genre.parent), ['country', 'honkytonk', 'country', 'countryrock']);
	assert.ok(files.every(genre => genre.family === 'country'));
	assert.deepEqual(files.map(genre => catalog.number(genre)), ['037', '038', '039', '040']);
	assert.deepEqual(files.map(genre => depthOf(genre)), [1, 2, 1, 2]);
	assert.deepEqual(files[2].influences.map(([source]) => source), ['rock']);
	assert.deepEqual(files[3].influences.map(([source]) => source), ['altrock', 'punk']);
	for (const source of ['rock', 'altrock', 'punk']) {
		const child = files.find(genre => genre.influences.some(([id]) => id === source));
		assert.ok(catalog.influencedBy(source).includes(child), `${source} -> ${child.id}`);
	}
	assert.equal(catalog.search('honky tonk')[0], files[0]);
	assert.equal(catalog.search('outlaw country')[0], files[1]);
	assert.equal(catalog.search('alt-country')[0], files[3]);
	assert.equal(catalog.search('California Stars')[0], files[3]);

	const records = new Map(catalog.genres.map(genre => [genre.id, { genre, visible: true }]));
	for (const node of records.values()) node.parent = records.get(node.genre.parent);
	const view = Object.assign(Object.create(map), { branch: 'country', nodes: [...records.values()] });
	view.markVisible();
	assert.deepEqual(view.nodes.filter(node => node.visible).map(node => node.genre.id).sort(),
		['altcountry', 'bluegrass', 'country', 'countryrock', 'honkytonk', 'outlaw']);
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

	withProfileDeps(t);
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

test('selecting a genre renders its file in the active tab with a matching tab stop and label', t => {
	withProfileDeps(t);
	const element = () => ({ setAttribute(name, value) { this[name] = value; } });
	global.$ = element;
	t.after(() => { delete global.$; });
	const tabs = ['overview', 'sound', 'listening'].map(tab => ({ ...element(), dataset: { tab }, focus() {} }));
	const view = Object.assign(Object.create(profile), {
		catalog, tabs, page: element(), wiki: element(), player: element(), panel: { style: { setProperty() {} } }
	});
	const checkFile = (id, tab, text) => {
		view.show(catalog.get(id), patternScores[id]);
		assert.ok(view.page.innerHTML.includes(text), `${id}: ${tab} content`);
		assert.equal(view.page['aria-labelledby'], `tab-${tab}`);
		for (const button of tabs) {
			const active = button.dataset.tab === tab;
			assert.equal(button['aria-selected'], String(active));
			assert.equal(button.tabIndex, active ? 0 : -1);
		}
	};
	checkFile('jazz', 'overview', catalog.get('jazz').shift);
	view.openTab('sound');
	checkFile('reggae', 'sound', patternScores.reggae.guide);
	checkFile('dub', 'sound', patternScores.dub.guide);
	view.tabKey({ key: 'End', preventDefault() {} }, 1);
	checkFile('rocksteady', 'listening', catalog.get('rocksteady').landmark.title);
	view.openTab('overview');
	checkFile('ska', 'overview', catalog.get('ska').shift);
});

test('Led to includes primary offshoots and influence-only paths without inventing successors', t => {
	withProfileDeps(t);
	const view = Object.assign(Object.create(profile), { catalog });
	assert.match(view.reach(catalog.get('disco')), /class="genre-chip" data-open="house"/);
	view.genre = catalog.get('house');
	assert.match(view.reach(view.genre), /class="genre-chip" data-open="hardcore".*class="genre-chip is-secondary" data-open="techno"/);
	assert.deepEqual(catalog.childrenOf('techno'), []);
	view.genre = catalog.get('techno');
	const overview = view.overview();
	assert.match(overview, /Led to<\/h4><div class="chip-row"><button type="button" class="genre-chip is-secondary" data-open="hardcore"/);
	assert.match(overview, /Also shaped by[\s\S]*data-open="house"/);
	view.genre = catalog.get('dnb');
	assert.match(view.overview(), /The shift from <button[^>]+data-open="jungle"/);
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
	for (const [query, id] of [['chicago house', 'house'], ['detroit techno', 'techno'], [' DRUM   AND BASS ', 'dnb'], ['D&B', 'dnb'], ['drum n bass', 'dnb'], ['rave hardcore', 'hardcore'], ['Seattle sound', 'grunge']]) {
		assert.equal(catalog.search(query)[0]?.id, id, `first hit for ${query}`);
	}
	assert.equal(catalog.search('jungle')[0].id, 'jungle');
	assert.ok(catalog.search('jungle').every(genre => genre.id === 'jungle' || genre.id === 'dnb_pop'));
	assert.deepEqual(catalog.search('Valley of the Shadows').map(genre => genre.id), ['jungle']);
	assert.deepEqual(catalog.search('Bombscare').map(genre => genre.id), ['hardcore']);
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
	const leafCount = [...records.values()].filter(node => !node.children.length).length;
	const nodes = [...records.values()];
	const roots = nodes.filter(node => !node.parent);
	const view = Object.assign(Object.create(map), { nodes, roots });
	assert.equal(view.measureForest(), leafCount);
	assert.deepEqual(roots.map(node => node.unit), [...new Set(roots.map(node => node.unit))].sort((a, b) => a - b));
	assert.equal(map.isAncestor(origin, records.get('dub')), false);
	assert.equal(map.isAncestor(origin, records.get('dnb')), true);
	assert.equal(map.isAncestor(records.get('jazz'), records.get('funk')), false);
	assert.equal(records.get('disco').unit, (records.get('house').unit + records.get('techno').unit) / 2);
	for (const id of ['house', 'hardcore', 'jungle', 'dnb']) assert.equal(records.get(id).unit, records.get('dnb_pop').unit);
	assert.notEqual(records.get('punk').unit, records.get('grunge').unit);
	view.branch = 'rock';
	view.markVisible();
	assert.deepEqual(nodes.filter(node => node.visible).map(node => node.genre.id), nodes.filter(node => node.genre.family === 'rock' || node === origin).map(node => node.genre.id));
	view.branch = 'mento';
	view.markVisible();
	assert.equal(view.measureForest(), 2);
	assert.ok(records.get('mento').visible && records.get('dub').visible && !origin.visible);
});

test('column geometry and guide headings follow the maximum depth in the catalog', t => {
	const guides = [];
	global.$ = () => ({ append: guide => guides.push(guide.innerHTML) });
	global.document = { createElement: () => ({}) };
	t.after(() => { delete global.$; delete global.document; });
	const view = Object.assign(Object.create(map), { catalog, depth: Math.max(...catalog.genres.map(depthOf)) });
	view.makeGuides();
	const deepest = Math.max(...catalog.genres.map(depthOf)) + 1;
	assert.equal(guides.length, deepest);
	const labels = catalog.generations;
	assert.deepEqual(guides, Array.from({ length: deepest }, (_, i) => `<b>0${i + 1}</b>${labels[i] || labels.at(-1)}`));
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

test('the camera fits a wide plane or reveals offscreen nodes without shrinking them', () => {
	const view = Object.assign(Object.create(map), { viewWidth: 290, width: 768, height: 360, space: { style: {} }, updateZoom() {} });
	const node = { x: 680, y: 235, width: 70, height: 36, visible: true };
	view.setCamera(1);
	view.revealNode(node);
	assert.equal(view.scale, 1);
	assert.ok(view.dx < 0 && node.x + view.dx + node.width / 2 < view.viewWidth);
	assert.equal(view.dy, 0);
	const shift = view.dx;
	view.revealNode(node);
	assert.equal(view.dx, shift);
	view.fit();
	assert.equal(view.scale, view.viewWidth / view.width);
	assert.equal(view.dx, 0);
	assert.ok(Math.abs(view.dy * 2 + view.height * view.scale - view.height) < 1e-9);
	view.zoom(.1);
	assert.equal(view.scale, view.fitScale());
});

test('every genre has a complete two-bar pattern with playable pitches and drum hits on the grid', () => {
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
		for (const hits of Object.values(patternDrums(score))) {
			assert.ok(hits.length && hits.every(beat => beat >= 0 && beat < 8 && Number.isInteger(beat * 4)));
			assert.deepEqual(hits, Array.from(new Set(hits)).sort((a, b) => a - b));
		}
		for (const [offset, length, ...pitches] of score.chords) {
			assert.ok(offset >= 0 && length > 0 && offset + length <= 8);
			assert.ok(pitches.length >= 2 && pitches.every(note => note >= 21 && note <= 108));
		}
	}
});

test('the dub version keeps the reggae backing but changes the chord part', () => {
	const { reggae, dub } = patternScores;
	assert.equal(dub.bpm, reggae.bpm);
	assert.deepEqual(dub.bass, reggae.bass);
	assert.deepEqual(patternDrums(dub), patternDrums(reggae));
	assert.notDeepEqual(dub.chords, reggae.chords);
});

test('the scheduler distinguishes straight kicks, offbeat kicks, sliced breaks and a one drop', () => {
	const floor = [0, 1, 2, 3, 4, 5, 6, 7];
	const backbeat = [1, 3, 5, 7];
	for (const [id, kicks, snares] of [
		['jazz', [0, 2, 4, 6], backbeat], ['disco', floor, backbeat], ['house', floor, backbeat],
		['techno', floor, [3, 7]], ['hiphop', [0, 2.5, 4, 6.5], backbeat],
		['hardcore', floor, [1, 2.75, 3, 5, 6.5, 7]],
		['jungle', [0, 1.75, 2.5, 4, 5.5, 6.75], [1, 2.25, 3, 3.5, 4.75, 5, 6.25, 7, 7.5]],
		['dnb', [0, 2.5, 4, 5.75, 6.5], backbeat], ['reggae', [2, 6], [2, 6]], ['dub', [2, 6], [2, 6]]
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

test('the Sound grid shows each scheduled kick and snare and describes offbeat counts', t => {
	withProfileDeps(t);
	const view = Object.create(profile);
	for (const [id, score] of Object.entries(patternScores)) {
		view.score = score;
		const rows = Array.from(view.rhythm().matchAll(/<div class="rhythm-track">(.*?)<\/div>/g), match => match[1]);
		assert.equal(rows.length, 4, id);
		const { kicks, snares } = patternDrums(score);
		for (const [i, row] of rows.entries()) {
			const steps = Array.from(row.matchAll(/<i( class="is-hit")?><\/i>/g), match => Boolean(match[1]));
			assert.equal(steps.length, 16, id);
			const hits = i < 2 ? kicks : snares;
			const start = i % 2 * 4;
			assert.deepEqual(steps, Array.from({ length: 16 }, (_, step) => hits.includes(start + step / 4)), id);
		}
	}
	view.score = patternScores.jungle;
	assert.match(view.rhythm(), /role="img" aria-label="Bar 1: kick 1, 2 a, 3 and; snare 2, 3 e, 4, 4 and\. Bar 2: kick 1, 2 and, 3 a; snare 1 a, 2, 3 e, 4, 4 and\."/);
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

test('the late files carry their own route, cross-influences and rhythm', () => {
	const routes = {
		motown: ['soul', 'rhythm', 'jazz'], psyc: ['rock', 'jazz', 'blues'], prog: ['psyc', 'jazz', 'rock'],
		dnb_pop: ['dnb', 'dub', 'soul'], triphop: ['hiphop', 'dub', 'soul', 'rock'], dancehall: ['reggae', 'hiphop', 'disco', 'soul'], milrock: ['altrock', 'metal', 'punk', 'jazz']
	};
	for (const [id, [parent, ...sources]] of Object.entries(routes)) {
		const genre = catalog.get(id);
		assert.equal(genre.parent, parent, id);
		assert.deepEqual(genre.influences.map(([source]) => source), sources, id);
		for (const source of sources) assert.ok(catalog.influencedBy(source).includes(genre), `${source} -> ${id}`);
	}
	assert.ok(catalog.influencedBy('milrock').length === 0 && catalog.childrenOf('milrock').length === 0);
	assert.equal(catalog.search('bristol sound')[0], catalog.get('triphop'));
	assert.equal(catalog.search('liquid dnb')[0], catalog.get('dnb_pop'));
	assert.equal(catalog.search('math-rock')[0], catalog.get('milrock'));
	assert.equal(catalog.search('reach out i’ll be there')[0], catalog.get('motown'));
});

test('a narrow card shrinks its label instead of wrapping it', () => {
	global.getComputedStyle = () => ({ fontSize: '16px' });
	const card = (width, scrollWidth) => {
		const label = { style: {}, offsetLeft: 37, scrollWidth };
		return { width, button: { clientWidth: width, firstElementChild: { nextElementSibling: { firstElementChild: label } } }, label };
	};
	const view = Object.create(map);
	const roomy = card(140, 94);
	const scaled = card(96, 96);
	const floored = card(96, 150);
	for (const node of [roomy, scaled, floored]) view.fitLabel(node);
	delete global.getComputedStyle;
	assert.equal(roomy.label.style.fontSize, '', 'a label that fits keeps its size');
	assert.equal(scaled.label.style.fontSize, '8.33px', 'a long label shrinks to the card');
	assert.equal(floored.label.style.fontSize, '8.00px', 'an extreme label stops at the readable floor');
});
