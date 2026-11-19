// owns: R&B lineage records and their reference slugs
// edit for: R&B catalogue entries, studies and instruments
const rhythmLineage = [
	{
		file: 5, id: 'rhythm', name: 'Rhythm & blues', short: 'R&B', aliases: ['rhythm and blues', 'rnb'], wiki: 'Rhythm_and_blues', parent: 'blues', influences: [], family: 'rhythm', date: '1940s', place: 'Urban United States',
		shift: 'Small amplified bands brought blues vocals to crowded dance floors. Bass and drums locked into a pronounced backbeat, with saxophone riffs answering the singer.',
		core: ['Voice', 'Upright bass', 'Drums'], optional: ['Saxophone', 'Electric guitar', 'Piano'], techniques: ['Backbeat', 'Boogie bass', 'Vocal response'], traits: ['Amplified', 'Dance music'],
		landmark: { title: 'Caldonia', wiki: 'Caldonia', artist: 'Louis Jordan', ensemble: 'and His Tympany Five', artistWiki: 'Louis_Jordan', year: '1945', note: 'Hear the band punch out a riff in answer to Jordan’s vocal.' },
		study: { title: 'Ain’t That a Shame', wiki: 'Ain%27t_That_a_Shame', artist: 'Fats Domino', artistWiki: 'Fats_Domino', year: '1955', note: 'Place the stop-time chords together, then settle back into the shuffle.' }
	},
	{
		file: 6, id: 'soul', name: 'Soul', wiki: 'Soul_music', parent: 'rhythm', influences: [], family: 'rhythm', date: '1950s–60s', place: 'United States',
		shift: 'Soul carried the vocal intensity and call-and-response of gospel into rhythm & blues. Sustained chords leave space for a singer to stretch and ornament a line.',
		core: ['Voice', 'Keys', 'Bass guitar'], optional: ['Backing vocals', 'Horns', 'Drums'], techniques: ['Melisma', 'Gospel cadences', 'Call and response'], traits: ['Gospel-influenced', 'Vocal-led'],
		landmark: { title: 'A Change Is Gonna Come', wiki: 'A_Change_Is_Gonna_Come', artist: 'Sam Cooke', artistWiki: 'Sam_Cooke', year: '1964', note: 'Listen to the way each held syllable changes color against the orchestra.' },
		study: { title: 'Stand by Me', wiki: 'Stand_by_Me_(Ben_E._King_song)', artist: 'Ben E. King', artistWiki: 'Ben_E._King', year: '1961', note: 'Hold the repeating four-chord cycle under a freely phrased vocal.' }
	},
	{
		file: 7, id: 'funk', name: 'Funk', wiki: 'Funk', parent: 'rhythm', family: 'rhythm', date: '1960s', place: 'United States',
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
		file: 11, id: 'disco', name: 'Disco', aliases: ['disco music'], wiki: 'Disco', parent: 'funk', family: 'rhythm', date: 'Early 1970s', place: 'New York & Philadelphia, US',
		influences: [['soul', 'Kept soul’s orchestral arrangement and vocal glamour over a dance-floor pulse instead of a ballad.']],
		shift: 'Disco put the dance floor first. A steady kick on every beat, octave bass and sweeping strings hold a long groove together while a rhythm guitar chops at the offbeats.',
		core: ['Electric bass', 'Drums', 'Strings'], optional: ['Electric guitar', 'Horns', 'Synthesizer', 'Voice'], techniques: ['Four-on-the-floor', 'Octave bass', 'String glissando'], traits: ['Dance music', 'Groove-led'],
		landmark: { title: 'Le Freak', wiki: 'Le_Freak', artist: 'Chic', artistWiki: 'Chic_(band)', year: '1978', note: 'Listen for the guitar chop against the bass line and the strings that answer the vocal.' },
		study: { title: 'Good Times', wiki: 'Good_Times_(Chic_song)', artist: 'Chic', artistWiki: 'Chic_(band)', year: '1979', note: 'Play the bass line alone first; the syncopation only works when the rests are as firm as the notes.' }
	},
	{
		file: 12, id: 'hiphop', name: 'Hip-hop', aliases: ['hip hop', 'rap'], wiki: 'Hip_hop_music', parent: 'funk', family: 'rhythm', date: 'Mid-1970s', place: 'The Bronx, New York, US',
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
		file: 15, id: 'house', name: 'House', aliases: ['house music', 'chicago house'], wiki: 'House_music', parent: 'disco', family: 'rhythm', date: 'Early 1980s', place: 'Chicago, US',
		influences: [['soul', 'Gospel-inflected soul vocals and warm keyboard chords carried into Chicago’s club tracks.']],
		shift: 'In Chicago’s Black, Latino and queer club scenes, DJs stretched and blended disco records for dancers. Producers kept the steady kick but rebuilt the groove with drum machines, repeating bass lines and keyboard stabs.',
		core: ['Drum machine', 'Synthesizer', 'Keys'], optional: ['Sampler', 'Voice', 'Turntables'], techniques: ['Four-on-the-floor', 'Offbeat chords', 'Loop layering'], traits: ['Club music', 'Groove-led'],
		landmark: { title: 'Move Your Body', wiki: 'Move_Your_Body_(Marshall_Jefferson_song)', artist: 'Marshall Jefferson', artistWiki: 'Marshall_Jefferson', year: '1986', note: 'Hear how the bright piano chords pull against the unchanging kick.' },
		study: { title: 'Can You Feel It', wiki: 'Can_You_Feel_It_(Larry_Heard_song)', artist: 'Mr. Fingers', artistWiki: 'Larry_Heard', year: '1986', note: 'Start with the repeating synth bass. Add the held chords without speeding up the pulse.' }
	},
	{
		file: 16, id: 'techno', name: 'Techno', aliases: ['detroit techno'], wiki: 'Techno', parent: 'disco', family: 'rhythm', date: 'Mid-1980s', place: 'Detroit, US',
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
		file: 17, id: 'dnb', name: 'Drum and bass', short: 'DnB', aliases: ['drum & bass', 'drum n bass', 'd&b', 'd’n’b', "d'n'b"], wiki: 'Drum_and_bass', parent: 'jungle', influences: [], family: 'rhythm', date: 'Early 1990s', place: 'United Kingdom',
		shift: 'Drum and bass kept jungle’s fast breaks and deep bass. Some producers used steadier drum patterns; others brought in spacious harmony or live instruments. The two names still overlap, especially on early records.',
		core: ['Sampler', 'Synthesizer', 'Sequencer'], optional: ['Drum machine', 'Voice', 'Upright bass'], techniques: ['Break slicing', 'Sub-bass programming', 'Double-time drums'], traits: ['Breakbeat', 'Bass-heavy'],
		landmark: { title: 'Inner City Life', wiki: 'Inner_City_Life', artist: 'Goldie', ensemble: 'featuring Diane Charlemagne', artistWiki: 'Goldie', year: '1994', note: 'Follow the quick edits in the drums while the voice stretches across them.' },
		study: { title: 'Brown Paper Bag', artist: 'Roni Size', ensemble: 'with Reprazent', artistWiki: 'Roni_Size', year: '1997', note: 'Learn the upright bass figure slowly, then keep it steady against the fast breakbeat.' }
	},
	{
		file: 19, id: 'hardcore', name: 'Breakbeat hardcore', short: 'Hardcore', aliases: ['hardcore rave', 'rave hardcore', 'oldskool hardcore'], wiki: 'Breakbeat_hardcore', parent: 'house', family: 'rhythm', date: 'Around 1990', place: 'United Kingdom',
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
		file: 20, id: 'jungle', name: 'Jungle', aliases: ['jungle music', 'old school jungle', 'ragga jungle'], wiki: 'Jungle_music', parent: 'hardcore', family: 'rhythm', date: 'Early 1990s', place: 'United Kingdom',
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
		file: 25, id: 'motown', name: 'Motown', aliases: ['motown sound', 'detroit soul'], wiki: 'Motown', parent: 'soul', family: 'rhythm', date: 'Late 1950s', place: 'Detroit, US',
		influences: [
			['rhythm', 'The vocal groups and dance cuts of R&B supplied the beat and the punchy, verse-length arrangements.'],
			['jazz', 'Session players brought jazz timing to bass lines that push the song forward between the drum hits.']
		],
		shift: 'Motown records were songs first and records second. A tambourine on every backbeat, a bass line that walks ahead of the chord and a chorus that arrives early keep the track moving, even when the lyric is sad.',
		core: ['Voice', 'Bass guitar', 'Drums'], optional: ['Tambourine', 'Keys', 'Tenor saxophone', 'Strings', 'Congas'],
		techniques: ['Four-on-the-floor tambourine', 'Melodic bass', 'Call and response'],
		traits: ['Vocal-led', 'Dance music'],
		landmark: { title: 'Reach Out I’ll Be There', wiki: 'Reach_Out_I%27ll_Be_There', artist: 'Four Tops', artistWiki: 'Four_Tops', year: '1966', note: 'Hear the bass climb and pull back while the vocal stays urgent. The band never settles into one level.' },
		study: { title: 'My Girl', wiki: 'My_Girl_(The_Temptations_song)', artist: 'The Temptations', artistWiki: 'The_Temptations', year: '1964', note: 'Learn the guitar figure that opens the song, then hum the bass line underneath it before playing both.' }
	},
	{
		file: 28, id: 'dnb_pop', name: 'Atmospheric drum and bass', short: 'Atmospheric DnB', aliases: ['intelligent dnb', 'liquid dnb', 'ambient jungle'], wiki: 'Atmospheric_drum_and_bass', parent: 'dnb', family: 'rhythm', date: 'Mid-1990s', place: 'United Kingdom',
		influences: [
			['dub', 'Echo and reverb pull the drums into a large space while the bass moves slowly underneath.'],
			['soul', 'Held chords and a sung or sampled voice carry the harmony instead of a short rave stab.']
		],
		shift: 'Atmospheric drum and bass kept the fast break but softened its edges. Long chords, filtered vocals and a deep, slow bass push the drums into the background, so the track feels open rather than frantic.',
		core: ['Sampler', 'Synthesizer', 'Sequencer'], optional: ['Voice', 'Keys', 'Mixing desk'],
		techniques: ['Filtered pads', 'Reverb-soaked breaks', 'Sub-bass'],
		traits: ['Atmospheric', 'Breakbeat'],
		landmark: { title: 'Timeless', wiki: 'Timeless_(Goldie_album)', artist: 'Goldie', artistWiki: 'Goldie', year: '1995', note: 'On the title track, listen for the strings and the bass holding long notes while the drums keep splitting.' },
		study: { title: 'Juanita', wiki: 'Juanita_%2F_Kiteless_%2F_To_Dream_of_Love', artist: 'Underworld', artistWiki: 'Underworld_(band)', year: '1996', note: 'Loop one bar of the drums, then layer a long held chord over it without changing the drum timing.' }
	},
	{
		file: 29, id: 'triphop', name: 'Trip-hop', aliases: ['trip hop', 'bristol sound'], wiki: 'Trip_hop', parent: 'hiphop', family: 'rhythm', date: 'Early 1990s', place: 'Bristol, UK',
		influences: [
			['dub', 'Studio echo and dropped-out sections make the beat feel like it is coming through a wall.'],
			['soul', 'Slow, sung lines and warm keyboard chords replace the rapped verse.'],
			['rock', 'Sampled guitar chords and a live, unsteady drum feel keep the weight of a band.']
		],
		shift: 'Trip-hop slowed hip-hop down and let the space around the beat matter. Dusty samples, a heavy backbeat and a sung or murmured voice make the loop feel like a room rather than a dance floor.',
		core: ['Sampler', 'Drums', 'Keys'], optional: ['Turntables', 'Voice', 'Electric bass', 'Percussion'],
		techniques: ['Dusty sampling', 'Slow backbeat', 'Vinyl crackle'],
		traits: ['Atmospheric', 'Sampled'],
		landmark: { title: 'Roads', wiki: 'Roads_(Portishead_song)', artist: 'Portishead', artistWiki: 'Portishead', year: '1994', note: 'Listen for the organ and the bass under a voice that keeps almost breaking, with very little drumming.' },
		study: { title: 'Hell Is Round the Corner', wiki: 'Hell_Is_Round_the_Corner', artist: 'Tricky', artistWiki: 'Tricky_(musician)', year: '1995', note: 'Find the one-bar loop first, then count how long it repeats before anything new arrives.' }
	}
];

if (typeof module !== 'undefined' && module.exports) module.exports = rhythmLineage;
