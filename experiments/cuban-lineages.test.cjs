// owns: checks for the Cuban dance lineages
// edit for: Danzón, Mambo, Cha-cha-chá and their relationships
const test = require('node:test');
const assert = require('node:assert/strict');
const catalog = require('../js/catalog.js');
const { patternScores, patternDrums } = require('../js/audio.js');
const map = require('../js/map.js');

test('Danzón and Son remain separate roots with connected dance traditions', () => {
	const files = ['danzon', 'mambo', 'chachacha'].map(id => catalog.get(id));
	assert.deepEqual(files.map(genre => genre.parent), [null, 'danzon', 'danzon']);
	assert.deepEqual(files.map(genre => catalog.number(genre)), ['041', '042', '043']);
	assert.ok(files.every(genre => genre.family === 'son'));
	assert.deepEqual(files[1].influences.map(([id]) => id), ['son', 'jazz']);
	assert.deepEqual(files[2].influences.map(([id]) => id), ['mambo']);
	assert.ok(catalog.influencedBy('mambo').includes(catalog.get('salsa')));
	assert.equal(catalog.get('salsa').parent, 'son');
	for (const [term, genre] of [['danzon', files[0]], ['mambo', files[1]], ['cha cha cha', files[2]], ['La engañadora', files[2]]]) {
		assert.equal(catalog.search(term)[0], genre);
	}
	assert.equal(catalog.search('La enganadora')[0], files[2]);
	assert.ok(catalog.search('guiro').includes(files[2]));
	assert.equal(catalog.search('Perez Prado')[0], files[1]);
	const records = new Map(catalog.genres.map(genre => [genre.id, { genre, visible: true }]));
	for (const node of records.values()) node.parent = records.get(node.genre.parent);
	const view = Object.assign(Object.create(map), { branch: 'son', nodes: [...records.values()] });
	view.markVisible();
	assert.deepEqual(view.nodes.filter(node => node.visible).map(node => node.genre.id).sort(),
		['chachacha', 'danzon', 'mambo', 'salsa', 'son']);
});

test('Cuban studies compare clave and distinct dance accents', () => {
	assert.deepEqual(patternDrums(patternScores.mambo).snares, patternDrums(patternScores.son).snares);
	assert.deepEqual(patternDrums(patternScores.danzon).snares, [0, .5, .75, 1.25, 1.5, 2, 2.5, 2.75, 3.25, 3.5, 4, 4.5, 4.75, 5.25, 5.5, 6, 6.5, 6.75, 7.25, 7.5]);
	assert.deepEqual(patternDrums(patternScores.chachacha).snares, [1, 3, 3.5, 4, 5, 7, 7.5]);
	for (const id of ['danzon', 'mambo', 'chachacha']) assert.ok(patternScores[id].guide);
});
