// owns: the genre graph, family metadata, instrument slugs, lineage composition
// edit for: generations, families, instruments and the order lineages publish in
const genreCatalog = {
	wikiBase: 'https://en.wikipedia.org/wiki/',
	generations: ['Roots', 'Branches', 'Styles', 'Offshoots', 'Scenes', 'Crossovers', 'Underground', 'New forms', 'Remixes'],
	families: {
		blues: { label: 'Blues', color: '#8cb8e7', glyph: 'disc' },
		jazz: { label: 'Jazz', color: '#d2f78b', glyph: 'syncopation' },
		rhythm: { label: 'R&B', color: '#f5b18d', glyph: 'pulse' },
		rock: { label: 'Rock', color: '#b9a1e5', glyph: 'overdrive' },
		mento: { label: 'Jamaican', color: '#f2ce76', glyph: 'pulse' },
		country: { label: 'Country', color: '#e8a9bf', glyph: 'disc' },
		son: { label: 'Afro-Cuban', color: '#7bdbc9', glyph: 'syncopation' }
	},
		instruments: {
		'Acoustic guitar': 'Acoustic_guitar',
		'Backing vocals': 'Backing_vocalist',
		'Bass guitar': 'Bass_guitar',
		Brass: 'Brass_instrument',
		Clarinet: 'Clarinet',
		Clavinet: 'Clavinet',
		Congas: 'Conga',
		'Drum machine': 'Drum_machine',
		Drums: 'Drum_kit',
		'Effects pedals': 'Effects_unit',
		'Electric bass': 'Bass_guitar',
		'Electric guitar': 'Electric_guitar',
		Guitar: 'Guitar',
		Banjo: 'Banjo',
		Fiddle: 'Fiddle',
		Mandolin: 'Mandolin',
		'Rumba box': 'Mar%C3%ADmbula',
		Tres: 'Tres_(instrument)',
		Bongos: 'Bongo_drum',
		Claves: 'Claves',
		Flute: 'Flute',
		Güiro: 'G%C3%BCiro',
		Timbales: 'Timbales',
		Violin: 'Violin',
		Harmonica: 'Harmonica',
		Horns: 'Horn_section',
		'Leslie speaker': 'Leslie_speaker',
		Keyboards: 'Keyboard_instrument',
		Keys: 'Keyboard_instrument',
		'Mixing desk': 'Mixing_console',
		Organ: 'Electronic_organ',
		Percussion: 'Percussion_instrument',
		Piano: 'Piano',
		'Rhythm section': 'Rhythm_section',
		Sampler: 'Sampler_(musical_instrument)',
		Sitar: 'Sitar',
		Saxophone: 'Saxophone',
		Saxophones: 'Saxophone',
		Sequencer: 'Music_sequencer',
		Strings: 'String_section',
		Synthesizer: 'Synthesizer',
		Tambourine: 'Tambourine',
		'Tape echo': 'Delay_(audio_effect)',
		'Tenor saxophone': 'Tenor_saxophone',
		Trombone: 'Trombone',
		Trumpet: 'Trumpet',
		Turntables: 'Turntablism',
		'Upright bass': 'Double_bass',
		Vibraphone: 'Vibraphone',
		Voice: 'Singing'
	},

	lineages: [],
	genres: [],
	addLineage(records) {
		this.lineages.push(records);
		return this;
	},
	// Features read genres only after boot, so the composer merges the files once.
	publish() {
		this.genres = this.lineages.flat().sort((a, b) => a.file - b.file);
	},

	get(id) {
		return this.genres.find(genre => genre.id === id);
	},
	number(genre) {
		return String(genre.file).padStart(3, '0');
	},
	wikiUrl(slug) {
		return slug ? this.wikiBase + slug : '';
	},
	childrenOf(id) {
		return this.genres.filter(genre => genre.parent === id);
	},
	influencedBy(id) {
		return this.genres.filter(genre => genre.influences.some(([source]) => source === id));
	},
	pieceTerms(piece) {
		return [piece.title, piece.artist, piece.ensemble, piece.year];
	},
	search(query) {
		const normalize = text => (text || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
		const words = normalize(query).trim().split(/\s+/);
		const phrase = words.join(' ');
		const exact = [];
		const related = [];
		for (const genre of this.genres) {
			const names = [genre.name, genre.short, genre.id, ...(genre.aliases || [])];
			if (names.some(name => name && normalize(name) === phrase)) {
				exact.push(genre);
				continue;
			}
			const text = normalize([...names, this.families[genre.family].label, genre.date, genre.place, ...genre.core, ...genre.optional, ...genre.techniques, ...genre.traits, ...this.pieceTerms(genre.landmark), ...this.pieceTerms(genre.study)].join(' '));
			if (words.every(word => text.includes(word))) related.push(genre);
		}
		return exact.concat(related);
	}
};

if (typeof module !== 'undefined' && module.exports) {
	for (const name of ['blues', 'jazz', 'rhythm', 'rock', 'jamaican', 'country', 'afrocuban']) genreCatalog.addLineage(require(`./lineages/${name}.js`));
	genreCatalog.publish();
	module.exports = genreCatalog;
}
