// owns: original two-bar studies, synthesis and transport lifecycle
// edit for: rhythms, voicings, timbres and playback
const backbeatDrums = { kicks: [0, 2, 4, 6], snares: [1, 3, 5, 7] };
const floorDrums = { ...backbeatDrums, kicks: [0, 1, 2, 3, 4, 5, 6, 7] };
// Keep the reggae backing intact so the dub mix can be compared with its source.
const oneDropDrums = { kicks: [2, 6], snares: [2, 6] };
const oneDropBass = [0, 36, 0, 43, 0, 0, 46, 43, 0, 41, 0, 48, 0, 0, 44, 43];
const patternScores = {
	blues: {
		name: 'E shuffle', bpm: 92, swing: true, voice: 'triangle',
		guide: 'A two-bar slice of an E shuffle. The bass rocks between the fifth and sixth; the treble answers in swung pairs.',
		lead: [0, 64, 67, 69, 0, 67, 64, 0, 0, 64, 67, 70, 69, 67, 64, 0], bass: [40, 47, 40, 49, 40, 47, 40, 49, 40, 47, 40, 49, 40, 47, 40, 49],
		chords: [[0, .8, 52, 59], [2, .7, 52, 61], [4, .8, 52, 59], [6, .7, 52, 61]]
	},
	jazz: {
		name: 'Swung ii–V–I', bpm: 120, swing: true, voice: 'triangle',
		guide: 'Dm7 and G7 resolve to Cmaj7. A walking bass marks the quarter notes while the treble leans into the late half of each swung pair.',
		lead: [0, 65, 69, 72, 71, 0, 67, 65, 64, 0, 67, 69, 71, 67, 64, 0], bass: [38, 0, 41, 0, 43, 0, 47, 0, 48, 0, 52, 0, 55, 0, 47, 0],
		chords: [[0, .66, 53, 57, 60], [2, .7, 53, 59, 62], [4, 1, 52, 55, 59], [6.67, .55, 55, 59, 64]]
	},
	swing: {
		name: 'Section riff', bpm: 144, swing: true, voice: 'triangle',
		guide: 'A short F6 riff answers itself over four walking bass notes per bar. The offbeats arrive late, not halfway between the beats.',
		lead: [65, 0, 69, 72, 74, 0, 72, 69, 67, 0, 70, 74, 72, 0, 69, 65], bass: [41, 0, 45, 0, 48, 0, 50, 0, 43, 0, 46, 0, 48, 0, 40, 0],
		chords: [[0, .4, 57, 60, 62], [1, .4, 57, 60, 62], [2, .4, 57, 60, 62], [3, .4, 57, 60, 62], [4, .5, 58, 62, 65], [6, .55, 58, 60, 64]]
	},
	bebop: {
		name: 'Approach tones', bpm: 172, swing: true, voice: 'triangle',
		guide: 'A quick eighth-note line connects Dm7, G7 and Cmaj7. Brief chromatic neighbors pull the ear toward each new chord tone.',
		lead: [62, 65, 69, 72, 71, 69, 68, 67, 64, 67, 71, 74, 73, 72, 67, 64], bass: [38, 0, 45, 0, 43, 0, 47, 0, 48, 0, 52, 0, 55, 0, 47, 0],
		chords: [[.67, .4, 53, 57, 60], [2.67, .4, 53, 59, 62], [4, .8, 52, 55, 59], [7, .45, 52, 55, 59]]
	},
	rhythm: {
		name: 'Backbeat boogie', bpm: 108, swing: true, voice: 'triangle',
		guide: 'A rising boogie bass in A sits underneath short chord punches. The snare answers the kick on beats two and four.',
		lead: [0, 0, 64, 0, 66, 0, 67, 64, 0, 0, 64, 0, 67, 66, 64, 0], bass: [33, 45, 37, 45, 40, 45, 42, 43, 33, 45, 37, 45, 40, 45, 43, 42],
		chords: [[1, .4, 57, 61, 64], [3, .4, 57, 61, 64], [5, .4, 57, 61, 64], [7, .4, 57, 61, 64]]
	},
	soul: {
		name: 'Gospel cadence', bpm: 82, swing: false, voice: 'sine',
		guide: 'An F major chord returns home to C. A little pentatonic answer floats over the held harmony and a steady backbeat.',
		lead: [0, 0, 65, 69, 72, 0, 69, 67, 64, 0, 0, 67, 69, 67, 64, 0], bass: [41, 0, 0, 48, 45, 0, 48, 0, 36, 0, 0, 43, 40, 0, 43, 0],
		chords: [[0, 3.5, 53, 57, 60], [4, 3.5, 52, 55, 60]]
	},
	funk: {
		name: 'Pocket vamp', bpm: 104, swing: false, voice: 'square',
		guide: 'A clipped E minor vamp lands hard on the first beat. Short sixteenth-note chord stabs fill the gaps around the bass.',
		lead: [64, 0, 0, 67, 0, 64, 0, 0, 64, 0, 0, 67, 0, 69, 67, 0], bass: [40, 0, 0, 52, 0, 43, 45, 0, 40, 0, 0, 47, 0, 43, 0, 45],
		chords: [[.75, .18, 55, 59, 62], [1.5, .18, 55, 59, 62], [2.75, .18, 55, 59, 62], [3.5, .18, 55, 59, 62], [4.75, .18, 55, 59, 62], [6.25, .18, 55, 59, 62], [7.5, .18, 55, 59, 62]]
	},
	rock: {
		name: 'Driving fifths', bpm: 132, swing: false, voice: 'sawtooth',
		guide: 'Straight eighth notes and fifths in A lock the bass to a repeated guitar figure. Listen for the strong backbeat.',
		lead: [57, 64, 57, 64, 57, 66, 57, 64, 62, 69, 62, 69, 57, 66, 57, 64], bass: [33, 0, 33, 0, 33, 0, 33, 0, 38, 0, 38, 0, 33, 0, 33, 0],
		chords: [[0, .6, 45, 52], [2, .6, 45, 52], [4, .6, 50, 57], [6, .6, 45, 52]]
	},
	metal: {
		name: 'Low pedal riff', bpm: 98, swing: false, voice: 'sawtooth',
		guide: 'Short low E attacks alternate with sustained power chords. The B-flat above E supplies a dark tritone contrast.',
		lead: [40, 40, 0, 40, 46, 0, 45, 0, 40, 40, 0, 40, 43, 0, 42, 0], bass: [28, 28, 0, 28, 34, 0, 33, 0, 28, 28, 0, 28, 31, 0, 30, 0],
		chords: [[2, .8, 46, 53], [3, .8, 45, 52], [6, .8, 43, 50], [7, .8, 42, 49]]
	},
	punk: {
		name: 'Downstroke drive', bpm: 174, swing: false, voice: 'sawtooth',
		guide: 'Unbroken straight eighths drive an A–D–E power-chord figure. Each attack is short and equally weighted, like repeated downstrokes.',
		lead: [52, 52, 52, 52, 52, 52, 52, 52, 57, 57, 57, 57, 59, 59, 59, 59], bass: [33, 33, 33, 33, 33, 33, 33, 33, 38, 38, 38, 38, 40, 40, 40, 40],
		chords: [[0, .7, 45, 52], [2, .7, 45, 52], [4, .7, 50, 57], [6, .7, 52, 59]]
	},
	disco: {
		name: 'Four-on-the-floor', bpm: 118, swing: false, voice: 'triangle', drums: floorDrums,
		guide: 'A D minor groove with a kick on every beat. An octave bass pushes the pulse while short string stabs answer on the offbeats.',
		lead: [0, 69, 0, 74, 0, 69, 0, 72, 0, 69, 0, 74, 76, 0, 74, 72], bass: [38, 50, 38, 50, 41, 53, 41, 53, 43, 55, 43, 55, 45, 57, 45, 57],
		chords: [[1, .28, 62, 65, 69, 72], [3, .28, 62, 65, 69, 72], [5, .28, 65, 69, 72, 76], [7, .28, 65, 69, 72, 76]]
	},
	hiphop: {
		name: 'Loop and break', bpm: 96, swing: false, voice: 'square', drums: { ...backbeatDrums, kicks: [0, 2.5, 4, 6.5] },
		guide: 'A Funk-flavoured break cycles under a short three-note riff. The kick lands off the beat so the loop feels repeated rather than played.',
		lead: [0, 0, 64, 0, 67, 0, 0, 64, 0, 0, 67, 0, 71, 0, 69, 0], bass: [39, 0, 0, 39, 0, 0, 51, 0, 39, 0, 0, 39, 0, 0, 46, 0],
		chords: [[0, .4, 55, 58, 62], [2.5, .3, 55, 58, 62], [4, .4, 55, 58, 63], [6.5, .3, 55, 58, 63]]
	},
	fusion: {
		name: 'Electric vamp', bpm: 128, swing: false, voice: 'sawtooth',
		guide: 'An E dorian vamp in an uneven seven-sixteenth figure. Electric piano chords sit above a bass that favours the offbeats.',
		lead: [64, 67, 71, 0, 74, 0, 71, 67, 64, 66, 69, 0, 73, 0, 69, 66], bass: [40, 0, 47, 40, 0, 50, 0, 40, 40, 0, 47, 40, 0, 52, 0, 45],
		chords: [[0, .5, 64, 67, 71], [2, .4, 64, 67, 71], [4, .5, 66, 69, 73], [6, .4, 66, 69, 73]]
	},
	altrock: {
		name: 'Quiet to loud', bpm: 124, swing: false, voice: 'sawtooth',
		guide: 'A bare guitar figure opens into a full four-chord chorus. The verse stays thin and quiet so the loud section hits harder.',
		lead: [52, 0, 52, 0, 55, 0, 52, 0, 59, 59, 59, 59, 57, 57, 55, 52], bass: [28, 0, 28, 0, 33, 0, 28, 0, 35, 35, 35, 35, 33, 33, 31, 28],
		chords: [[0, .7, 40, 47], [2, .7, 45, 52], [4, .8, 47, 54], [6, .8, 45, 52]]
	},
	house: {
		name: 'Offbeat piano', bpm: 122, swing: false, voice: 'triangle', drums: floorDrums,
		guide: 'A kick marks each beat while C minor seventh chords stab on the offbeats. Listen for the bass notes that answer the keys.',
		lead: [0, 0, 0, 67, 0, 70, 0, 0, 0, 0, 0, 67, 0, 72, 70, 0], bass: [36, 0, 36, 48, 0, 36, 43, 0, 36, 0, 36, 48, 0, 36, 46, 43],
		chords: [[.5, .28, 60, 63, 67, 70], [1.5, .22, 60, 63, 67, 70], [3.5, .28, 60, 63, 67, 70], [4.5, .28, 60, 63, 67, 70], [5.5, .22, 60, 63, 67, 70], [7.5, .28, 60, 63, 67, 70]]
	},
	techno: {
		name: 'Sequenced pulse', bpm: 132, swing: false, voice: 'square', drums: { ...floorDrums, snares: [3, 7] },
		guide: 'A constant kick sets the grid for a clipped synth sequence. The bass stays on one note while a few high stabs shift the accents.',
		lead: [58, 0, 58, 65, 0, 58, 61, 0, 58, 0, 58, 65, 0, 58, 63, 0], bass: [0, 34, 0, 34, 0, 34, 0, 34, 0, 34, 0, 34, 0, 34, 0, 34],
		chords: [[2.75, .16, 61, 66], [6.75, .16, 63, 65]]
	},
	dnb: {
		name: 'Chopped break', bpm: 172, swing: false, voice: 'sine', drums: { kicks: [0, 2.5, 4, 5.75, 6.5], snares: [1, 3, 5, 7] },
		guide: 'Kicks slip between the backbeats at 172 BPM. Count bass accents at half that speed while the opening chord hangs over the break.',
		lead: [0, 0, 0, 0, 67, 0, 0, 70, 0, 0, 0, 0, 74, 0, 72, 0], bass: [31, 0, 0, 0, 31, 0, 0, 34, 31, 0, 0, 0, 37, 0, 0, 34],
		chords: [[0, 1.6, 55, 58, 62, 69], [4, 1.6, 55, 58, 60, 65]]
	},
	grunge: {
		name: 'Drop D weight', bpm: 112, swing: false, voice: 'sawtooth',
		guide: 'A sparse guitar figure opens up into stacked power chords. Hear how the low D returns with the full band at the end.',
		lead: [50, 0, 53, 0, 55, 53, 0, 0, 57, 57, 55, 55, 53, 53, 50, 50], bass: [26, 0, 0, 0, 29, 0, 0, 0, 33, 33, 31, 31, 29, 29, 26, 26],
		chords: [[4, .85, 45, 52, 57], [5, .85, 43, 50, 55], [6, .85, 41, 48, 53], [7, .9, 38, 45, 50]]
	},
	hardcore: {
		name: 'Rave stabs', bpm: 148, swing: false, voice: 'triangle', drums: { ...floorDrums, snares: [1, 2.75, 3, 5, 6.5, 7] },
		guide: 'A kick keeps every beat while extra snare hits cut across it. Short minor chords echo the piano stabs of UK rave.',
		lead: [0, 74, 0, 77, 0, 76, 74, 0, 0, 74, 0, 81, 77, 0, 76, 0], bass: [38, 0, 38, 50, 0, 38, 45, 0, 38, 0, 38, 50, 0, 41, 43, 0],
		chords: [[.5, .3, 62, 65, 69], [2.75, .2, 62, 65, 69], [3.5, .24, 65, 69, 72], [4.5, .3, 62, 65, 69], [6.5, .22, 60, 64, 67], [7.5, .22, 60, 64, 67]]
	},
	jungle: {
		name: 'Sliced break', bpm: 160, swing: false, voice: 'sine', drums: { kicks: [0, 1.75, 2.5, 4, 5.5, 6.75], snares: [1, 2.25, 3, 3.5, 4.75, 5, 6.25, 7, 7.5] },
		guide: 'Snares jump ahead of the beat and double up before the bar ends. Follow the slower bass phrase underneath the sixteenth-note drum edits.',
		lead: [0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 70, 0, 0, 0, 67], bass: [31, 31, 0, 0, 31, 0, 0, 38, 34, 34, 0, 0, 31, 0, 0, 0],
		chords: [[1.5, .26, 63, 67, 74], [5.5, .24, 62, 65, 70]]
	},
	ska: {
		name: 'Offbeat chop', bpm: 128, swing: false, voice: 'square',
		guide: 'The bass walks on all four beats. Count “one and two and”: the short D and G chords land on each “and”, while a high horn-like phrase answers in the second bar.',
		lead: [0, 0, 0, 0, 0, 0, 0, 0, 71, 0, 74, 76, 74, 0, 71, 0], bass: [38, 0, 42, 0, 45, 0, 42, 0, 43, 0, 47, 0, 50, 0, 45, 0],
		chords: [[.5, .2, 57, 62, 66], [1.5, .2, 57, 62, 66], [2.5, .2, 57, 62, 66], [3.5, .2, 57, 62, 66], [4.5, .2, 59, 62, 67], [5.5, .2, 59, 62, 67], [6.5, .2, 59, 62, 67], [7.5, .2, 59, 62, 67]]
	},
	rocksteady: {
		name: 'Bass pickup', bpm: 84, swing: false, voice: 'triangle',
		guide: 'At this slower pace the bass has room to sing. Listen for the C sharp just before bar two: it leads up to D while the chord chops leave a gap.',
		lead: [0, 0, 64, 66, 0, 64, 61, 0, 0, 0, 66, 69, 0, 66, 64, 0], bass: [33, 0, 0, 40, 45, 0, 0, 37, 38, 0, 0, 45, 42, 0, 0, 40],
		chords: [[.5, .25, 57, 61, 64], [1.5, .25, 57, 61, 64], [2.5, .25, 57, 61, 64], [4.5, .25, 57, 62, 66], [5.5, .25, 57, 62, 66], [6.5, .25, 57, 62, 66]]
	},
	reggae: {
		name: 'One drop', bpm: 76, swing: false, voice: 'triangle', drums: oneDropDrums,
		guide: 'Count four beats to a bar. The kick leaves beat one empty and meets the snare on three. The bass enters between beats under clipped C minor and F minor chords.',
		lead: [0, 0, 0, 0, 0, 70, 67, 0, 0, 0, 0, 68, 0, 0, 72, 0], bass: oneDropBass,
		chords: [[.5, .22, 55, 60, 63, 67], [1.5, .22, 55, 60, 63, 67], [2.5, .22, 55, 60, 63, 67], [3.5, .22, 55, 60, 63, 67], [4.5, .22, 56, 60, 65, 68], [5.5, .22, 56, 60, 65, 68], [6.5, .22, 56, 60, 65, 68], [7.5, .22, 56, 60, 65, 68]]
	},
	dub: {
		name: 'Echo return', bpm: 76, swing: false, voice: 'triangle', drums: oneDropDrums,
		guide: 'This is a version of the reggae study: the bass and one drop stay put. Only the first chord chop of each bar remains, followed by two shorter, thinner repeats three quarters of a beat apart.',
		lead: [0, 0, 0, 0, 0, 0, 67, 0, 0, 0, 0, 0, 0, 0, 72, 0], bass: oneDropBass,
		chords: [[.5, .22, 55, 60, 63, 67], [1.25, .16, 60, 63, 67], [2, .1, 63, 67], [4.5, .22, 56, 60, 65, 68], [5.25, .16, 60, 65, 68], [6, .1, 65, 68]]
	},
	motown: {
		name: 'Bass pickup', bpm: 124, swing: false, voice: 'triangle', drums: { ...backbeatDrums, snares: [1, 1.5, 3, 3.5, 5, 5.5, 7, 7.5] },
		guide: 'A shuffle-free C major with tambourine on every backbeat. The bass reaches the next chord early, so each bar arrives before the drums confirm it.',
		lead: [0, 67, 0, 72, 0, 71, 69, 0, 67, 0, 72, 74, 72, 69, 67, 0], bass: [36, 0, 43, 45, 0, 47, 48, 0, 41, 0, 48, 50, 0, 52, 43, 0],
		chords: [[0, .4, 60, 64, 67], [2, .4, 60, 64, 67], [4, .4, 60, 64, 69], [6, .5, 60, 65, 69]]
	},
	psyc: {
		name: 'Modal drone', bpm: 108, swing: false, voice: 'sawtooth',
		guide: 'An A drone holds while the guitar and bass circle E and G. Feedback-like repeats stay on the same two chords, so the interest comes from the texture rather than the progression.',
		lead: [57, 0, 64, 0, 55, 0, 64, 0, 57, 0, 66, 0, 55, 0, 62, 0], bass: [33, 0, 0, 0, 33, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0],
		chords: [[0, 1.9, 45, 52, 57], [4, 1.9, 43, 50, 55]]
	},
	prog: {
		name: 'Seven-eight riff', bpm: 126, swing: false, voice: 'square',
		guide: 'A seven-eight bar repeats an E minor figure, then the second bar opens into held chords. Count seven before each return to the top of the riff.',
		lead: [64, 64, 0, 64, 67, 0, 71, 0, 71, 0, 69, 0, 67, 0, 64, 0], bass: [28, 28, 0, 28, 31, 0, 35, 0, 35, 0, 33, 0, 31, 0, 28, 0],
		chords: [[0, .6, 52, 59, 64], [3.5, .6, 52, 59, 64], [4, 1.8, 50, 57, 62], [6, 1.7, 52, 59, 64]]
	},
	dnb_pop: {
		name: 'Reese and breaks', bpm: 174, swing: false, voice: 'sine', drums: { kicks: [0, 2.5, 4, 6], snares: [1, 3, 5, 7] },
		guide: 'A slow two-note bass holds under a fast break. The chords hang for a full bar each so the drums do the moving.',
		lead: [0, 0, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 0, 0, 0, 0], bass: [33, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 33, 0, 0, 0],
		chords: [[0, 3.8, 57, 60, 64, 69], [4, 3.8, 55, 59, 62, 67]]
	},
	triphop: {
		name: 'Dusty loop', bpm: 88, swing: false, voice: 'triangle', drums: { kicks: [0, 1.75, 4, 5.5], snares: [1, 3, 5, 7] },
		guide: 'A slow D minor loop with a heavy backbeat and a little extra kick. The chords stay for two beats each and the melody never rises above a murmur.',
		lead: [0, 0, 65, 0, 69, 0, 0, 67, 0, 0, 65, 0, 62, 0, 0, 0], bass: [38, 0, 0, 0, 41, 0, 0, 0, 38, 0, 0, 0, 36, 0, 0, 0],
		chords: [[0, 1.4, 53, 57, 60], [2, 1.4, 53, 57, 60], [4, 1.4, 50, 53, 57], [6, 1.8, 48, 53, 55]]
	},
	dancehall: {
		name: 'Riddim bounce', bpm: 102, swing: false, voice: 'square', drums: { kicks: [0, 3, 4, 7], snares: [2, 6] },
		guide: 'The kick and bass lock onto beats one and four while the snare answers on two and six. Nothing else competes, so the voice would sit on top of the track.',
		lead: [0, 0, 70, 0, 69, 0, 0, 0, 0, 0, 70, 0, 72, 0, 69, 0], bass: [34, 0, 0, 34, 34, 0, 0, 34, 36, 0, 0, 36, 36, 0, 0, 34],
		chords: [[.5, .2, 58, 62, 65], [3.5, .2, 58, 62, 65], [4.5, .2, 60, 63, 67], [7.5, .2, 58, 62, 65]]
	},
	milrock: {
		name: 'Five-four cells', bpm: 136, swing: false, voice: 'triangle',
		guide: 'Two short clean figures share a bar of five beats. The guitar and bass enter at different points in the grouping, so the bar keeps slipping under the foot.',
		lead: [64, 0, 71, 0, 67, 64, 0, 71, 0, 67, 0, 64, 67, 0, 71, 0], bass: [40, 0, 0, 47, 0, 40, 0, 0, 47, 0, 43, 0, 0, 40, 0, 0],
		chords: [[0, .45, 55, 59, 64], [2.5, .45, 55, 59, 64], [5, .45, 52, 55, 60]]
	},
	mento: {
		name: 'Rumba box and strum', bpm: 104, swing: false, voice: 'triangle',
		guide: 'A plucked bass steps around the beat while short offbeat strums leave room for a melodic answer.',
		lead: [67, 0, 64, 0, 62, 64, 0, 67, 69, 0, 67, 0, 64, 62, 60, 0],
		bass: [36, 0, 0, 43, 0, 36, 0, 43, 41, 0, 0, 48, 0, 43, 0, 36],
		chords: [[.5, .2, 52, 55, 60], [1.5, .2, 52, 55, 60], [3.5, .2, 52, 55, 60], [4.5, .2, 53, 57, 60], [6.5, .2, 55, 59, 62], [7.5, .2, 52, 55, 60]]
	},
	country: {
		name: 'Bass note and strum', bpm: 100, swing: false, voice: 'triangle',
		guide: 'Alternate the root and fifth in the bass, with a light chord strum between bass notes.',
		lead: [0, 0, 67, 69, 71, 0, 74, 0, 72, 0, 69, 0, 71, 69, 67, 0],
		bass: [43, 0, 0, 0, 38, 0, 0, 0, 48, 0, 0, 0, 43, 0, 0, 0],
		chords: [[1, .4, 55, 59, 62], [3, .4, 55, 59, 62], [5, .4, 55, 60, 64], [7, .4, 55, 59, 62]]
	},
	bluegrass: {
		name: 'Cross-string roll', bpm: 152, swing: false, voice: 'triangle',
		guide: 'Hear the high note recur as the picked figure crosses strings. The short backbeat chords suggest a mandolin chop.',
		lead: [67, 71, 79, 74, 71, 79, 67, 74, 72, 76, 79, 76, 67, 71, 79, 74],
		bass: [43, 0, 0, 0, 38, 0, 0, 0, 48, 0, 0, 0, 43, 0, 0, 0],
		chords: [[1, .15, 55, 59, 62], [3, .15, 55, 59, 62], [5, .15, 55, 60, 64], [7, .15, 55, 59, 62]]
	},
	son: {
		name: 'Three-two son clave', bpm: 96, swing: false, voice: 'triangle',
		drums: { kicks: [0, 2.5, 4, 6.5], snares: [0, 1.5, 3, 5, 6] },
		guide: 'The short percussion hits sketch three-two clave. Listen for the bass anticipating the next bar.',
		lead: [64, 0, 67, 69, 0, 67, 0, 64, 0, 65, 0, 67, 65, 0, 62, 0],
		bass: [0, 0, 0, 43, 0, 0, 0, 43, 0, 0, 0, 38, 0, 0, 0, 36],
		chords: [[.5, .3, 52, 55, 60], [2, .3, 55, 60, 64], [4.5, .3, 53, 55, 59], [6, .3, 55, 59, 62]]
	},
	salsa: {
		name: 'Clave and piano montuno', bpm: 112, swing: false, voice: 'triangle',
		drums: { kicks: [0, 2.5, 4, 6.5], snares: [0, 1.5, 3, 5, 6] },
		guide: 'Compare the same clave with a busier piano figure. Some chord strikes land before the beat they suggest.',
		lead: [0, 72, 0, 76, 74, 0, 72, 74, 0, 71, 0, 74, 77, 0, 74, 72],
		bass: [36, 0, 0, 43, 0, 0, 0, 43, 0, 0, 0, 38, 0, 0, 0, 36],
		chords: [[.5, .22, 52, 55, 60], [1.5, .22, 55, 60, 64], [2.5, .22, 52, 55, 60], [3.5, .22, 53, 55, 59], [4.5, .22, 55, 59, 62], [5.5, .22, 53, 55, 59], [6.5, .22, 55, 59, 62], [7.5, .22, 52, 55, 60]]
	},
	honkytonk: {
		name: 'Two-beat shuffle', bpm: 116, swing: true, voice: 'triangle',
		drums: { kicks: [0, 2, 4, 6], snares: [1, 3, 5, 7] },
		guide: 'A swung two-beat pulse leaves space for the melody. The bass marks the strong beats while short chords and a high answer suggest piano and steel fills.',
		lead: [0, 67, 0, 69, 71, 0, 69, 67, 0, 64, 67, 0, 69, 67, 64, 0],
		bass: [43, 0, 0, 0, 38, 0, 0, 0, 48, 0, 0, 0, 43, 0, 0, 0],
		chords: [[1, .32, 55, 59, 62], [3, .32, 55, 59, 62], [5, .32, 55, 60, 64], [7, .32, 55, 59, 62]]
	},
	outlaw: {
		name: 'Loose backbeat', bpm: 104, swing: false, voice: 'sawtooth',
		drums: { kicks: [0, 2, 4, 6], snares: [1, 3, 5, 7] },
		guide: 'A plain electric-band backbeat holds a low, unhurried melody. The short, slightly rough phrases leave room for a vocal and guitar fills.',
		lead: [52, 0, 55, 0, 57, 0, 55, 52, 0, 52, 0, 55, 57, 55, 52, 0],
		bass: [40, 0, 0, 0, 45, 0, 0, 0, 47, 0, 0, 0, 45, 0, 0, 0],
		chords: [[0, .7, 52, 59], [2, .65, 55, 62], [4, .7, 57, 64], [6, .65, 55, 62]]
	},
	countryrock: {
		name: 'Twang over a backbeat', bpm: 112, swing: false, voice: 'triangle',
		drums: backbeatDrums,
		guide: 'A steady rock backbeat carries an open major-key progression. A bright, recurring guitar-like melody and held chords suggest the blend of country twang and a full band.',
		lead: [67, 0, 71, 0, 74, 0, 71, 67, 69, 0, 72, 0, 76, 0, 72, 69],
		bass: [43, 0, 0, 0, 38, 0, 0, 0, 48, 0, 0, 0, 43, 0, 0, 0],
		chords: [[0, .8, 55, 59, 62], [2, .8, 55, 60, 64], [4, .8, 55, 59, 62], [6, .8, 55, 60, 64]]
	},
	altcountry: {
		name: 'Roots into indie rock', bpm: 96, swing: false, voice: 'sawtooth',
		drums: { kicks: [0, 3, 4, 6], snares: [1, 3, 5, 7] },
		guide: 'A spare first bar opens into a louder chord sequence. Keep the measured pulse as the guitar line grows from a small roots figure into a rougher band sound.',
		lead: [52, 0, 55, 0, 57, 0, 55, 0, 59, 59, 57, 55, 52, 52, 55, 57],
		bass: [40, 0, 0, 0, 45, 0, 0, 0, 47, 47, 47, 47, 45, 45, 43, 43],
		chords: [[0, .7, 52, 59], [2, .7, 55, 62], [4, .8, 55, 59, 62], [6, .8, 53, 57, 60]]
	}
};

