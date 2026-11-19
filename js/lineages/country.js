// owns: Country lineage records and their reference slugs
// edit for: country catalogue entries, studies and instruments
const countryLineage = [
	{
		file: 33, id: 'country', name: 'Country', wiki: 'Country_music', parent: null, family: 'country', date: '1920s', place: 'Southern United States',
		influences: [],
		shift: 'Early commercial country recordings drew on regional fiddle tunes, ballads and blues. Guitar bass notes and strums support the sung story.',
		core: ['Guitar', 'Voice', 'Fiddle'], optional: ['Banjo', 'Harmonica'], techniques: ['Alternating bass', 'Storytelling'], traits: ['Acoustic', 'Vocal-led'],
		landmark: { title: 'Blue Yodel No. 1', artist: 'Jimmie Rodgers', year: '1928', note: 'Hear how the yodel answers each sung phrase.' },
		study: { title: 'Wildwood Flower', artist: 'The Carter Family', year: '1928', note: 'Pick out the melody against the guitar strums.' }
	},
	{
		file: 34, id: 'bluegrass', name: 'Bluegrass', wiki: 'Bluegrass_music', parent: 'country', family: 'country', date: '1940s', place: 'United States',
		influences: [],
		shift: 'Bluegrass took string-band tunes into a fast ensemble sound built around close vocal harmony and individual instrumental breaks.',
		core: ['Banjo', 'Mandolin', 'Fiddle'], optional: ['Guitar', 'Upright bass'], techniques: ['Three-finger rolls', 'Mandolin chop'], traits: ['Acoustic', 'Breaks'],
		landmark: { title: 'Blue Moon of Kentucky', artist: 'Bill Monroe', year: '1947', note: 'Follow the waltz under the vocal harmony.' },
		study: { title: 'Foggy Mountain Breakdown', artist: 'Flatt and Scruggs', year: '1949', note: 'Listen for the banjo roll continuing through a chord change.' }
	},
	{
		file: 37, id: 'honkytonk', name: 'Honky-tonk', aliases: ['honky tonk'], wiki: 'Honky-tonk', parent: 'country', family: 'country', date: '1940s', place: 'Texas and the American South',
		influences: [],
		shift: 'Honky-tonk made the dance-floor band central to country music. A clipped two-beat bass leaves room for piano, fiddle and pedal steel to answer a plainspoken vocal, with the room’s rowdy energy left in the performance.',
		core: ['Voice', 'Guitar', 'Upright bass', 'Drums'], optional: ['Piano', 'Fiddle', 'Pedal steel guitar'], techniques: ['Two-beat bass', 'Steel guitar fills', 'Plainspoken vocal'], traits: ['Dance music', 'Barroom sound'],
		landmark: { title: 'Your Cheatin’ Heart', wiki: 'Your_Cheatin%27_Heart', artist: 'Hank Williams', artistWiki: 'Hank_Williams', year: '1953', note: 'Listen for the fiddle and steel answering the vocal between its short phrases.' },
		study: { title: 'I’m So Lonesome I Could Cry', wiki: 'I%27m_So_Lonesome_I_Could_Cry', artist: 'Hank Williams', artistWiki: 'Hank_Williams', year: '1949', note: 'Keep a light two-beat pulse and leave space after each sung line.' }
	},
	{
		file: 38, id: 'outlaw', name: 'Outlaw country', short: 'Outlaw', aliases: ['outlaw'], wiki: 'Outlaw_country', parent: 'honkytonk', family: 'country', date: '1970s', place: 'Texas and Nashville, US',
		influences: [],
		shift: 'Outlaw country grew from artists pushing back against Nashville’s polished studio system. They kept country songs and dance-band instruments but used rougher band arrangements and a more personal, sometimes rebellious voice.',
		core: ['Voice', 'Electric guitar', 'Bass guitar', 'Drums'], optional: ['Fiddle', 'Pedal steel guitar', 'Piano'], techniques: ['Loose ensemble feel', 'Story-led vocal', 'Electric guitar fills'], traits: ['Roots music', 'Singer-songwriter'],
		landmark: { title: 'Are You Sure Hank Done It This Way', wiki: 'Are_You_Sure_Hank_Done_It_This_Way', artist: 'Waylon Jennings', artistWiki: 'Waylon_Jennings', year: '1975', note: 'Hear the steady band groove beneath a lyric questioning country music’s direction.' },
		study: { title: 'Mammas Don’t Let Your Babies Grow Up to Be Cowboys', wiki: 'Mamas_Don%27t_Let_Your_Babies_Grow_Up_to_Be_Cowboys', artist: 'Waylon Jennings and Willie Nelson', artistWiki: 'Waylon_Jennings', year: '1978', note: 'Keep the relaxed pulse steady while the two voices trade the lines.' }
	},
	{
		file: 39, id: 'countryrock', name: 'Country rock', aliases: ['country-rock'], wiki: 'Country_rock', parent: 'country', family: 'country', date: 'Late 1960s', place: 'California, US',
		influences: [['rock', 'Amplified guitars and rock-band arrangements met country harmony, song forms and instrumental colors.']],
		shift: 'Country rock brought country melodies and twang into the electric rock band. Drums and bass drive a full-group sound, while harmony vocals and steel guitar keep the country colors audible.',
		core: ['Electric guitar', 'Bass guitar', 'Drums', 'Voice'], optional: ['Pedal steel guitar', 'Piano', 'Backing vocals'], techniques: ['Harmony vocals', 'Twang guitar', 'Full-band arrangement'], traits: ['Crossover', 'Roots music'],
		landmark: { title: 'Take It Easy', wiki: 'Take_It_Easy_(Eagles_song)', artist: 'Eagles', artistWiki: 'Eagles_(band)', year: '1972', note: 'Listen for close vocal harmonies over a rock-band pulse and country-tinged guitar parts.' },
		study: { title: 'Already Gone', wiki: 'Already_Gone_(Eagles_song)', artist: 'Eagles', artistWiki: 'Eagles_(band)', year: '1974', note: 'Keep the backbeat firm while the guitar figure and vocal harmonies share the hook.' }
	},
	{
		file: 40, id: 'altcountry', name: 'Alternative country', short: 'Alt-country', aliases: ['alt country', 'alt-country', 'alternative country', 'altcountry'], wiki: 'Alternative_country', parent: 'countryrock', family: 'country', date: 'Late 1980s–1990s', place: 'United States',
		influences: [
			['altrock', 'Independent rock bands brought a DIY approach, rough edges and a wider palette of song forms.'],
			['punk', 'Punk’s directness and independent ethos shaped early alternative-country bands and their recordings.']
		],
		shift: 'Alternative country connected country songwriting and instruments to the independent rock scene. Some bands kept the twang; others made the recordings rougher and more expansive, without settling into one standard sound.',
		core: ['Voice', 'Electric guitar', 'Bass guitar', 'Drums'], optional: ['Acoustic guitar', 'Fiddle', 'Pedal steel guitar'], techniques: ['Independent recording', 'Roots instrumentation', 'Dynamic guitar arrangements'], traits: ['Independent', 'Crossover'],
		landmark: { title: 'No Depression', wiki: 'No_Depression_(song)', artist: 'Uncle Tupelo', artistWiki: 'Uncle_Tupelo', year: '1990', note: 'Hear a country two-step feel delivered with the urgency and roughness of an indie band.' },
		study: { title: 'California Stars', wiki: 'California_Stars', artist: 'Wilco', artistWiki: 'Wilco', year: '1998', note: 'Let the steady beat support a broad, sustained melody rather than a busy country shuffle.' }
	}
];

if (typeof module !== 'undefined' && module.exports) module.exports = countryLineage;
