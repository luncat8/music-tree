// owns: checks that keep lineage files complete, ordered and offline
// edit for: file numbers, instrument and reference ownership, script order
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const catalog = require('../js/catalog.js');
const base = path.join(__dirname, '..');
const read = filename => fs.readFileSync(path.join(base, filename), 'utf8');
const lineageFiles = ['blues', 'jazz', 'rhythm', 'rock', 'jamaican', 'country', 'afrocuban'];

function loadLineages() {
	const context = vm.createContext({});
	return lineageFiles.map(name => {
		vm.runInContext(read(`js/lineages/${name}.js`), context, { filename: name });
		return vm.runInContext(`${name}Lineage`, context);
	});
}

test('each lineage file is ordered, numbered and owns one family', () => {
	const lists = loadLineages();
	const records = lists.flat();
	assert.equal(records.length, catalog.genres.length);
	assert.deepEqual(Array.from(records, genre => genre.id).sort(), catalog.genres.map(genre => genre.id).sort());
	assert.equal(lists.length, lineageFiles.length);
	for (const [i, name] of lineageFiles.entries()) {
		const family = name === 'jamaican' ? 'mento' : name === 'afrocuban' ? 'son' : name;
		const own = lists[i];
		assert.ok(own.length, `${name}: no records`);
		assert.ok(own.every(genre => genre.family === family), `${name}: foreign family`);
		assert.equal(own.length, catalog.genres.filter(genre => genre.family === family).length, `${name}: count`);
		// Array.from makes the copy in this realm so strict equality ignores the VM prototype.
		const numbers = Array.from(own, genre => genre.file);
		assert.deepEqual(numbers, [...numbers].sort((a, b) => a - b), `${name}: file order`);
	}
});

test('file numbers address the archive order exactly as before the split', () => {
	assert.equal(catalog.number(catalog.get('blues')), '001');
	assert.equal(catalog.number(catalog.get('danzon')), '041');
	assert.equal(catalog.number(catalog.get('chachacha')), '043');
	assert.deepEqual(catalog.genres.map(genre => genre.file), catalog.genres.map((genre, i) => i + 1));
	const numbers = catalog.genres.map(genre => catalog.number(genre));
	assert.equal(new Set(numbers).size, numbers.length);
	assert.deepEqual(numbers, [...numbers].sort());
});

test('the page loads every lineage before it publishes the catalog', () => {
	const html = read('index.html');
	const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g), match => match[1]);
	const composer = scripts.indexOf('js/catalog.js');
	for (const name of lineageFiles) {
		const index = scripts.indexOf(`js/lineages/${name}.js`);
		assert.ok(index > composer, `${name}: loaded after its composer`);
		assert.ok(index < scripts.indexOf('js/main.js'), `${name}: loaded before the boot tail`);
	}
	const boot = read('js/main.js');
	for (const name of lineageFiles) assert.match(boot, new RegExp(`\\b${name}Lineage\\b`), `${name}: published at boot`);
	assert.ok(boot.indexOf('.publish()') < boot.indexOf('genreProfile.init('), 'publish before features read the catalog');
	assert.equal(scripts.filter(name => name === 'js/catalog.js').length, 1);
});

test('lineage files stay classic scripts with local, Node-guarded wiring', () => {
	const html = read('index.html');
	for (const name of lineageFiles) {
		const source = read(`js/lineages/${name}.js`);
		const [header, edit] = source.split('\n');
		assert.match(header, /^\/\/ owns: /, `${name}: header`);
		assert.match(edit, /^\/\/ edit for: /, `${name}: edit line`);
		assert.ok(!source.includes('require('), `${name}: no CommonJS require in the page`);
		assert.ok(!/\b(?:import|export)\b/.test(source), `${name}: classic script`);
		assert.match(source, new RegExp(`module.exports = ${name}Lineage`), `${name}: node guard`);
		assert.ok(!source.includes('genreCatalog'), `${name}: data only, no cross-file reads`);
		assert.equal(html.split(`src="js/lineages/${name}.js"`).length, 2, `${name}: loaded once`);
	}
});

test('lineage files hold records only, never shared tables or other families', () => {
	for (const name of lineageFiles) {
		const source = read(`js/lineages/${name}.js`);
		assert.ok(!source.includes('instruments: {'), `${name}: instrument table belongs to the composer`);
		assert.ok(!source.includes('wikiBase'), `${name}: wiki base belongs to the composer`);
		assert.ok(!source.includes('generations:'), `${name}: headings belong to the composer`);
	}
	const sources = lineageFiles.map(name => read(`js/lineages/${name}.js`)).join('\n');
	for (const genre of catalog.genres) {
		const declares = sources.split(`id: '${genre.id}',`).length - 1;
		assert.equal(declares, 1, `${genre.id}: declared ${declares} times`);
	}
});
