// owns: shared root, DOM lookup and feature wiring
// edit for: boot and selection routing
const $ = id => document.getElementById(id);
const root = { genre: null };

function selectAtlasGenre(id, reveal = false) {
	root.genre = genreCatalog.get(id);
	atlasAudio.stop();
	lineageMap.select(root.genre);
	genreProfile.show(root.genre, patternScores[id]);
	if (reveal) genreProfile.reveal();
}

function jumpToAtlasGenre(id) {
	atlasLibrary.setPage('explorer');
	selectAtlasGenre(id);
	lineageMap.focus();
	genreProfile.reveal();
}

function bootAtlas() {
	for (const lineages of [bluesLineage, jazzLineage, rhythmLineage, rockLineage, jamaicanLineage, countryLineage, afrocubanLineage]) genreCatalog.addLineage(lineages);
	genreCatalog.publish();
	genreProfile.init(genreCatalog, selectAtlasGenre, () => atlasAudio.toggle(root.genre.id, genreProfile.bpm), () => lineageMap.focus(), () => atlasAudio.stop());
	atlasAudio.init(state => genreProfile.transport(state));
	lineageMap.init(genreCatalog, selectAtlasGenre);
	atlasLibrary.init(genreCatalog, jumpToAtlasGenre, () => atlasAudio.stop());
	selectAtlasGenre('jazz');
	window.addEventListener('pagehide', () => atlasAudio.stop());
}

if (typeof document !== 'undefined') bootAtlas();
if (typeof module !== 'undefined' && module.exports) module.exports = { bootAtlas };