function patternDrums(score) {
	return score.drums || backbeatDrums;
}

const atlasAudio = {
	context: null, bus: null, noise: null, sources: [], ticket: 0, active: false, timer: 0,
	init(notify) {
		this.notify = notify;
	},
	prepare() {
		if (this.context) return;
		this.context = new AudioContext();
		const rate = this.context.sampleRate;
		this.noise = this.context.createBuffer(1, Math.ceil(rate * .16), rate);
		const samples = this.noise.getChannelData(0);
		for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
	},
	envelope(source, when, length, volume, cutoff, type) {
		const ctx = this.context;
		const filter = ctx.createBiquadFilter();
		filter.type = type;
		filter.frequency.value = cutoff;
		const gain = ctx.createGain();
		gain.gain.setValueAtTime(.0001, when);
		gain.gain.exponentialRampToValueAtTime(volume, when + .007);
		gain.gain.exponentialRampToValueAtTime(.0001, when + length);
		source.connect(filter).connect(gain).connect(this.bus);
		source.start(when);
		source.stop(when + length + .01);
		this.sources.push(source);
	},
	tone(midi, when, length, voice, volume, cutoff) {
		if (!midi) return;
		const oscillator = this.context.createOscillator();
		oscillator.type = voice;
		oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
		this.envelope(oscillator, when, length, volume, cutoff, 'lowpass');
	},
	drum(when, isSnare) {
		if (isSnare) return this.rattle(when, .105, .12, 1300);
		const kick = this.context.createOscillator();
		kick.frequency.setValueAtTime(118, when);
		kick.frequency.exponentialRampToValueAtTime(42, when + .11);
		this.envelope(kick, when, .15, .31, 650, 'lowpass');
	},
	rattle(when, length, volume, cutoff) {
		const noise = this.context.createBufferSource();
		noise.buffer = this.noise;
		this.envelope(noise, when, length, volume, cutoff, 'highpass');
	},
	schedule(score) {
		const ctx = this.context;
		const beat = 60 / score.bpm;
		const start = ctx.currentTime + .035;
		this.bus = ctx.createGain();
		this.bus.gain.value = .48;
		this.bus.connect(ctx.destination);
		for (let i = 0; i < 16; i++) {
			const offbeat = i % 2;
			const when = start + (Math.floor(i / 2) + offbeat * (score.swing ? 2 / 3 : .5)) * beat;
			this.tone(score.lead[i], when, beat * (offbeat ? .31 : .51), score.voice, .18, 2050);
			this.tone(score.bass[i], when, beat * .65, 'triangle', .31, 660);
			this.rattle(when, offbeat ? .045 : .065, offbeat ? .04 : .058, 6200);
		}
		const { kicks, snares } = patternDrums(score);
		for (const offset of kicks) this.drum(start + offset * beat, false);
		for (const offset of snares) this.drum(start + offset * beat, true);
		for (const [offset, duration, ...notes] of score.chords) {
			for (const pitch of notes) this.tone(pitch, start + offset * beat, duration * beat, score.voice, .085, 1450);
		}
		return 8 * beat + .1;
	},
	async toggle(id) {
		if (this.active) return this.stop();
		const ticket = ++this.ticket;
		this.active = true;
		try {
			this.prepare();
			if (this.context.state !== 'running') await this.context.resume();
			if (ticket !== this.ticket) return;
			const seconds = this.schedule(patternScores[id]);
			this.notify('playing');
			this.timer = setTimeout(() => this.stop(), seconds * 1000);
		} catch {
			if (ticket !== this.ticket) return;
			this.stop();
			this.notify('unavailable');
		}
	},
	stop() {
		this.ticket++;
		this.active = false;
		clearTimeout(this.timer);
		if (this.bus) {
			const bus = this.bus;
			const now = this.context.currentTime;
			const end = now + .02;
			// Anchor current gain before ramping so Web Audio fades cleanly instead of stepping.
			bus.gain.setValueAtTime(bus.gain.value, now);
			bus.gain.linearRampToValueAtTime(0, end);
			for (const source of this.sources) source.stop(end);
			setTimeout(() => bus.disconnect(), 30);
		}
		this.sources.length = 0;
		this.bus = null;
		this.notify('idle');
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = { patternScores, patternDrums, atlasAudio };
