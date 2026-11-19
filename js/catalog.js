// owns: the genre graph, editorial records, family metadata and Wikipedia slugs
// edit for: repertoire, lineages, cross-influences, instruments and reference links
const genreCatalog = {
	wikiBase: 'https://en.wikipedia.org/wiki/',
	generations: ['Origin', 'Branches', 'Styles', 'Offshoots', 'Scenes', 'Crossovers', 'Underground', 'New forms'],
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
		'Drum machine': 'Drum_machine',
		Drums: 'Drum_kit',
		'Effects pedals': 'Effects_unit',
		'Electric bass': 'Bass_guitar',
		'Electric guitar': 'Electric_guitar',
		Guitar: 'Guitar',
		Harmonica: 'Harmonica',
		Horns: 'Horn_section',
		Keyboards: 'Keyboard_instrument',
		Keys: 'Keyboard_instrument',
		'Mixing desk': 'Mixing_console',
		Organ: 'Electronic_organ',
		Piano: 'Piano',
		'Rhythm section': 'Rhythm_section',
		Sampler: 'Sampler_(musical_instrument)',
		Saxophone: 'Saxophone',
		Saxophones: 'Saxophone',
		Sequencer: 'Music_sequencer',
		Strings: 'String_section',
		Synthesizer: 'Synthesizer',
		'Tape echo': 'Delay_(audio_effect)',
		Trombone: 'Trombone',
		Trumpet: 'Trumpet',
		Turntables: 'Turntablism',
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
			id: 'metal', name: 'Heavy metal', short: 'Metal', wiki: 'Heavy_metal_music', parent: 'rock', family: 'rock', date: 'Late 1960s', place: 'United Kingdom & US',
			influences: [['blues', 'Stretched electric blues riffs and blue-note tension into slower, heavier distortion.']],
			shift: 'Heavy metal pushed the amplified rock riff toward heavier distortion, darker intervals and sustained power chords. Guitar and bass often reinforce a single line.',
			core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Voice', 'Keyboards', 'Second guitar'], techniques: ['Power chords', 'Palm muting', 'Pedal tones'], traits: ['Distorted', 'Riff-led'],
			landmark: { title: 'Black Sabbath', wiki: 'Black_Sabbath_(song)', artist: 'Black Sabbath', artistWiki: 'Black_Sabbath', year: '1970', note: 'Listen for the tension of the tritone in the slow opening riff.' },
			study: { title: 'Iron Man', wiki: 'Iron_Man_(song)', artist: 'Black Sabbath', artistWiki: 'Black_Sabbath', year: '1970', note: 'Start with the main power-chord riff and match the duration of each chord.' }
		},
		{
			id: 'punk', name: 'Punk rock', short: 'Punk', wiki: 'Punk_rock', parent: 'rock', influences: [], family: 'rock', date: '1970s', place: 'New York & London',
			shift: 'Punk stripped rock down to short songs, direct vocals and a hard, fast pulse. Repeated downstrokes give a small set of chords relentless momentum.',
			core: ['Electric guitar', 'Bass guitar', 'Drums'], optional: ['Second guitar', 'Backing vocals'], techniques: ['Downpicking', 'Power chords', 'Straight eighths'], traits: ['Fast', 'DIY'],
			landmark: { title: 'Blitzkrieg Bop', wiki: 'Blitzkrieg_Bop', artist: 'Ramones', artistWiki: 'Ramones', year: '1976', note: 'The tight eighth notes leave very little space between the guitar and bass.' },
			study: { title: 'Should I Stay or Should I Go', wiki: 'Should_I_Stay_or_Should_I_Go', artist: 'The Clash', artistWiki: 'The_Clash', year: '1982', note: 'Practice the stop-start verse figure before bringing the chorus up to tempo.' }
		},
		{
			id: 'disco', name: 'Disco', aliases: ['disco music'], wiki: 'Disco', parent: 'funk', family: 'rhythm', date: 'Early 1970s', place: 'New York & Philadelphia, US',
			influences: [['soul', 'Kept soul’s orchestral arrangement and vocal glamour over a dance-floor pulse instead of a ballad.']],
			shift: 'Disco put the dance floor first. A steady kick on every beat, octave bass and sweeping strings hold a long groove together while a rhythm guitar chops at the offbeats.',
			core: ['Electric bass', 'Drums', 'Strings'], optional: ['Electric guitar', 'Horns', 'Synthesizer', 'Voice'], techniques: ['Four-on-the-floor', 'Octave bass', 'String glissando'], traits: ['Dance music', 'Groove-led'],
			landmark: { title: 'Le Freak', wiki: 'Le_Freak', artist: 'Chic', artistWiki: 'Chic_(band)', year: '1978', note: 'Listen for the guitar chop against the bass line and the strings that answer the vocal.' },
			study: { title: 'Good Times', wiki: 'Good_Times_(Chic_song)', artist: 'Chic', artistWiki: 'Chic_(band)', year: '1979', note: 'Play the bass line alone first; the syncopation only works when the rests are as firm as the notes.' }
		},
		{
			id: 'hiphop', name: 'Hip-hop', aliases: ['hip hop', 'rap'], wiki: 'Hip_hop_music', parent: 'funk', family: 'rhythm', date: 'Mid-1970s', place: 'The Bronx, New York, US',
			influences: [
				['disco', 'Extended break sections gave DJs the short drum passages they looped into new songs.'],
				['soul', 'Supplied the vocal shouts, horn stabs and drum breaks that early records were built from.'],
				['jazz', 'Lent sampled bass lines, chord voicings and a later tradition of live-band hip-hop.']
			],
			shift: 'Hip-hop turned existing records into raw material. A DJ isolates a drum break and repeats it, an MC speaks across the groove, and a sampler later plays those fragments as instruments.',
			core: ['Turntables', 'Drum machine', 'Voice'], optional: ['Sampler', 'Synthesizer', 'Electric bass'], techniques: ['Breakbeat looping', 'Sampling', 'Rapping'], traits: ['Groove-led', 'Sampled'],
			landmark: { title: 'Rapper’s Delight', wiki: 'Rapper%27s_Delight', artist: 'The Sugarhill Gang', artistWiki: 'The_Sugarhill_Gang', year: '1979', note: 'Follow the disco break underneath the long traded verses, then notice how little it changes.' },
			study: { title: 'Planet Rock', wiki: 'Planet_Rock', artist: 'Afrika Bambaataa', artistWiki: 'Afrika_Bambaataa', year: '1982', note: 'Keep the drum pattern absolutely level, then place each synth phrase against it.' }
		},
		{
			id: 'fusion', name: 'Jazz fusion', short: 'Fusion', aliases: ['fusion', 'jazz rock'], wiki: 'Jazz_fusion', parent: 'bebop', family: 'jazz', date: 'Late 1960s', place: 'United States',
			influences: [
				['rock', 'Brought distorted guitars, loud drums and rock song lengths into an improvised setting.'],
				['funk', 'Added a syncopated electric bass and a static groove that soloists could stretch over.'],
				['soul', 'Contributed electric piano tone, riff-based heads and a danceable pulse.']
			],
			shift: 'Fusion kept bebop’s harmony and improvisation but plugged it in. Electric piano, distorted guitar and funk bass carry long solos over rock rhythms and odd meters.',
			core: ['Keyboards', 'Electric guitar', 'Electric bass'], optional: ['Drums', 'Saxophone', 'Trumpet', 'Synthesizer'], techniques: ['Extended solo forms', 'Odd meters', 'Electric comping'], traits: ['Improvised', 'Electric'],
			landmark: { title: 'Bitches Brew', wiki: 'Bitches_Brew', artist: 'Miles Davis', artistWiki: 'Miles_Davis', year: '1970', note: 'Notice how the pulse stays vague while the electric keyboards circle the same few chords.' },
			study: { title: 'Chameleon', wiki: 'Chameleon_(composition)', artist: 'Herbie Hancock', artistWiki: 'Herbie_Hancock', year: '1973', note: 'Learn the bass riff and the four-bar synth melody before trying a solo over them.' }
		},
		{
			id: 'altrock', name: 'Alternative rock', short: 'Alt rock', aliases: ['alt-rock', 'alternative'], wiki: 'Alternative_rock', parent: 'punk', family: 'rock', date: '1980s', place: 'United States & United Kingdom',
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
			id: 'house', name: 'House', aliases: ['house music', 'chicago house'], wiki: 'House_music', parent: 'disco', family: 'rhythm', date: 'Early 1980s', place: 'Chicago, US',
			influences: [['soul', 'Gospel-inflected soul vocals and warm keyboard chords carried into Chicago’s club tracks.']],
			shift: 'In Chicago’s Black, Latino and queer club scenes, DJs stretched and blended disco records for dancers. Producers kept the steady kick but rebuilt the groove with drum machines, repeating bass lines and keyboard stabs.',
			core: ['Drum machine', 'Synthesizer', 'Keys'], optional: ['Sampler', 'Voice', 'Turntables'], techniques: ['Four-on-the-floor', 'Offbeat chords', 'Loop layering'], traits: ['Club music', 'Groove-led'],
			landmark: { title: 'Move Your Body', wiki: 'Move_Your_Body_(Marshall_Jefferson_song)', artist: 'Marshall Jefferson', artistWiki: 'Marshall_Jefferson', year: '1986', note: 'Hear how the bright piano chords pull against the unchanging kick.' },
			study: { title: 'Can You Feel It', wiki: 'Can_You_Feel_It_(Larry_Heard_song)', artist: 'Mr. Fingers', artistWiki: 'Larry_Heard', year: '1986', note: 'Start with the repeating synth bass. Add the held chords without speeding up the pulse.' }
		},
		{
			id: 'techno', name: 'Techno', aliases: ['detroit techno'], wiki: 'Techno', parent: 'disco', family: 'rhythm', date: 'Mid-1980s', place: 'Detroit, US',
			influences: [
				['hiphop', 'Early electro and hip-hop shared drum-machine rhythms and synth bass with the records made by Detroit pioneers.'],
				['house', 'Detroit producers heard Chicago house in clubs and on records, shaping how they built and paced tracks for dancers.']
			],
			shift: 'Black Detroit producers combined the pulse of club records with funk and European electronic music. Repeating sequences let small changes in percussion and synth tone carry a track without a verse or chorus.',
			core: ['Drum machine', 'Synthesizer', 'Sequencer'], optional: ['Sampler', 'Keys'], techniques: ['Step sequencing', 'Filter sweeps', 'Layered percussion'], traits: ['Electronic', 'Repetitive'],
			landmark: { title: 'No UFO’s', wiki: 'No_UFO%27s', artist: 'Model 500', artistWiki: 'Juan_Atkins', year: '1985', note: 'Listen for the clipped synth bass and machine percussion underneath the processed voice.' },
			study: { title: 'Strings of Life', wiki: 'Strings_of_Life', artist: 'Rhythim Is Rhythim', artistWiki: 'Derrick_May_(musician)', year: '1987', note: 'Tap a steady pulse while you learn the syncopated piano figure.' }
		},
		{
			id: 'dnb', name: 'Drum and bass', short: 'DnB', aliases: ['drum & bass', 'drum n bass', 'd&b', 'd’n’b', "d'n'b"], wiki: 'Drum_and_bass', parent: 'jungle', influences: [], family: 'rhythm', date: 'Early 1990s', place: 'United Kingdom',
			shift: 'Drum and bass kept jungle’s fast breaks and deep bass. Some producers used steadier drum patterns; others brought in spacious harmony or live instruments. The two names still overlap, especially on early records.',
			core: ['Sampler', 'Synthesizer', 'Sequencer'], optional: ['Drum machine', 'Voice', 'Upright bass'], techniques: ['Break slicing', 'Sub-bass programming', 'Double-time drums'], traits: ['Breakbeat', 'Bass-heavy'],
			landmark: { title: 'Inner City Life', wiki: 'Inner_City_Life', artist: 'Goldie', ensemble: 'featuring Diane Charlemagne', artistWiki: 'Goldie', year: '1994', note: 'Follow the quick edits in the drums while the voice stretches across them.' },
			study: { title: 'Brown Paper Bag', artist: 'Roni Size', ensemble: 'with Reprazent', artistWiki: 'Roni_Size', year: '1997', note: 'Learn the upright bass figure slowly, then keep it steady against the fast breakbeat.' }
		},
		{
			id: 'grunge', name: 'Grunge', aliases: ['seattle sound'], wiki: 'Grunge', parent: 'altrock', family: 'rock', date: 'Mid-1980s', place: 'Pacific Northwest, US',
			influences: [['metal', 'Heavy metal gave many Seattle bands their slow, low riffs and thick guitar distortion.']],
			shift: 'In the Pacific Northwest, independent bands mixed punk’s direct attack with the weight of metal. Murky guitar tones, raw vocals and abrupt changes in volume made forceful riffs feel unsettled.',
			core: ['Electric guitar', 'Bass guitar', 'Drums', 'Voice'], optional: ['Effects pedals', 'Backing vocals'], techniques: ['Drop D tuning', 'Fuzz guitar', 'Loud-quiet dynamics'], traits: ['Distorted', 'Riff-led'],
			landmark: { title: 'Outshined', wiki: 'Outshined', artist: 'Soundgarden', artistWiki: 'Soundgarden', year: '1991', note: 'Count seven beats in the verse riff, then hear it give way to the square pulse of the chorus.' },
			study: { title: 'Come as You Are', wiki: 'Come_as_You_Are_(Nirvana_song)', artist: 'Nirvana', artistWiki: 'Nirvana_(band)', year: '1992', note: 'Learn the two-string riff without effects first, then add a chorus pedal for the wavering sound.' }
		},
		{
			id: 'hardcore', name: 'Breakbeat hardcore', short: 'Hardcore', aliases: ['hardcore rave', 'rave hardcore', 'oldskool hardcore'], wiki: 'Breakbeat_hardcore', parent: 'house', family: 'rhythm', date: 'Around 1990', place: 'United Kingdom',
			influences: [
				['techno', 'UK rave DJs played techno alongside house; repeating synth figures and machine drums carried into hardcore.'],
				['hiphop', 'Hip-hop showed producers how to loop and rearrange recorded drum breaks.']
			],
			shift: 'On British rave floors, house’s steady kick sped up and shared space with sampled drum breaks. Bright piano stabs, pitched-up voices and abrupt edits turned familiar club sounds into something rowdier.',
			core: ['Sampler', 'Synthesizer', 'Drum machine'], optional: ['Sequencer', 'Keys', 'Voice'], techniques: ['Layered breaks', 'Pitch-shifted samples', 'Rave stabs'], traits: ['Rave music', 'Breakbeat'],
			landmark: { title: 'On a Ragga Tip', wiki: 'On_a_Ragga_Tip', artist: 'SL2', artistWiki: 'SL2_(musical_group)', year: '1992', note: 'Listen for Jah Screechy’s sampled voice and the way the busy break pushes against the steady pulse.' },
			study: { title: 'Bombscare', wiki: 'Bombscare', artist: '2 Bad Mice', artistWiki: '2_Bad_Mice', year: '1991', note: 'Learn the short synth riff first, then keep it steady over a chopped drum loop.' }
		},
		{
			id: 'jungle', name: 'Jungle', aliases: ['jungle music', 'old school jungle', 'ragga jungle'], wiki: 'Jungle_music', parent: 'hardcore', family: 'rhythm', date: 'Early 1990s', place: 'United Kingdom',
			influences: [
				['funk', 'Funk and soul records supplied drum breaks that producers sped up and cut into new rhythms.'],
				['dub', 'Jamaican dub mixes showed how much space a bass line could fill when the other parts dropped out or trailed into echo.']
			],
			shift: 'Jungle let the chopped break take over from hardcore’s steady kick. Black British producers and MCs drew on Jamaican sound systems, dub and dancehall, pairing fast, shifting drums with deep bass that often felt half as fast.',
			core: ['Sampler', 'Synthesizer', 'Sequencer'], optional: ['Voice', 'Turntables', 'Mixing desk'], techniques: ['Break slicing', 'Snare rolls', 'Dub bass'], traits: ['Sound-system culture', 'Breakbeat'],
			landmark: { title: 'Original Nuttah', wiki: 'Original_Nuttah', artist: 'UK Apachi', ensemble: 'with Shy FX', year: '1994', note: 'Hear how the MC fits quick bursts of words into gaps in the chopped drums.' },
			study: { title: 'Valley of the Shadows', wiki: 'Valley_of_the_Shadows', artist: 'Origin Unknown', artistWiki: 'Origin_Unknown', year: '1993', note: 'Tap the slow bass pulse while learning one bar of the much faster break.' }
		},
		{
			id: 'ska', name: 'Ska', aliases: ['Jamaican ska', 'first-wave ska'], wiki: 'Ska', parent: 'rhythm', family: 'rhythm', date: 'Late 1950s', place: 'Kingston, Jamaica',
			influences: [['jazz', 'Jazz-trained horn players brought section riffs and improvised solos to Kingston’s studio bands.']],
			shift: 'Kingston bands drew on Jamaican mento and the American R&B shuffles heard at sound-system dances. Tap your foot with the walking bass: the guitar or piano strikes a short chord just as you lift it.',
			core: ['Guitar', 'Upright bass', 'Drums', 'Horns'], optional: ['Piano', 'Voice'], techniques: ['Offbeat skank', 'Walking bass', 'Horn riffs'], traits: ['Dance music', 'Sound-system culture'],
			landmark: { title: 'Guns of Navarone', artist: 'The Skatalites', artistWiki: 'The_Skatalites', year: '1965', note: 'Follow the long notes of the horn theme, then switch your ear to the clipped chords ticking away beneath it.' },
			study: { title: 'My Boy Lollipop', wiki: 'My_Boy_Lollipop', artist: 'Millie Small', artistWiki: 'Millie_Small', year: '1964', note: 'Count the beats aloud. Add a short upstroke between each pair without letting the chord ring into the next beat.' }
		},
		{
			id: 'rocksteady', name: 'Rocksteady', aliases: ['rock steady'], wiki: 'Rocksteady', parent: 'ska', family: 'rhythm', date: 'Mid-1960s', place: 'Kingston, Jamaica',
			influences: [['soul', 'Vocal trios drew on US soul groups, fitting close harmonies and answering phrases around a lead singer.']],
			shift: 'At rocksteady’s slower pace, the bass no longer had to walk on every beat. A player could leave a gap, then fit several notes before the next chord. Those repeating lines became as memorable as the vocal hooks.',
			core: ['Electric bass', 'Guitar', 'Drums', 'Voice'], optional: ['Backing vocals', 'Piano', 'Horns'], techniques: ['Melodic bass', 'Close harmony', 'Offbeat skank'], traits: ['Vocal groups', 'Bass-led'],
			landmark: { title: 'The Tide Is High', wiki: 'The_Tide_Is_High', artist: 'The Paragons', artistWiki: 'The_Paragons', year: '1967', note: 'Listen past the violin to the steady bass figure. The voices hold their notes across its rests.' },
			study: { title: '007 (Shanty Town)', wiki: '007_(Shanty_Town)', artist: 'Desmond Dekker', ensemble: 'and the Aces', artistWiki: 'Desmond_Dekker', year: '1967', note: 'Sing the opening bass figure before playing it. Keep it going when the vocal comes in rather than doubling the singer’s rhythm.' }
		},
		{
			id: 'reggae', name: 'Reggae', wiki: 'Reggae', parent: 'rocksteady', influences: [], family: 'rhythm', date: 'Late 1960s', place: 'Kingston, Jamaica',
			shift: 'Reggae kept rocksteady’s melodic bass and offbeat guitar but changed the weight of the bar. In a one drop, one of several reggae drum feels, the kick skips beat one and lands with the rim click on three.',
			core: ['Electric bass', 'Drums', 'Electric guitar'], optional: ['Organ', 'Voice', 'Backing vocals', 'Horns'], techniques: ['One drop', 'Offbeat skank', 'Organ bubble'], traits: ['Bass-led', 'Sound-system culture'],
			landmark: { title: 'The Harder They Come', wiki: 'The_Harder_They_Come_(song)', artist: 'Jimmy Cliff', artistWiki: 'Jimmy_Cliff', year: '1972', note: 'Listen to the gaps between the guitar chops while Cliff stretches a sung syllable over several beats.' },
			study: { title: 'Three Little Birds', wiki: 'Three_Little_Birds', artist: 'Bob Marley and the Wailers', artistWiki: 'Bob_Marley_and_the_Wailers', year: '1977', note: 'Play the offbeat chords through the chorus. Sing the melody over them without letting the upstrokes drift onto the beat.' }
		},
		{
			id: 'dub', name: 'Dub', aliases: ['dub reggae', 'dub music'], wiki: 'Dub_music', parent: 'reggae', influences: [], family: 'rhythm', date: 'Early 1970s', place: 'Kingston, Jamaica',
			shift: 'A reggae single’s backing track could have a second life as a “version”. Engineers played the mixing desk: they cut the voice, pushed the bass forward and sent a lone snare hit into echo. The mix became the performance.',
			core: ['Mixing desk', 'Electric bass', 'Drums'], optional: ['Tape echo', 'Voice', 'Electric guitar'], techniques: ['Fader mutes', 'Echo sends', 'Spring reverb'], traits: ['Studio production', 'Bass-led'],
			landmark: { title: 'King Tubby Meets Rockers Uptown', artist: 'Augustus Pablo', ensemble: 'with King Tubby', artistWiki: 'Augustus_Pablo', year: '1976', note: 'On the album’s title track, listen for a drum sound returning as an echo. The bass keeps time even when the other parts disappear.' },
			study: { title: 'Pick a Dub', artist: 'Keith Hudson', artistWiki: 'Keith_Hudson', year: '1974', note: 'Loop the bass figure and keep it running. Bring a second part in for a bar, mute it, then bring it back on the same beat.' }
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
		const phrase = words.join(' ');
		const exact = [];
		const related = [];
		for (const genre of this.genres) {
			const names = [genre.name, genre.short, genre.id, ...(genre.aliases || [])];
			if (names.some(name => name?.toLowerCase() === phrase)) {
				exact.push(genre);
				continue;
			}
			const text = [...names, this.families[genre.family].label, genre.date, genre.place, ...genre.core, ...genre.optional, ...genre.techniques, ...genre.traits, ...this.pieceTerms(genre.landmark), ...this.pieceTerms(genre.study)].join(' ').toLowerCase();
			if (words.every(word => text.includes(word))) related.push(genre);
		}
		return exact.concat(related);
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = genreCatalog;
