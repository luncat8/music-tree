// owns: Rock lineage records and their reference slugs
// edit for: rock catalogue entries, studies and instruments
const rockLineage = [
	{
		file: 8, id: 'rock', name: 'Rock', wiki: 'Rock_music', parent: 'blues', family: 'rock', date: '1950s', place: 'United States',
		influences: [['rhythm', 'Carried the amplified R&B backbeat, boogie bass and jump-band drive onto guitar-led singles.'], ['country', 'Country guitar picking and vocal phrasing helped shape early rockabilly.']],
		shift: 'Early rock and roll combined blues forms with country and R&B rhythms. Amplified guitar moved to the front, driving memorable riffs over a firm backbeat.',
		core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Piano', 'Saxophone', 'Voice'], techniques: ['Guitar riffs', 'Backbeat', 'Double-stops'], traits: ['Amplified', 'Riff-led'],
		landmark: { title: 'Johnny B. Goode', wiki: 'Johnny_B._Goode', artist: 'Chuck Berry', artistWiki: 'Chuck_Berry', year: '1958', note: 'Hear the opening guitar double-stops set up the vocal and band.' },
		study: { title: 'Rumble', wiki: 'Rumble_(instrumental)', artist: 'Link Wray', ensemble: 'and His Ray Men', artistWiki: 'Link_Wray', year: '1958', note: 'Let the chord hits ring and leave the deliberate gaps in the riff.' }
	},
	{
		file: 9, id: 'metal', name: 'Heavy metal', short: 'Metal', wiki: 'Heavy_metal_music', parent: 'rock', family: 'rock', date: 'Late 1960s', place: 'United Kingdom & US',
		influences: [['blues', 'Stretched electric blues riffs and blue-note tension into slower, heavier distortion.']],
		shift: 'Heavy metal pushed the amplified rock riff toward heavier distortion, darker intervals and sustained power chords. Guitar and bass often reinforce a single line.',
		core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Voice', 'Keyboards', 'Second guitar'], techniques: ['Power chords', 'Palm muting', 'Pedal tones'], traits: ['Distorted', 'Riff-led'],
		landmark: { title: 'Black Sabbath', wiki: 'Black_Sabbath_(song)', artist: 'Black Sabbath', artistWiki: 'Black_Sabbath', year: '1970', note: 'Listen for the tension of the tritone in the slow opening riff.' },
		study: { title: 'Iron Man', wiki: 'Iron_Man_(song)', artist: 'Black Sabbath', artistWiki: 'Black_Sabbath', year: '1970', note: 'Start with the main power-chord riff and match the duration of each chord.' }
	},
	{
		file: 10, id: 'punk', name: 'Punk rock', short: 'Punk', wiki: 'Punk_rock', parent: 'rock', influences: [], family: 'rock', date: '1970s', place: 'New York & London',
		shift: 'Punk stripped rock down to short songs, direct vocals and a hard, fast pulse. Repeated downstrokes give a small set of chords relentless momentum.',
		core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Second guitar', 'Backing vocals'], techniques: ['Downpicking', 'Power chords', 'Straight eighths'], traits: ['Fast', 'DIY'],
		landmark: { title: 'Blitzkrieg Bop', wiki: 'Blitzkrieg_Bop', artist: 'Ramones', artistWiki: 'Ramones', year: '1976', note: 'The tight eighth notes leave very little space between the guitar and bass.' },
		study: { title: 'Should I Stay or Should I Go', wiki: 'Should_I_Stay_or_Should_I_Go', artist: 'The Clash', artistWiki: 'The_Clash', year: '1982', note: 'Practice the stop-start verse figure before bringing the chorus up to tempo.' }
	},
	{
		file: 14, id: 'altrock', name: 'Alternative rock', short: 'Alt rock', aliases: ['alt-rock', 'alternative'], wiki: 'Alternative_rock', parent: 'punk', family: 'rock', date: '1980s', place: 'United States & United Kingdom',
		influences: [
			['rock', 'Reconnected punk with the jangling guitars and songcraft of the earlier rock bands it had rejected.'],
			['metal', 'Supplied the heavy distortion and loud-quiet dynamics that later alternative bands pushed further.']
		],
		shift: 'Alternative rock took punk’s independence into stranger tunings, quiet verses and sudden loud choruses. College radio and small labels carried it before the charts did.',
		core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Voice', 'Keyboards', 'Strings'], techniques: ['Loud-quiet dynamics', 'Alternate tunings', 'Jangle arpeggios'], traits: ['DIY', 'Riff-led'],
		landmark: { title: 'Smells Like Teen Spirit', wiki: 'Smells_Like_Teen_Spirit', artist: 'Nirvana', artistWiki: 'Nirvana_(band)', year: '1991', note: 'Listen for the drop from a nearly whispered verse into a shouted four-chord chorus.' },
		study: { title: 'Losing My Religion', wiki: 'Losing_My_Religion', artist: 'R.E.M.', artistWiki: 'R.E.M.', year: '1991', note: 'Keep the mandolin figure even and quiet; the song depends on restraint rather than volume.' }
	},
	{
		file: 18, id: 'grunge', name: 'Grunge', aliases: ['seattle sound'], wiki: 'Grunge', parent: 'altrock', family: 'rock', date: 'Mid-1980s', place: 'Pacific Northwest, US',
		influences: [['metal', 'Heavy metal gave many Seattle bands their slow, low riffs and thick guitar distortion.']],
		shift: 'In the Pacific Northwest, independent bands mixed punk’s direct attack with the weight of metal. Murky guitar tones, raw vocals and abrupt changes in volume made forceful riffs feel unsettled.',
		core: ['Electric guitar', 'Bass guitar', 'Drums', 'Voice'], optional: ['Effects pedals', 'Backing vocals'], techniques: ['Drop D tuning', 'Fuzz guitar', 'Loud-quiet dynamics'], traits: ['Distorted', 'Riff-led'],
		landmark: { title: 'Outshined', wiki: 'Outshined', artist: 'Soundgarden', artistWiki: 'Soundgarden', year: '1991', note: 'Count seven beats in the verse riff, then hear it give way to the square pulse of the chorus.' },
		study: { title: 'Come as You Are', wiki: 'Come_as_You_Are_(Nirvana_song)', artist: 'Nirvana', artistWiki: 'Nirvana_(band)', year: '1992', note: 'Learn the two-string riff without effects first, then add a chorus pedal for the wavering sound.' }
	},
	{
		file: 26, id: 'psyc', name: 'Psychedelic rock', short: 'Psychedelia', aliases: ['psychedelic', 'acid rock'], wiki: 'Psychedelic_rock', parent: 'rock', family: 'rock', date: 'Mid-1960s', place: 'United States & United Kingdom',
		influences: [
			['jazz', 'Improvised sections let songs leave their verse shape for a while, as soloists followed the mood of a studio take.'],
			['blues', 'Bent notes, slow riffs and long guitar breaks stayed at the centre of the louder, longer arrangements.']
		],
		shift: 'Psychedelic rock used the studio as an instrument. Guitar effects, tape loops and unusual tunings stretched a three-minute song into a drifting, improvised passage, and a raga-like drone replaced the usual chord changes.',
		core: ['Electric guitar', 'Bass guitar', 'Drums', 'Keyboards'], optional: ['Effects pedals', 'Sitar', 'Voice'],
		techniques: ['Feedback', 'Modal drones', 'Studio effects'],
		traits: ['Improvised', 'Effects-heavy'],
		landmark: { title: 'Purple Haze', wiki: 'Purple_Haze', artist: 'The Jimi Hendrix Experience', artistWiki: 'The_Jimi_Hendrix_Experience', year: '1967', note: 'The opening riff bends against the chord. Notice how the guitar keeps moving while the bass holds one note.' },
		study: { title: 'White Rabbit', wiki: 'White_Rabbit_(song)', artist: 'Jefferson Airplane', artistWiki: 'Jefferson_Airplane', year: '1967', note: 'Follow the slow build from a quiet start to the full band. Keep the same tempo throughout.' }
	},
	{
		file: 27, id: 'prog', name: 'Progressive rock', short: 'Prog', aliases: ['prog rock', 'art rock'], wiki: 'Progressive_rock', parent: 'psyc', family: 'rock', date: 'Late 1960s', place: 'United Kingdom',
		influences: [
			['jazz', 'Jazz harmony and odd groupings gave long instrumental sections somewhere to go after the main theme.'],
			['rock', 'Kept the amplified lineup while letting the arrangement change key, meter and texture inside one piece.']
		],
		shift: 'Progressive rock treated a band like a small orchestra. Suites replace choruses, meters change under the same theme, and the keyboard player often leads a section that a guitar will restate later.',
		core: ['Keyboards', 'Electric guitar', 'Bass guitar', 'Drums'], optional: ['Synthesizer', 'Flute', 'Strings', 'Leslie speaker'],
		techniques: ['Odd meters', 'Thematic development', 'Mellotron and organ pads'],
		traits: ['Long-form', 'Composed'],
		landmark: { title: '21st Century Schizoid Man', wiki: '21st_Century_Schizoid_Man', artist: 'King Crimson', artistWiki: 'King_Crimson', year: '1969', note: 'Count the riff in its fast odd grouping, then hear the middle section open into slow, sustained chords.' },
		study: { title: 'Roundabout', wiki: 'Roundabout_(song)', artist: 'Yes', artistWiki: 'Yes_(band)', year: '1971', note: 'Learn the opening guitar figure first. It returns twice, so the rest of the piece has an anchor.' }
	},
	{
		file: 31, id: 'milrock', name: 'Math rock', aliases: ['math-rock'], wiki: 'Math_rock', parent: 'altrock', family: 'rock', date: 'Late 1980s', place: 'United States',
		influences: [
			['metal', 'Tapped and palm-muted figures applied metal’s attack to clean, precise guitar tones.'],
			['punk', 'Short bursts, an independent circuit and a refusal of long solos set the rules.'],
			['jazz', 'Guitar and bass lines move independently, like two voices in a counterpoint exercise.']
		],
		shift: 'Math rock keeps a rock band’s lineup and changes its arithmetic. Guitar and bass play short repeating figures in unusual groupings while the listener counts along and loses the beat.',
		core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Second guitar', 'Effects pedals'],
		techniques: ['Tapping', 'Odd groupings', 'Clean arpeggios'],
		traits: ['Composed', 'Riff-led'],
		landmark: { title: '40 Rods to the Hogshead', wiki: '40_Rods_to_the_Hogshead', artist: 'Don Caballero', artistWiki: 'Don_Caballero', year: '1995', note: 'Pick one instrument and count its figure through the riff. Each player returns at a different point.' },
		study: { title: 'Elvis', artist: 'Bastro', year: '1989', note: 'Clap one bar of the riff while listening. When you can keep it, add the guitar line on top.' }
	}
];

if (typeof module !== 'undefined' && module.exports) module.exports = rockLineage;
