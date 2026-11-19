// owns: Blues lineage records and their reference slugs
// edit for: blues catalogue entries, studies and instruments
const bluesLineage = [
	// File numbers are the archive slots; a lineage owns disjoint slots, so order is fixed by data.
	{
		file: 1, id: 'blues', name: 'Blues', wiki: 'Blues', parent: null, influences: [], family: 'blues', date: 'Late 1800s', place: 'Southern United States',
		shift: 'Black Southern musicians shaped work songs, spirituals and field hollers into a conversation between voice and instrument. Bent notes make a simple phrase speak.',
		core: ['Voice', 'Guitar'], optional: ['Harmonica', 'Piano', 'Upright bass', 'Drums'], techniques: ['Call and response', 'Bent notes', 'Slide guitar'], traits: ['Vocal-led', 'Blue notes'],
		landmark: { title: 'Cross Road Blues', wiki: 'Cross_Road_Blues', artist: 'Robert Johnson', artistWiki: 'Robert_Johnson', year: '1936', note: 'Hear how voice and guitar answer one another without a rhythm section.' },
		study: { title: 'Before You Accuse Me', wiki: 'Before_You_Accuse_Me', artist: 'Bo Diddley', artistWiki: 'Bo_Diddley', year: '1957', note: 'Keep a steady shuffle through the twelve-bar form before adding fills.' }
	},
	{
		file: 44, id: 'chicagoblues', name: 'Chicago blues', wiki: 'Chicago_blues', parent: 'blues', influences: [], family: 'blues', date: '1940s', place: 'Chicago, Illinois',
		shift: 'In Chicago clubs, musicians who had moved north from the Mississippi Delta set guitar and harmonica against bass and drums. Amplification let a short answer to a vocal line cut through a crowded room.',
		core: ['Electric guitar', 'Harmonica', 'Voice'], optional: ['Piano', 'Drums', 'Upright bass'], techniques: ['Amplified harp', 'Stop time'], traits: ['Electric blues', 'Band interplay'],
		landmark: { title: 'Hoochie Coochie Man', artist: 'Muddy Waters', year: '1954', note: 'Count through the gaps after the band accents; the voice carries the pulse across them.' },
		study: { title: 'Juke', artist: 'Little Walter', year: '1952', note: 'Tap the shuffle while following the changing lengths of the harmonica phrases.' }
	}
];

if (typeof module !== 'undefined' && module.exports) module.exports = bluesLineage;
