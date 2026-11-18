// owns: the genre tree, editorial records and family plates
// edit for: repertoire, relationships, dates and searchable terms
const genreCatalog = {
	families: {
		blues: { label: 'Blues', color: '#8cb8e7', glyph: 'disc', plate: 'blues', alt: 'Close-up of a musician playing a steel resonator guitar.' },
		jazz: { label: 'Jazz', color: '#d2f78b', glyph: 'syncopation', plate: 'jazz', alt: 'A saxophonist in a felt hat, lit by a single club spotlight.' },
		rhythm: { label: 'R&B', color: '#f5b18d', glyph: 'pulse', plate: 'rhythm', alt: 'A soul singer at a chrome microphone under stage lights.' },
		rock: { label: 'Rock', color: '#b9a1e5', glyph: 'overdrive', plate: 'rock', alt: 'A guitarist playing an electric guitar on a dimly lit stage.' }
	},
	genres: [
		{
			id: 'blues', name: 'Blues', parent: null, family: 'blues', date: 'Late 1800s', place: 'Southern United States',
			shift: 'Black Southern musicians shaped work songs, spirituals and field hollers into a conversation between voice and instrument. Bent notes make a simple phrase speak.',
			core: ['Voice', 'Guitar'], optional: ['Harmonica', 'Piano', 'Bass', 'Drums'], techniques: ['Call and response', 'Bent notes', 'Slide guitar'], traits: ['Vocal-led', 'Blue notes'],
			landmark: ['Cross Road Blues', 'Robert Johnson · 1936', 'Hear how voice and guitar answer one another without a rhythm section.'],
			study: ['Before You Accuse Me', 'Bo Diddley · 1957', 'Keep a steady shuffle through the twelve-bar form before adding fills.']
		},
		{
			id: 'jazz', name: 'Jazz', parent: 'blues', family: 'jazz', date: 'c. 1900', place: 'New Orleans, US',
			shift: 'Jazz brought blues phrasing into an ensemble conversation. A swinging pulse and improvised lines let each player reshape the melody in real time.',
			core: ['Trumpet', 'Piano', 'Upright bass'], optional: ['Saxophone', 'Clarinet', 'Drums', 'Trombone'], techniques: ['Improvisation', 'Swing feel', 'Syncopation'], traits: ['Ensemble', 'Improvised'],
			landmark: ['West End Blues', 'Louis Armstrong and His Hot Five · 1928', 'Listen for the opening trumpet cadenza, then the shift into ensemble time.'],
			study: ['C Jam Blues', 'Duke Ellington · 1942', 'Use the two-note head to practice swing articulation and a twelve-bar chorus.']
		},
		{
			id: 'swing', name: 'Swing', parent: 'jazz', family: 'jazz', date: '1930s', place: 'United States',
			shift: 'Swing scaled the jazz conversation up to big bands. Arranged riffs pass between brass and reeds over a steady four-beat dance pulse.',
			core: ['Brass', 'Saxophones', 'Rhythm section'], optional: ['Clarinet', 'Voice', 'Vibraphone'], techniques: ['Section riffs', 'Walking bass', 'Four-to-the-bar comping'], traits: ['Big band', 'Dance music'],
			landmark: ['One O’Clock Jump', 'Count Basie and His Orchestra · 1937', 'Follow the short riffs as they move from one section of the band to another.'],
			study: ['In the Mood', 'Glenn Miller and His Orchestra · 1939', 'Start with the opening riff and keep its accents buoyant against the beat.']
		},
		{
			id: 'bebop', name: 'Bebop', parent: 'jazz', family: 'jazz', date: '1940s', place: 'New York City, US',
			shift: 'Bebop put the small combo and its soloists in the foreground. Fast, angular lines outline changing chords while drums punctuate rather than simply mark time.',
			core: ['Saxophone', 'Trumpet', 'Rhythm section'], optional: ['Guitar', 'Vibraphone'], techniques: ['Chromatic approach notes', 'Chord-tone targeting', 'Offbeat accents'], traits: ['Small combo', 'Improvised'],
			landmark: ['Ko-Ko', 'Charlie Parker · 1945', 'Trace the long alto phrases across the rapid chord changes.'],
			study: ['Now’s the Time', 'Charlie Parker · 1945', 'Learn the blues head slowly, then connect each chord with a short improvised line.']
		},
		{
			id: 'rhythm', name: 'Rhythm & blues', short: 'R&B', aliases: ['rhythm and blues', 'rnb'], parent: 'blues', family: 'rhythm', date: '1940s', place: 'Urban United States',
			shift: 'Small amplified bands brought blues vocals to crowded dance floors. Bass and drums locked into a pronounced backbeat, with saxophone riffs answering the singer.',
			core: ['Voice', 'Bass', 'Drums'], optional: ['Saxophone', 'Electric guitar', 'Piano'], techniques: ['Backbeat', 'Boogie bass', 'Vocal response'], traits: ['Amplified', 'Dance music'],
			landmark: ['Caldonia', 'Louis Jordan and His Tympany Five · 1945', 'Hear the band punch out a riff in answer to Jordan’s vocal.'],
			study: ['Ain’t That a Shame', 'Fats Domino · 1955', 'Place the stop-time chords together, then settle back into the shuffle.']
		},
		{
			id: 'soul', name: 'Soul', parent: 'rhythm', family: 'rhythm', date: '1950s–60s', place: 'United States',
			shift: 'Soul carried the vocal intensity and call-and-response of gospel into rhythm & blues. Sustained chords leave space for a singer to stretch and ornament a line.',
			core: ['Voice', 'Keys', 'Bass'], optional: ['Backing vocals', 'Horns', 'Drums'], techniques: ['Melisma', 'Gospel cadences', 'Call and response'], traits: ['Gospel-influenced', 'Vocal-led'],
			landmark: ['A Change Is Gonna Come', 'Sam Cooke · 1964', 'Listen to the way each held syllable changes color against the orchestra.'],
			study: ['Stand by Me', 'Ben E. King · 1961', 'Hold the repeating four-chord cycle under a freely phrased vocal.']
		},
		{
			id: 'funk', name: 'Funk', parent: 'rhythm', family: 'rhythm', date: '1960s', place: 'United States',
			shift: 'Funk made interlocking rhythm the main event. Short guitar and bass figures circle a vamp, with a strong first beat and space between the accents.',
			core: ['Electric bass', 'Guitar', 'Drums'], optional: ['Clavinet', 'Horns', 'Voice'], techniques: ['Sixteenth-note syncopation', 'Muted strumming', 'Accent on the one'], traits: ['Groove-led', 'Percussive'],
			landmark: ['Cold Sweat', 'James Brown · 1967', 'Listen for the downbeat that anchors the displaced horn and drum accents.'],
			study: ['Cissy Strut', 'The Meters · 1969', 'Learn the main riff, paying as much attention to the rests as the notes.']
		},
		{
			id: 'rock', name: 'Rock', parent: 'blues', family: 'rock', date: '1950s', place: 'United States',
			shift: 'Early rock and roll combined blues forms with country and R&B rhythms. Amplified guitar moved to the front, driving memorable riffs over a firm backbeat.',
			core: ['Electric guitar', 'Bass', 'Drums'], optional: ['Piano', 'Saxophone', 'Voice'], techniques: ['Guitar riffs', 'Backbeat', 'Double-stops'], traits: ['Amplified', 'Riff-led'],
			landmark: ['Johnny B. Goode', 'Chuck Berry · 1958', 'Hear the opening guitar double-stops set up the vocal and band.'],
			study: ['Rumble', 'Link Wray and His Ray Men · 1958', 'Let the chord hits ring and leave the deliberate gaps in the riff.']
		},
		{
			id: 'metal', name: 'Heavy metal', parent: 'rock', family: 'rock', date: 'Late 1960s', place: 'United Kingdom & US',
			shift: 'Heavy metal pushed the amplified rock riff toward heavier distortion, darker intervals and sustained power chords. Guitar and bass often reinforce a single line.',
			core: ['Electric guitar', 'Bass', 'Drums'], optional: ['Voice', 'Keyboards', 'Second guitar'], techniques: ['Power chords', 'Palm muting', 'Pedal tones'], traits: ['Distorted', 'Riff-led'],
			landmark: ['Black Sabbath', 'Black Sabbath · 1970', 'Listen for the tension of the tritone in the slow opening riff.'],
			study: ['Iron Man', 'Black Sabbath · 1970', 'Start with the main power-chord riff and match the duration of each chord.']
		},
		{
			id: 'punk', name: 'Punk rock', parent: 'rock', family: 'rock', date: '1970s', place: 'New York & London',
			shift: 'Punk stripped rock down to short songs, direct vocals and a hard, fast pulse. Repeated downstrokes give a small set of chords relentless momentum.',
			core: ['Electric guitar', 'Bass', 'Drums'], optional: ['Second guitar', 'Backing vocals'], techniques: ['Downpicking', 'Power chords', 'Straight eighths'], traits: ['Fast', 'DIY'],
			landmark: ['Blitzkrieg Bop', 'Ramones · 1976', 'The tight eighth notes leave very little space between the guitar and bass.'],
			study: ['Should I Stay or Should I Go', 'The Clash · 1982', 'Practice the stop-start verse figure before bringing the chorus up to tempo.']
		}
	],
	get(id) {
		return this.genres.find(genre => genre.id === id);
	},
	number(genre) {
		return String(this.genres.indexOf(genre) + 1).padStart(3, '0');
	},
	search(query) {
		const words = query.toLowerCase().trim().split(/\s+/);
		return this.genres.filter(genre => {
			const text = [genre.name, genre.short, genre.id, ...(genre.aliases || []), this.families[genre.family].label, genre.date, genre.place, ...genre.core, ...genre.optional, ...genre.techniques, ...genre.traits, ...genre.landmark.slice(0, 2), ...genre.study.slice(0, 2)].join(' ').toLowerCase();
			return words.every(word => text.includes(word));
		});
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = genreCatalog;
