// owns: Jazz lineage records and their reference slugs
// edit for: jazz catalogue entries, studies and instruments
const jazzLineage = [
	{
		file: 2, id: 'jazz', name: 'Jazz', wiki: 'Jazz', parent: null, influences: [['blues', 'Blues phrasing and forms became part of the early jazz repertoire.']], family: 'jazz', date: 'c. 1900', place: 'New Orleans, US',
		shift: 'Early New Orleans jazz brought together blues, ragtime, brass-band marches and dance music. A swinging pulse and improvised lines let each player reshape the melody in real time.',
		core: ['Trumpet', 'Piano', 'Upright bass'], optional: ['Saxophone', 'Clarinet', 'Drums', 'Trombone'], techniques: ['Improvisation', 'Swing feel', 'Syncopation'], traits: ['Ensemble', 'Improvised'],
		landmark: { title: 'West End Blues', wiki: 'West_End_Blues', artist: 'Louis Armstrong', ensemble: 'and His Hot Five', artistWiki: 'Louis_Armstrong', year: '1928', note: 'Listen for the opening trumpet cadenza, then the shift into ensemble time.' },
		study: { title: 'C Jam Blues', wiki: 'C_Jam_Blues', artist: 'Duke Ellington', artistWiki: 'Duke_Ellington', year: '1942', note: 'Use the two-note head to practice swing articulation and a twelve-bar chorus.' }
	},
	{
		file: 3, id: 'swing', name: 'Swing', wiki: 'Swing_music', parent: 'jazz', influences: [], family: 'jazz', date: '1930s', place: 'United States',
		shift: 'Swing scaled the jazz conversation up to big bands. Arranged riffs pass between brass and reeds over a steady four-beat dance pulse.',
		core: ['Brass', 'Saxophones', 'Rhythm section'], optional: ['Clarinet', 'Voice', 'Vibraphone'], techniques: ['Section riffs', 'Walking bass', 'Four-to-the-bar comping'], traits: ['Big band', 'Dance music'],
		landmark: { title: 'One O’Clock Jump', wiki: 'One_O%27Clock_Jump', artist: 'Count Basie', ensemble: 'and His Orchestra', artistWiki: 'Count_Basie', year: '1937', note: 'Follow the short riffs as they move from one section of the band to another.' },
		study: { title: 'In the Mood', wiki: 'In_the_Mood', artist: 'Glenn Miller', ensemble: 'and His Orchestra', artistWiki: 'Glenn_Miller', year: '1939', note: 'Start with the opening riff and keep its accents buoyant against the beat.' }
	},
	{
		file: 4, id: 'bebop', name: 'Bebop', wiki: 'Bebop', parent: 'jazz', family: 'jazz', date: '1940s', place: 'New York City, US',
		influences: [['swing', 'Broke out of swing band harmony and rhythm sections into fast, soloist-led small combos.']],
		shift: 'Bebop put the small combo and its soloists in the foreground. Fast, angular lines outline changing chords while drums punctuate rather than simply mark time.',
		core: ['Saxophone', 'Trumpet', 'Rhythm section'], optional: ['Guitar', 'Vibraphone'], techniques: ['Chromatic approach notes', 'Chord-tone targeting', 'Offbeat accents'], traits: ['Small combo', 'Improvised'],
		landmark: { title: 'Ko-Ko', artist: 'Charlie Parker', artistWiki: 'Charlie_Parker', year: '1945', note: 'Trace the long alto phrases across the rapid chord changes.' },
		study: { title: 'Now’s the Time', wiki: 'Now%27s_the_Time_(composition)', artist: 'Charlie Parker', artistWiki: 'Charlie_Parker', year: '1945', note: 'Learn the blues head slowly, then connect each chord with a short improvised line.' }
	},
	{
		file: 13, id: 'fusion', name: 'Jazz fusion', short: 'Fusion', aliases: ['fusion', 'jazz rock'], wiki: 'Jazz_fusion', parent: 'bebop', family: 'jazz', date: 'Late 1960s', place: 'United States',
		influences: [
			['rock', 'Brought distorted guitars, loud drums and rock song lengths into an improvised setting.'],
			['funk', 'Added a syncopated electric bass and a static groove that soloists could stretch over.'],
			['soul', 'Contributed electric piano tone, riff-based heads and a danceable pulse.']
		],
		shift: 'Fusion kept bebop’s harmony and improvisation but plugged it in. Electric piano, distorted guitar and funk bass carry long solos over rock rhythms and odd meters.',
		core: ['Keyboards', 'Electric guitar', 'Electric bass'], optional: ['Drums', 'Saxophone', 'Trumpet', 'Synthesizer'], techniques: ['Extended solo forms', 'Odd meters', 'Electric comping'], traits: ['Improvised', 'Electric'],
		landmark: { title: 'Bitches Brew', wiki: 'Bitches_Brew', artist: 'Miles Davis', artistWiki: 'Miles_Davis', year: '1970', note: 'Notice how the pulse stays vague while the electric keyboards circle the same few chords.' },
		study: { title: 'Chameleon', wiki: 'Chameleon_(composition)', artist: 'Herbie Hancock', artistWiki: 'Herbie_Hancock', year: '1973', note: 'Learn the bass riff and the four-bar synth melody before trying a solo over them.' }
	}
];

if (typeof module !== 'undefined' && module.exports) module.exports = jazzLineage;
