// owns: dependency-free checks for the atlas contract
// edit for: tree integrity, offline assets, study coverage and transport regressions
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const catalog = require('../js/catalog.js');
const { patternScores, atlasAudio } = require('../js/audio.js');
const map = require('../js/map.js');
const base = path.join(__dirname, '..');
const read = filename => fs.readFileSync(path.join(base, filename), 'utf8');

test('the page composes classic scripts in one scope, without external resources or named-element collisions', () => {
	const html = read('index.html');
	const ids = Array.from(html.matchAll(/\sid="([^"]+)"/g), match => match[1]);
	assert.equal(new Set(ids).size, ids.length);
	const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g), match => match[1]);
	assert.equal(scripts.at(-1), 'js/main.js');
	const context = vm.createContext({});
	for (const name of scripts) {
		const source = read(name);
		for (const [, global] of source.matchAll(/^(?:const|function|class) (\w+)/gm)) assert.ok(!ids.includes(global), global);
		vm.runInContext(source, context, { filename: name });
	}
	for (const [, resource] of html.matchAll(/\s(?:src|href)="(?!#)([^"]+)"/g)) assert.ok(fs.existsSync(path.join(base, resource)), resource);
	for (const sheet of fs.readdirSync(path.join(base, 'styles'))) {
		for (const [, asset] of read(`styles/${sheet}`).matchAll(/url\('([^']+)'\)/g)) assert.ok(fs.existsSync(path.join(base, 'styles', asset)), asset);
	}
});

test('each profile reaches a single origin and supplies both a landmark and a study', () => {
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
		for (const key of ['date', 'place', 'shift', 'core', 'optional', 'techniques', 'traits']) assert.ok(genre[key].length, `${genre.id}: ${key}`);
		for (const key of ['landmark', 'study']) assert.equal(genre[key].filter(Boolean).length, 3);
		const family = catalog.families[genre.family];
		assert.ok(fs.statSync(path.join(base, `assets/plates/${family.plate}.webp`)).size > 0);
	}
});

test('search composes terms across name, family, instrument, place and era', () => {
	assert.deepEqual(catalog.search('  Trumpet   ORLEANS ').map(genre => genre.id), ['jazz']);
	assert.deepEqual(catalog.search('rock 1970s').map(genre => genre.id), ['punk']);
	assert.ok(catalog.search('R&B').some(genre => genre.id === 'rhythm'));
	assert.ok(catalog.search('rhythm and blues').some(genre => genre.id === 'rhythm'));
	assert.ok(catalog.search('clarinet').some(genre => genre.id === 'jazz'));
	assert.deepEqual(catalog.search('West End Blues').map(genre => genre.id), ['jazz']);
	assert.equal(catalog.search('').length, catalog.genres.length);
	assert.equal(catalog.search('no such genre').length, 0);
});

test('ancestor rows are centered over visible leaves after a branch filter', () => {
	const records = new Map(catalog.genres.map(genre => [genre.id, { genre, visible: true, children: [] }]));
	for (const node of records.values()) {
		if (node.genre.parent) records.get(node.genre.parent).children.push(node);
	}
	const origin = records.get('blues');
	assert.equal(map.measure(origin, 0), 6);
	assert.equal(origin.unit, 3);
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

test('stopping while the audio context resumes cannot start a stale genre', async () => {
	const player = Object.create(atlasAudio);
	let resume;
	let scheduled = 0;
	const states = [];
	player.context = { state: 'suspended', resume: () => new Promise(resolve => { resume = resolve; }) };
	player.schedule = () => { scheduled++; return 1; };
	player.init(state => states.push(state));
	const started = player.toggle('jazz');
	player.stop();
	resume();
	await started;
	assert.equal(scheduled, 0);
	assert.deepEqual(states, ['idle']);
	assert.equal(player.active, false);
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
