// owns: the genre graph, editorial records, family metadata and Wikipedia slugs
// edit for: repertoire, lineages, cross-influences, instruments and reference links
const genreCatalog = {
	wikiBase: 'https://en.wikipedia.org/wiki/',
	families: {
		blues: { label: 'Blues', color: '#8cb8e7', glyph: 'disc' },
		jazz: { label: 'Jazz', color: '#d2f78b', glyph: 'syncopation' },
		rhythm: { label: 'R&B', color: '#f5b18d', glyph: 'pulse' },
		rock: { label: 'Rock', color: '#b9a1e5', glyph: 'overdrive' }
	},
	instruments: {
		'Backing vocals': 'Backing_vocalist',
		'Bass guitar': 'Bass_guitar',
		Brass: 'Brass_instrument',
		Clarinet: 'Clarinet',
		Clavinet: 'Clavinet',
		Drums: 'Drum_kit',
		'Electric bass': 'Bass_guitar',
		'Electric guitar': 'Electric_guitar',
		Guitar: 'Guitar',
		Harmonica: 'Harmonica',
		Horns: 'Horn_section',
		Keyboards: 'Keyboard_instrument',
		Keys: 'Keyboard_instrument',
		Piano: 'Piano',
		'Rhythm section': 'Rhythm_section',
		Saxophone: 'Saxophone',
		Saxophones: 'Saxophone',
		Trombone: 'Trombone',
		Trumpet: 'Trumpet',
		'Upright bass': 'Double_bass',
		Vibraphone: 'Vibraphone',
		Voice: 'Singing'
	},
	genres: [
		{
			id: 'blues', name: 'Blues', wiki: 'Blues', parent: null, influences: [], family: 'blues', date: 'Late 1800s', place: 'Southern United States',
			shift: 'Black Southern musicians shaped work songs, spirituals and field hollers into a conversation between voice and instrument. Bent notes make a simple phrase speak.',
			core: ['Voice', 'Guitar'], optional: ['Harmonica', 'Piano', 'Upright bass', 'Drums'], techniques: ['Call and response', 'Bent notes', 'Slide guitar'], traits: ['Vocal-led', 'Blue notes'],
			landmark: { title: 'Cross Road Blues', wiki: 'Cross_Road_Blues', artist: 'Robert Johnson', artistWiki: 'Robert_Johnson', year: '1936', note: 'Hear how voice and guitar answer one another without a rhythm section.' },
			study: { title: 'Before You Accuse Me', wiki: 'Before_You_Accuse_Me', artist: 'Bo Diddley', artistWiki: 'Bo_Diddley', year: '1957', note: 'Keep a steady shuffle through the twelve-bar form before adding fills.' }
		},
		{
			id: 'jazz', name: 'Jazz', wiki: 'Jazz', parent: 'blues', influences: [], family: 'jazz', date: 'c. 1900', place: 'New Orleans, US',
			shift: 'Jazz brought blues phrasing into an ensemble conversation. A swinging pulse and improvised lines let each player reshape the melody in real time.',
			core: ['Trumpet', 'Piano', 'Upright bass'], optional: ['Saxophone', 'Clarinet', 'Drums', 'Trombone'], techniques: ['Improvisation', 'Swing feel', 'Syncopation'], traits: ['Ensemble', 'Improvised'],
			landmark: { title: 'West End Blues', wiki: 'West_End_Blues', artist: 'Louis Armstrong', ensemble: 'and His Hot Five', artistWiki: 'Louis_Armstrong', year: '1928', note: 'Listen for the opening trumpet cadenza, then the shift into ensemble time.' },
			study: { title: 'C Jam Blues', wiki: 'C_Jam_Blues', artist: 'Duke Ellington', artistWiki: 'Duke_Ellington', year: '1942', note: 'Use the two-note head to practice swing articulation and a twelve-bar chorus.' }
		},
		{
			id: 'swing', name: 'Swing', wiki: 'Swing_music', parent: 'jazz', influences: [], family: 'jazz', date: '1930s', place: 'United States',
			shift: 'Swing scaled the jazz conversation up to big bands. Arranged riffs pass between brass and reeds over a steady four-beat dance pulse.',
			core: ['Brass', 'Saxophones', 'Rhythm section'], optional: ['Clarinet', 'Voice', 'Vibraphone'], techniques: ['Section riffs', 'Walking bass', 'Four-to-the-bar comping'], traits: ['Big band', 'Dance music'],
			landmark: { title: 'One O’Clock Jump', wiki: 'One_O%27Clock_Jump', artist: 'Count Basie', ensemble: 'and His Orchestra', artistWiki: 'Count_Basie', year: '1937', note: 'Follow the short riffs as they move from one section of the band to another.' },
			study: { title: 'In the Mood', wiki: 'In_the_Mood', artist: 'Glenn Miller', ensemble: 'and His Orchestra', artistWiki: 'Glenn_Miller', year: '1939', note: 'Start with the opening riff and keep its accents buoyant against the beat.' }
		},
		{
			id: 'bebop', name: 'Bebop', wiki: 'Bebop', parent: 'jazz', family: 'jazz', date: '1940s', place: 'New York City, US',
			influences: [['swing', 'Broke out of swing band harmony and rhythm sections into fast, soloist-led small combos.']],
			shift: 'Bebop put the small combo and its soloists in the foreground. Fast, angular lines outline changing chords while drums punctuate rather than simply mark time.',
			core: ['Saxophone', 'Trumpet', 'Rhythm section'], optional: ['Guitar', 'Vibraphone'], techniques: ['Chromatic approach notes', 'Chord-tone targeting', 'Offbeat accents'], traits: ['Small combo', 'Improvised'],
			landmark: { title: 'Ko-Ko', artist: 'Charlie Parker', artistWiki: 'Charlie_Parker', year: '1945', note: 'Trace the long alto phrases across the rapid chord changes.' },
			study: { title: 'Now’s the Time', wiki: 'Now%27s_the_Time_(composition)', artist: 'Charlie Parker', artistWiki: 'Charlie_Parker', year: '1945', note: 'Learn the blues head slowly, then connect each chord with a short improvised line.' }
		},
		{
			id: 'rhythm', name: 'Rhythm & blues', short: 'R&B', aliases: ['rhythm and blues', 'rnb'], wiki: 'Rhythm_and_blues', parent: 'blues', influences: [], family: 'rhythm', date: '1940s', place: 'Urban United States',
			shift: 'Small amplified bands brought blues vocals to crowded dance floors. Bass and drums locked into a pronounced backbeat, with saxophone riffs answering the singer.',
			core: ['Voice', 'Upright bass', 'Drums'], optional: ['Saxophone', 'Electric guitar', 'Piano'], techniques: ['Backbeat', 'Boogie bass', 'Vocal response'], traits: ['Amplified', 'Dance music'],
			landmark: { title: 'Caldonia', wiki: 'Caldonia', artist: 'Louis Jordan', ensemble: 'and His Tympany Five', artistWiki: 'Louis_Jordan', year: '1945', note: 'Hear the band punch out a riff in answer to Jordan’s vocal.' },
			study: { title: 'Ain’t That a Shame', wiki: 'Ain%27t_That_a_Shame', artist: 'Fats Domino', artistWiki: 'Fats_Domino', year: '1955', note: 'Place the stop-time chords together, then settle back into the shuffle.' }
		},
		{
			id: 'soul', name: 'Soul', wiki: 'Soul_music', parent: 'rhythm', influences: [], family: 'rhythm', date: '1950s–60s', place: 'United States',
			shift: 'Soul carried the vocal intensity and call-and-response of gospel into rhythm & blues. Sustained chords leave space for a singer to stretch and ornament a line.',
			core: ['Voice', 'Keys', 'Bass guitar'], optional: ['Backing vocals', 'Horns', 'Drums'], techniques: ['Melisma', 'Gospel cadences', 'Call and response'], traits: ['Gospel-influenced', 'Vocal-led'],
			landmark: { title: 'A Change Is Gonna Come', wiki: 'A_Change_Is_Gonna_Come', artist: 'Sam Cooke', artistWiki: 'Sam_Cooke', year: '1964', note: 'Listen to the way each held syllable changes color against the orchestra.' },
			study: { title: 'Stand by Me', wiki: 'Stand_by_Me_(Ben_E._King_song)', artist: 'Ben E. King', artistWiki: 'Ben_E._King', year: '1961', note: 'Hold the repeating four-chord cycle under a freely phrased vocal.' }
		},
		{
			id: 'funk', name: 'Funk', wiki: 'Funk', parent: 'rhythm', family: 'rhythm', date: '1960s', place: 'United States',
			influences: [
				['soul', 'Turned soul’s vocal intensity and tight band cues into percussive, groove-first vamps.'],
				['jazz', 'Borrowed punchy horn voicings, extended chords and agile syncopation.']
			],
			shift: 'Funk made interlocking rhythm the main event. Short guitar and bass figures circle a vamp, with a strong first beat and space between the accents.',
			core: ['Electric bass', 'Guitar', 'Drums'], optional: ['Clavinet', 'Horns', 'Voice'], techniques: ['Sixteenth-note syncopation', 'Muted strumming', 'Accent on the one'], traits: ['Groove-led', 'Percussive'],
			landmark: { title: 'Cold Sweat', wiki: 'Cold_Sweat', artist: 'James Brown', artistWiki: 'James_Brown', year: '1967', note: 'Listen for the downbeat that anchors the displaced horn and drum accents.' },
			study: { title: 'Cissy Strut', wiki: 'Cissy_Strut', artist: 'The Meters', artistWiki: 'The_Meters', year: '1969', note: 'Learn the main riff, paying as much attention to the rests as the notes.' }
		},
		{
			id: 'rock', name: 'Rock', wiki: 'Rock_music', parent: 'blues', family: 'rock', date: '1950s', place: 'United States',
			influences: [['rhythm', 'Carried the amplified R&B backbeat, boogie bass and jump-band drive onto guitar-led singles.']],
			shift: 'Early rock and roll combined blues forms with country and R&B rhythms. Amplified guitar moved to the front, driving memorable riffs over a firm backbeat.',
			core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Piano', 'Saxophone', 'Voice'], techniques: ['Guitar riffs', 'Backbeat', 'Double-stops'], traits: ['Amplified', 'Riff-led'],
			landmark: { title: 'Johnny B. Goode', wiki: 'Johnny_B._Goode', artist: 'Chuck Berry', artistWiki: 'Chuck_Berry', year: '1958', note: 'Hear the opening guitar double-stops set up the vocal and band.' },
			study: { title: 'Rumble', wiki: 'Rumble_(instrumental)', artist: 'Link Wray', ensemble: 'and His Ray Men', artistWiki: 'Link_Wray', year: '1958', note: 'Let the chord hits ring and leave the deliberate gaps in the riff.' }
		},
		{
			id: 'metal', name: 'Heavy metal', wiki: 'Heavy_metal_music', parent: 'rock', family: 'rock', date: 'Late 1960s', place: 'United Kingdom & US',
			influences: [['blues', 'Stretched electric blues riffs and blue-note tension into slower, heavier distortion.']],
			shift: 'Heavy metal pushed the amplified rock riff toward heavier distortion, darker intervals and sustained power chords. Guitar and bass often reinforce a single line.',
			core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Voice', 'Keyboards', 'Second guitar'], techniques: ['Power chords', 'Palm muting', 'Pedal tones'], traits: ['Distorted', 'Riff-led'],
			landmark: { title: 'Black Sabbath', wiki: 'Black_Sabbath_(song)', artist: 'Black Sabbath', artistWiki: 'Black_Sabbath', year: '1970', note: 'Listen for the tension of the tritone in the slow opening riff.' },
			study: { title: 'Iron Man', wiki: 'Iron_Man_(song)', artist: 'Black Sabbath', artistWiki: 'Black_Sabbath', year: '1970', note: 'Start with the main power-chord riff and match the duration of each chord.' }
		},
		{
			id: 'punk', name: 'Punk rock', wiki: 'Punk_rock', parent: 'rock', influences: [], family: 'rock', date: '1970s', place: 'New York & London',
			shift: 'Punk stripped rock down to short songs, direct vocals and a hard, fast pulse. Repeated downstrokes give a small set of chords relentless momentum.',
			core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Second guitar', 'Backing vocals'], techniques: ['Downpicking', 'Power chords', 'Straight eighths'], traits: ['Fast', 'DIY'],
			landmark: { title: 'Blitzkrieg Bop', wiki: 'Blitzkrieg_Bop', artist: 'Ramones', artistWiki: 'Ramones', year: '1976', note: 'The tight eighth notes leave very little space between the guitar and bass.' },
			study: { title: 'Should I Stay or Should I Go', wiki: 'Should_I_Stay_or_Should_I_Go', artist: 'The Clash', artistWiki: 'The_Clash', year: '1982', note: 'Practice the stop-start verse figure before bringing the chorus up to tempo.' }
		}
	],
	get(id) {
		return this.genres.find(genre => genre.id === id);
	},
	number(genre) {
		return String(this.genres.indexOf(genre) + 1).padStart(3, '0');
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
		const words = query.toLowerCase().trim().split(/\s+/);
		return this.genres.filter(genre => {
			const text = [genre.name, genre.short, genre.id, ...(genre.aliases || []), this.families[genre.family].label, genre.date, genre.place, ...genre.core, ...genre.optional, ...genre.techniques, ...genre.traits, ...this.pieceTerms(genre.landmark), ...this.pieceTerms(genre.study)].join(' ').toLowerCase();
			return words.every(word => text.includes(word));
		});
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = genreCatalog;
