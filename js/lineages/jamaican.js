// owns: Jamaican lineage records and their reference slugs
// edit for: Jamaican catalogue entries, studies and instruments
const jamaicanLineage = [
	{
		file: 21, id: 'ska', name: 'Ska', aliases: ['Jamaican ska', 'first-wave ska'], wiki: 'Ska', parent: 'mento', family: 'mento', date: 'Late 1950s', place: 'Kingston, Jamaica',
		influences: [['rhythm', 'American R&B shuffles reached Kingston through records and sound systems.'], ['jazz', 'Jazz-trained horn players brought section riffs and improvised solos to Kingston’s studio bands.']],
		shift: 'Kingston bands drew on Jamaican mento and the American R&B shuffles heard at sound-system dances. Tap your foot with the walking bass: the guitar or piano strikes a short chord just as you lift it.',
		core: ['Guitar', 'Upright bass', 'Drums', 'Horns'], optional: ['Piano', 'Voice'], techniques: ['Offbeat skank', 'Walking bass', 'Horn riffs'], traits: ['Dance music', 'Sound-system culture'],
		landmark: { title: 'Guns of Navarone', artist: 'The Skatalites', artistWiki: 'The_Skatalites', year: '1965', note: 'Follow the long notes of the horn theme, then switch your ear to the clipped chords ticking away beneath it.' },
		study: { title: 'My Boy Lollipop', wiki: 'My_Boy_Lollipop', artist: 'Millie Small', artistWiki: 'Millie_Small', year: '1964', note: 'Count the beats aloud. Add a short upstroke between each pair without letting the chord ring into the next beat.' }
	},
	{
		file: 22, id: 'rocksteady', name: 'Rocksteady', aliases: ['rock steady'], wiki: 'Rocksteady', parent: 'ska', family: 'mento', date: 'Mid-1960s', place: 'Kingston, Jamaica',
		influences: [['soul', 'Vocal trios drew on US soul groups, fitting close harmonies and answering phrases around a lead singer.']],
		shift: 'At rocksteady’s slower pace, the bass no longer had to walk on every beat. A player could leave a gap, then fit several notes before the next chord. Those repeating lines became as memorable as the vocal hooks.',
		core: ['Electric bass', 'Guitar', 'Drums', 'Voice'], optional: ['Backing vocals', 'Piano', 'Horns'], techniques: ['Melodic bass', 'Close harmony', 'Offbeat skank'], traits: ['Vocal groups', 'Bass-led'],
		landmark: { title: 'The Tide Is High', wiki: 'The_Tide_Is_High', artist: 'The Paragons', artistWiki: 'The_Paragons', year: '1967', note: 'Listen past the violin to the steady bass figure. The voices hold their notes across its rests.' },
		study: { title: '007 (Shanty Town)', wiki: '007_(Shanty_Town)', artist: 'Desmond Dekker', ensemble: 'and the Aces', artistWiki: 'Desmond_Dekker', year: '1967', note: 'Sing the opening bass figure before playing it. Keep it going when the vocal comes in rather than doubling the singer’s rhythm.' }
	},
	{
		file: 23, id: 'reggae', name: 'Reggae', wiki: 'Reggae', parent: 'rocksteady', influences: [], family: 'mento', date: 'Late 1960s', place: 'Kingston, Jamaica',
		shift: 'Reggae kept rocksteady’s melodic bass and offbeat guitar but changed the weight of the bar. In a one drop, one of several reggae drum feels, the kick skips beat one and lands with the rim click on three.',
		core: ['Electric bass', 'Drums', 'Electric guitar'], optional: ['Organ', 'Voice', 'Backing vocals', 'Horns'], techniques: ['One drop', 'Offbeat skank', 'Organ bubble'], traits: ['Bass-led', 'Sound-system culture'],
		landmark: { title: 'The Harder They Come', wiki: 'The_Harder_They_Come_(song)', artist: 'Jimmy Cliff', artistWiki: 'Jimmy_Cliff', year: '1972', note: 'Listen to the gaps between the guitar chops while Cliff stretches a sung syllable over several beats.' },
		study: { title: 'Three Little Birds', wiki: 'Three_Little_Birds', artist: 'Bob Marley and the Wailers', artistWiki: 'Bob_Marley_and_the_Wailers', year: '1977', note: 'Play the offbeat chords through the chorus. Sing the melody over them without letting the upstrokes drift onto the beat.' }
	},
	{
		file: 24, id: 'dub', name: 'Dub', aliases: ['dub reggae', 'dub music'], wiki: 'Dub_music', parent: 'reggae', influences: [], family: 'mento', date: 'Early 1970s', place: 'Kingston, Jamaica',
		shift: 'A reggae single’s backing track could have a second life as a “version”. Engineers played the mixing desk: they cut the voice, pushed the bass forward and sent a lone snare hit into echo. The mix became the performance.',
		core: ['Mixing desk', 'Electric bass', 'Drums'], optional: ['Tape echo', 'Voice', 'Electric guitar'], techniques: ['Fader mutes', 'Echo sends', 'Spring reverb'], traits: ['Studio production', 'Bass-led'],
		landmark: { title: 'King Tubby Meets Rockers Uptown', artist: 'Augustus Pablo', ensemble: 'with King Tubby', artistWiki: 'Augustus_Pablo', year: '1976', note: 'On the album’s title track, listen for a drum sound returning as an echo. The bass keeps time even when the other parts disappear.' },
		study: { title: 'Pick a Dub', artist: 'Keith Hudson', artistWiki: 'Keith_Hudson', year: '1974', note: 'Loop the bass figure and keep it running. Bring a second part in for a bar, mute it, then bring it back on the same beat.' }
	},
	{
		file: 30, id: 'dancehall', name: 'Dancehall', wiki: 'Dancehall', parent: 'reggae', family: 'mento', date: 'Late 1970s', place: 'Kingston, Jamaica',
		influences: [
			['hiphop', 'A voice that drives the rhythm rather than a sung melody, with a DJ trading short phrases across the track.'],
			['disco', 'A firmer, faster four-beat pulse for a sound system crowd rather than a one drop.'],
			['soul', 'Bass and drums stripped down to what a sound system can push across an open field.']
		],
		shift: 'Dancehall took reggae from the studio to the sound system, then to the street dance. Horns and keyboards fall away, the drum and bass carry everything, and the DJ’s voice is the melody.',
		core: ['Drums', 'Electric bass', 'Voice'], optional: ['Drum machine', 'Synthesizer', 'Mixing desk'],
		techniques: ['Riddim versions', 'Patwah toasting', 'Heavy sub-bass'],
		traits: ['Dance music', 'Sound-system culture'],
		landmark: { title: 'Bam Bam', wiki: 'Bam_Bam_(Sister_Nancy_song)', artist: 'Sister Nancy', artistWiki: 'Sister_Nancy', year: '1982', note: 'The lyric rides the same riddim several other singers used. Notice how little the backing changes under it.' },
		study: { title: 'Murder She Wrote', wiki: 'Murder_She_Wrote_(song)', artist: 'Chaka Demus & Pliers', artistWiki: 'Chaka_Demus_%26_Pliers', year: '1992', note: 'Learn the short bass figure, then keep it steady while the vocal jumps across the beat.' }
	},
	{
		file: 32, id: 'mento', name: 'Mento', wiki: 'Mento', parent: null, family: 'mento', date: 'Early 1900s', place: 'Jamaica',
		influences: [],
		shift: 'Jamaican mento pairs topical and often humorous lyrics with acoustic strings and a syncopated dance pulse. A rumba box can carry the bass.',
		core: ['Banjo', 'Guitar', 'Voice'], optional: ['Rumba box', 'Percussion'], techniques: ['Offbeat strums', 'Call and response'], traits: ['Acoustic', 'Dance music'],
		landmark: { title: 'Linstead Market', artist: 'Louise Bennett', year: '1954', note: 'Listen for how the refrain answers the verse.' },
		study: { title: 'Day-O', artist: 'Harry Belafonte', year: '1956', note: 'Compare this arrangement of a Jamaican folk song with an acoustic mento performance.' }
	}
];

if (typeof module !== 'undefined' && module.exports) module.exports = jamaicanLineage;
